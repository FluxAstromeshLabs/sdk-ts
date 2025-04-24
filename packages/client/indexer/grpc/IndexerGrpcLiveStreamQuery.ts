import * as livestreamQuery from '../../../../chain/flux/indexer/campclash/livestream'
import BaseIndexerGrpc from '../../BaseIndexerGrpc'
export class IndexerGrpcLiveStreamQuery extends BaseIndexerGrpc {
  protected client: livestreamQuery.LivestreamServiceClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new livestreamQuery.LivestreamServiceClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async initiate(
    request: Partial<livestreamQuery.InitiateRequest>
  ): Promise<livestreamQuery.InitiateResponse> {
    let response = await this.retry(() => this.client.Initiate(request))
    return response as livestreamQuery.InitiateResponse
  }

  async stopStream(
    request: Partial<livestreamQuery.StopStreamRequest>
  ): Promise<livestreamQuery.StopStreamResponse> {
    let response = await this.retry(() => this.client.StopStream(request))
    return response as livestreamQuery.StopStreamResponse
  }

  async queryStreamInfo(
    request: Partial<livestreamQuery.QueryStreamInfoRequest>
  ): Promise<livestreamQuery.QueryStreamInfoResponse> {
    let response = await this.retry(() => this.client.QueryStreamInfo(request))
    return response as livestreamQuery.QueryStreamInfoResponse
  }
  // create chat token
  async createChatToken(
    request: Partial<livestreamQuery.CreateChatTokenRequest>
  ): Promise<livestreamQuery.CreateChatTokenResponse> {
    let response = await this.retry(() => this.client.CreateChatToken(request))
    return response as livestreamQuery.CreateChatTokenResponse
  }
}
