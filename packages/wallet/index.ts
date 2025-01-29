import { Wallet } from './types'
import { EthereumChainId, getEthereumAddress } from '../utils'
import { Keplr, Metamask, Phantom } from './wallets'
export * from './types'
export interface WalletStrategyEthereumOptions {
  ethereumChainId: EthereumChainId
  rpcUrl?: string
}
export interface WalletStrategyOptions {
  wallet?: Wallet
  ethereumOptions?: WalletStrategyEthereumOptions
  chainId: string
}
export default class WalletStrategy {
  public provider: any
  public chainId: string
  public wallet: Wallet
  public ethereumOptions?: WalletStrategyEthereumOptions
  constructor({
    wallet,
    chainId,
    ethereumOptions
  }: {
    wallet?: Wallet
    chainId: string
    ethereumOptions?: WalletStrategyEthereumOptions
  }) {
    this.chainId = chainId
    this.wallet = wallet
    this.ethereumOptions = ethereumOptions
    try {
      this.initProvider()
    } catch (e) {}
  }
  async setWallet(wallet: Wallet) {
    this.wallet = wallet
    this.initProvider()
  }
  async setChainId(chainId: string) {
    try {
      this.chainId = chainId
      await this.initProvider()
    } catch (e) {
      throw e
    }
  }
  async initProvider() {
    try {
      switch (this.wallet) {
        case Wallet.Keplr:
          this.provider = new Keplr({ chainId: this.chainId })
          break
        case Wallet.Metamask:
          this.provider = new Metamask({
            chainId: this.ethereumOptions?.ethereumChainId
          })
          break
        case Wallet.Phantom:
          this.provider = new Phantom({ chainId: this.chainId })
          break
        default:
          break
      }
    } catch (e) {
      throw e
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
  async signEip712TypedData(eip712json: string, address: string, prefix?: string): Promise<string> {
    if (this.wallet === Wallet.Metamask) {
      let ethAddress = getEthereumAddress(address, prefix)
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
