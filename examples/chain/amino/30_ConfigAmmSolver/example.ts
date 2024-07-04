import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { getMessage } from 'eip-712'
import { bech32 } from 'bech32'
import * as fs from 'fs'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import * as anytypes from '../../../../chain/google/protobuf/any'
import * as chaintypes from '../../../../chain/flux/types/v1beta1/tx_ext'
import * as strategytypes from '../../../../chain/flux/strategy/v1beta1/tx'
import * as astromeshquery from '../../../../chain/flux/astromesh/v1beta1/query'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as codectypemap from '../../../../chain/codec_type_map.json'
import * as ethcrypto from 'eth-crypto'
import { ChainGrpcClient } from '../../../../packages/client/chain/ChainGrpcClient'
import { getEIP712SignBytes } from '../../../../eip712/eip712'
import { simulate } from '../../../../packages'
import { StrategyType } from '../../../../chain/flux/strategy/v1beta1/strategy'

const main = async () => {
  const chainGrpcClient = new ChainGrpcClient('http://localhost:10337')
  const txClient = chainGrpcClient.transaction
  const authClient = chainGrpcClient.auth

  // init accounts
  const wallet = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')
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

  const msg: strategytypes.MsgConfigStrategy = {
    sender: senderAddr,
    config: strategytypes.Config.deploy,
    id: '',
    strategy: fs.readFileSync('amm_solver.wasm'),
    query: astromeshquery.FISQueryRequest.create({
      instructions: [],
    }),
    trigger_permission: undefined,
    metadata: {
      name: "Amm swap wizard",
      description: "Abstracting out swaps and unleashing arbitrage opportunities. It supports basic swaps as well as arbitrage across pools of the same pair",
      logo: "",
      website: "https://www.astromesh.xyz",
      type: StrategyType.INTENT_SOLVER,
      tags: ["defi", "helper"],
      schema: "",
      cron_gas_price: "",
      cron_input: new Uint8Array(0),
      cron_interval: "0",
    },
  }

  const msgAny: anytypes.Any = {
    type_url: `/${strategytypes.MsgConfigStrategy.$type}`,
    value: strategytypes.MsgConfigStrategy.encode(msg).finish()
  }
  const msgJSON = {
    type: codectypemap[`/${strategytypes.MsgConfigStrategy.$type}`],
    value: strategytypes.MsgConfigStrategy.toJSON(msg)
  }

  // prep tx data
  const txBody: txtypes.TxBody = {
    messages: [msgAny],
    memo: '',
    timeout_height: '119000',
    extension_options: [],
    non_critical_extension_options: []
  }

  // Simulate to estimate gas
  let simulateRes = await simulate(txClient, txBody, [senderAccSeq])
  let gasLimit = Math.ceil(Number(simulateRes?.gas_info?.gas_used) * 1.5)
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
