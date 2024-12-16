import BaseIndexerGrpc from '../../BaseIndexerGrpc'
import * as explorerQuery from '../../../../chain/flux/indexer/explorer/query'
import {
  ListEvmContractsRequest,
  ListEvmContractsResponse
} from '../../../../chain/flux/indexer/explorer/query'
import { PageRequest } from '../../../../chain/cosmos/base/query/v1beta1/pagination'
import { Strategy } from '../../../../chain/flux/strategy/v1beta1/strategy'
import { Subscription } from 'rxjs'

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

  async getBalances(
    request: explorerQuery.BalancesRequest
  ): Promise<explorerQuery.BalancesResponse> {
    const response: explorerQuery.BalancesResponse = await this.retry(() =>
      this.client.Balances(request)
    )
    return response
  }

  async streamBalances(
    request: Partial<explorerQuery.BalancesRequest>,
    callback: (value: explorerQuery.StreamBalanceResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamBalances(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
  async getMetrics(): Promise<explorerQuery.GetMetricsResponse> {
    const response: explorerQuery.GetMetricsResponse = await this.retry(() =>
      this.client.GetMetrics({})
    )
    return response
  }

  async listStrategyTriggersById(
    request: Partial<explorerQuery.ListStrategyTriggerByIdRequest>
  ): Promise<explorerQuery.ListStrategyTriggerByIdResponse> {
    const response: explorerQuery.ListStrategyTriggerByIdResponse = await this.retry(() =>
      this.client.ListStrategyTriggersById(request)
    )
    return response
  }
  async streamStrategyTriggers(
    id: string[],
    callback: (value: explorerQuery.StreamStrategyTriggerResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamStrategyTriggers({
      id
    })
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async streamStrategies(
    request: explorerQuery.StreamStrategiesRequest,
    callback: (value: explorerQuery.StreamStrategiesResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamStrategies(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listDriftOrders(market_name?: string): Promise<explorerQuery.ListDriftOrdersResponse> {
    const response: explorerQuery.ListDriftOrdersResponse = await this.retry(() =>
      this.client.ListDriftOrders({
        market_name
      })
    )
    return response
  }

  async listFillableDriftJITOrders(
    params: explorerQuery.ListFillableDriftJITOrdersRequest
  ): Promise<explorerQuery.ListFillableDriftJITOrdersResponse> {
    const response: explorerQuery.ListFillableDriftJITOrdersResponse = await this.retry(() =>
      this.client.ListFillableDriftJITOrders(params)
    )
    return response
  }

  async streamDriftOrders(
    request: Partial<explorerQuery.StreamDriftOrdersRequest>,
    callback: (value: explorerQuery.StreamDriftOrdersResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamDriftOrders(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
  async listDumpsadCoins(
    request: Partial<explorerQuery.ListDumpsadCoinsRequest>
  ): Promise<explorerQuery.ListDumpsadCoinsResponse> {
    const response: explorerQuery.ListDumpsadCoinsResponse = await this.retry(() =>
      this.client.ListDumpsadCoins(request)
    )
    return response
  }
  async streamDumpsadCoins(
    request: Partial<explorerQuery.StreamDumpsadCoinsRequest>,
    callback: (value: explorerQuery.StreamDumpsadCoinsResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamDumpsadCoins(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
}
