/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

export enum S3Operation {
  Put = 0,
  Delete = 1,
  UNRECOGNIZED = -1,
}

export function s3OperationFromJSON(object: any): S3Operation {
  switch (object) {
    case 0:
    case "Put":
      return S3Operation.Put;
    case 1:
    case "Delete":
      return S3Operation.Delete;
    case -1:
    case "UNRECOGNIZED":
    default:
      return S3Operation.UNRECOGNIZED;
  }
}

export function s3OperationToJSON(object: S3Operation): string {
  switch (object) {
    case S3Operation.Put:
      return "Put";
    case S3Operation.Delete:
      return "Delete";
    case S3Operation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface S3Obj {
  op: S3Operation;
  key: string;
}

export interface PresignedURLRequest {
  path: string;
  objs: S3Obj[];
}

export interface PresignedURLResponse {
  path: string;
  keys: string[];
  urls: string[];
}

function createBaseS3Obj(): S3Obj {
  return { op: 0, key: "" };
}

export const S3Obj = {
  $type: "flux.indexer.media.S3Obj" as const,

  encode(message: S3Obj, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): S3Obj {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseS3Obj();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.op = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): S3Obj {
    return {
      op: isSet(object.op) ? s3OperationFromJSON(object.op) : 0,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
    };
  },

  toJSON(message: S3Obj): unknown {
    const obj: any = {};
    if (message.op !== 0) {
      obj.op = s3OperationToJSON(message.op);
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    return obj;
  },

  create(base?: DeepPartial<S3Obj>): S3Obj {
    return S3Obj.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<S3Obj>): S3Obj {
    const message = createBaseS3Obj();
    message.op = object.op ?? 0;
    message.key = object.key ?? "";
    return message;
  },
};

function createBasePresignedURLRequest(): PresignedURLRequest {
  return { path: "", objs: [] };
}

export const PresignedURLRequest = {
  $type: "flux.indexer.media.PresignedURLRequest" as const,

  encode(message: PresignedURLRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    for (const v of message.objs) {
      S3Obj.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresignedURLRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresignedURLRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.objs.push(S3Obj.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresignedURLRequest {
    return {
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      objs: globalThis.Array.isArray(object?.objs) ? object.objs.map((e: any) => S3Obj.fromJSON(e)) : [],
    };
  },

  toJSON(message: PresignedURLRequest): unknown {
    const obj: any = {};
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.objs?.length) {
      obj.objs = message.objs.map((e) => S3Obj.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<PresignedURLRequest>): PresignedURLRequest {
    return PresignedURLRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PresignedURLRequest>): PresignedURLRequest {
    const message = createBasePresignedURLRequest();
    message.path = object.path ?? "";
    message.objs = object.objs?.map((e) => S3Obj.fromPartial(e)) || [];
    return message;
  },
};

function createBasePresignedURLResponse(): PresignedURLResponse {
  return { path: "", keys: [], urls: [] };
}

export const PresignedURLResponse = {
  $type: "flux.indexer.media.PresignedURLResponse" as const,

  encode(message: PresignedURLResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    for (const v of message.keys) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.urls) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PresignedURLResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePresignedURLResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keys.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.urls.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PresignedURLResponse {
    return {
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      keys: globalThis.Array.isArray(object?.keys) ? object.keys.map((e: any) => globalThis.String(e)) : [],
      urls: globalThis.Array.isArray(object?.urls) ? object.urls.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: PresignedURLResponse): unknown {
    const obj: any = {};
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.keys?.length) {
      obj.keys = message.keys;
    }
    if (message.urls?.length) {
      obj.urls = message.urls;
    }
    return obj;
  },

  create(base?: DeepPartial<PresignedURLResponse>): PresignedURLResponse {
    return PresignedURLResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PresignedURLResponse>): PresignedURLResponse {
    const message = createBasePresignedURLResponse();
    message.path = object.path ?? "";
    message.keys = object.keys?.map((e) => e) || [];
    message.urls = object.urls?.map((e) => e) || [];
    return message;
  },
};

export interface API {
  PresignedURL(request: DeepPartial<PresignedURLRequest>, metadata?: grpc.Metadata): Promise<PresignedURLResponse>;
}

export class APIClientImpl implements API {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.PresignedURL = this.PresignedURL.bind(this);
  }

  PresignedURL(request: DeepPartial<PresignedURLRequest>, metadata?: grpc.Metadata): Promise<PresignedURLResponse> {
    return this.rpc.unary(APIPresignedURLDesc, PresignedURLRequest.fromPartial(request), metadata);
  }
}

export const APIDesc = { serviceName: "flux.indexer.media.API" };

export const APIPresignedURLDesc: UnaryMethodDefinitionish = {
  methodName: "PresignedURL",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return PresignedURLRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = PresignedURLResponse.decode(data);
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
