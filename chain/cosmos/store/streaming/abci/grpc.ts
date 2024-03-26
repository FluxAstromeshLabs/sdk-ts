/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { RequestFinalizeBlock, ResponseCommit, ResponseFinalizeBlock } from "../../../../tendermint/abci/types";
import { StoreKVPair } from "../../v1beta1/listening";

/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequest {
  req: RequestFinalizeBlock | undefined;
  res: ResponseFinalizeBlock | undefined;
}

/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponse {
}

/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequest {
  /** explicitly pass in block height as ResponseCommit does not contain this info */
  block_height: string;
  res: ResponseCommit | undefined;
  change_set: StoreKVPair[];
}

/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponse {
}

function createBaseListenFinalizeBlockRequest(): ListenFinalizeBlockRequest {
  return { req: undefined, res: undefined };
}

export const ListenFinalizeBlockRequest = {
  $type: "cosmos.store.streaming.abci.ListenFinalizeBlockRequest" as const,

  encode(message: ListenFinalizeBlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.req !== undefined) {
      RequestFinalizeBlock.encode(message.req, writer.uint32(10).fork()).ldelim();
    }
    if (message.res !== undefined) {
      ResponseFinalizeBlock.encode(message.res, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListenFinalizeBlockRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.req = RequestFinalizeBlock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.res = ResponseFinalizeBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListenFinalizeBlockRequest {
    return {
      req: isSet(object.req) ? RequestFinalizeBlock.fromJSON(object.req) : undefined,
      res: isSet(object.res) ? ResponseFinalizeBlock.fromJSON(object.res) : undefined,
    };
  },

  toJSON(message: ListenFinalizeBlockRequest): unknown {
    const obj: any = {};
    if (message.req !== undefined) {
      obj.req = RequestFinalizeBlock.toJSON(message.req);
    }
    if (message.res !== undefined) {
      obj.res = ResponseFinalizeBlock.toJSON(message.res);
    }
    return obj;
  },

  create(base?: DeepPartial<ListenFinalizeBlockRequest>): ListenFinalizeBlockRequest {
    return ListenFinalizeBlockRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListenFinalizeBlockRequest>): ListenFinalizeBlockRequest {
    const message = createBaseListenFinalizeBlockRequest();
    message.req = (object.req !== undefined && object.req !== null)
      ? RequestFinalizeBlock.fromPartial(object.req)
      : undefined;
    message.res = (object.res !== undefined && object.res !== null)
      ? ResponseFinalizeBlock.fromPartial(object.res)
      : undefined;
    return message;
  },
};

function createBaseListenFinalizeBlockResponse(): ListenFinalizeBlockResponse {
  return {};
}

export const ListenFinalizeBlockResponse = {
  $type: "cosmos.store.streaming.abci.ListenFinalizeBlockResponse" as const,

  encode(_: ListenFinalizeBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListenFinalizeBlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockResponse();
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

  fromJSON(_: any): ListenFinalizeBlockResponse {
    return {};
  },

  toJSON(_: ListenFinalizeBlockResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ListenFinalizeBlockResponse>): ListenFinalizeBlockResponse {
    return ListenFinalizeBlockResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ListenFinalizeBlockResponse>): ListenFinalizeBlockResponse {
    const message = createBaseListenFinalizeBlockResponse();
    return message;
  },
};

function createBaseListenCommitRequest(): ListenCommitRequest {
  return { block_height: "0", res: undefined, change_set: [] };
}

export const ListenCommitRequest = {
  $type: "cosmos.store.streaming.abci.ListenCommitRequest" as const,

  encode(message: ListenCommitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    if (message.res !== undefined) {
      ResponseCommit.encode(message.res, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.change_set) {
      StoreKVPair.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListenCommitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.block_height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.res = ResponseCommit.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.change_set.push(StoreKVPair.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListenCommitRequest {
    return {
      block_height: isSet(object.block_height) ? globalThis.String(object.block_height) : "0",
      res: isSet(object.res) ? ResponseCommit.fromJSON(object.res) : undefined,
      change_set: globalThis.Array.isArray(object?.change_set)
        ? object.change_set.map((e: any) => StoreKVPair.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListenCommitRequest): unknown {
    const obj: any = {};
    if (message.block_height !== undefined) {
      obj.block_height = message.block_height;
    }
    if (message.res !== undefined) {
      obj.res = ResponseCommit.toJSON(message.res);
    }
    if (message.change_set?.length) {
      obj.change_set = message.change_set.map((e) => StoreKVPair.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ListenCommitRequest>): ListenCommitRequest {
    return ListenCommitRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListenCommitRequest>): ListenCommitRequest {
    const message = createBaseListenCommitRequest();
    message.block_height = object.block_height ?? "0";
    message.res = (object.res !== undefined && object.res !== null)
      ? ResponseCommit.fromPartial(object.res)
      : undefined;
    message.change_set = object.change_set?.map((e) => StoreKVPair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListenCommitResponse(): ListenCommitResponse {
  return {};
}

export const ListenCommitResponse = {
  $type: "cosmos.store.streaming.abci.ListenCommitResponse" as const,

  encode(_: ListenCommitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListenCommitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitResponse();
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

  fromJSON(_: any): ListenCommitResponse {
    return {};
  },

  toJSON(_: ListenCommitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ListenCommitResponse>): ListenCommitResponse {
    return ListenCommitResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ListenCommitResponse>): ListenCommitResponse {
    const message = createBaseListenCommitResponse();
    return message;
  },
};

/** ABCIListenerService is the service for the BaseApp ABCIListener interface */
export interface ABCIListenerService {
  /** ListenFinalizeBlock is the corresponding endpoint for ABCIListener.ListenEndBlock */
  ListenFinalizeBlock(
    request: DeepPartial<ListenFinalizeBlockRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListenFinalizeBlockResponse>;
  /** ListenCommit is the corresponding endpoint for ABCIListener.ListenCommit */
  ListenCommit(request: DeepPartial<ListenCommitRequest>, metadata?: grpc.Metadata): Promise<ListenCommitResponse>;
}

export class ABCIListenerServiceClientImpl implements ABCIListenerService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListenFinalizeBlock = this.ListenFinalizeBlock.bind(this);
    this.ListenCommit = this.ListenCommit.bind(this);
  }

  ListenFinalizeBlock(
    request: DeepPartial<ListenFinalizeBlockRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListenFinalizeBlockResponse> {
    return this.rpc.unary(
      ABCIListenerServiceListenFinalizeBlockDesc,
      ListenFinalizeBlockRequest.fromPartial(request),
      metadata,
    );
  }

  ListenCommit(request: DeepPartial<ListenCommitRequest>, metadata?: grpc.Metadata): Promise<ListenCommitResponse> {
    return this.rpc.unary(ABCIListenerServiceListenCommitDesc, ListenCommitRequest.fromPartial(request), metadata);
  }
}

export const ABCIListenerServiceDesc = { serviceName: "cosmos.store.streaming.abci.ABCIListenerService" };

export const ABCIListenerServiceListenFinalizeBlockDesc: UnaryMethodDefinitionish = {
  methodName: "ListenFinalizeBlock",
  service: ABCIListenerServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListenFinalizeBlockRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListenFinalizeBlockResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIListenerServiceListenCommitDesc: UnaryMethodDefinitionish = {
  methodName: "ListenCommit",
  service: ABCIListenerServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListenCommitRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListenCommitResponse.decode(data);
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
