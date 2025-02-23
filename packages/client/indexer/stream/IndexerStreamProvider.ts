import * as streamService from '../../../../chain/flux/indexer/provider/query'
import BaseIndexerStream from '../../BaseIndexerStream'
import { Subscription } from 'rxjs'
export class IndexerStreamProvider extends BaseIndexerStream {
  protected client: streamService.APIClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new streamService.APIClientImpl(this.getGrpcWebImpl(endpoint))
  }
  getStreamBlock({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.ProviderBlockRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamBlock(request)
      return this.subscribe({
        observable,
        callback,
        onEndCallback,
        onStatusCallback
      })
    } catch (e) {
      throw e
    }
  }

  getStreamEvent({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.ProviderEventsRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamEvents(request)
      return this.subscribe({
        observable,
        callback,
        onEndCallback,
        onStatusCallback
      })
    } catch (e) {
      throw e
    }
  }
}
