import { NetworkEndpoints, Network } from './types'
export const localhostEndpoints: NetworkEndpoints = {
  name: 'Localhost',
  id: Network.Localhost,
  lcd: 'https://lcd.localhost',
  tm: 'https://tm.localhost',
  api: 'https://api.localhost'
}
export const devnetEndpoints: NetworkEndpoints = {
  name: 'Devnet',
  id: Network.Devnet,
  lcd: 'https://devnet.lcd.astromesh.xyz ',
  tm: 'https://devnet.tm.astromesh.xyz',
  api: 'https://devnet.api.astromesh.xyz'
}

export const testnetEndpoints: NetworkEndpoints = {
  name: 'Testnet',
  id: Network.Testnet,
  lcd: 'https://testnet.lcd.astromesh.xyz ',
  tm: 'https://testnet.tm.astromesh.xyz',
  api: 'https://testnet.api.astromesh.xyz'
}
