import { Subscription } from 'rxjs'
import * as launchpadQuery from '../../../../chain/flux/indexer/campclash/launchpad_query'
import BaseIndexerGrpc from '../../BaseIndexerGrpc'

export class IndexerGrpcLaunchpadQuery extends BaseIndexerGrpc {
  protected client: launchpadQuery.LaunchpadQueryClientImpl

  constructor(endpoint: string) {
    super(endpoint)
    this.client = new launchpadQuery.LaunchpadQueryClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async listProjects(
    request: Partial<launchpadQuery.ListLaunchpadProjectsRequest>
  ): Promise<launchpadQuery.ListLaunchpadProjectsResponse> {
    let response = await this.retry(() => this.client.ListProjects(request))
    return response as launchpadQuery.ListLaunchpadProjectsResponse
  }

  async streamProject(
    request: Partial<launchpadQuery.StreamLaunchpadProjectRequest>,
    callback: (value: launchpadQuery.StreamLaunchpadProjectResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamProject(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listWhitelists(
    request: Partial<launchpadQuery.ListLaunchpadWhitelistsRequest>
  ): Promise<launchpadQuery.ListLaunchpadWhitelistsResponse> {
    let response = await this.retry(() => this.client.ListWhitelists(request))
    return response as launchpadQuery.ListLaunchpadWhitelistsResponse
  }

  async streamWhitelist(
    request: Partial<launchpadQuery.StreamLaunchpadWhitelistRequest>,
    callback: (value: launchpadQuery.StreamLaunchpadWhitelistResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamWhitelist(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listUsers(
    request: Partial<launchpadQuery.ListLaunchpadUsersRequest>
  ): Promise<launchpadQuery.ListLaunchpadUsersResponse> {
    let response = await this.retry(() => this.client.ListUsers(request))
    return response as launchpadQuery.ListLaunchpadUsersResponse
  }

  async streamUsers(
    request: Partial<launchpadQuery.StreamLaunchpadUsersRequest>,
    callback: (value: launchpadQuery.StreamLaunchpadUsersResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamUsers(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listBuys(
    request: Partial<launchpadQuery.ListLaunchpadBuysRequest>
  ): Promise<launchpadQuery.ListLaunchpadBuysResponse> {
    let response = await this.retry(() => this.client.ListBuys(request))
    return response as launchpadQuery.ListLaunchpadBuysResponse
  }

  async streamBuy(
    request: Partial<launchpadQuery.StreamLaunchpadBuyRequest>,
    callback: (value: launchpadQuery.StreamLaunchpadBuyResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamBuy(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
}
