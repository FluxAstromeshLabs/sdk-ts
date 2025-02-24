import * as streamService from '../../../../chain/flux/indexer/bazaar/query'
import BaseIndexerStream from '../../BaseIndexerStream'
import { Subscription } from 'rxjs'
export class IndexerStreamBazaar extends BaseIndexerStream {
  protected client: streamService.APIClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new streamService.APIClientImpl(this.getGrpcWebImpl(endpoint))
  }

  getStreamProducts({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.ProductsRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamProducts(request)
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
