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
import {
  BigNumber,
  ChainGrpcSVMQuery,
  ChainGrpcTxService,
  getSvmAddressFromLux,
  simulate,
  toFluxSvmTransaction
} from '../../../../packages'
import { Plane, TxAction } from '../../../../chain/flux/astromesh/v1beta1/tx'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as astromeshquery from '../../../../chain/flux/astromesh/v1beta1/query'
import * as astromeshtypes from '../../../../chain/flux/astromesh/v1beta1/tx'
import * as web3 from '@solana/web3.js'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import keccak256 from 'keccak256'
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query';
import { Ed25519, Ed25519Keypair } from '@cosmjs/crypto'
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin'

async function broadcastMsg(
  txClient: ChainGrpcTxService,
  senderPubkeyAny: anytypes.Any,
  senderAccNum: number,
  senderAccSeq: number,
  gasLimit: number,
  msgType: any,
  msg: any,
  senderPrivKey: any
) {
  const msgAny: anytypes.Any = {
    type_url: `/${msgType.$type}`,
    value: msgType.encode(msg).finish()
  }
  const key = '/' + msgType.$type
  const msgJSON = {
    // @ts-ignore
    type: codectypemap[key],
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
            mode: signingtypes.SignMode.SIGN_MODE_DIRECT, // TODO: Revert to SignMode legacy json once EIP712 issues fixed
          }
        },
        sequence: senderAccSeq.toString()
      }
    ],
    fee: {
      amount: [{ denom: 'lux', amount: (new BigNumber(gasLimit)).multipliedBy(500_000_000).toString() }],
      gas_limit: gasLimit.toString(),
      payer: '',
      granter: ''
    },
    tip: undefined
  }

  // get signatures
  let signDoc: txtypes.SignDoc = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    chain_id: 'flux-1',
    account_number: senderAccNum.toString()
  }

  const signBytes = txtypes.SignDoc.encode(signDoc).finish()
  const msgHash = Buffer.from(keccak256(Buffer.from(signBytes)))
  const senderSign = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
  const senderCosmosSig = Uint8Array.from(
    Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])])
  )

  // broadcast tx
  const txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: [senderCosmosSig]
  }

  return await txClient.broadcastTx(
    txtypes.TxRaw.encode(txRaw).finish(),
    txservice.BroadcastMode.BROADCAST_MODE_SYNC
  )
}

async function getSvmAccountLink(svmClient: ChainGrpcSVMQuery, cosmosAddr: string): Promise<svmservice.AccountLinkResponse | undefined> {
  try {
    return await svmClient.getAccountLink(cosmosAddr);
  } catch (e: any) {
    if (e.toString().includes("account link not found")) {
      return undefined;
    }
    throw e;
  }
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
  const senderInfo = await authClient.getAccount(senderAddr)
  let senderAccNum = parseInt(senderInfo.info!.account_number!)
  let senderAccSeq = parseInt(senderInfo.info!.sequence!)

  let accountLink = await getSvmAccountLink(svmClient, senderAddr);
  if (!accountLink) {
    const senderSvmKeypair = web3.Keypair.generate();
    let keypair = new Ed25519Keypair(Buffer.from(senderSvmKeypair.secretKey.buffer.slice(0, 32)), senderSvmKeypair.publicKey.toBuffer());
    let linkSig = await Ed25519.createSignature(wallet.getAddress(), keypair);

    let msg = svmtx.MsgLinkSVMAccount.create({
      sender: senderAddr,
      svm_pubkey: senderSvmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: '1000000000000', // Example amount
      }),
    });

    let linkRes = await broadcastMsg(
      txClient,
      senderPubkeyAny,
      senderAccNum,
      senderAccSeq,
      1000_000,
      astromeshtypes.MsgAstroTransfer,
      msg,
      senderPrivKey
    )
    console.log('link account:', linkRes)
    senderAccSeq++
  }

  let swapDenom = 'eth'
  let transferAmount = '10000000' // 0.1 BTC
  // transfer to evm
  let transferEvmMsg = astromeshtypes.MsgAstroTransfer.create({
    sender: senderAddr,
    receiver: senderAddr,
    src_plane: Plane.COSMOS,
    dst_plane: Plane.EVM,
    coin: {
      amount: transferAmount,
      denom: swapDenom,
    }
  })

  let transferRes = await broadcastMsg(
    txClient,
    senderPubkeyAny,
    senderAccNum,
    senderAccSeq,
    8000000,
    astromeshtypes.MsgAstroTransfer,
    transferEvmMsg,
    senderPrivKey
  )
  console.log('transfer EVM tx broadcast result:', transferRes)
  senderAccSeq++

  const msg: strategytypes.MsgTriggerStrategies = {
    sender: senderAddr,
    ids: ['C034A7B709C7656B453E4638026B4C112A2674DE88CFB8CAD9A6874B931B0326'], // Update strategy ID here
    inputs: [
      Uint8Array.from(
        Buffer.from(
          `{"swap":{"dex_name":"evm uniswap","src_denom":"${swapDenom}","dst_denom":"usdt","amount":"100"}}`
        )
      )
    ],
    queries: [
      {
        instructions: [{
          plane: Plane.COSMOS,
          action: astromeshquery.QueryAction.COSMOS_QUERY,
          address: new Uint8Array(),
          input: [
            new Uint8Array(Buffer.from(`/flux/svm/v1beta1/account_link/cosmos/${senderAddr}`)),
          ]
        }]
      }
    ]
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
  } catch (e) {
    console.log('broadcast error:', e)
  }
}

main()
