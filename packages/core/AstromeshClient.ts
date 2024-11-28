import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { bech32 } from 'bech32'
import * as anytypes from '../../chain/google/protobuf/any'
import * as chaintypes from '../../chain/flux/types/v1beta1/tx_ext'
import * as txtypes from '../../chain/cosmos/tx/v1beta1/tx'
import * as ethsecp256k1 from '../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../chain/cosmos/tx/signing/v1beta1/signing'
import * as ethcrypto from 'eth-crypto'
import * as codectypemap from '../../chain/codec_type_map.json'
import { ChainGrpcClient } from '../../packages/client/chain/ChainGrpcClient'
import { simulate, Network, getNetworkEndpoint, BigNumber } from '../../packages'
import { ChainRestTendermintApi } from '../../packages/client'
import { DEFAULT_BLOCK_TIMEOUT_HEIGHT, BigNumberInBase } from '../../packages/utils'
import { keccak256 } from '@cosmjs/crypto'
import * as txservice from '../../chain/cosmos/tx/v1beta1/service'
const defaultGasPrice = 500000000
const network = {
  lcd: 'http://localhost:10337'
}
export const getLastestHeight = async (lcd: string) => {
  const chainRestTendermintApi = new ChainRestTendermintApi(lcd)
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock()
  const latestHeight = latestBlock.header.height
  return latestHeight
}
export const getTimeoutHeight = async (lcd: string) => {
  const latestHeight = await getLastestHeight(lcd)
  return new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT)
}
export class AstromeshClient {
  static network: any = {
    lcd: network.lcd
  }
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
  constructor({ lcd }: { lcd?: string }) {
    AstromeshClient.chainGrpcClient = new ChainGrpcClient(lcd)
    AstromeshClient.network = {
      lcd
    }
  }
  static getWalletInfo(wallet: ethwallet.Wallet[] | ethwallet.Wallet): {
    privKey: ethsecp256k1.PrivKey[]
    xPubKey: string[]
    luxAddr: string[]
    pubkeyAny: anytypes.Any[]
    pubkey: ethsecp256k1.PubKey[]
  } {
    const wallets = Array.isArray(wallet) ? wallet : [wallet]
    const privKey: ethsecp256k1.PrivKey[] = []
    const xPubKey: string[] = []
    const luxAddr: string[] = []
    const pubkeyAny: anytypes.Any[] = []
    const pubkey: ethsecp256k1.PubKey[] = []

    for (let i = 0; i < wallets.length; i++) {
      privKey.push({ key: wallets[i].getPrivateKey() })
      const _xPubKey = ethcrypto.publicKey.compress(
        Buffer.from(wallets[i].getPublicKey()).toString('hex')
      )
      xPubKey.push(_xPubKey)
      const _pubkey = { key: Buffer.from(_xPubKey, 'hex') }
      pubkey.push(_pubkey)
      pubkeyAny.push({
        type_url: '/' + ethsecp256k1.PubKey.$type,
        value: ethsecp256k1.PubKey.encode(_pubkey).finish()
      })
      luxAddr.push(bech32.encode('lux', bech32.toWords(wallets[i].getAddress())))
    }
    return {
      privKey,
      xPubKey,
      luxAddr,
      pubkeyAny,
      pubkey
    }
  }
  static async getAccountInfo(addr: string | string[]): Promise<{
    accNum: string[]
    accSeq: string[]
  }> {
    const _addr = Array.isArray(addr) ? addr : [addr]
    const accNum: string[] = []
    const accSeq: string[] = []
    const getInfo = _addr.map((addr) => {
      return this.authClient.getAccount(addr)
    })
    const res = await Promise.all(getInfo)
    for (let i = 0; i < res.length; i++) {
      accNum.push(res[i].info?.account_number)
      accSeq.push(res[i].info?.sequence)
    }
    return {
      accNum,
      accSeq
    }
  }
  static getMsgAny(
    msg: any,
    msgWrapper: {
      $type: string
      encode: (msg: any) => any
      toJSON: (msg: any) => any
    }
  ): any[] {
    const msgAnys = []
    for (let i = 0; i < msg.length; i++) {
      const msgAny: anytypes.Any = {
        type_url: `/${msgWrapper[i].$type}`,
        value: msgWrapper[i].encode(msg[i]).finish()
      }

      msgAnys.push(msgAny)
    }
    return msgAnys
  }
  static async createTxBody(msgAny: anytypes.Any[]): Promise<txtypes.TxBody> {
    const timeoutHeight = await getTimeoutHeight(AstromeshClient.network.lcd)
    return {
      messages: msgAny,
      memo: 'abc',
      timeout_height: timeoutHeight.toString(),
      extension_options: [],
      non_critical_extension_options: []
    }
  }
  static simulateTx = async (txBody: txtypes.TxBody, accSeq: string | string[]) => {
    const _accSeq = Array.isArray(accSeq) ? accSeq : [accSeq]
    const tx = await simulate(this.txClient, txBody, _accSeq)
    return tx
  }
  static createAuthInfo(
    sendersPubkeyAny: anytypes.Any[] | anytypes.Any,
    gasLimit: string,
    accSeq: string[] | string
  ): txtypes.AuthInfo {
    const sendersPubkeyAnyArray = Array.isArray(sendersPubkeyAny)
      ? sendersPubkeyAny
      : [sendersPubkeyAny]
    const accSeqArray = Array.isArray(accSeq) ? accSeq : [accSeq]
    return {
      signer_infos: sendersPubkeyAnyArray.map((senderAny, index) => ({
        public_key: senderAny,
        mode_info: {
          single: {
            mode: signingtypes.SignMode.SIGN_MODE_DIRECT
          }
        },
        sequence: accSeqArray[index]
      })),
      fee: {
        amount: [{ denom: 'lux', amount: '200000000000000' }],
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
    accNum: string | string[],
    senderPrivKey: ethsecp256k1.PrivKey[] | ethsecp256k1.PrivKey
  ) {
    const _senderPrivKey = Array.isArray(senderPrivKey) ? senderPrivKey : [senderPrivKey]
    const _accNum = Array.isArray(accNum) ? accNum : [accNum]
    let senderCosmosSig = []
    for (let i = 0; i < _senderPrivKey.length; i++) {
      let signDoc: txtypes.SignDoc = {
        body_bytes: txtypes.TxBody.encode(txBody).finish(),
        auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
        chain_id: 'flux-1',
        account_number: _accNum[i]
      }
      const signBytes = txtypes.SignDoc.encode(signDoc).finish()
      const msgHash = Buffer.from(keccak256(signBytes))
      const senderSign = ethutil.ecsign(msgHash, Buffer.from(_senderPrivKey[i].key))
      senderCosmosSig.push(Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s])))
    }
    return senderCosmosSig
  }
  static broadcastTx = async (
    txBody: txtypes.TxBody,
    authInfo: txtypes.AuthInfo,
    senderCosmosSig: Uint8Array[] | Uint8Array
  ): Promise<txservice.BroadcastTxResponse> => {
    const _senderCosmosSig = Array.isArray(senderCosmosSig) ? senderCosmosSig : [senderCosmosSig]
    const txRaw: txtypes.TxRaw = {
      body_bytes: txtypes.TxBody.encode(txBody).finish(),
      auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
      signatures: _senderCosmosSig
    }
    try {
      const res = await this.txClient.broadcastTx(txtypes.TxRaw.encode(txRaw).finish())
      return res
    } catch (err: any) {
      console.log(err)
    }
    return null
  }
  static async broadcastMsg(
    msg: any | any[],
    msgWrapper: any | any[],
    wallet: ethwallet.Wallet[] | ethwallet.Wallet
  ): Promise<txservice.BroadcastTxResponse> {
    const { privKey, luxAddr, pubkeyAny } = this.getWalletInfo(wallet)
    const { accNum, accSeq } = await this.getAccountInfo(luxAddr)
    const msgAny = this.getMsgAny(msg, msgWrapper)
    const txBody = await this.createTxBody(msgAny)
    const simulateRes = await this.simulateTx(txBody, accSeq)
    const gasLimit = Math.ceil(Number(simulateRes?.gas_info?.gas_used) * 2.0)
    const authInfo = this.createAuthInfo(pubkeyAny, gasLimit.toString(), accSeq)
    authInfo.fee.gas_limit = gasLimit.toString()
    authInfo.fee.amount[0].amount = new BigNumber(gasLimit)
      .multipliedBy(new BigNumber(defaultGasPrice))
      .toString()
    const senderCosmosSig = this.signaturesMsg(txBody, authInfo, accNum, privKey)
    const res = await this.broadcastTx(txBody, authInfo, senderCosmosSig)
    return res
  }
}
