/* eslint-disable class-methods-use-this */
import type { Keplr, StdSignDoc, AminoSignResponse } from '@keplr-wallet/types'
import { EthSignType } from '@keplr-wallet/types'
import { ChainId } from '../../utils'
import { networkEndpoints } from '../../networks'
export default class KeplrWallet {
  public chainId: string
  constructor(args: { chainId: string }) {
    this.chainId = args.chainId
    this.suggestChain()
  }

  async suggestChain() {
    if (!window || !window.keplr) {
      throw new Error('Please install the Keplr wallet extension')
    }
    if (this.checkChainIdSupport()) {
      return
    }
    //todo: add the rest endpoint
    await window.keplr.experimentalSuggestChain({
      rpc: networkEndpoints.testnet.tm,
      rest: networkEndpoints.testnet.lcd,
      chainId: ChainId.Testnet,
      chainName: 'Flux',
      stakeCurrency: { coinDenom: 'lux', coinMinimalDenom: 'lux', coinDecimals: 18 },
      bech32Config: {
        bech32PrefixAccAddr: 'lux',
        bech32PrefixAccPub: 'luxpub',
        bech32PrefixValAddr: 'luxvaloper',
        bech32PrefixValPub: 'luxvaloperpub',
        bech32PrefixConsAddr: 'luxvalcons',
        bech32PrefixConsPub: 'luxvalconspub'
      },
      bip44: { coinType: 60 },
      currencies: [{ coinDenom: 'lux', coinMinimalDenom: 'lux', coinDecimals: 18 }],
      feeCurrencies: [
        {
          coinDenom: 'lux',
          coinMinimalDenom: 'lux',
          coinDecimals: 18,
          gasPriceStep: { low: 10000000000, average: 10000000000, high: 10000000000 }
        }
      ]
    })
  }
  public async checkChainIdSupport() {
    const { chainId } = this
    const keplr = await this.getKeplr()
    const chainName = chainId.split('-')

    try {
      return !!(await keplr.getKey(chainId))
    } catch (e) {
      throw new Error(
        `Keplr may not support ${
          chainName[0] || chainId
        } network. Please check if the chain can be added.`
      )
    }
  }
  async getAddresses(): Promise<string[]> {
    try {
      await this.suggestChain()
      const accounts = await this.getAccounts()
      return accounts.map((account: any) => account.address)
    } catch (e: unknown) {
      throw e
    }
  }

  async confirm(address: string): Promise<string> {
    return Promise.resolve(
      `0x${Buffer.from(`Confirmation for ${address} at time: ${Date.now()}`).toString('hex')}`
    )
  }

  async getPubKey(): Promise<string> {
    const key = await this.getKey()
    return Buffer.from(key.pubKey).toString('base64')
  }

  public async getKey(): Promise<{
    name: string
    algo: string
    isNanoLedger: boolean
    pubKey: Uint8Array
    address: Uint8Array
    bech32Address: string
  }> {
    const keplr = await this.getKeplrWallet()

    try {
      return keplr.getKey(this.chainId)
    } catch (e: unknown) {
      throw e
    }
  }
  public async getKeplrWallet() {
    const { chainId } = this
    const keplr = await this.getKeplr()
    try {
      await keplr.enable(chainId)
      return keplr as Keplr
    } catch (e: unknown) {
      throw e
    }
  }

  private async getKeplr() {
    if (!window || !window.keplr) {
      throw new Error('Please install the Keplr wallet extension')
    }
    return window.keplr!
  }

  public async getAccounts() {
    const { chainId } = this
    const keplr = await this.getKeplr()

    try {
      return keplr.getOfflineSigner(chainId).getAccounts()
    } catch (e: unknown) {
      throw e
    }
  }

  async signTransactionCosmos(signDoc: any, address: string) {
    const keplr = await this.getKeplr()
    const offlineSigner = keplr.getOfflineSigner(this.chainId)
    const directSignResponse = await offlineSigner.signDirect(address, signDoc)
    return directSignResponse
  }

  public async signEIP712CosmosTx({
    eip712,
    signDoc
  }: {
    eip712: any
    signDoc: StdSignDoc
  }): Promise<AminoSignResponse> {
    const { chainId } = this
    const keplr = await this.getKeplrWallet()
    const key = await this.getKey()

    try {
      return keplr.experimentalSignEIP712CosmosTx_v0(chainId, key.bech32Address, eip712, signDoc)
    } catch (e: unknown) {
      console.log(e)
      throw e
    }
  }
  async sendTx(tx: any, mode: any) {
    const keplr = await this.getKeplrWallet()
    try {
      return keplr.sendTx(this.chainId, tx, mode)
    } catch (e: unknown) {
      console.log(e)
      throw e
    }
  }
  async signEthereum(address: string, message: string) {
    const keplr = await this.getKeplrWallet()
    try {
      return keplr.signEthereum(this.chainId, address, message, EthSignType.MESSAGE)
    } catch (e: unknown) {
      console.log(e)
      throw e
    }
  }
  async signArbitrary(address: string, message: string) {
    const keplr = await this.getKeplrWallet()
    try {
      const signature = await keplr.signArbitrary(this.chainId, address, message)
      console.log(signature)
      return signature.signature
    } catch (e: unknown) {
      console.log(e)
      throw e
    }
  }
}
