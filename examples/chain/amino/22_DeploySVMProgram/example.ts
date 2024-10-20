import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { sha256 } from 'ethereum-cryptography/sha256.js'
import { bech32 } from 'bech32'
import * as fs from 'node:fs'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'

import * as anytypes from '../../../../chain/google/protobuf/any'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as authservice from '../../../../chain/cosmos/auth/v1beta1/query'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as codectypemap from '../../../../chain/codec_type_map.json'
import * as ethcrypto from 'eth-crypto'
import * as banktypes from '../../../../chain/cosmos/bank/v1beta1/tx'

import * as web3 from '@solana/web3.js'
import {
  encodeData,
  UPGRADABLE_LOADER_LAYOUTS,
  toFluxSvmTransaction,
  BigNumber
} from '../../../../packages/utils'
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin'
import { Ed25519, Ed25519Keypair, keccak256 } from '@cosmjs/crypto'

const defaultLamportsPerByteYear = (1000000000 * 365) / 100 / (1024 * 1024)
const defaultExemptionThreshold = 2.0
const defaultGasPrice = 500000000

function getWalletAddr(wallet: ethwallet.Wallet) {
  return bech32.encode('lux', bech32.toWords(wallet.getAddress()))
}

// TODO: Get rent config from chain to calculate lamport exempt amount properly
function getRentExemptLamportAmount(dataLen: number): number {
  return Math.round(defaultLamportsPerByteYear * (dataLen + 128) * defaultExemptionThreshold)
}

async function getSvmAccountLink(
  svmClient: svmservice.Query,
  cosmosAddr: string
): Promise<svmservice.AccountLinkResponse> {
  return svmClient.AccountLink({
    address: cosmosAddr
  })
}

async function checkTxWithRetry(
  txClient: txservice.Service,
  txHash: string,
  timeout = 30000,
  retryInterval = 1000
): Promise<any> {
  const startTime = Date.now()
  const retry = async (): Promise<any> => {
    // Check if the timeout has been exceeded
    if (Date.now() - startTime >= timeout) {
      throw new Error('Timeout exceeded, transaction not included in a block')
    }

    try {
      // Attempt to fetch the transaction
      const result = await txClient.GetTx({ hash: txHash })

      // If the result is found, return it
      if (result) {
        return result
      }
    } catch (error) {
      // If error is not related to 'tx not found', rethrow the error
      if (!error.toString().includes('tx not found')) {
        throw error
      }
    }

    // If transaction not found, wait for retry interval and retry
    return new Promise((resolve) => setTimeout(resolve, retryInterval)).then(retry)
  }

  return retry()
}

