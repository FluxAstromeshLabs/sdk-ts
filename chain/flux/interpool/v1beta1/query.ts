// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/interpool/v1beta1/query.proto

/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { InterPool, PoolShare } from "./interpool";

/** Request for querying a specific Pool by pool ID */
export interface QueryPoolRequest {
  /** Pool ID in hex format */
  pool_id: string;
}

/** Response containing the specific Pool information */
export interface QueryPoolResponse {
  pool: InterPool | undefined;
}

/** Request for querying all PoolShares for a specific Pool by pool ID */
export interface QueryPoolSharesRequest {
  /** Pool ID in hex format */
  pool_id: string;
  /** Optional pagination request */
  pagination: PageRequest | undefined;
}

/** Response containing all PoolShares for a specific Pool */
export interface QueryPoolSharesResponse {
  pool_shares: PoolShare[];
  /** Optional pagination response */
  pagination: PageResponse | undefined;
}

function createBaseQueryPoolRequest(): QueryPoolRequest {
  return { pool_id: "" };
}

export const QueryPoolRequest = {
  $type: "flux.interpool.v1beta1.QueryPoolRequest" as const,

  encode(message: QueryPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "") {
      writer.uint32(10).string(message.pool_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolRequest {
    return { pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "" };
  },

  toJSON(message: QueryPoolRequest): unknown {
    const obj: any = {};
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPoolRequest>): QueryPoolRequest {
    return QueryPoolRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPoolRequest>): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    message.pool_id = object.pool_id ?? "";
    return message;
  },
};

function createBaseQueryPoolResponse(): QueryPoolResponse {
  return { pool: undefined };
}

export const QueryPoolResponse = {
  $type: "flux.interpool.v1beta1.QueryPoolResponse" as const,

  encode(message: QueryPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      InterPool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool = InterPool.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    return { pool: isSet(object.pool) ? InterPool.fromJSON(object.pool) : undefined };
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = InterPool.toJSON(message.pool);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPoolResponse>): QueryPoolResponse {
    return QueryPoolResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPoolResponse>): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool = (object.pool !== undefined && object.pool !== null) ? InterPool.fromPartial(object.pool) : undefined;
    return message;
  },
};

function createBaseQueryPoolSharesRequest(): QueryPoolSharesRequest {
  return { pool_id: "", pagination: undefined };
}

export const QueryPoolSharesRequest = {
  $type: "flux.interpool.v1beta1.QueryPoolSharesRequest" as const,

  encode(message: QueryPoolSharesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "") {
      writer.uint32(10).string(message.pool_id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolSharesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolSharesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolSharesRequest {
    return {
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPoolSharesRequest): unknown {
    const obj: any = {};
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPoolSharesRequest>): QueryPoolSharesRequest {
    return QueryPoolSharesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPoolSharesRequest>): QueryPoolSharesRequest {
    const message = createBaseQueryPoolSharesRequest();
    message.pool_id = object.pool_id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPoolSharesResponse(): QueryPoolSharesResponse {
  return { pool_shares: [], pagination: undefined };
}

export const QueryPoolSharesResponse = {
  $type: "flux.interpool.v1beta1.QueryPoolSharesResponse" as const,

  encode(message: QueryPoolSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pool_shares) {
      PoolShare.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_shares.push(PoolShare.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolSharesResponse {
    return {
      pool_shares: globalThis.Array.isArray(object?.pool_shares)
        ? object.pool_shares.map((e: any) => PoolShare.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPoolSharesResponse): unknown {
    const obj: any = {};
    if (message.pool_shares?.length) {
      obj.pool_shares = message.pool_shares.map((e) => PoolShare.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPoolSharesResponse>): QueryPoolSharesResponse {
    return QueryPoolSharesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPoolSharesResponse>): QueryPoolSharesResponse {
    const message = createBaseQueryPoolSharesResponse();
    message.pool_shares = object.pool_shares?.map((e) => PoolShare.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

export interface Query {
  /** Query a specific Pool by pool ID in hex format */
  Pool(request: DeepPartial<QueryPoolRequest>, metadata?: grpc.Metadata): Promise<QueryPoolResponse>;
  /** Query all PoolShares for a specific Pool by pool ID in hex format */
  PoolShares(request: DeepPartial<QueryPoolSharesRequest>, metadata?: grpc.Metadata): Promise<QueryPoolSharesResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Pool = this.Pool.bind(this);
    this.PoolShares = this.PoolShares.bind(this);
  }

  Pool(request: DeepPartial<QueryPoolRequest>, metadata?: grpc.Metadata): Promise<QueryPoolResponse> {
    return this.rpc.unary(QueryPoolDesc, QueryPoolRequest.fromPartial(request), metadata);
  }

  PoolShares(request: DeepPartial<QueryPoolSharesRequest>, metadata?: grpc.Metadata): Promise<QueryPoolSharesResponse> {
    return this.rpc.unary(QueryPoolSharesDesc, QueryPoolSharesRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.interpool.v1beta1.Query" };

export const QueryPoolDesc: UnaryMethodDefinitionish = {
  methodName: "Pool",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPoolRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPoolResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPoolSharesDesc: UnaryMethodDefinitionish = {
  methodName: "PoolShares",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPoolSharesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPoolSharesResponse.decode(data);
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
