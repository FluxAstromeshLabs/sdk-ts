import { Wallet } from './types'
import { ChainId, getEthereumAddress, getFluxAddress } from '../utils'
import { Keplr, Metamask, Phantom } from './wallets'
export * from './types'

export default class WalletStrategy {
  public provider: any
  private chainId: ChainId
  private wallet: Wallet

  constructor(wallet: Wallet, chainId: ChainId) {
    this.chainId = chainId
    this.wallet = wallet
    try {
      switch (wallet) {
        case Wallet.Keplr:
          this.provider = new Keplr({ chainId })
          break
        case Wallet.Metamask:
          this.provider = new Metamask({ chainId })
          break
        case Wallet.Phantom:
          this.provider = new Phantom({ chainId })
          break
        default:
          break
      }
    } catch (e) {}
  }
  async setWallet(wallet: Wallet) {
    this.wallet = wallet
    switch (wallet) {
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
        this.provider = new Keplr({ chainId: this.chainId })
        break
    }
  }
  async getAddresses(): Promise<string[]> {
    return this.provider.getAddresses()
  }
  async confirm(address: string): Promise<string> {
    return this.provider.confirm(address)
  }
  async getPubKey(): Promise<string> {
    if ([Wallet.Keplr, Wallet.Phantom].includes(this.wallet)) {
      return this.provider.getPubKey()
    }
    throw new Error('This wallet does not support getPubKey')
  }
  async getPubkeyFromSignature(message: string, signature: string): Promise<string> {
    if (this.wallet === Wallet.Metamask) {
      return this.provider.getPubkeyFromSignature(message, signature)
    }
    throw new Error('This wallet does not support getPubkeyFromSignature')
  }
  async signEip712TypedData(eip712json: string, address: string): Promise<string> {
    if (this.wallet === Wallet.Metamask) {
      let ethAddress = getEthereumAddress(address)
      return this.provider.signEip712TypedData(eip712json, ethAddress)
    }
    throw new Error('This wallet does not support signEip712TypedData')
  }
  async signPersonal(address: string, message: any) {
    if (this.wallet === Wallet.Metamask) {
      let ethAddress = getEthereumAddress(address)
      return this.provider.signPersonal(ethAddress, message)
    }
    if (this.wallet === Wallet.Keplr) {
      return this.provider.signEthereum(address, message)
    }
    throw new Error('This wallet does not support signPersonal')
  }
  async signEIP712CosmosTx(eip712: any, signDoc: string) {
    if (this.wallet === Wallet.Keplr) {
      return this.provider.signEIP712CosmosTx({ eip712, signDoc })
    }

    throw new Error('This wallet does not support signEIP712CosmosTx')
  }
  async signTransactionCosmos(signDoc: any, address: string) {
    if (this.wallet === Wallet.Keplr) {
      return this.provider.signTransactionCosmos(signDoc, address)
    }

    throw new Error('This wallet does not support signTransactionCosmos')
  }
  async sendTx(tx: any, mode: any) {
    if (this.wallet === Wallet.Keplr) {
      return this.provider.sendTx(tx, mode)
    }

    throw new Error('This wallet does not support sendTx')
  }
}
