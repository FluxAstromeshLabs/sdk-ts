// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               unknown
// source: flux/strategy/v1beta1/query.proto

/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Strategy } from "./strategy";

export interface ListStrategyRequest {
}

export interface ListStrategyResponse {
  strategies: Strategy[];
}

function createBaseListStrategyRequest(): ListStrategyRequest {
  return {};
}

export const ListStrategyRequest = {
  $type: "flux.strategy.v1beta1.ListStrategyRequest" as const,

  encode(_: ListStrategyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStrategyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStrategyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ListStrategyRequest {
    return {};
  },

  toJSON(_: ListStrategyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ListStrategyRequest>): ListStrategyRequest {
    return ListStrategyRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ListStrategyRequest>): ListStrategyRequest {
    const message = createBaseListStrategyRequest();
    return message;
  },
};

function createBaseListStrategyResponse(): ListStrategyResponse {
  return { strategies: [] };
}

export const ListStrategyResponse = {
  $type: "flux.strategy.v1beta1.ListStrategyResponse" as const,

  encode(message: ListStrategyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.strategies) {
      Strategy.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStrategyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStrategyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.strategies.push(Strategy.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListStrategyResponse {
    return {
      strategies: globalThis.Array.isArray(object?.strategies)
        ? object.strategies.map((e: any) => Strategy.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStrategyResponse): unknown {
    const obj: any = {};
    if (message.strategies?.length) {
      obj.strategies = message.strategies.map((e) => Strategy.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ListStrategyResponse>): ListStrategyResponse {
    return ListStrategyResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListStrategyResponse>): ListStrategyResponse {
    const message = createBaseListStrategyResponse();
    message.strategies = object.strategies?.map((e) => Strategy.fromPartial(e)) || [];
    return message;
  },
};

export interface Query {
  ListStrategy(request: DeepPartial<ListStrategyRequest>, metadata?: grpc.Metadata): Promise<ListStrategyResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListStrategy = this.ListStrategy.bind(this);
  }

  ListStrategy(request: DeepPartial<ListStrategyRequest>, metadata?: grpc.Metadata): Promise<ListStrategyResponse> {
    return this.rpc.unary(QueryListStrategyDesc, ListStrategyRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.strategy.v1beta1.Query" };

export const QueryListStrategyDesc: UnaryMethodDefinitionish = {
  methodName: "ListStrategy",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListStrategyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListStrategyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}