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

export interface ListStrategiesRequest {
}

export interface ListStrategiesResponse {
  strategies: Strategy[];
}

export interface ListStrategiesByOwnerRequest {
  owner: string;
}

export interface GetStrategyByIdRequest {
  id: string;
}

export interface GetStrategyByIdResponse {
  strategy: Strategy | undefined;
}

function createBaseListStrategiesRequest(): ListStrategiesRequest {
  return {};
}

export const ListStrategiesRequest = {
  $type: "flux.strategy.v1beta1.ListStrategiesRequest" as const,

  encode(_: ListStrategiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStrategiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStrategiesRequest();
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

  fromJSON(_: any): ListStrategiesRequest {
    return {};
  },

  toJSON(_: ListStrategiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ListStrategiesRequest>): ListStrategiesRequest {
    return ListStrategiesRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ListStrategiesRequest>): ListStrategiesRequest {
    const message = createBaseListStrategiesRequest();
    return message;
  },
};

function createBaseListStrategiesResponse(): ListStrategiesResponse {
  return { strategies: [] };
}

export const ListStrategiesResponse = {
  $type: "flux.strategy.v1beta1.ListStrategiesResponse" as const,

  encode(message: ListStrategiesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.strategies) {
      Strategy.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStrategiesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStrategiesResponse();
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

  fromJSON(object: any): ListStrategiesResponse {
    return {
      strategies: globalThis.Array.isArray(object?.strategies)
        ? object.strategies.map((e: any) => Strategy.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStrategiesResponse): unknown {
    const obj: any = {};
    if (message.strategies?.length) {
      obj.strategies = message.strategies.map((e) => Strategy.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ListStrategiesResponse>): ListStrategiesResponse {
    return ListStrategiesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListStrategiesResponse>): ListStrategiesResponse {
    const message = createBaseListStrategiesResponse();
    message.strategies = object.strategies?.map((e) => Strategy.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListStrategiesByOwnerRequest(): ListStrategiesByOwnerRequest {
  return { owner: "" };
}

export const ListStrategiesByOwnerRequest = {
  $type: "flux.strategy.v1beta1.ListStrategiesByOwnerRequest" as const,

  encode(message: ListStrategiesByOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListStrategiesByOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListStrategiesByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListStrategiesByOwnerRequest {
    return { owner: isSet(object.owner) ? globalThis.String(object.owner) : "" };
  },

  toJSON(message: ListStrategiesByOwnerRequest): unknown {
    const obj: any = {};
    if (message.owner !== undefined) {
      obj.owner = message.owner;
    }
    return obj;
  },

  create(base?: DeepPartial<ListStrategiesByOwnerRequest>): ListStrategiesByOwnerRequest {
    return ListStrategiesByOwnerRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListStrategiesByOwnerRequest>): ListStrategiesByOwnerRequest {
    const message = createBaseListStrategiesByOwnerRequest();
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseGetStrategyByIdRequest(): GetStrategyByIdRequest {
  return { id: "" };
}

export const GetStrategyByIdRequest = {
  $type: "flux.strategy.v1beta1.GetStrategyByIdRequest" as const,

  encode(message: GetStrategyByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStrategyByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStrategyByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetStrategyByIdRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetStrategyByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<GetStrategyByIdRequest>): GetStrategyByIdRequest {
    return GetStrategyByIdRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetStrategyByIdRequest>): GetStrategyByIdRequest {
    const message = createBaseGetStrategyByIdRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetStrategyByIdResponse(): GetStrategyByIdResponse {
  return { strategy: undefined };
}

export const GetStrategyByIdResponse = {
  $type: "flux.strategy.v1beta1.GetStrategyByIdResponse" as const,

  encode(message: GetStrategyByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.strategy !== undefined) {
      Strategy.encode(message.strategy, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStrategyByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStrategyByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.strategy = Strategy.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetStrategyByIdResponse {
    return { strategy: isSet(object.strategy) ? Strategy.fromJSON(object.strategy) : undefined };
  },

  toJSON(message: GetStrategyByIdResponse): unknown {
    const obj: any = {};
    if (message.strategy !== undefined) {
      obj.strategy = Strategy.toJSON(message.strategy);
    }
    return obj;
  },

  create(base?: DeepPartial<GetStrategyByIdResponse>): GetStrategyByIdResponse {
    return GetStrategyByIdResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetStrategyByIdResponse>): GetStrategyByIdResponse {
    const message = createBaseGetStrategyByIdResponse();
    message.strategy = (object.strategy !== undefined && object.strategy !== null)
      ? Strategy.fromPartial(object.strategy)
      : undefined;
    return message;
  },
};

export interface Query {
  ListStrategies(
    request: DeepPartial<ListStrategiesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListStrategiesResponse>;
  ListStrategiesByOwner(
    request: DeepPartial<ListStrategiesByOwnerRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListStrategiesResponse>;
  GetStrategyById(
    request: DeepPartial<GetStrategyByIdRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetStrategyByIdResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListStrategies = this.ListStrategies.bind(this);
    this.ListStrategiesByOwner = this.ListStrategiesByOwner.bind(this);
    this.GetStrategyById = this.GetStrategyById.bind(this);
  }

  ListStrategies(
    request: DeepPartial<ListStrategiesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListStrategiesResponse> {
    return this.rpc.unary(QueryListStrategiesDesc, ListStrategiesRequest.fromPartial(request), metadata);
  }

  ListStrategiesByOwner(
    request: DeepPartial<ListStrategiesByOwnerRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListStrategiesResponse> {
    return this.rpc.unary(QueryListStrategiesByOwnerDesc, ListStrategiesByOwnerRequest.fromPartial(request), metadata);
  }

  GetStrategyById(
    request: DeepPartial<GetStrategyByIdRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetStrategyByIdResponse> {
    return this.rpc.unary(QueryGetStrategyByIdDesc, GetStrategyByIdRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.strategy.v1beta1.Query" };

export const QueryListStrategiesDesc: UnaryMethodDefinitionish = {
  methodName: "ListStrategies",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListStrategiesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListStrategiesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryListStrategiesByOwnerDesc: UnaryMethodDefinitionish = {
  methodName: "ListStrategiesByOwner",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListStrategiesByOwnerRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListStrategiesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryGetStrategyByIdDesc: UnaryMethodDefinitionish = {
  methodName: "GetStrategyById",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetStrategyByIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetStrategyByIdResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
