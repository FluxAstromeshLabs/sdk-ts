import BaseGrpc from '../../BaseGrpc'
import * as astromeshQuery from '../../../../chain/flux/astromesh/v1beta1/query'
export class ChainGrpcAstromeshQuery extends BaseGrpc {
  protected client: astromeshQuery.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new astromeshQuery.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async getDenomLink(
    request: astromeshQuery.QueryDenomLinkRequest
  ): Promise<astromeshQuery.QueryDenomLinkResponse> {
    try {
      let response = await this.retry(() => this.client.DenomLink(request))
      return response as astromeshQuery.QueryDenomLinkResponse
    } catch (e) {
      throw e
    }
  }
}
