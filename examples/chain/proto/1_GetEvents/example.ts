import * as streamtypes from '../../../../chain/flux/eventstream/v1beta1/query';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

const main = async () => {
  const host = 'http://localhost:9091';
  const cc = new streamtypes.GrpcWebImpl(host, {
    transport: NodeHttpTransport(),
  })
  const client = new streamtypes.QueryClientImpl(cc)

  const req: streamtypes.EventsRequest = {
    height: "1",
    modules: ["fnft"],
    tm_queries: ["block", "block_results"]
  };

  try {
    const res = await client.GetEvents(req)
    console.log(res)
  } catch(err) {
    console.log(err)
  }
}

main()
