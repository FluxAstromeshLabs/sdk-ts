export enum Network {
  Localhost = 'localhost',
  Devnet = 'devnet',
  Testnet = 'testnet'
}

export type NetworkEndpoints = {
  id: Network
  name: string
  lcd: string
  tm: string
  api: string
}
