import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
// import { ChainGrpcDistributionQuery } from '../../../../packages'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as distributionQuery from '../../../../chain/cosmos/distribution/v1beta1/query'
const main = async () => {
  // init clients

  const cc = new txservice.GrpcWebImpl('https://testnet.lcd.astromesh.xyz', {
    transport: NodeHttpTransport()
  })
  const distributionClient = new distributionQuery.QueryClientImpl(cc)
  try {
    const res = await distributionClient.DelegationRewards({
      delegator_address: 'lux1vt79neuamq3mg4f8maxtkzxh2eh8kgzs2xudm8',
      validator_address: 'luxvaloper1qry5x2d383v9hkqc0fpez53yluyxvey2c957m4'
    })
    console.log(JSON.stringify(res.rewards, null, 2))
  } catch (err: any) {
    console.log(err.message)
  }
}

main()
