// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/indexer/campclash/provider_query.proto

/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Event } from "../../../tendermint/abci/types";
import { ModuleEvents } from "../../eventstream/v1beta1/query";

export interface ProviderEvents {
  height: string;
  time: string;
  events: Event[];
}

export interface QueryCampEventsRequest {
  height: string;
}

export interface QueryCampEventsResponse {
  height: string;
  time: string;
  events: ModuleEvents[];
}

function createBaseProviderEvents(): ProviderEvents {
  return { height: "0", time: "0", events: [] };
}

export const ProviderEvents = {
  $type: "flux.indexer.campclash.ProviderEvents" as const,

  encode(message: ProviderEvents, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.time !== "0") {
      writer.uint32(16).int64(message.time);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProviderEvents {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.time = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderEvents {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? globalThis.String(object.time) : "0",
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
    };
  },

  toJSON(message: ProviderEvents): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time;
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ProviderEvents>): ProviderEvents {
    return ProviderEvents.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProviderEvents>): ProviderEvents {
    const message = createBaseProviderEvents();
    message.height = object.height ?? "0";
    message.time = object.time ?? "0";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCampEventsRequest(): QueryCampEventsRequest {
  return { height: "0" };
}

export const QueryCampEventsRequest = {
  $type: "flux.indexer.campclash.QueryCampEventsRequest" as const,

  encode(message: QueryCampEventsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCampEventsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCampEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCampEventsRequest {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: QueryCampEventsRequest): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryCampEventsRequest>): QueryCampEventsRequest {
    return QueryCampEventsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryCampEventsRequest>): QueryCampEventsRequest {
    const message = createBaseQueryCampEventsRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseQueryCampEventsResponse(): QueryCampEventsResponse {
  return { height: "0", time: "0", events: [] };
}

export const QueryCampEventsResponse = {
  $type: "flux.indexer.campclash.QueryCampEventsResponse" as const,

  encode(message: QueryCampEventsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.time !== "0") {
      writer.uint32(16).uint64(message.time);
    }
    for (const v of message.events) {
      ModuleEvents.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCampEventsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCampEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.time = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.events.push(ModuleEvents.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCampEventsResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? globalThis.String(object.time) : "0",
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => ModuleEvents.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryCampEventsResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time;
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => ModuleEvents.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryCampEventsResponse>): QueryCampEventsResponse {
    return QueryCampEventsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryCampEventsResponse>): QueryCampEventsResponse {
    const message = createBaseQueryCampEventsResponse();
    message.height = object.height ?? "0";
    message.time = object.time ?? "0";
    message.events = object.events?.map((e) => ModuleEvents.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface ProviderQuery {
  /**
   * Balance queries the number of NFTs of a given class owned by the owner,
   * same as balanceOf in ERC721
   */
  CampEvents(request: DeepPartial<QueryCampEventsRequest>, metadata?: grpc.Metadata): Promise<QueryCampEventsResponse>;
}

export class ProviderQueryClientImpl implements ProviderQuery {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CampEvents = this.CampEvents.bind(this);
  }

  CampEvents(request: DeepPartial<QueryCampEventsRequest>, metadata?: grpc.Metadata): Promise<QueryCampEventsResponse> {
    return this.rpc.unary(ProviderQueryCampEventsDesc, QueryCampEventsRequest.fromPartial(request), metadata);
  }
}

export const ProviderQueryDesc = { serviceName: "flux.indexer.campclash.ProviderQuery" };

export const ProviderQueryCampEventsDesc: UnaryMethodDefinitionish = {
  methodName: "CampEvents",
  service: ProviderQueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryCampEventsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryCampEventsResponse.decode(data);
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
