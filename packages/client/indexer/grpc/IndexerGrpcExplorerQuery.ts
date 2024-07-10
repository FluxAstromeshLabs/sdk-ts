import BaseIndexerGrpc from '../../BaseIndexerGrpc'
import * as explorerQuery from '../../../../chain/flux/indexer/explorer/query'
import {
  ListEvmContractsRequest,
  ListEvmContractsResponse
} from '../../../../chain/flux/indexer/explorer/query'
import { PageRequest } from '../../../../chain/cosmos/base/query/v1beta1/pagination'
import { Strategy } from '../../../../chain/flux/strategy/v1beta1/strategy'
export class IndexerGrpcExplorerQuery extends BaseIndexerGrpc {
  protected client: explorerQuery.APIClientImpl

  constructor(endpoint: string) {
    super(endpoint)
    this.client = new explorerQuery.APIClientImpl(this.getGrpcWebImpl(endpoint))
  }

  public async listEvmContracts({
    address,
    pagination
  }: {
    address?: string
    pagination?: PageRequest
  }): Promise<ListEvmContractsResponse> {
    const request = ListEvmContractsRequest.create({
      address: address,
      pagination: pagination
    })
    const response: explorerQuery.ListEvmContractsResponse = await this.retry(() =>
      this.client.ListEvmContracts(request)
    )
    return response
  }
  async listStrategies(
    request: explorerQuery.ListStrategiesRequest
  ): Promise<explorerQuery.ListStrategiesResponse> {
    const response: explorerQuery.ListStrategiesResponse = await this.retry(() =>
      this.client.ListStrategies(request)
    )
    return response
  }

  async getStrategyById(id: string): Promise<{
    strategy: Strategy | undefined
  }> {
    const response: explorerQuery.ListStrategiesResponse = await this.retry(() =>
      this.client.ListStrategies({
        id: id
      })
    )
    return {
      strategy: response.strategies[0] || undefined
    }
  }
  async listStrategiesByOwner(
    request: explorerQuery.ListStrategiesByOwnerRequest
  ): Promise<explorerQuery.ListStrategiesResponse> {
    const response: explorerQuery.ListStrategiesResponse = await this.retry(() =>
      this.client.ListStrategiesByOwner(request)
    )
    return response
  }
}
