import { HttpRestClient } from '../utils'
import { StatusCodes } from 'http-status-codes'

/**
 * @hidden
 */
export default class BaseRestConsumer extends HttpRestClient {
  protected retry<TResponse>(
    httpCall: Function,
    retries: number = 1,
    delay: number = 1000
  ): Promise<TResponse> {
    const retryHttpCall = async (attempt = 1): Promise<any> => {
      try {
        return (await httpCall()) as TResponse
      } catch (e: any) {
        if (e.code === StatusCodes.REQUEST_TOO_LONG) {
          throw e
        }

        if (attempt >= retries) {
          throw e
        }

        return new Promise((resolve) =>
          setTimeout(() => resolve(retryHttpCall(attempt + 1)), delay * attempt)
        )
      }
    }

    return retryHttpCall()
  }
}
