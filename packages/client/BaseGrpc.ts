import * as txservice from '../../chain/cosmos/tx/v1beta1/service'
import { getGrpcTransport } from '../utils/grpc'
export default class BaseGrpc extends txservice.GrpcWebImpl {
  protected module: string = ''

  constructor(endpoint: string) {
    super(endpoint, { transport: getGrpcTransport() })
  }

  public getGrpcWebImpl(endpoint: string) {
    return new BaseGrpc(endpoint)
  }

  protected retry<TResponse>(
    grpcCall: Function,
    retries: number = 1,
    delay: number = 1000
  ): Promise<TResponse> {
    const retryGrpcCall = async (attempt = 1): Promise<any> => {
      try {
        return await grpcCall()
      } catch (e: any) {
        if (attempt >= retries) {
          throw e
        }

        return new Promise((resolve) =>
          setTimeout(() => resolve(retryGrpcCall(attempt + 1)), delay * attempt)
        )
      }
    }

    return retryGrpcCall()
  }
}
