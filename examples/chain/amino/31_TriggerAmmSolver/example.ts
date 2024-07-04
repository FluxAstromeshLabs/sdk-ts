import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { getMessage } from 'eip-712'
import { bech32 } from 'bech32'
import * as anytypes from '../../../../chain/google/protobuf/any'
import * as chaintypes from '../../../../chain/flux/types/v1beta1/tx_ext'
import * as strategytypes from '../../../../chain/flux/strategy/v1beta1/tx'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as codectypemap from '../../../../chain/codec_type_map.json'
import * as ethcrypto from 'eth-crypto'
import { ChainGrpcClient } from '../../../../packages/client/chain/ChainGrpcClient'
import { getEIP712SignBytes } from '../../../../eip712/eip712'
import { ChainGrpcTxService, getSvmAddressFromLux, simulate, toFluxSvmTransaction } from '../../../../packages'
import { Plane, TxAction } from '../../../../chain/flux/astromesh/v1beta1/tx'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as astromeshquery from '../../../../chain/flux/astromesh/v1beta1/query'
import * as astromeshtypes from '../../../../chain/flux/astromesh/v1beta1/tx'
import * as web3 from '@solana/web3.js'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin'

async function broadcastMsg(
  txClient: ChainGrpcTxService,
  senderPubkeyAny: anytypes.Any,
  senderAccNum: number,
  senderAccSeq: number,
  gasLimit: number,
  msgType: any,
  msg: any,
  senderPrivKey: any,
) {
  const msgAny: anytypes.Any = {
    type_url: `/${msgType.$type}`,
    value: msgType.encode(msg).finish(),
  }
  
  const msgJSON = {
    type: codectypemap[`/${msgType.$type}`],
    value: msgType.toJSON(msg)
  }

  // prep tx data
  const txBody: txtypes.TxBody = {
    messages: [msgAny],
    memo: '',
    timeout_height: '119000',
    extension_options: [],
    non_critical_extension_options: []
  }

  const authInfo: txtypes.AuthInfo = {
    signer_infos: [
      {
        public_key: senderPubkeyAny,
        mode_info: {
          single: {
            mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
          },
        },
        sequence: senderAccSeq.toString(),
      },
    ],
    fee: {
      amount: [
        {denom: 'lux', amount: '100000000000000'}
      ],
      gas_limit: gasLimit.toString(),
      payer: '',
      granter: ''
    },
    tip: undefined,
  }

  // get signatures
  let signDoc: txtypes.SignDoc = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    chain_id: 'flux-1',
    account_number: senderAccNum.toString(),
  }

  let eip712SignDoc = getEIP712SignBytes(signDoc, [msgJSON], '')
  const msgHash = Buffer.from(getMessage(eip712SignDoc, true, {verifyDomain: false}))
  
  const senderSign = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
  const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])]))

  // broadcast tx
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
    signatures: [senderCosmosSig],
  }
  
  return await txClient.broadcastTx(
    txtypes.TxRaw.encode(txRaw).finish(), 
    txservice.BroadcastMode.BROADCAST_MODE_SYNC
  )
}

