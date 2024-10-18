import { BaseExample } from '../BaseExample'
import * as chainFluxStrategyV1betaTx from '../../../../chain/flux/strategy/v1beta1/tx'
import { Plane } from '../../../../chain/flux/astromesh/v1beta1/tx'
const main = async () => {
  const wallet = BaseExample.walletFlux1
  const { luxAddr: sender } = BaseExample.getWalletInfo(wallet)
  const astroportContractAddress = 'lux14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sm3tpfk'
  //make sure intentSolverId's supported apps include astroport dApp
  const intentSolverId = 'c1799de620a0db88b41294f96ece40088aa747ac13fb54ccefbf1e71fb3af9b9'
  const msg = chainFluxStrategyV1betaTx.MsgVerifyStrategy.create({
    sender,
    contract_address: astroportContractAddress,
    plane: Plane.WASM,
    strategy_id: intentSolverId
  })
  await BaseExample.broadcastMsg(msg, chainFluxStrategyV1betaTx.MsgVerifyStrategy, wallet)
}

main()