async function broadcastMsgsSync(
  txClient: txservice.Service,
  senderAccNums: number[],
  senderAccSeqs: number[],
  msgTypes: any[],
  msgs: any[],
  wallets: ethwallet.Wallet[]
) {
  let msgAnys = []
  for (let i = 0; i < msgs.length; i++) {
    const msgAny: anytypes.Any = {
      type_url: `/${msgTypes[i].$type}`,
      value: msgTypes[i].encode(msgs[i]).finish()
    }

    msgAnys.push(msgAny)
  }

  let msgJsons = []
  for (let i = 0; i < msgs.length; i++) {
    const msgJSON = {
      type: codectypemap[`/${msgTypes[i].$type}`],
      value: msgTypes[i].toJSON(msgs[i])
    }

    msgJsons.push(msgJSON)
  }

  const txBody: txtypes.TxBody = {
    messages: msgAnys,
    memo: '',
    timeout_height: '16041999',
    extension_options: [],
    non_critical_extension_options: []
  }

  let signerInfos = []
  for (let i = 0; i < wallets.length; i++) {
    const senderXPubkey = ethcrypto.publicKey.compress(
      Buffer.from(wallets[i].getPublicKey()).toString('hex')
    )
    const senderPubkey: ethsecp256k1.PubKey = { key: Buffer.from(senderXPubkey, 'hex') }
    const senderPubkeyAny: anytypes.Any = {
      type_url: '/' + ethsecp256k1.PubKey.$type,
      value: ethsecp256k1.PubKey.encode(senderPubkey).finish()
    }

    signerInfos.push(
      txtypes.SignerInfo.create({
        public_key: senderPubkeyAny,
        mode_info: {
          single: {
            mode: signingtypes.SignMode.SIGN_MODE_DIRECT
          }
        },
        sequence: senderAccSeqs[i].toString()
      })
    )
  }

  const authInfo: txtypes.AuthInfo = {
    signer_infos: signerInfos,
    fee: {
      amount: [{ denom: 'lux', amount: '2000000000000000' }],
      gas_limit: '0',
      payer: '',
      granter: ''
    },
    tip: undefined
  }

  // simulate tx to estimate gas
  let simulateSigs = []
  for (let i = 0; i < wallets.length; i++) {
    simulateSigs.push(new Uint8Array())
  }

  let txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: simulateSigs
  }

  const simulateReq: txservice.SimulateRequest = {
    tx: undefined,
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish()
  }
  // TODO: handle error properly, this is for demo purpose
  let simResp = await txClient.Simulate(simulateReq)
  let estGas = Math.round(parseInt(simResp.gas_info.gas_used) * 1.5)

  // tweak the gas and fee
  authInfo.fee.gas_limit = estGas.toString()
  authInfo.fee.amount[0].amount = new BigNumber(estGas)
    .multipliedBy(new BigNumber(defaultGasPrice))
    .toString()

  // build tx
  let sigs = []
  for (let i = 0; i < wallets.length; i++) {
    let signDoc: txtypes.SignDoc = {
      body_bytes: txtypes.TxBody.encode(txBody).finish(),
      auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
      chain_id: 'flux-1',
      account_number: senderAccNums[i].toString()
    }

    const signBytes = txtypes.SignDoc.encode(signDoc).finish()

    const msgHash = Buffer.from(keccak256(signBytes))
    const senderSign = ethutil.ecsign(msgHash, Buffer.from(wallets[i].getPrivateKey()))
    const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s]))
    sigs.push(senderCosmosSig)
  }

  txRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: sigs
  }

  const broadcastReq: txservice.BroadcastTxRequest = {
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
    mode: txservice.BroadcastMode.BROADCAST_MODE_SYNC
  }

  let resp = await txClient.BroadcastTx(broadcastReq)
  if (resp.tx_response.code != 0) {
    throw `tx error, code: ${resp.tx_response.code}, log: ${resp.tx_response.raw_log}`
  }

  let txHash = resp.tx_response.txhash
  return await checkTxWithRetry(txClient, txHash)
}

async function linkSvmAccount(
  txClient: txservice.Service,
  authClient: authservice.Query,
  svmClient: svmservice.Query,
  wallet: ethwallet.Wallet,
  svmKeypair: web3.Keypair,
  luxAmount: BigNumber
): Promise<web3.PublicKey> {
  const cosmosAddress = getWalletAddr(wallet)
  let accountLink: svmservice.AccountLinkResponse
  try {
    accountLink = await getSvmAccountLink(svmClient, cosmosAddress)
  } catch (e: any) {
    if (!e.toString().includes('account link not found')) {
      throw e
    }
  }

  // fetch sender acc info
  const senderInfo = await authClient.AccountInfo({ address: getWalletAddr(wallet) })

  if (!accountLink) {
    // sign and link account, actual private key is only
    let keypair = new Ed25519Keypair(
      Buffer.from(svmKeypair.secretKey.buffer.slice(0, 32)),
      svmKeypair.publicKey.toBuffer()
    )
    let linkSig = await Ed25519.createSignature(wallet.getAddress(), keypair)

    let msg = svmtx.MsgLinkSVMAccount.create({
      sender: getWalletAddr(wallet),
      svm_pubkey: svmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: luxAmount.toString()
      })
    })

    await broadcastMsgsSync(
      txClient,
      [parseInt(senderInfo.info.account_number)],
      [parseInt(senderInfo.info.sequence)],
      [svmtx.MsgLinkSVMAccount],
      [msg],
      [wallet]
    )
    return new web3.PublicKey(keypair.pubkey)
  }

  return new web3.PublicKey(accountLink.link.svm_addr)
}

