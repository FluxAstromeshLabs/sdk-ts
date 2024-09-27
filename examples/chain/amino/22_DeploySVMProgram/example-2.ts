import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { getMessage } from 'eip-712';
import { bech32 } from 'bech32'
import * as fs from 'node:fs'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

import * as anytypes from '../../../../chain/google/protobuf/any'
import * as chaintypes from '../../../../chain/flux/types/v1beta1/tx_ext'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as authservice from '../../../../chain/cosmos/auth/v1beta1/query'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as codectypemap from '../../../../chain/codec_type_map.json'
import * as ethcrypto from 'eth-crypto';
import * as banktypes from '../../../../chain/cosmos/bank/v1beta1/tx'

import * as web3 from '@solana/web3.js'
import { getEIP712SignBytes } from '../../../../eip712/eip712'
import { encodeData, UPGRADABLE_LOADER_LAYOUTS, toFluxSvmTransaction, BigNumber } from '../../../../packages/utils'
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin';
import { Ed25519, Ed25519Keypair } from '@cosmjs/crypto';

async function getSvmAccountLink(svmClient: svmservice.Query, cosmosAddr: string): Promise<svmservice.AccountLinkResponse> {
  return svmClient.AccountLink({
    address: cosmosAddr,
  })
}

async function broadcastMsgs(
  txClient: txservice.Service,
  senderAccNum: [number],
  senderAccSeq: [number],
  msgTypes: [any],
  msgs: [any], 
  wallets: [ethwallet.Wallet],
) {
  let msgAnys = []
  for(let i=0; i<msgs.length; i++) {
    const msgAny: anytypes.Any = {
      type_url: `/${msgTypes[i].$type}`,
      value: msgTypes[i].encode(msgs[i]).finish(),
    }
  
    msgAnys.push(msgAny)
  }

  let msgJsons = []
  for(let i=0; i<msgs.length; i++) {
    const msgJSON = {
      type: codectypemap[`/${msgTypes[i].$type}`],
      value: msgTypes[i].toJSON(msgs[i])
    }

    msgJsons.push(msgJSON)
  }

  const txBody: txtypes.TxBody = {
    messages: msgAnys,
    memo: '',
    timeout_height: '119000',
    extension_options: [],
    non_critical_extension_options: []
  }

  let signerInfos: [txtypes.SignerInfo]
  for(let i=0; i<wallets.length; i++) {
    const senderXPubkey = ethcrypto.publicKey.compress(
      Buffer.from(wallets[i].getPublicKey()).toString('hex'),
    )
    const senderPubkey: ethsecp256k1.PubKey = {key: Buffer.from(senderXPubkey, 'hex')}
    const senderPubkeyAny: anytypes.Any = {
      type_url: '/' + ethsecp256k1.PubKey.$type,
      value: ethsecp256k1.PubKey.encode(senderPubkey).finish()
    }

    signerInfos.push(txtypes.SignerInfo.create({
      public_key: senderPubkeyAny,
      mode_info: {
        single: {
          mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
        },
      },
      sequence: senderAccSeq.toString(),
    }))
  }

  const authInfo: txtypes.AuthInfo = {
    signer_infos: signerInfos,
    fee: {
      amount: [
        {denom: 'lux', amount: '100000000000000'}
      ],
      gas_limit: '4000000',
      payer: '',
      granter: ''
    },
    tip: undefined,
  }

  let signDoc: txtypes.SignDoc = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    chain_id: 'flux-1',
    account_number: senderAccNum.toString(),
  }

  let eip712SignDoc = getEIP712SignBytes(signDoc, msgJsons, '')
  const msgHash = Buffer.from(getMessage(eip712SignDoc, true, {verifyDomain: false}))

  let sigs = []
  for(let i=0; i<wallets.length; i++) {
    const senderSign = ethutil.ecsign(msgHash, Buffer.from(wallets[i].getPrivateKey()))
    const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])]))
    sigs.push(senderCosmosSig)
  }
  
  const extOpts: chaintypes.ExtensionOptionsWeb3Tx = {
    typedDataChainID: '1',
    feePayer:         '',
    feePayerSig:      Uint8Array.from([]),
  }
  const extOptsAny: anytypes.Any = {
    type_url: '/' + chaintypes.ExtensionOptionsWeb3Tx.$type,
    value: chaintypes.ExtensionOptionsWeb3Tx.encode(extOpts).finish()
  }
  txBody.extension_options = [extOptsAny]

  const txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: sigs,
  }

  const broadcastReq: txservice.BroadcastTxRequest = {
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
    mode: txservice.BroadcastMode.BROADCAST_MODE_SYNC,
  }
  
  return await txClient.BroadcastTx(broadcastReq)
}

function getWalletAddr(wallet: ethwallet.Wallet) {
  return bech32.encode('lux', bech32.toWords(wallet.getAddress()))
}

