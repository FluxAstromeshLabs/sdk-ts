/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { SimpleEntry } from "./oracle";

export interface QuerySimpleEntry {
  symbols: string;
}

export interface QuerySimpleEntryResponse {
  entries: SimpleEntry[];
}

function createBaseQuerySimpleEntry(): QuerySimpleEntry {
  return { symbols: "" };
}

export const QuerySimpleEntry = {
  $type: "flux.oracle.v1beta1.QuerySimpleEntry" as const,

  encode(message: QuerySimpleEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.symbols !== "") {
      writer.uint32(10).string(message.symbols);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySimpleEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimpleEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.symbols = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySimpleEntry {
    return { symbols: isSet(object.symbols) ? globalThis.String(object.symbols) : "" };
  },

  toJSON(message: QuerySimpleEntry): unknown {
    const obj: any = {};
    if (message.symbols !== undefined) {
      obj.symbols = message.symbols;
    }
    return obj;
  },

  create(base?: DeepPartial<QuerySimpleEntry>): QuerySimpleEntry {
    return QuerySimpleEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QuerySimpleEntry>): QuerySimpleEntry {
    const message = createBaseQuerySimpleEntry();
    message.symbols = object.symbols ?? "";
    return message;
  },
};

function createBaseQuerySimpleEntryResponse(): QuerySimpleEntryResponse {
  return { entries: [] };
}

export const QuerySimpleEntryResponse = {
  $type: "flux.oracle.v1beta1.QuerySimpleEntryResponse" as const,

  encode(message: QuerySimpleEntryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      SimpleEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySimpleEntryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimpleEntryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entries.push(SimpleEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySimpleEntryResponse {
    return {
      entries: globalThis.Array.isArray(object?.entries) ? object.entries.map((e: any) => SimpleEntry.fromJSON(e)) : [],
    };
  },

  toJSON(message: QuerySimpleEntryResponse): unknown {
    const obj: any = {};
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => SimpleEntry.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QuerySimpleEntryResponse>): QuerySimpleEntryResponse {
    return QuerySimpleEntryResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QuerySimpleEntryResponse>): QuerySimpleEntryResponse {
    const message = createBaseQuerySimpleEntryResponse();
    message.entries = object.entries?.map((e) => SimpleEntry.fromPartial(e)) || [];
    return message;
  },
};

export interface Query {
  SimpleEntry(request: DeepPartial<QuerySimpleEntry>, metadata?: grpc.Metadata): Promise<QuerySimpleEntryResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SimpleEntry = this.SimpleEntry.bind(this);
  }

  SimpleEntry(request: DeepPartial<QuerySimpleEntry>, metadata?: grpc.Metadata): Promise<QuerySimpleEntryResponse> {
    return this.rpc.unary(QuerySimpleEntryDesc, QuerySimpleEntry.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.oracle.v1beta1.Query" };

export const QuerySimpleEntryDesc: UnaryMethodDefinitionish = {
  methodName: "SimpleEntry",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QuerySimpleEntry.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QuerySimpleEntryResponse.decode(data);
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
