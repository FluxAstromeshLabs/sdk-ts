import * as streamService from '../../../../chain/flux/stream/v1beta1/query'
export class ChainGrpcStreamEvent {
  protected client: streamService.QueryClientImpl
  constructor(endpoint: string) {
    this.client = new streamService.QueryClientImpl(new streamService.GrpcWebImpl(endpoint, {}))
  }
  async getStreamEvent({
    request,
    callback,
    onEndCallback,
    onStatusCallback
  }: {
    request: streamService.EventsRequest
    callback: Function
    onEndCallback?: Function
    onStatusCallback?: Function
  }) {
    try {
      const subscription = this.client.StreamEvents(request).subscribe({
        next: (response: any) => {
          callback(response)
        },
        error: (err: any) => {
          onStatusCallback && onStatusCallback(err)
        },
        complete: () => {
          onEndCallback && onEndCallback()
        }
      })
      return subscription
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
