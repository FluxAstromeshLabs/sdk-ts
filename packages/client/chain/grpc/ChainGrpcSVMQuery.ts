import BaseGrpc from '../../BaseGrpc'
import * as svmQuery from '../../../../chain/flux/svm/v1beta1/query'

export class ChainGrpcSVMQuery extends BaseGrpc {
  protected client: svmQuery.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new svmQuery.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }
  async programAccounts({
    address
  }: {
    address: string
  }): Promise<svmQuery.AccountsByOwnerResponse> {
    const request = svmQuery.AccountsByOwnerRequest.create({
      address
    })
    const response: svmQuery.AccountsByOwnerResponse = await this.retry(() =>
      this.client.AccountsByOwner(request)
    )
    return response
  }

  async account({ address }: { address: string }): Promise<svmQuery.AccountResponse> {
    const request = svmQuery.AccountRequest.create({
      address
    })
    const response: svmQuery.AccountResponse = await this.retry(() => this.client.Account(request))
    return response
  }
  async getAccountLink(address: string): Promise<svmQuery.AccountLinkResponse> {
    try {
      let request = svmQuery.AccountLinkRequest.create({ address })
      let response = await this.retry(() => this.client.AccountLink(request))
      return response as svmQuery.AccountLinkResponse
    } catch (e) {
      throw e
    }
  }
}
