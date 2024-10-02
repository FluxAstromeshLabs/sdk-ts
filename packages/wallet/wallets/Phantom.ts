import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ChainId } from '../../utils'

export default class Phantom {
  private chainId: string
  constructor(args: { chainId: ChainId }) {
    this.chainId = args.chainId
  }
  async connect() {
    const provider = new PhantomWalletAdapter()
    await provider.connect()
    return provider
  }
  async getAddresses(): Promise<Array<string>> {
    const provider = await this.connect()
    return [provider.publicKey?.toString() || '']
  }

  async getPubKey(): Promise<string> {
    const provider = await this.connect()
    return provider.publicKey?.toString() || ''
  }
  async signPersonal(message: Uint8Array): Promise<Uint8Array> {
    const provider = await this.connect()

    if (provider.signMessage) {
      const signedMessage = await provider.signMessage(message)
      return signedMessage
    } else {
      throw new Error('signMessage is not supported by this provider')
    }
  }
}
