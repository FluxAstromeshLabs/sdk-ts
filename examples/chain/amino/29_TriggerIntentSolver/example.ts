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
import { simulate } from '../../../../packages'
import { Plane, TxAction } from '../../../../chain/flux/astromesh/v1beta1/tx'
import * as astromeshquery from '../../../../chain/flux/astromesh/v1beta1/query'

const main = async () => {
  const chainGrpcClient = new ChainGrpcClient('http://localhost:10337')
  const txClient = chainGrpcClient.transaction
  const authClient = chainGrpcClient.auth

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
  const senderAccNum = senderInfo.info!.account_number!
  const senderAccSeq = senderInfo.info!.sequence!

  const msg: strategytypes.MsgTriggerStrategies = {
    sender: senderAddr,
    ids: ['f03be7c54c3b01dfa36118ef104ae8c4fcd82c32cac6e6d0d23d832aa207bddb'],
    inputs: [
      Uint8Array.from(Buffer.from(`{"deposit_equally":{"denom":"usdt","amount":"30000000"}}`))
    ],
    queries: [
      astromeshquery.FISQueryRequest.create({
        instructions: [{
        plane: Plane.COSMOS,
        action: astromeshquery.QueryAction.COSMOS_ASTROMESH_BALANCE,
        address: new Uint8Array(),
        input: [
          Uint8Array.from(Buffer.from('lux1jcltmuhplrdcwp7stlr4hlhlhgd4htqhu86cqx')),
          Uint8Array.from(Buffer.from('usdt')),
        ],
      }],
    })],
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
  let simulateRes = await simulate(txClient, txBody, [senderAccSeq])
  let gasLimit = Math.ceil(Number(simulateRes?.gas_info?.gas_used) * 2.0)
  // assign gas and other info to get real tx and broadcast
  const authInfo: txtypes.AuthInfo = {
    signer_infos: [
      {
        public_key: senderPubkeyAny,
        mode_info: {
          single: {
            mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON
          }
        },
        sequence: senderAccSeq
      }
    ],
    fee: {
      amount: [{ denom: 'lux', amount: '100000000000000' }],
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
    account_number: senderAccNum
  }

  let eip712SignDoc = getEIP712SignBytes(signDoc, [msgJSON], '')
  const msgHash = Buffer.from(getMessage(eip712SignDoc, true, { verifyDomain: false }))

  const senderSign = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
  const senderCosmosSig = Uint8Array.from(
    Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])])
  )

  // broadcast tx
  const extOpts: chaintypes.ExtensionOptionsWeb3Tx = {
    typedDataChainID: '1',
    feePayer: '',
    feePayerSig: Uint8Array.from([])
  }
  const extOptsAny: anytypes.Any = {
    type_url: '/' + chaintypes.ExtensionOptionsWeb3Tx.$type,
    value: chaintypes.ExtensionOptionsWeb3Tx.encode(extOpts).finish()
  }
  txBody.extension_options = [extOptsAny]

  const txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: [senderCosmosSig]
  }

  try {
    const res = await txClient.broadcastTx(txtypes.TxRaw.encode(txRaw).finish())
    console.log(res)
  } catch (err: any) {
    console.log(err)
  }
}

main()
