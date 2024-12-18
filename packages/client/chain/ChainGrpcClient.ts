import {
  ChainGrpcAuthQuery,
  ChainGrpcBankQuery,
  ChainGrpcFnftQuery,
  ChainGrpcBazaarQuery,
  ChainGrpcTxService,
  ChainGrpcEVMQuery,
  ChainGrpcCosmwasmWasmQuery,
  ChainGrpcSVMQuery,
  ChainGrpcStrategyQuery,
  ChainGrpcOracleQuery
} from './grpc'
export class ChainGrpcClient {
  transaction: ChainGrpcTxService
  auth: ChainGrpcAuthQuery
  bank: ChainGrpcBankQuery
  fnft: ChainGrpcFnftQuery
  bazaar: ChainGrpcBazaarQuery
  evm: ChainGrpcEVMQuery
  cosmwasmWasm: ChainGrpcCosmwasmWasmQuery
  svm: ChainGrpcSVMQuery
  strategy: ChainGrpcStrategyQuery
  oracle: ChainGrpcOracleQuery
  constructor(endpoint: string) {
    this.transaction = new ChainGrpcTxService(endpoint)
    this.auth = new ChainGrpcAuthQuery(endpoint)
    this.bank = new ChainGrpcBankQuery(endpoint)
    this.fnft = new ChainGrpcFnftQuery(endpoint)
    this.bazaar = new ChainGrpcBazaarQuery(endpoint)
    this.evm = new ChainGrpcEVMQuery(endpoint)
    this.cosmwasmWasm = new ChainGrpcCosmwasmWasmQuery(endpoint)
    this.svm = new ChainGrpcSVMQuery(endpoint)
    this.strategy = new ChainGrpcStrategyQuery(endpoint)
    this.oracle = new ChainGrpcOracleQuery(endpoint)
  }
  changeEndpoint(endpoint: string) {
    this.transaction = new ChainGrpcTxService(endpoint)
    this.auth = new ChainGrpcAuthQuery(endpoint)
    this.bank = new ChainGrpcBankQuery(endpoint)
    this.fnft = new ChainGrpcFnftQuery(endpoint)
    this.bazaar = new ChainGrpcBazaarQuery(endpoint)
    this.evm = new ChainGrpcEVMQuery(endpoint)
    this.cosmwasmWasm = new ChainGrpcCosmwasmWasmQuery(endpoint)
    this.svm = new ChainGrpcSVMQuery(endpoint)
    this.strategy = new ChainGrpcStrategyQuery(endpoint)
    this.oracle = new ChainGrpcOracleQuery(endpoint)
  }
}