const main = async () => {
  const chainGrpcClient = new ChainGrpcClient('http://localhost:10337')
  const txClient = chainGrpcClient.transaction
  const authClient = chainGrpcClient.auth
  const svmClient = chainGrpcClient.svm

  // init accounts
  const wallet = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('741de4f8988ea941d3ff0287911ca4074e62b7d45c991a51186455366f10b544', 'hex')
    )
  )
  const senderPrivKey: ethsecp256k1.PrivKey = { key: wallet.getPrivateKey() }
  const senderXPubkey = ethcrypto.publicKey.compress(
    Buffer.from(wallet.getPublicKey()).toString('hex')
  )
  const senderPubkey: ethsecp256k1.PubKey = { key: Buffer.from(senderXPubkey, 'hex') }
  const senderPubkeyAny: anytypes.Any = {
    type_url: '/' + ethsecp256k1.PubKey.$type,
    value: ethsecp256k1.PubKey.encode(senderPubkey).finish()
  }

  const senderAddr = bech32.encode('lux', bech32.toWords(wallet.getAddress()))
  // fetch account num, seq
  const senderInfo = await authClient.getAccount(senderAddr)
  let senderAccNum = parseInt(senderInfo.info!.account_number!)
  let senderAccSeq = parseInt(senderInfo.info!.sequence!)
  
  console.log('sender addr:', senderAddr)
  let senderSvmAccount = getSvmAddressFromLux(senderAddr)
  let needCreateAccount = false
  try {
    console.log(`checking if ${senderSvmAccount.toBase58()} is created or not...`)
    let res = await svmClient.account({address: senderSvmAccount.toString()})
    console.log("sender svm account created!")
  } catch(e) {
    if (!e.toString().includes("Account not existed")) {
      throw e
    }
    needCreateAccount = true
  }

  // create account 
  if (needCreateAccount) {
    console.log("creating sender svm account...")
  
    let ix = web3.SystemProgram.createAccount({
      fromPubkey: senderSvmAccount,
      newAccountPubkey: senderSvmAccount,
      lamports: 0,
      space: 0,
      programId: web3.SystemProgram.programId,
    })
    
    let initAccountsTx = new web3.Transaction().add(ix)
    initAccountsTx.feePayer = senderSvmAccount

    const msgCreateAcc: svmtx.MsgTransaction = toFluxSvmTransaction(senderAddr, initAccountsTx, 1000000)

    await broadcastMsg(
      txClient, 
      senderPubkeyAny, 
      senderAccNum, 
      senderAccSeq, 
      1000000, svmtx.MsgTransaction, 
      msgCreateAcc, 
      senderPrivKey
    )

    senderAccSeq++
  }

  let arbitrageAmount = '100000000'
  // transfer to svm
  let transferSvmMsg = astromeshtypes.MsgAstroTransfer.create({
    sender: senderAddr,
    receiver: senderAddr,
    src_plane: Plane.COSMOS,
    dst_plane: Plane.SVM,
    coin: {
      amount: arbitrageAmount,
      denom: 'usdt',
    }
  })

  let transferSvmRes = await broadcastMsg(
    txClient, 
    senderPubkeyAny, 
    senderAccNum, 
    senderAccSeq, 
    8000000, 
    astromeshtypes.MsgAstroTransfer, 
    transferSvmMsg,
    senderPrivKey
  )
  console.log('transfer svm tx broadcast result:', transferSvmRes)
  senderAccSeq++
  
  const msg: strategytypes.MsgTriggerStrategies = {
    sender: senderAddr,
    ids: ['C707C128D260C536701D4A843A5194B66BDCB40A7D602445680AF2A53FDC70DF'],
    inputs: [
      Uint8Array.from(Buffer.from(`{"arbitrage":{"pair":"eth-usdt","amount":"${arbitrageAmount}","min_profit":"500000"}}`))
    ],
    queries: [
      astromeshquery.FISQueryRequest.create({
          instructions: [{
          plane: Plane.WASM,
          action: astromeshquery.QueryAction.VM_QUERY,
          address: Buffer.from(bech32.fromWords(bech32.decode('lux1aakfpghcanxtc45gpqlx8j3rq0zcpyf49qmhm9mdjrfx036h4z5sdltq0m').words)), 
          input: [
            Uint8Array.from(Buffer.from('{"pool":{}}')),
          ],
        },
        {
          plane: Plane.SVM,
          action: astromeshquery.QueryAction.VM_QUERY,
          address: new Uint8Array(),
          input: [
            new web3.PublicKey('CP9w46ipnMBBQP2Nqg8DceobmnTFeb9Pri5W2RX1CiSV').toBytes(),
            new web3.PublicKey('DCJQyrGYeHWocMxpBBWCSJEgtMFZXgwMuXxZnkrHtuvW').toBytes(),
            new web3.PublicKey('GASMVGvEguNjicG1UhaTiYDPib4geFQBXjtbqAG1HPLH').toBytes(),
          ],
        }],
      }),
    ],
  }

  const msgAny: anytypes.Any = {
    type_url: `/${strategytypes.MsgTriggerStrategies.$type}`,
    value: strategytypes.MsgTriggerStrategies.encode(msg).finish()
  }
  const msgJSON = {
    type: codectypemap[`/${strategytypes.MsgTriggerStrategies.$type}`],
    value: strategytypes.MsgTriggerStrategies.toJSON(msg)
  }

  // prep tx data
  const txBody: txtypes.TxBody = {
    messages: [msgAny],
    memo: 'abc',
    timeout_height: '119000',
    extension_options: [],
    non_critical_extension_options: []
  }

  // Simulate to estimate gas
  let simulateRes = await simulate(txClient, txBody, [senderAccSeq.toString()])
  let gasLimit = Math.ceil(Number(simulateRes?.gas_info?.gas_used) * 2.0)

  try {
    let broadcastRes = await broadcastMsg(
      txClient, 
      senderPubkeyAny, 
      senderAccNum, 
      senderAccSeq, 
      gasLimit, 
      strategytypes.MsgTriggerStrategies, 
      msg, 
      senderPrivKey
    )

    console.log('broadcast response:', broadcastRes)
  } catch(e) {
    console.log('broadcast error:', e)
  }
}

main()