async function linkSvmAccount(
  txClient: txservice.Service,
  authClient: authservice.Query,
  svmClient: svmservice.Query, 
  wallet: ethwallet.Wallet,
  svmKeypair: web3.Keypair, 
  luxAmount: BigNumber,
) {
  const cosmosAddress = getWalletAddr(wallet)
  let accountLink: svmservice.AccountLinkResponse
  try {
    accountLink = await getSvmAccountLink(svmClient, cosmosAddress)
  } catch(e: any) {
    if (!e.toString().includes("not exist")) {
      throw e
    }
  }

  // fetch sender acc info
  const senderInfo = await authClient.AccountInfo({address: getWalletAddr(wallet)})

  // sign and link account
  let keypair = (new Ed25519Keypair(svmKeypair.secretKey, svmKeypair.publicKey.toBuffer()))
  let linkSig = await Ed25519.createSignature(wallet.getPublicKey(), keypair) 

  if (!accountLink) {
    let msg = svmtx.MsgLinkSVMAccount.create({
      sender: getWalletAddr(wallet),
      svm_pubkey: svmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: luxAmount.toString(),
      })
    })

    await broadcastMsgs(
      txClient, 
      [parseInt(senderInfo.info.account_number)], 
      [parseInt(senderInfo.info.sequence)],
      [svmtx.MsgLinkSVMAccount],
      [msg],
      [wallet]
    )

    return keypair.pubkey
  }

  return accountLink.link.svm_addr
}


