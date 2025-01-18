import BaseIndexerGrpc from '../../BaseGrpc'
import * as ohlcvQuery from '../../../../chain/flux/indexer/ohlcv/ohlcv'
export class IndexerGrpcOHLCVQuery extends BaseIndexerGrpc {
  protected client: ohlcvQuery.APIClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new ohlcvQuery.APIClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async getOHLCV(params: ohlcvQuery.QueryRequest): Promise<ohlcvQuery.QueryResponse> {
    const res = await this.retry(() => this.client.Query(params))
    return res as ohlcvQuery.QueryResponse
  }

  async getSymbols(params: ohlcvQuery.ListSymbolsRequest): Promise<ohlcvQuery.ListSymbolsResponse> {
    const res = await this.retry(() => this.client.ListSymbols(params))
    return res as ohlcvQuery.ListSymbolsResponse
  }
}
