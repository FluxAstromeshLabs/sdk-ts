// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: ibc/applications/transfer/v2/queryv2.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Denom } from "./token";

/**
 * QueryDenomRequest is the request type for the Query/Denom RPC
 * method
 */
export interface QueryDenomRequest {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the on chain denomination. */
  hash: string;
}

/**
 * QueryDenomResponse is the response type for the Query/Denom RPC
 * method.
 */
export interface QueryDenomResponse {
  /** denom returns the requested denomination. */
  denom: Denom | undefined;
}

/**
 * QueryDenomsRequest is the request type for the Query/Denoms RPC
 * method
 */
export interface QueryDenomsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDenomsResponse is the response type for the Query/Denoms RPC
 * method.
 */
export interface QueryDenomsResponse {
  /** denoms returns all denominations. */
  denoms: Denom[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

function createBaseQueryDenomRequest(): QueryDenomRequest {
  return { hash: "" };
}

export const QueryDenomRequest: MessageFns<QueryDenomRequest, "ibc.applications.transfer.v2.QueryDenomRequest"> = {
  $type: "ibc.applications.transfer.v2.QueryDenomRequest" as const,

  encode(message: QueryDenomRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomRequest {
    return { hash: isSet(object.hash) ? globalThis.String(object.hash) : "" };
  },

  toJSON(message: QueryDenomRequest): unknown {
    const obj: any = {};
    if (message.hash !== undefined) {
      obj.hash = message.hash;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomRequest>): QueryDenomRequest {
    return QueryDenomRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomRequest>): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
  return { denom: undefined };
}

export const QueryDenomResponse: MessageFns<QueryDenomResponse, "ibc.applications.transfer.v2.QueryDenomResponse"> = {
  $type: "ibc.applications.transfer.v2.QueryDenomResponse" as const,

  encode(message: QueryDenomResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = Denom.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomResponse {
    return { denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined };
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = Denom.toJSON(message.denom);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomResponse>): QueryDenomResponse {
    return QueryDenomResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomResponse>): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom = (object.denom !== undefined && object.denom !== null) ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryDenomsRequest(): QueryDenomsRequest {
  return { pagination: undefined };
}

export const QueryDenomsRequest: MessageFns<QueryDenomsRequest, "ibc.applications.transfer.v2.QueryDenomsRequest"> = {
  $type: "ibc.applications.transfer.v2.QueryDenomsRequest" as const,

  encode(message: QueryDenomsRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomsRequest>): QueryDenomsRequest {
    return QueryDenomsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomsRequest>): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsResponse(): QueryDenomsResponse {
  return { denoms: [], pagination: undefined };
}

export const QueryDenomsResponse: MessageFns<QueryDenomsResponse, "ibc.applications.transfer.v2.QueryDenomsResponse"> =
  {
    $type: "ibc.applications.transfer.v2.QueryDenomsResponse" as const,

    encode(message: QueryDenomsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
      for (const v of message.denoms) {
        Denom.encode(v!, writer.uint32(10).fork()).join();
      }
      if (message.pagination !== undefined) {
        PageResponse.encode(message.pagination, writer.uint32(18).fork()).join();
      }
      return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): QueryDenomsResponse {
      const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = createBaseQueryDenomsResponse();
      while (reader.pos < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            if (tag !== 10) {
              break;
            }

            message.denoms.push(Denom.decode(reader, reader.uint32()));
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
        reader.skip(tag & 7);
      }
      return message;
    },

    fromJSON(object: any): QueryDenomsResponse {
      return {
        denoms: globalThis.Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [],
        pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      };
    },

    toJSON(message: QueryDenomsResponse): unknown {
      const obj: any = {};
      if (message.denoms?.length) {
        obj.denoms = message.denoms.map((e) => Denom.toJSON(e));
      }
      if (message.pagination !== undefined) {
        obj.pagination = PageResponse.toJSON(message.pagination);
      }
      return obj;
    },

    create(base?: DeepPartial<QueryDenomsResponse>): QueryDenomsResponse {
      return QueryDenomsResponse.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<QueryDenomsResponse>): QueryDenomsResponse {
      const message = createBaseQueryDenomsResponse();
      message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
      message.pagination = (object.pagination !== undefined && object.pagination !== null)
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
      return message;
    },
  };

/** QueryV2 provides defines the gRPC querier service for ics20-v2. */
export interface QueryV2 {
  /** Denoms queries all denominations */
  Denoms(request: DeepPartial<QueryDenomsRequest>, metadata?: grpc.Metadata): Promise<QueryDenomsResponse>;
  /** Denom queries a denomination */
  Denom(request: DeepPartial<QueryDenomRequest>, metadata?: grpc.Metadata): Promise<QueryDenomResponse>;
}

export class QueryV2ClientImpl implements QueryV2 {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Denoms = this.Denoms.bind(this);
    this.Denom = this.Denom.bind(this);
  }

  Denoms(request: DeepPartial<QueryDenomsRequest>, metadata?: grpc.Metadata): Promise<QueryDenomsResponse> {
    return this.rpc.unary(QueryV2DenomsDesc, QueryDenomsRequest.fromPartial(request), metadata);
  }

  Denom(request: DeepPartial<QueryDenomRequest>, metadata?: grpc.Metadata): Promise<QueryDenomResponse> {
    return this.rpc.unary(QueryV2DenomDesc, QueryDenomRequest.fromPartial(request), metadata);
  }
}

export const QueryV2Desc = { serviceName: "ibc.applications.transfer.v2.QueryV2" };

export const QueryV2DenomsDesc: UnaryMethodDefinitionish = {
  methodName: "Denoms",
  service: QueryV2Desc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryV2DenomDesc: UnaryMethodDefinitionish = {
  methodName: "Denom",
  service: QueryV2Desc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomResponse.decode(data);
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

interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
