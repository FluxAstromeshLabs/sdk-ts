import { Window as KeplrWindow } from '@keplr-wallet/types'
export enum Wallet {
  Keplr = 'keplr',
  Metamask = 'metamask',
  Phantom = 'phantom'
}

declare global {
  interface Window extends KeplrWindow {}
}
