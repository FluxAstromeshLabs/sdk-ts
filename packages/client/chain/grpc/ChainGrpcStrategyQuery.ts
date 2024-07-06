import BaseGrpc from '../../BaseGrpc'
import * as chainFluxStrategyV1beta1Query from '../../../../chain/flux/strategy/v1beta1/query'
export class ChainGrpcStrategyQuery extends BaseGrpc {
  protected client: chainFluxStrategyV1beta1Query.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new chainFluxStrategyV1beta1Query.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async listStrategies(
    request: any
  ): Promise<chainFluxStrategyV1beta1Query.ListStrategiesResponse> {
    const response: chainFluxStrategyV1beta1Query.ListStrategiesResponse = await this.retry(() =>
      this.client.ListStrategies(request)
    )
    return response
  }
  async getStrategyById(
    request: chainFluxStrategyV1beta1Query.GetStrategyByIdRequest
  ): Promise<chainFluxStrategyV1beta1Query.GetStrategyByIdResponse> {
    const response: chainFluxStrategyV1beta1Query.GetStrategyByIdResponse = await this.retry(() =>
      this.client.GetStrategyById(request)
    )
    return response
  }
}