;async () => {
  const cc = new txservice.GrpcWebImpl('http://localhost:10337', {
    transport: NodeHttpTransport()
  })
  const txClient = new txservice.ServiceClientImpl(cc)
  const authClient = new authservice.QueryClientImpl(cc)
  const svmClient = new svmservice.QueryClientImpl(cc)

  const ownerCosmosWallet = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')
    )
  )
  const ownerAddr = bech32.encode('lux', bech32.toWords(ownerCosmosWallet.getAddress()))
  let ownerInfo = await authClient.AccountInfo({ address: ownerAddr })
  let ownerAccNum = parseInt(ownerInfo.info!.account_number!)
  let ownerAccSeq = parseInt(ownerInfo.info!.sequence!)

  let programCosmosWallet = ethwallet.Wallet.generate()
  let programBufferCosmosWallet = ethwallet.Wallet.generate()
  const ownerSvmKeypair = web3.Keypair.generate()

  // do a send message to create cosmos accounts
  let sendMsg = banktypes.MsgMultiSend.create({
    inputs: [
      {
        address: getWalletAddr(ownerCosmosWallet),
        coins: [
          {
            denom: 'lux',
            amount: '2000000000000000000'
          }
        ]
      }
    ],
    outputs: [
      {
        address: getWalletAddr(programCosmosWallet),
        coins: [
          {
            denom: 'lux',
            amount: '1000000000000000000'
          }
        ]
      },
      {
        address: getWalletAddr(programBufferCosmosWallet),
        coins: [
          {
            denom: 'lux',
            amount: '1000000000000000000'
          }
        ]
      }
    ]
  })

  let sendMsgResp = await broadcastMsgsSync(
    txClient,
    [ownerAccNum],
    [ownerAccSeq],
    [banktypes.MsgMultiSend],
    [sendMsg],
    [ownerCosmosWallet]
  )
  console.log('send lux to create account:', sendMsgResp)

  // Generate and link the Program SVM account (no lamports needed)
  console.log('=== linking uploader svm program to cosmos addr ===')
  let ownerPubkey = await linkSvmAccount(
    txClient,
    authClient,
    svmClient,
    ownerCosmosWallet,
    ownerSvmKeypair,
    new BigNumber(1000000000000)
  )

  console.log('=== linking program keypair to cosmos addr ===')
  const programSvmKeypair = web3.Keypair.generate()
  const programCosmosAddr = getWalletAddr(programCosmosWallet)
  let programPubkey = await linkSvmAccount(
    txClient,
    authClient,
    svmClient,
    programCosmosWallet,
    programSvmKeypair,
    new BigNumber(0)
  )

  // Generate and link the Program Buffer SVM account (no lamports needed)
  console.log('=== linking program buffer keypair to cosmos addr ===')
  const programBufferSvmKeypair = web3.Keypair.generate()
  const programBufferCosmosAddr = getWalletAddr(programBufferCosmosWallet)
  let programBufferPubkey = await linkSvmAccount(
    txClient,
    authClient,
    svmClient,
    programBufferCosmosWallet,
    programBufferSvmKeypair,
    new BigNumber(0)
  )

  console.log('=== start uploading program ===')
  const systemPubkey = new web3.PublicKey('11111111111111111111111111111111')
  const upgradableLoaderPubkey = new web3.PublicKey('BPFLoaderUpgradeab1e11111111111111111111111')
  const sysvarClockPubkey = new web3.PublicKey('SysvarC1ock11111111111111111111111111111111')
  const sysvarRentPubkey = new web3.PublicKey('SysvarRent111111111111111111111111111111111')
  const programBinary = fs.readFileSync('example.so')
  let createProgramIx = web3.SystemProgram.createAccount({
    fromPubkey: ownerPubkey,
    newAccountPubkey: programPubkey,
    lamports: getRentExemptLamportAmount(36),
    space: 36,
    programId: upgradableLoaderPubkey
  })

  let createBufferAccountTx = web3.SystemProgram.createAccount({
    fromPubkey: ownerPubkey,
    newAccountPubkey: programBufferPubkey,
    lamports: getRentExemptLamportAmount(programBinary.length + 48),
    space: programBinary.length + 48,
    programId: upgradableLoaderPubkey
  })

  let initBufferIx = new web3.TransactionInstruction({
    programId: upgradableLoaderPubkey,
    keys: [
      {
        pubkey: programBufferPubkey,
        isSigner: true,
        isWritable: true
      },
      {
        pubkey: ownerPubkey,
        isSigner: true,
        isWritable: true
      }
    ],
    data: encodeData(UPGRADABLE_LOADER_LAYOUTS.InitializeBuffer, {})
  })

  let initAccountsTx = new web3.Transaction()
    .add(createProgramIx)
    .add(createBufferAccountTx)
    .add(initBufferIx)
  initAccountsTx.feePayer = ownerPubkey

  const createAccountsTx = toFluxSvmTransaction(
    [ownerAddr, programCosmosAddr, programBufferCosmosAddr],
    initAccountsTx,
    1000000
  )

  // refresh addrs' sequences
  let ownerAccInfo = await authClient.AccountInfo({ address: ownerAddr })
  let programAccInfo = await authClient.AccountInfo({ address: programCosmosAddr })
  let programBufferAccInfo = await authClient.AccountInfo({ address: programBufferCosmosAddr })
  let createAccountsTxsResult = await broadcastMsgsSync(
    txClient,
    [
      parseInt(ownerAccInfo.info.account_number),
      parseInt(programAccInfo.info.account_number),
      parseInt(programBufferAccInfo.info.account_number)
    ],
    [
      parseInt(ownerAccInfo.info.sequence),
      parseInt(programAccInfo.info.sequence),
      parseInt(programBufferAccInfo.info.sequence)
    ],
    [svmtx.MsgTransaction],
    [createAccountsTx],
    [ownerCosmosWallet, programCosmosWallet, programBufferCosmosWallet]
  )
  if (createAccountsTxsResult.tx_response.code != 0) {
    throw `upload err code: ${createAccountsTxsResult.tx_response.code}, log: ${createAccountsTxsResult.tx_response.raw_log}`
  }

  const chunkSize = 1200
  let solUploadTransaction = new web3.Transaction()
  for (let i = 0; i < programBinary.length; i += chunkSize) {
    let next = i + chunkSize
    if (next > programBinary.length) {
      next = programBinary.length
    }

    let slice = programBinary.subarray(i, next)
    let offset = i
    let data = encodeData(UPGRADABLE_LOADER_LAYOUTS.Write, {
      offset: offset,
      data: slice
    })

    let uploadIx = new web3.TransactionInstruction({
      programId: upgradableLoaderPubkey,
      keys: [
        {
          pubkey: programBufferPubkey,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: ownerPubkey,
          isSigner: true,
          isWritable: true
        }
      ],
      data: data
    })

    solUploadTransaction = solUploadTransaction.add(uploadIx)
  }

  let programExecutableDataPubkey = web3.PublicKey.findProgramAddressSync(
    [programPubkey.toBuffer()],
    upgradableLoaderPubkey
  )[0]
  let finalizeIx = new web3.TransactionInstruction({
    programId: upgradableLoaderPubkey,
    keys: [
      {
        pubkey: ownerPubkey,
        isWritable: true,
        isSigner: true
      },
      {
        pubkey: programExecutableDataPubkey,
        isWritable: true,
        isSigner: false
      },
      {
        pubkey: programPubkey,
        isWritable: true,
        isSigner: false
      },
      {
        pubkey: programBufferPubkey,
        isWritable: true,
        isSigner: false
      },
      {
        pubkey: sysvarRentPubkey,
        isWritable: false,
        isSigner: false
      },
      {
        pubkey: sysvarClockPubkey,
        isWritable: false,
        isSigner: false
      },
      {
        pubkey: systemPubkey,
        isWritable: false,
        isSigner: false
      },
      {
        pubkey: ownerPubkey,
        isWritable: true,
        isSigner: true
      }
    ],
    data: encodeData(UPGRADABLE_LOADER_LAYOUTS.DeployWithMaxDataLen, {
      maxLen: programBinary.length + 48
    })
  })

  solUploadTransaction.add(finalizeIx)
  solUploadTransaction.feePayer = ownerPubkey

  let uploadProgramTx = toFluxSvmTransaction(
    [ownerAddr, programCosmosAddr, programBufferCosmosAddr],
    solUploadTransaction,
    1000000
  )

  let uploadTxResult = await broadcastMsgsSync(
    txClient,
    [
      parseInt(ownerAccInfo.info.account_number),
      parseInt(programAccInfo.info.account_number),
      parseInt(programBufferAccInfo.info.account_number)
    ],
    [
      parseInt(ownerAccInfo.info.sequence) + 1,
      parseInt(programAccInfo.info.sequence) + 1,
      parseInt(programBufferAccInfo.info.sequence) + 1
    ],
    [svmtx.MsgTransaction],
    [uploadProgramTx],
    [ownerCosmosWallet, programCosmosWallet, programBufferCosmosWallet]
  )

  console.log(
    `✅ program uploaded. pubkey: ${programPubkey.toBase58()}, linked cosmos key: ${getWalletAddr(
      programBufferCosmosWallet
    )}`
  )
  if (uploadTxResult.tx_response.code != 0) {
    throw `upload err code: ${uploadTxResult.tx_response.code}, log: ${uploadTxResult.tx_response.raw_log}`
  }

  console.log(
    `tx: ${uploadTxResult.tx_response.txhash} (height: ${uploadTxResult.tx_response.height}). Gas used / want: ${uploadTxResult.tx_response.gas_used}/${uploadTxResult.tx_response.gas_wanted}`
  )
}
