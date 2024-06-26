import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { getMessage } from 'eip-712'

import * as anytypes from '../../../../chain/google/protobuf/any'
import * as chaintypes from '../../../../chain/flux/types/v1beta1/tx_ext'
import * as stakingTypes from '../../../../chain/cosmos/staking/v1beta1/tx'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as secp256k1 from '../../../../chain/cosmos/crypto/secp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as codectypemap from '../../../../chain/codec_type_map.json'

import { getEIP712SignBytes } from '../../../../eip712/eip712'
import * as ethcrypto from 'eth-crypto'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import { bech32 } from 'bech32'
import {
  ChainRestTendermintApi,
  ChainGrpcTxService,
  ChainGrpcAuthQuery,
  DEFAULT_BLOCK_TIMEOUT_HEIGHT,
  BigNumberInBase
} from '../../../../packages'
const lcd = 'http://localhost:10337'
export const getTimeoutHeight = async () => {
  const chainRestTendermintApi = new ChainRestTendermintApi(lcd)
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock()
  const latestHeight = latestBlock.header.height
  return new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT)
}

const main = async () => {
  // init clients
  const txClient = new ChainGrpcTxService(lcd)
  const authClient = new ChainGrpcAuthQuery(lcd)

  // init user2
  const wallet = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('741de4f8988ea941d3ff0287911ca4074e62b7d45c991a51186455366f10b544', 'hex')
    )
  )
  const senderPrivKey: secp256k1.PrivKey = { key: wallet.getPrivateKey() }
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

  // init msg
  const msg: stakingTypes.MsgUndelegate = {
    delegator_address: senderAddr,
    validator_address: 'luxvaloper1vvupy62qn5pug4vyuctl7x3vcfa7fl7xq0h82c',
    amount: {
      denom: 'lux',
      amount: '10000000000000000000' // 10 Lux
    }
  }
  const msgAny: anytypes.Any = {
    type_url: `/${stakingTypes.MsgUndelegate.$type}`,
    value: stakingTypes.MsgUndelegate.encode(msg).finish()
  }
  const msgJSON = {
    type: codectypemap[`/${stakingTypes.MsgUndelegate.$type}`],
    value: stakingTypes.MsgUndelegate.toJSON(msg)
  }
  const timeoutHeight = await getTimeoutHeight()
  // prep tx data
  const txBody: txtypes.TxBody = {
    messages: [msgAny],
    memo: 'abc',
    timeout_height: timeoutHeight.toFixed(),
    extension_options: [],
    non_critical_extension_options: []
  }

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
      gas_limit: '200000',
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

  const broadcastReq: txservice.BroadcastTxRequest = {
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
    mode: txservice.BroadcastMode.BROADCAST_MODE_SYNC
  }
  try {
    const res = await txClient.broadcastTx(broadcastReq.tx_bytes, broadcastReq.mode)
    console.log(res)
  } catch (err: any) {
    console.log(err)
  }
}

main()
