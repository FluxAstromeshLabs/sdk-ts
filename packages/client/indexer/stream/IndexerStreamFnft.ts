import * as streamService from '../../../../chain/flux/indexer/fnft/query'
import { getGrpcTransport } from '../../../utils'
import BaseIndexerStream from '../../BaseIndexerStream'
import { Subscription } from 'rxjs'
export class IndexerStreamFnft extends BaseIndexerStream {
  protected client: streamService.APIClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new streamService.APIClientImpl(
      new streamService.GrpcWebImpl(endpoint, { transport: getGrpcTransport() })
    )
  }
  getStreamNFTs({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.NFTsRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamNFTs(request)
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
  getStreamHolders({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.HoldersRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamHolders(request)
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
  getStreamClasses({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.ClassesRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }): Subscription {
    try {
      const observable = this.client.StreamClasses(request)
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
