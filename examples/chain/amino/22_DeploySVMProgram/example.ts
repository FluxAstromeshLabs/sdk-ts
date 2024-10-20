import * as ethwallet from '@ethereumjs/wallet'
import { bech32 } from 'bech32'
import * as fs from 'node:fs'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as authservice from '../../../../chain/cosmos/auth/v1beta1/query'
import * as banktypes from '../../../../chain/cosmos/bank/v1beta1/tx'
import { AstromeshClient } from '../../../../packages'
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
  msgTypes: any[],
  msgs: any[],
  wallets: ethwallet.Wallet[]
) {
  let resp = await AstromeshClient.broadcastMsg(msgs, msgTypes, wallets)
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
  if (!accountLink) {
    // sign and link account, actual private key is only
    let keypair = new Ed25519Keypair(
      Buffer.from(svmKeypair.secretKey.buffer.slice(0, 32)),
      svmKeypair.publicKey.toBuffer()
    )
    let linkSig = await Ed25519.createSignature(Buffer.from(getWalletAddr(wallet)), keypair)

    let msg = svmtx.MsgLinkSVMAccount.create({
      sender: getWalletAddr(wallet),
      svm_pubkey: svmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: luxAmount.toString()
      })
    })

    await broadcastMsgsSync(txClient, [svmtx.MsgLinkSVMAccount], [msg], [wallet])
    return new web3.PublicKey(keypair.pubkey)
  }

  return new web3.PublicKey(accountLink.link.svm_addr)
}

;(async () => {
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
  // const a = await AstromeshClient.broadcastMsg(
  //   [sendMsg],
  //   [banktypes.MsgMultiSend],
  //   [ownerCosmosWallet]
  // )
  // console.log('broadcastMsg', a)
  await broadcastMsgsSync(txClient, [banktypes.MsgMultiSend], [sendMsg], [ownerCosmosWallet])
  console.log('send lux to create account:')
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

  let createAccountsTxsResult = await broadcastMsgsSync(
    txClient,
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
})()
