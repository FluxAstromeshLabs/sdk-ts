import BaseGrpc from '../../BaseGrpc'
import * as oracle from '../../../../chain/flux/oracle/v1beta1/query'
export class ChainGrpcOracleQuery extends BaseGrpc {
  protected client: oracle.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new oracle.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async getPrices(symbols?: string): Promise<oracle.QuerySimpleEntryResponse> {
    try {
      let request = oracle.QuerySimpleEntry.create({ symbols: symbols })
      let response = await this.retry(() => this.client.SimpleEntry(request))
      return response as oracle.QuerySimpleEntryResponse
    } catch (e) {
      throw e
    }
  }
}
