import BaseGrpc from '../../BaseGrpc'
import * as bankQuery from '../../../../chain/cosmos/bank/v1beta1/query'
export class ChainGrpcBankQuery extends BaseGrpc {
  protected client: bankQuery.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new bankQuery.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async getAllBalances(address: string): Promise<bankQuery.QueryAllBalancesResponse> {
    try {
      const request = bankQuery.QueryAllBalancesRequest.create({
        address: address,
        pagination: undefined,
        resolve_denom: false
      })
      let response = await this.retry(() => this.client.AllBalances(request))
      return response as bankQuery.QueryAllBalancesResponse
    } catch (e) {
      throw e
    }
  }
  async getBalance(address: string, denom: string): Promise<bankQuery.QueryBalanceResponse> {
    try {
      const request = bankQuery.QueryBalanceRequest.create({
        address: address,
        denom: denom
      })
      let response = await this.retry(() => this.client.Balance(request))
      return response as bankQuery.QueryBalanceResponse
    } catch (e) {
      throw e
    }
  }
  async getSupplyOf(denom: string): Promise<bankQuery.QuerySupplyOfResponse> {
    try {
      const request = bankQuery.QuerySupplyOfRequest.create({
        denom: denom
      })
      let response = await this.retry(() => this.client.SupplyOf(request))
      return response as bankQuery.QuerySupplyOfResponse
    } catch (e) {
      throw e
    }
  }
}
