import { NetworkEndpoints, Network } from './types'
export const localhostEndpoints: NetworkEndpoints = {
  name: 'Localhost',
  id: Network.Localhost,
  lcd: 'https://lcd.localhost',
  tm: 'https://tm.localhost',
  api: 'https://api.localhost'
}
export const testnetEndpoints: NetworkEndpoints = {
  name: 'Testnet',
  id: Network.Testnet,
  lcd: 'https://testnet.lcd.astromesh.xyz',
  tm: 'https://testnet.tm.astromesh.xyz',
  api: 'https://testnet.api.astromesh.xyz'
}