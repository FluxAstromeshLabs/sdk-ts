import { Wallet } from './types'
import {  getEthereumAddress } from '../utils'
import { Keplr, Metamask, Phantom } from './wallets'
export * from './types'

export default class WalletStrategy {
  public provider: any
  private chainId:  string
  public wallet: Wallet
  constructor({
    wallet,
    chainId,
  }: {
    wallet?: Wallet
    chainId: string
  }) {
    this.chainId = chainId
    this.wallet = wallet
    try {
      this.initProvider()
    } catch (e) {}
  }
  async setWallet(wallet: Wallet) {
    this.wallet = wallet
    this.initProvider()
  }
  async setChainId(chainId: string) {
    this.chainId = chainId
    console.log('chainId', chainId)
    this.initProvider()
  }
  initProvider() {
    switch (this.wallet) {
      case Wallet.Keplr:
        this.provider = new Keplr({ chainId: this.chainId })
        break
      case Wallet.Metamask:
        this.provider = new Metamask({ chainId: this.chainId })
        break
      case Wallet.Phantom:
        this.provider = new Phantom({ chainId: this.chainId })
        break
      default:
        break
    }
  }
  getProvider() {
    if (!this.provider) {
      throw new Error('Wallet provider not initialized')
    }
    return this.provider
  }
  async getAddresses(): Promise<string[]> {
    return this.getProvider().getAddresses()
  }
  async confirm(address: string): Promise<string> {
    return this.getProvider().confirm(address)
  }
  async getPubKey(): Promise<string> {
    if ([Wallet.Keplr, Wallet.Phantom].includes(this.wallet)) {
      return this.getProvider().getPubKey()
    }
    throw new Error('This wallet does not support getPubKey')
  }
  async getPubkeyFromSignature(message: string, signature: string): Promise<string> {
    if (this.wallet === Wallet.Metamask) {
      return this.getProvider().getPubkeyFromSignature(message, signature)
    }
    throw new Error('This wallet does not support getPubkeyFromSignature')
  }
  async signEip712TypedData(eip712json: string, address: string): Promise<string> {
    if (this.wallet === Wallet.Metamask) {
      let ethAddress = getEthereumAddress(address)
      return this.getProvider().signEip712TypedData(eip712json, ethAddress)
    }
    throw new Error('This wallet does not support signEip712TypedData')
  }
  async signPersonal(address: string, message: any) {
    if (this.wallet === Wallet.Metamask) {
      let ethAddress = getEthereumAddress(address)
      return this.getProvider().signPersonal(ethAddress, message)
    }
    if (this.wallet === Wallet.Keplr) {
      return this.getProvider().signEthereum(address, message)
    }
    throw new Error('This wallet does not support signPersonal')
  }
  async signEIP712CosmosTx(eip712: any, signDoc: string) {
    if (this.wallet === Wallet.Keplr) {
      return this.getProvider().signEIP712CosmosTx({ eip712, signDoc })
    }

    throw new Error('This wallet does not support signEIP712CosmosTx')
  }
  async signTransactionCosmos(signDoc: any, address: string) {
    if (this.wallet === Wallet.Keplr) {
      return this.getProvider().signTransactionCosmos(signDoc, address)
    }

    throw new Error('This wallet does not support signTransactionCosmos')
  }
  async sendTx(tx: any, mode: any) {
    if (this.wallet === Wallet.Keplr) {
      return this.getProvider().sendTx(tx, mode)
    }

    throw new Error('This wallet does not support sendTx')
  }
}
