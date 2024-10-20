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
  ): Promise<any> {
    try {
      let request = txservice.BroadcastTxRequest.create({ tx_bytes: txBytes, mode })
      let response = await this.retry(() => this.client.BroadcastTx(request))
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async simulate(txBytes: Uint8Array) {
    try {
      let request = txservice.SimulateRequest.create({ tx_bytes: txBytes })
      let response = await this.retry(() => this.client.Simulate(request))
      return response as txservice.SimulateResponse
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
