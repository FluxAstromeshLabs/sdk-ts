import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import * as streamservice from '../../../../chain/flux/eventstream/v1beta1/query';

const main = async () => {
  // init stream client
  const cc = new streamservice.GrpcWebImpl('http://localhost:10337', {
    transport: NodeHttpTransport(),
  })
  const streamClient = new streamservice.QueryClientImpl(cc)

  // stream block
  const req = {
    height: "0",
    modules: [],
    tm_queries: ["block"]
  };

  try {
    const obs = await streamClient.StreamEvents(req)
    obs.subscribe(res => {
      console.log(res.time)
    })
  } catch(err) {
    console.log(err)
  }

}

main()
