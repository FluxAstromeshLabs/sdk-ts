import BaseIndexerGrpc from '../../BaseIndexerGrpc'
import * as campclashQuery from '../../../../chain/flux/indexer/campclash/camp_query'
import { Subscription } from 'rxjs'
export class IndexerGrpcCampQuery extends BaseIndexerGrpc {
  protected client: campclashQuery.CampclashQueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new campclashQuery.CampclashQueryClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async listProjects(
    request: Partial<campclashQuery.ListProjectsRequest>
  ): Promise<campclashQuery.ListProjectsResponse> {
    let response = await this.retry(() => this.client.ListProjects(request))
    return response as campclashQuery.ListProjectsResponse
  }

  async streamProject(
    request: Partial<campclashQuery.StreamProjectRequest>,
    callback: (value: campclashQuery.StreamProjectResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamProject(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listBalances(
    request: Partial<campclashQuery.ListBalancesRequest>
  ): Promise<campclashQuery.ListBalancesResponse> {
    let response = await this.retry(() => this.client.ListBalances(request))
    return response as campclashQuery.ListBalancesResponse
  }

  async streamBalances(
    request: Partial<campclashQuery.StreamBalancesRequest>,
    callback: (value: campclashQuery.StreamBalancesResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamBalances(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async listTrades(
    request: Partial<campclashQuery.ListTradesRequest>
  ): Promise<campclashQuery.ListTradesResponse> {
    let response = await this.retry(() => this.client.ListTrades(request))
    return response as campclashQuery.ListTradesResponse
  }

  async streamTrades(
    request: Partial<campclashQuery.StreamTradesRequest>,
    callback: (value: campclashQuery.StreamTradesResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamTrades(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
  async listComments(
    request: Partial<campclashQuery.ListCommentsRequest>
  ): Promise<campclashQuery.ListCommentsResponse> {
    let response = await this.retry(() => this.client.ListComments(request))
    return response as campclashQuery.ListCommentsResponse
  }
  async postComment(
    request: Partial<campclashQuery.PostCommentRequest>
  ): Promise<campclashQuery.PostCommentResponse> {
    let response = await this.retry(() => this.client.PostComment(request))
    return response as campclashQuery.PostCommentResponse
  }
  async streamComments(
    request: Partial<campclashQuery.StreamCommentsRequest>,
    callback: (value: campclashQuery.StreamCommentsResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamComments(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
  async getLeaderboard(
    request: Partial<campclashQuery.GetLeaderboardRequest>
  ): Promise<campclashQuery.GetLeaderboardResponse> {
    let response = await this.retry(() => this.client.GetLeaderboard(request))
    return response as campclashQuery.GetLeaderboardResponse
  }
  async listChallenge(
    request: Partial<campclashQuery.ListChallengeRequest>
  ): Promise<campclashQuery.ListChallengeResponse> {
    let response = await this.retry(() => this.client.ListChallenge(request))
    return response as campclashQuery.ListChallengeResponse
  }
  // StreamChallengeRequest
  async streamChallenge(
    request: Partial<campclashQuery.StreamChallengeRequest>,
    callback: (value: campclashQuery.StreamChallengeResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamChallenge(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
  // ListChallengeClaimableRequest
  async listChallengeClaimable(
    request: Partial<campclashQuery.ListChallengeClaimableRequest>
  ): Promise<campclashQuery.ListChallengeClaimableResponse> {
    let response = await this.retry(() => this.client.ListChallengeClaimable(request))
    return response as campclashQuery.ListChallengeClaimableResponse
  }
  // StreamChallengeClaimableRequest
  async streamChallengeClaimable(
    request: Partial<campclashQuery.StreamChallengeClaimableRequest>,
    callback: (value: campclashQuery.StreamChallengeClaimableResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StreamChallengeClaimable(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }
}
