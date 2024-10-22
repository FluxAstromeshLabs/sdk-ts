import { Network, NetworkEndpoints } from './types'
import { localhostEndpoints, devnetEndpoints, testnetEndpoints } from './endpoints'
export const defaultNetwork: Network = Network.Devnet
export const networkEndpoints: Record<Network, NetworkEndpoints> = {
  [Network.Localhost]: localhostEndpoints,
  [Network.Devnet]: devnetEndpoints,
  [Network.Testnet]: testnetEndpoints
}

export const getNetworkEndpoint = (network: Network): NetworkEndpoints => {
  return networkEndpoints[network]
}
