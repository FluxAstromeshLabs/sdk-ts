import BaseGrpc from '../../BaseGrpc'
import * as interpoolQuery from '../../../../chain/flux/interpool/v1beta1/query'
export class ChainGrpcInterpoolQuery extends BaseGrpc {
  protected client: interpoolQuery.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new interpoolQuery.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async getPool(
    request: interpoolQuery.QueryPoolRequest
  ): Promise<interpoolQuery.QueryPoolResponse> {
    try {
      let response = await this.retry(() => this.client.Pool(request))
      return response as interpoolQuery.QueryPoolResponse
    } catch (e) {
      throw e
    }
  }
  async getPoolShares(
    request: Partial<interpoolQuery.QueryPoolSharesRequest>
  ): Promise<interpoolQuery.QueryPoolSharesResponse> {
    try {
      let response = await this.retry(() => this.client.PoolShares(request))
      return response as interpoolQuery.QueryPoolSharesResponse
    } catch (e) {
      throw e
    }
  }
}