(async () => {
  const cc = new txservice.GrpcWebImpl('http://localhost:10337', {
    transport: NodeHttpTransport(),
  })
  const txClient = new txservice.ServiceClientImpl(cc)
  const authClient = new authservice.QueryClientImpl(cc)
  const svmClient = new svmservice.QueryClientImpl(cc)

  const ownerCosmosWallet = ethwallet.Wallet.fromPrivateKey(Uint8Array.from(Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')))
  // const senderPrivKey: ethsecp256k1.PrivKey = {key: ownerWallet.getPrivateKey()}
  // const senderXPubkey = ethcrypto.publicKey.compress(Buffer.from(ownerWallet.getPublicKey()).toString('hex'))
  // const senderPubkey: ethsecp256k1.PubKey = {key: Buffer.from(senderXPubkey, 'hex')}
  // const senderPubkeyAny: anytypes.Any = {
  //   type_url: '/' + ethsecp256k1.PubKey.$type,
  //   value: ethsecp256k1.PubKey.encode(senderPubkey).finish()
  // }
  const senderAddr = bech32.encode('lux', bech32.toWords(ownerCosmosWallet.getAddress()))
  const senderInfo = await authClient.AccountInfo({address: senderAddr})
  const senderAccNum = parseInt(senderInfo.info!.account_number!)
  const senderAccSeq = parseInt(senderInfo.info!.sequence!)
  let programCosmosWallet = ethwallet.Wallet.generate()
  let programBufferCosmosWallet = ethwallet.Wallet.generate()
  const ownerSvmKeypair = web3.Keypair.generate()

  // do a send message to create cosmos accounts
  let sendMsg = banktypes.MsgMultiSend.create({
    inputs: [{
      address: getWalletAddr(ownerCosmosWallet),
      coins: [{
        denom: 'lux', amount: '2',
      }]
    }],
    outputs: [
      {
        address: getWalletAddr(programCosmosWallet),
        coins: [{
          denom: 'lux', amount: '1',
        }]
      },
      {
        address: getWalletAddr(programBufferCosmosWallet),
        coins: [{
          denom: 'lux', amount: '1',
        }]
      }
    ]
  })

  let sendMsgResp = await broadcastMsgs(txClient, [senderAccNum], [senderAccSeq], [banktypes.MsgMultiSend], [sendMsg], [ownerCosmosWallet])
  console.log('send lux to create account:', sendMsgResp)

  let ownerPubkey = await linkSvmAccount(txClient, authClient, svmClient, ownerCosmosWallet, ownerSvmKeypair, new BigNumber(1000000000000))

  // Generate and link the Program SVM account (no lamports needed)
  const programSvmKeypair = web3.Keypair.generate();
  let programPubkey = await linkSvmAccount(
    txClient,
    authClient,
    svmClient,
    programCosmosWallet,
    programSvmKeypair,
    new BigNumber(0)
  );

  // Generate and link the Program Buffer SVM account (no lamports needed)
  const programBufferSvmKeypair = web3.Keypair.generate();
  let programBufferPubkey = await linkSvmAccount(
    txClient,
    authClient,
    svmClient,
    programBufferCosmosWallet,
    programBufferSvmKeypair,
    new BigNumber(0)
  );
  
  
  const systemPubkey = new web3.PublicKey("11111111111111111111111111111111")
  const upgradableLoaderPubkey = new web3.PublicKey("BPFLoaderUpgradeab1e11111111111111111111111")
  const sysvarClockPubkey = new web3.PublicKey("SysvarC1ock11111111111111111111111111111111")
  const sysvarRentPubkey = new web3.PublicKey("SysvarRent111111111111111111111111111111111")
  const programInteractor = new web3.PublicKey("CHtHn3aTHBt244rxsjgebLc7qZodMMBGK5vzPKvPPirc")
  const programBinary = fs.readFileSync('example.so')

  const svmPrivKey = new web3.Keypair()
  const linkedAccount = await linkSvmAccount(txClient, wallet, svmPrivKey)


  let createProgramIx = web3.SystemProgram.createAccount({
    fromPubkey: callerPubkey,
    newAccountPubkey: programPubkey,
    lamports: 0,
    space: 36,
    programId: upgradableLoaderPubkey,
  })

  let createInteractorIx = web3.SystemProgram.createAccount({
    fromPubkey: callerPubkey,
    newAccountPubkey: programInteractor,
    lamports: 0,
    space: 4,
    programId: programPubkey,
  })

  let createBufferAccountTx = web3.SystemProgram.createAccount({
    fromPubkey: callerPubkey,
    newAccountPubkey: programBufferPubkey,
    lamports: 0,
    space: programBinary.length + 48,
    programId: upgradableLoaderPubkey,
  })

  let initBufferIx = new web3.TransactionInstruction({
    programId: upgradableLoaderPubkey,
    keys: [
      {
        pubkey: programBufferPubkey,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: callerPubkey,
        isSigner: true,
        isWritable: true,
      },
    ],
    data: encodeData(UPGRADABLE_LOADER_LAYOUTS.InitializeBuffer, {})
  })

  let initAccountsTx = new web3.Transaction()
    .add(createProgramIx)
    .add(createBufferAccountTx)
    .add(createInteractorIx)
    .add(initBufferIx)
  initAccountsTx.feePayer = callerPubkey

  const msgCreateAccounts: svmtx.MsgTransaction = toFluxSvmTransaction(senderAddr, initAccountsTx, 1000000)
  let initAccountsResult = await broadcastSvmTransactionMsg(txClient, senderPubkeyAny, senderAccNum, senderAccSeq, msgCreateAccounts, senderPrivKey)
  
  const chunkSize = 1200
  let solUploadTransaction = new web3.Transaction()
  for(let i = 0; i < programBinary.length; i += chunkSize) {
    let next = i + chunkSize
    if (next > programBinary.length) {
      next = programBinary.length
    }

    let slice = programBinary.subarray(i, next)
    let offset = i
    let data = encodeData(UPGRADABLE_LOADER_LAYOUTS.Write, {
      offset: offset,
      data: slice,
    })

    let uploadIx = new web3.TransactionInstruction({
      programId: upgradableLoaderPubkey,
      keys: [
        {
          pubkey: programBufferPubkey,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: callerPubkey,
          isSigner: true,
          isWritable: true,
        },
      ],
      data: data,
    })

    solUploadTransaction = solUploadTransaction.add(uploadIx)
  }

  let finalizeIx = new web3.TransactionInstruction({
    programId: upgradableLoaderPubkey,
    keys: [
      {
        pubkey:  callerPubkey,
        isWritable: true,
        isSigner:   true,
      },
      {
        pubkey:  programDataPubkey,
        isWritable: true,
        isSigner:   false,
      },
      {
        pubkey:  programPubkey,
        isWritable: true,
        isSigner:   false,
      },
      {
        pubkey:  programBufferPubkey,
        isWritable: true,
        isSigner:   false,
      },
      {
        pubkey:  sysvarRentPubkey,
        isWritable: false,
        isSigner:   false,
      },
      {
        pubkey:  sysvarClockPubkey,
        isWritable: false,
        isSigner:   false,
      },
      {
        pubkey:  systemPubkey,
        isWritable: false,
        isSigner:   false,
      },
      {
        pubkey:  callerPubkey,
        isWritable: true,
        isSigner:   true,
      },
    ],
    data: encodeData(UPGRADABLE_LOADER_LAYOUTS.DeployWithMaxDataLen, {
      maxLen: programBinary.length + 48,
    })
  })

  solUploadTransaction.add(finalizeIx)
  solUploadTransaction.feePayer = callerPubkey

  let fluxUploadTx = toFluxSvmTransaction(senderAddr, solUploadTransaction, 1000000)
  let uploadResult = await broadcastSvmTransactionMsg(txClient, senderPubkeyAny, senderAccNum, senderAccSeq + 1, fluxUploadTx, senderPrivKey)
  
  let executeIx = new web3.TransactionInstruction({
    programId: programPubkey,
    keys: [
      {
        pubkey:  programInteractor,
        isWritable: true,
        isSigner:   true,
      },
      {
        pubkey:  programDataPubkey,
        isWritable: false,
        isSigner:   false,
      },
    ],
    data: Buffer.from([0]),
  })

  let executeTransaction = new web3.Transaction().add(executeIx)
  executeTransaction.feePayer = programInteractor

  let fluxExecuteTx = toFluxSvmTransaction(senderAddr, executeTransaction, 1000000)
  let executeResult = await broadcastSvmTransactionMsg(txClient, senderPubkeyAny, senderAccNum, senderAccSeq + 2, fluxExecuteTx, senderPrivKey)
})()
