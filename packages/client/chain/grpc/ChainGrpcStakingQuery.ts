import BaseGrpc from '../../BaseGrpc'
import * as stakingQuery from '../../../../chain/cosmos/staking/v1beta1/query'
export class ChainGrpcStakingQuery extends BaseGrpc {
  protected client: stakingQuery.QueryClientImpl
  constructor(endpoint: string) {
    super(endpoint)
    this.client = new stakingQuery.QueryClientImpl(this.getGrpcWebImpl(endpoint))
  }

  async getValidators({
    status,
    pagination
  }: {
    status?: string
    pagination?: any
  }): Promise<stakingQuery.QueryValidatorsResponse> {
    try {
      const request = stakingQuery.QueryValidatorsRequest.create({
        status,
        pagination
      })
      const response = await this.retry(() => this.client.Validators(request))
      return response as stakingQuery.QueryValidatorsResponse
    } catch (e) {
      throw e
    }
  }
  async getValidator({
    validator_addr
  }: {
    validator_addr: string
  }): Promise<stakingQuery.QueryValidatorResponse> {
    try {
      const request = stakingQuery.QueryValidatorRequest.create({
        validator_addr
      })
      const response = await this.retry(() => this.client.Validator(request))
      return response as stakingQuery.QueryValidatorResponse
    } catch (e) {
      throw e
    }
  }
  async getValidatorDelegations({
    validator_addr
  }: {
    validator_addr: string
  }): Promise<stakingQuery.QueryValidatorDelegationsResponse> {
    try {
      const request = stakingQuery.QueryValidatorDelegationsRequest.create({
        validator_addr
      })
      const response = await this.retry(() => this.client.ValidatorDelegations(request))
      return response as stakingQuery.QueryValidatorDelegationsResponse
    } catch (e) {
      throw e
    }
  }

  async getDelegation({
    delegator_addr,
    validator_addr
  }: {
    delegator_addr: string
    validator_addr: string
  }): Promise<stakingQuery.QueryDelegationResponse> {
    try {
      const request = stakingQuery.QueryDelegationRequest.create({
        delegator_addr,
        validator_addr
      })
      const response = await this.retry(() => this.client.Delegation(request))
      return response as stakingQuery.QueryDelegationResponse
    } catch (e) {
      throw e
    }
  }
  async getDelegatorDelegations({
    delegator_addr
  }: {
    delegator_addr: string
  }): Promise<stakingQuery.QueryDelegatorDelegationsResponse> {
    try {
      const request = stakingQuery.QueryDelegatorDelegationsRequest.create({
        delegator_addr
      })
      const response = await this.retry(() => this.client.DelegatorDelegations(request))
      return response as stakingQuery.QueryDelegatorDelegationsResponse
    } catch (e) {
      throw e
    }
  }
  async getDelegatorUnbondingDelegations({
    delegator_addr
  }: {
    delegator_addr: string
  }): Promise<stakingQuery.QueryDelegatorUnbondingDelegationsResponse> {
    try {
      const request = stakingQuery.QueryDelegatorUnbondingDelegationsRequest.create({
        delegator_addr
      })
      const response = await this.retry(() => this.client.DelegatorUnbondingDelegations(request))
      return response as stakingQuery.QueryDelegatorUnbondingDelegationsResponse
    } catch (e) {
      throw e
    }
  }
  async getRedelegations({
    delegator_addr,
    src_validator_addr,
    dst_validator_addr
  }: {
    delegator_addr: string
    src_validator_addr: string
    dst_validator_addr: string
  }): Promise<stakingQuery.QueryRedelegationsResponse> {
    try {
      const request = stakingQuery.QueryRedelegationsRequest.create({
        delegator_addr,
        src_validator_addr,
        dst_validator_addr
      })
      const response = await this.retry(() => this.client.Redelegations(request))
      return response as stakingQuery.QueryRedelegationsResponse
    } catch (e) {
      throw e
    }
  }
  async getDelegatorValidators({
    delegator_addr
  }: {
    delegator_addr: string
  }): Promise<stakingQuery.QueryDelegatorValidatorsResponse> {
    try {
      const request = stakingQuery.QueryDelegatorValidatorsRequest.create({
        delegator_addr
      })
      const response = await this.retry(() => this.client.DelegatorValidators(request))
      return response as stakingQuery.QueryDelegatorValidatorsResponse
    } catch (e) {
      throw e
    }
  }
  async getDelegatorValidator({
    delegator_addr,
    validator_addr
  }: {
    delegator_addr: string
    validator_addr: string
  }): Promise<stakingQuery.QueryDelegatorValidatorResponse> {
    try {
      const request = stakingQuery.QueryDelegatorValidatorRequest.create({
        delegator_addr,
        validator_addr
      })
      const response = await this.retry(() => this.client.DelegatorValidator(request))
      return response as stakingQuery.QueryDelegatorValidatorResponse
    } catch (e) {
      throw e
    }
  }
  async getHistoricalInfo({
    height
  }: {
    height: string
  }): Promise<stakingQuery.QueryHistoricalInfoResponse> {
    try {
      const request = stakingQuery.QueryHistoricalInfoRequest.create({
        height
      })
      const response = await this.retry(() => this.client.HistoricalInfo(request))
      return response as stakingQuery.QueryHistoricalInfoResponse
    } catch (e) {
      throw e
    }
  }
  async getParams(): Promise<stakingQuery.QueryParamsResponse> {
    try {
      const request = stakingQuery.QueryParamsRequest.create({})
      const response = await this.retry(() => this.client.Params(request))
      return response as stakingQuery.QueryParamsResponse
    } catch (e) {
      throw e
    }
  }
  async getPool(): Promise<stakingQuery.QueryPoolResponse> {
    try {
      const request = stakingQuery.QueryPoolRequest.create({})
      const response = await this.retry(() => this.client.Pool(request))
      return response as stakingQuery.QueryPoolResponse
    } catch (e) {
      throw e
    }
  }
}
