import {
  IndexerGrpcWeb3gwQuery,
  IndexerGrpcMediaQuery,
  IndexerGrpcAccountQuery,
  IndexerGrpcFnftQuery,
  IndexerGrpcProviderQuery,
  IndexerGrpcBazaarQuery,
  IndexerGrpcExplorerQuery,
  IndexerGrpcCampQuery,
  IndexerGrpcOHLCVQuery,
  IndexerGrpcLaunchpadQuery,
  IndexerGrpcLiveStreamQuery,
} from './grpc'

export class IndexerGrpcClient {
  web3gw: IndexerGrpcWeb3gwQuery
  media: IndexerGrpcMediaQuery
  account: IndexerGrpcAccountQuery
  fnft: IndexerGrpcFnftQuery
  provider: IndexerGrpcProviderQuery
  bazaar: IndexerGrpcBazaarQuery
  explorer: IndexerGrpcExplorerQuery
  campclash: IndexerGrpcCampQuery
  ohlcv: IndexerGrpcOHLCVQuery
  launchpad: IndexerGrpcLaunchpadQuery
  livestream: IndexerGrpcLiveStreamQuery
  constructor(endpoint: string) {
    this.web3gw = new IndexerGrpcWeb3gwQuery(endpoint)
    this.media = new IndexerGrpcMediaQuery(endpoint)
    this.account = new IndexerGrpcAccountQuery(endpoint)
    this.fnft = new IndexerGrpcFnftQuery(endpoint)
    this.provider = new IndexerGrpcProviderQuery(endpoint)
    this.bazaar = new IndexerGrpcBazaarQuery(endpoint)
    this.explorer = new IndexerGrpcExplorerQuery(endpoint)
    this.campclash = new IndexerGrpcCampQuery(endpoint)
    this.ohlcv = new IndexerGrpcOHLCVQuery(endpoint)
    this.launchpad = new IndexerGrpcLaunchpadQuery(endpoint)
    this.livestream = new IndexerGrpcLiveStreamQuery(endpoint)
  }

  changeEndpoint(endpoint: string) {
    this.web3gw = new IndexerGrpcWeb3gwQuery(endpoint)
    this.media = new IndexerGrpcMediaQuery(endpoint)
    this.account = new IndexerGrpcAccountQuery(endpoint)
    this.fnft = new IndexerGrpcFnftQuery(endpoint)
    this.provider = new IndexerGrpcProviderQuery(endpoint)
    this.bazaar = new IndexerGrpcBazaarQuery(endpoint)
    this.explorer = new IndexerGrpcExplorerQuery(endpoint)
    this.campclash = new IndexerGrpcCampQuery(endpoint)
    this.ohlcv = new IndexerGrpcOHLCVQuery(endpoint)
    this.launchpad = new IndexerGrpcLaunchpadQuery(endpoint)
    this.livestream = new IndexerGrpcLiveStreamQuery(endpoint)
  }
}
