import BaseGrpc from '../../BaseGrpc'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
export class ChainGrpcTxService extends BaseGrpc {
  protected client: txservice.ServiceClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new txservice.ServiceClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async broadcastTx(
    txBytes: Uint8Array,
    mode: txservice.BroadcastMode = txservice.BroadcastMode.BROADCAST_MODE_SYNC
  ) {
    try {
      let request = txservice.BroadcastTxRequest.create({ tx_bytes: txBytes, mode })
      let response = await this.retry(() => this.client.BroadcastTx(request))
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
