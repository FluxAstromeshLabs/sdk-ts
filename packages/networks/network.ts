import { Network, NetworkEndpoints } from './types'
import { localhostEndpoints, testnetEndpoints } from './endpoints'
export const defaultNetwork: Network = Network.Testnet
export const networkEndpoints: Record<Network, NetworkEndpoints> = {
  [Network.Localhost]: localhostEndpoints,
  [Network.Testnet]: testnetEndpoints
}

export const getNetworkEndpoint = (network: Network): NetworkEndpoints => {
  return networkEndpoints[network]
}
