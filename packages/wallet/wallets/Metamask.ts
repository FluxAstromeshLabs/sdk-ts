import * as ethcrypto from 'eth-crypto'
import * as ethutil from '@ethereumjs/util'
import * as metamaskutil from '@metamask/eth-sig-util'
import { EthereumChainId } from '../../utils'
declare global {
  interface Window {
    ethereum?: any
    providers: any
  }
}
export default class Metamask {
  chainId: EthereumChainId
  constructor(args: { chainId: EthereumChainId }) {
    this.chainId = args.chainId
  }
  async getAddresses(): Promise<string[]> {
    const ethereum = await this.getEthereum()
    try {
      const res = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      return res
    } catch (e: unknown) {
      throw e
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async confirm(address: string): Promise<string> {
    return Promise.resolve(
      `0x${Buffer.from(`Confirmation for ${address} at time: ${Date.now()}`).toString('hex')}`
    )
  }
  async getEthereum() {
    if (window?.ethereum?.providers) {
      let metamask = window.ethereum.providers.find((p: any) => p?.isMetaMask && !p?.isPhantom)
      if (metamask) {
        return metamask
      }
    }
    if (window?.ethereum?.isMetaMask && !window?.ethereum?.isPhantom) {
      return window.ethereum
    }

    throw new Error('Please install the Metamask wallet extension')
  }
  async getEthereumChainId(): Promise<string> {
    const ethereum = await this.getEthereum()

    try {
      return ethereum.request({ method: 'eth_chainId' })
    } catch (e: unknown) {
      throw e
    }
  }
  async switchEthereumChain(chainId: EthereumChainId) {
    const ethereum = await this.getEthereum()
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    })
  }
  async signEip712TypedData(
    eip712json: string,
    address: string,
    chainId?: EthereumChainId
  ): Promise<string> {
    const ethereum = await this.getEthereum()
    if (chainId) {
      await this.switchEthereumChain(chainId)
    }
    try {
      return await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [address, eip712json]
      })
    } catch (e: unknown) {
      throw e
    }
  }
  async signPersonal(address: string, message: any) {
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address]
    })

    return signature
  }

  async getPubkeyFromSignature(message: any, signature: any): Promise<string> {
    const msgHash = metamaskutil.TypedDataUtils.eip712Hash(
      message,
      metamaskutil.SignTypedDataVersion.V4
    )
    const sigParams = ethutil.fromRpcSig(signature)
    const pubKey = ethutil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)
    const xPubkey = ethcrypto.publicKey.compress(Buffer.from(pubKey).toString('hex'))
    return xPubkey
  }
  // eslint-disable-next-line class-methods-use-this
  async getPubKey(): Promise<string> {
    throw new Error('You can only fetch PubKey from Cosmos native wallets')
  }
}
