import * as livestreamQuery from '../../../../chain/flux/indexer/campclash/livestream'
import BaseIndexerGrpc from '../../BaseIndexerGrpc'
import { Subscription } from 'rxjs'
export class IndexerGrpcLiveStreamQuery extends BaseIndexerGrpc {
  protected client: livestreamQuery.LivestreamServiceClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new livestreamQuery.LivestreamServiceClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async startStream(
    request: Partial<livestreamQuery.StartStreamRequest>,
    callback: (value: livestreamQuery.StartStreamResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.StartStream(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
  }

  async viewStream(
    request: Partial<livestreamQuery.ViewStreamRequest>,
    callback: (value: livestreamQuery.ViewStreamResponse) => void,
    onEndCallback?: (err: any) => void,
    onStatusCallback?: () => void
  ): Promise<Subscription> {
    const stream = this.client.ViewStream(request)
    return stream.subscribe(callback, onEndCallback, onStatusCallback)
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
