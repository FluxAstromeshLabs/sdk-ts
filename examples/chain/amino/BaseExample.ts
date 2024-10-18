import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { getMessage } from 'eip-712'
import { bech32 } from 'bech32'
import * as anytypes from '../../../chain/google/protobuf/any'
import * as chaintypes from '../../../chain/flux/types/v1beta1/tx_ext'
import * as txtypes from '../../../chain/cosmos/tx/v1beta1/tx'
import * as ethsecp256k1 from '../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as ethcrypto from 'eth-crypto'
import { ChainGrpcClient } from '../../../packages/client/chain/ChainGrpcClient'
import { getEIP712SignBytes } from '../../../eip712/eip712'
import { simulate } from '../../../packages'
import { ChainRestTendermintApi } from '../../../packages/client'
import { DEFAULT_BLOCK_TIMEOUT_HEIGHT, BigNumberInBase } from '../../../packages/utils'
const network = {
  lcd: 'http://localhost:10337'
}
export const getLastestHeight = async () => {
  const chainRestTendermintApi = new ChainRestTendermintApi(network.lcd)
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock()
  const latestHeight = latestBlock.header.height
  return latestHeight
}
export const getTimeoutHeight = async () => {
  const latestHeight = await getLastestHeight()
  return new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT)
}
export class BaseExample {
  static chainGrpcClient: ChainGrpcClient = new ChainGrpcClient(network.lcd)
  static txClient = this.chainGrpcClient.transaction
  static authClient = this.chainGrpcClient.auth
  static walletFlux1 = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')
    )
  )
  static walletFlux2 = ethwallet.Wallet.fromPrivateKey(
    Uint8Array.from(
      Buffer.from('741de4f8988ea941d3ff0287911ca4074e62b7d45c991a51186455366f10b544', 'hex')
    )
  )
  static getWalletInfo(wallet: ethwallet.Wallet): {
    privKey: ethsecp256k1.PrivKey
    xPubKey: string
    luxAddr: string
    pubkeyAny: anytypes.Any
    pubkey: ethsecp256k1.PubKey
  } {
    const privKey = { key: wallet.getPrivateKey() }
    const xPubKey = ethcrypto.publicKey.compress(Buffer.from(wallet.getPublicKey()).toString('hex'))
    const pubkey: ethsecp256k1.PubKey = { key: Buffer.from(xPubKey, 'hex') }
    const pubkeyAny: anytypes.Any = {
      type_url: '/' + ethsecp256k1.PubKey.$type,
      value: ethsecp256k1.PubKey.encode(pubkey).finish()
    }
    const luxAddr = bech32.encode('lux', bech32.toWords(wallet.getAddress()))

    return {
      privKey,
      xPubKey,
      luxAddr,
      pubkeyAny,
      pubkey
    }
  }
  static async getAccountInfo(addr: string): Promise<{
    accNum: string
    accSeq: string
  }> {
    const senderInfo = await this.authClient.getAccount(addr)
    const accNum = senderInfo.info!.account_number!
    const accSeq = senderInfo.info!.sequence!
    return {
      accNum,
      accSeq
    }
  }
  static getMsgAnyAndJSON(
    msg: any,
    msgWrapper: {
      $type: string
      encode: (msg: any) => any
      toJSON: (msg: any) => any
    }
  ): {
    msgAny: anytypes.Any
    msgJSON: any
  } {
    return {
      msgAny: {
        type_url: `/${msgWrapper.$type}`,
        value: msgWrapper.encode(msg).finish()
      },
      msgJSON: {
        type: `/${msgWrapper.$type}`,
        value: msgWrapper.toJSON(msg)
      }
    }
  }
  static async createTxBody(msgAny: anytypes.Any): Promise<txtypes.TxBody> {
    const timeoutHeight = await getTimeoutHeight()
    return {
      messages: [msgAny],
      memo: 'abc',
      timeout_height: timeoutHeight.toString(),
      extension_options: [],
      non_critical_extension_options: []
    }
  }
  static simulateTx = async (txBody: txtypes.TxBody, accSeq: string) => {
    const tx = await simulate(this.txClient, txBody, [accSeq])
    return tx
  }
  static createAuthInfo(
    senderPubkeyAny: anytypes.Any,
    gasLimit: string,
    accSeq: string
  ): txtypes.AuthInfo {
    return {
      signer_infos: [
        {
          public_key: senderPubkeyAny,
          mode_info: {
            single: {
              mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON
            }
          },
          sequence: accSeq
        }
      ],
      fee: {
        amount: [{ denom: 'lux', amount: '100000000000000' }],
        gas_limit: gasLimit,
        payer: '',
        granter: ''
      },
      tip: undefined
    }
  }
  static signaturesMsg(
    txBody: txtypes.TxBody,
    authInfo: txtypes.AuthInfo,
    accNum: string,
    msgJSON: any,
    senderPrivKey: ethsecp256k1.PrivKey
  ) {
    let signDoc: txtypes.SignDoc = {
      body_bytes: txtypes.TxBody.encode(txBody).finish(),
      auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
      chain_id: 'flux-1',
      account_number: accNum
    }

    let eip712SignDoc = getEIP712SignBytes(signDoc, [msgJSON], '')
    const msgHash = Buffer.from(getMessage(eip712SignDoc, true, { verifyDomain: false }))

    const senderSign = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
    const senderCosmosSig = Uint8Array.from(
      Buffer.concat([senderSign.r, senderSign.s, Buffer.from([0])])
    )
    return senderCosmosSig
  }
  static broadcastTx = async (
    txBody: txtypes.TxBody,
    authInfo: txtypes.AuthInfo,
    senderCosmosSig: Uint8Array
  ) => {
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
      const res = await this.txClient.broadcastTx(txtypes.TxRaw.encode(txRaw).finish())
      return res
    } catch (err: any) {
      console.log(err)
    }
    return null
  }
  static async broadcastMsg(msg: any, msgWrapper: any, wallet: ethwallet.Wallet) {
    const { privKey, luxAddr, pubkeyAny } = this.getWalletInfo(wallet)
    const { accNum, accSeq } = await this.getAccountInfo(luxAddr)
    const { msgAny, msgJSON } = this.getMsgAnyAndJSON(msg, msgWrapper)
    const txBody = await this.createTxBody(msgAny)
    const simulateRes = await this.simulateTx(txBody, accSeq)
    const gasLimit = Math.ceil(Number(simulateRes?.gas_info?.gas_used) * 2.0)
    const authInfo = this.createAuthInfo(pubkeyAny, gasLimit.toString(), accSeq)
    const senderCosmosSig = this.signaturesMsg(txBody, authInfo, accNum, msgJSON, privKey)
    const res = await this.broadcastTx(txBody, authInfo, senderCosmosSig)
    return res
  }
}
