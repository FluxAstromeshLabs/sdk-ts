import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'

import { keccak256 } from 'ethereum-cryptography/keccak.js'
import * as bech32 from 'bech32'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

import * as anytypes from '../../../chain/google/protobuf/any'
import * as banktypes from '../../../chain/cosmos/bank/v1beta1/tx'
import * as txtypes from '../../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../../chain/cosmos/tx/v1beta1/service'
import * as authservice from '../../../chain/cosmos/auth/v1beta1/query'
import * as secp256k1 from '../../../chain/flux/crypto/v1beta1/ethsecp256k1/keys'
import * as signingtypes from '../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as web3gwtypes from '../../../chain/flux/indexer/web3gw/query'

import { extractEIP712Types } from './eip712';


function hexToBech32(hexBytes: ArrayLike<number>, prefix: string): string {
  const words = bech32.bech32.toWords(hexBytes);
  return bech32.bech32.encode(prefix, words);
}

function compressPublicKey(uncompressedPublicKey: Buffer): Buffer {
  const xCoord = uncompressedPublicKey.slice(0,32);
  const yCoord = uncompressedPublicKey.slice(32,64);
  const yParityByte = yCoord[31] % 2 == 0 ? Buffer.from([2]) : Buffer.from([3])
  return Buffer.concat([yParityByte, xCoord])
}

function getEIP712SignBytes(signDoc: txtypes.SignDoc): any {
  const txBody = txtypes.TxBody.decode(signDoc.body_bytes)
  const authInfo = txtypes.AuthInfo.decode(signDoc.auth_info_bytes)

  // set domain
  const domain = {
    name:              'Flux Web3',
    version:           '1.0.0',
    chainId:           '0x1',
    verifyingContract: 'cosmos',
    salt:              '0',
  }

  // set tx
  const jsonMsgs: unknown[] = []
  for (let msg of txBody.messages) {
    const jsonMsg: unknown = {
      type: msg.type_url,
      value: banktypes.MsgSend.toJSON(banktypes.MsgSend.decode(msg.value))
    }
    jsonMsgs.push(jsonMsg)
  }
  const tx = {
    account_number: signDoc.account_number,
    chain_id: signDoc.chain_id,
    fee: {
      amount: authInfo.fee!.amount,
      gas: authInfo.fee!.gas_limit,
      feePayer: authInfo.fee!.payer
    },
    memo: txBody.memo,
    msgs: jsonMsgs,
    sequence: authInfo.signer_infos[0].sequence,
    timeout_height: txBody.timeout_height,
  }

  const txTypes = extractEIP712Types(tx)

  return JSON.stringify({
    types:       txTypes,
    primaryType: 'Tx',
    domain:      domain,
    message:     tx,
  })
}

const main = async () => {
  // init clients
  const cc = new txservice.GrpcWebImpl('http://localhost:9091', {
    transport: NodeHttpTransport(),
  })
  const txClient = new txservice.ServiceClientImpl(cc)
  const authClient = new authservice.QueryClientImpl(cc)

  const web3gwCC = new web3gwtypes.GrpcWebImpl('http://localhost:4445', {
    transport: NodeHttpTransport(),
  })
  const web3gwClient = new web3gwtypes.Web3GWClientImpl(web3gwCC)

  // init accounts
  const wallet = ethwallet.Wallet.fromPrivateKey(Uint8Array.from(Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')))
  const senderPrivKey: secp256k1.PrivKey = {key: wallet.getPrivateKey()}
  const senderPubkey: secp256k1.PubKey = {key: compressPublicKey(Buffer.from(wallet.getPublicKey()))}
  const senderPubkeyAny: anytypes.Any = {
    type_url: '/' + secp256k1.PubKey.$type,
    value: secp256k1.PubKey.encode(senderPubkey).finish()
  }
  const senderAddr = hexToBech32(wallet.getAddress(), 'lux')
  const receiverAddr = 'lux1jcltmuhplrdcwp7stlr4hlhlhgd4htqhu86cqx'

  // fetch account num, seq
  const senderInfo = await authClient.AccountInfo({address: senderAddr})
  const senderAccNum = senderInfo.info!.account_number!
  const senderAccSeq = senderInfo.info!.sequence!

  // fetch web3gw metadata
  const metadata = await web3gwClient.GetMetaData({})
  const feePayerPubKey: secp256k1.PubKey = {key: metadata.pubkey}
  const feePayerPubKeyAny: anytypes.Any = {
    type_url: '/' + secp256k1.PubKey.$type,
    value: secp256k1.PubKey.encode(feePayerPubKey).finish()
  }
  const feePayerAddr = metadata.address
  const feePayerInfo = await authClient.AccountInfo({address: feePayerAddr})
  const feePayerAccNum = feePayerInfo.info!.account_number!
  const feePayerAccSeq = feePayerInfo.info!.sequence!

  // init msg
  const msg: banktypes.MsgSend = {
    from_address: senderAddr,
    to_address: receiverAddr,
    amount: [{  amount: '1', denom: 'lux'}],
  }
  const msgAny: anytypes.Any = {
    type_url: 'cosmos-sdk/MsgSend',
    value: banktypes.MsgSend.encode(msg).finish(),
  }

  // prep tx data
  const txBody: txtypes.TxBody = {
    messages: [msgAny],
    memo: 'abc',
    timeout_height: '300000',
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
        sequence: senderAccSeq,
      },
      {
        public_key: feePayerPubKeyAny,
        mode_info: {
          single: {
            mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
          },
        },
        sequence: feePayerAccSeq,
      },
    ],
    fee: {
      amount: [
        {denom: 'lux', amount: '100000000000000'}
      ],
      gas_limit: '200000',
      payer: feePayerAddr,
      granter: ''
    },
    tip: undefined,
  }

  // get signatures
  let signDoc: txtypes.SignDoc = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    chain_id: 'flux-1',
    account_number: senderAccNum,
  }
  let signBytes = Uint8Array.from(getEIP712SignBytes(signDoc))
  const msgHash = Buffer.from(keccak256(signBytes))

  const senderSign = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
  const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])]))

  const res = await web3gwClient.SignJSON({data: signBytes})
  // const feePayerCosmosSig = res.signature
  //
  // // broadcast tx
  // const txRaw: txtypes.TxRaw = {
  //   body_bytes: txtypes.TxBody.encode(txBody).finish(),
  //   auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
  //   signatures: [senderCosmosSig, feePayerCosmosSig],
  // }
  // const broadcastReq: txservice.BroadcastTxRequest = {
  //   tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
  //   mode: txservice.BroadcastMode.BROADCAST_MODE_SYNC,
  // }
  // try {
  //   const res = await txClient.BroadcastTx(broadcastReq)
  //   console.log(res)
  // } catch (err) {
  //   console.log(err)
  // }
}

main()
