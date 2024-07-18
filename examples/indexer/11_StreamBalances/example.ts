import * as explorertypes from '../../../chain/flux/indexer/explorer/query'
import { IndexerGrpcClient } from '../../../packages'
const main = async () => {
  const host = 'http://localhost:4475'
  const client = new IndexerGrpcClient(host)
  console.log('listening to balance changes')
  try {
    client.explorer.streamBalances(
      {
        address: 'lux1jcltmuhplrdcwp7stlr4hlhlhgd4htqhu86cqx',
        pagination: undefined,
      },
      (res: any) => {
        console.log('stream:', res)
      }
    )
  } catch (err) {
    console.log(err)
  }
}

main()
