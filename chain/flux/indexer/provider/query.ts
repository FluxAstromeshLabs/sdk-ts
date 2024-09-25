// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: flux/indexer/provider/query.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { ModuleEvents } from "../../eventstream/v1beta1/query";

export interface ProviderBlockRequest {
  height: string;
}

export interface ProviderBlockResponse {
  height: string;
  time: string;
  block: string;
  block_results: string;
  validators: string;
}

export interface ProviderEventsRequest {
  height: string;
  modules: string[];
}

export interface ProviderEventsResponse {
  height: string;
  time: string;
  modules: string[];
  events: ModuleEvents[];
}

function createBaseProviderBlockRequest(): ProviderBlockRequest {
  return { height: "0" };
}

export const ProviderBlockRequest: MessageFns<ProviderBlockRequest, "flux.indexer.provider.ProviderBlockRequest"> = {
  $type: "flux.indexer.provider.ProviderBlockRequest" as const,

  encode(message: ProviderBlockRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProviderBlockRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderBlockRequest {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: ProviderBlockRequest): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<ProviderBlockRequest>): ProviderBlockRequest {
    return ProviderBlockRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProviderBlockRequest>): ProviderBlockRequest {
    const message = createBaseProviderBlockRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseProviderBlockResponse(): ProviderBlockResponse {
  return { height: "0", time: "0", block: "", block_results: "", validators: "" };
}

export const ProviderBlockResponse: MessageFns<ProviderBlockResponse, "flux.indexer.provider.ProviderBlockResponse"> = {
  $type: "flux.indexer.provider.ProviderBlockResponse" as const,

  encode(message: ProviderBlockResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.time !== "0") {
      writer.uint32(16).uint64(message.time);
    }
    if (message.block !== "") {
      writer.uint32(26).string(message.block);
    }
    if (message.block_results !== "") {
      writer.uint32(34).string(message.block_results);
    }
    if (message.validators !== "") {
      writer.uint32(42).string(message.validators);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProviderBlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64().toString();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.time = reader.uint64().toString();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.block = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.block_results = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.validators = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderBlockResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? globalThis.String(object.time) : "0",
      block: isSet(object.block) ? globalThis.String(object.block) : "",
      block_results: isSet(object.block_results) ? globalThis.String(object.block_results) : "",
      validators: isSet(object.validators) ? globalThis.String(object.validators) : "",
    };
  },

  toJSON(message: ProviderBlockResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time;
    }
    if (message.block !== undefined) {
      obj.block = message.block;
    }
    if (message.block_results !== undefined) {
      obj.block_results = message.block_results;
    }
    if (message.validators !== undefined) {
      obj.validators = message.validators;
    }
    return obj;
  },

  create(base?: DeepPartial<ProviderBlockResponse>): ProviderBlockResponse {
    return ProviderBlockResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProviderBlockResponse>): ProviderBlockResponse {
    const message = createBaseProviderBlockResponse();
    message.height = object.height ?? "0";
    message.time = object.time ?? "0";
    message.block = object.block ?? "";
    message.block_results = object.block_results ?? "";
    message.validators = object.validators ?? "";
    return message;
  },
};

function createBaseProviderEventsRequest(): ProviderEventsRequest {
  return { height: "0", modules: [] };
}

export const ProviderEventsRequest: MessageFns<ProviderEventsRequest, "flux.indexer.provider.ProviderEventsRequest"> = {
  $type: "flux.indexer.provider.ProviderEventsRequest" as const,

  encode(message: ProviderEventsRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    for (const v of message.modules) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProviderEventsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64().toString();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.modules.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderEventsRequest {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      modules: globalThis.Array.isArray(object?.modules) ? object.modules.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: ProviderEventsRequest): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.modules?.length) {
      obj.modules = message.modules;
    }
    return obj;
  },

  create(base?: DeepPartial<ProviderEventsRequest>): ProviderEventsRequest {
    return ProviderEventsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProviderEventsRequest>): ProviderEventsRequest {
    const message = createBaseProviderEventsRequest();
    message.height = object.height ?? "0";
    message.modules = object.modules?.map((e) => e) || [];
    return message;
  },
};

function createBaseProviderEventsResponse(): ProviderEventsResponse {
  return { height: "0", time: "0", modules: [], events: [] };
}

export const ProviderEventsResponse: MessageFns<
  ProviderEventsResponse,
  "flux.indexer.provider.ProviderEventsResponse"
> = {
  $type: "flux.indexer.provider.ProviderEventsResponse" as const,

  encode(message: ProviderEventsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.time !== "0") {
      writer.uint32(16).uint64(message.time);
    }
    for (const v of message.modules) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.events) {
      ModuleEvents.encode(v!, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProviderEventsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64().toString();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.time = reader.uint64().toString();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.modules.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.events.push(ModuleEvents.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProviderEventsResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? globalThis.String(object.time) : "0",
      modules: globalThis.Array.isArray(object?.modules) ? object.modules.map((e: any) => globalThis.String(e)) : [],
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => ModuleEvents.fromJSON(e)) : [],
    };
  },

  toJSON(message: ProviderEventsResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time;
    }
    if (message.modules?.length) {
      obj.modules = message.modules;
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => ModuleEvents.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ProviderEventsResponse>): ProviderEventsResponse {
    return ProviderEventsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProviderEventsResponse>): ProviderEventsResponse {
    const message = createBaseProviderEventsResponse();
    message.height = object.height ?? "0";
    message.time = object.time ?? "0";
    message.modules = object.modules?.map((e) => e) || [];
    message.events = object.events?.map((e) => ModuleEvents.fromPartial(e)) || [];
    return message;
  },
};

export interface API {
  GetBlock(request: DeepPartial<ProviderBlockRequest>, metadata?: grpc.Metadata): Promise<ProviderBlockResponse>;
  StreamBlock(request: DeepPartial<ProviderBlockRequest>, metadata?: grpc.Metadata): Observable<ProviderBlockResponse>;
  GetEvents(request: DeepPartial<ProviderEventsRequest>, metadata?: grpc.Metadata): Promise<ProviderEventsResponse>;
  StreamEvents(
    request: DeepPartial<ProviderEventsRequest>,
    metadata?: grpc.Metadata,
  ): Observable<ProviderEventsResponse>;
}

export class APIClientImpl implements API {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetBlock = this.GetBlock.bind(this);
    this.StreamBlock = this.StreamBlock.bind(this);
    this.GetEvents = this.GetEvents.bind(this);
    this.StreamEvents = this.StreamEvents.bind(this);
  }

  GetBlock(request: DeepPartial<ProviderBlockRequest>, metadata?: grpc.Metadata): Promise<ProviderBlockResponse> {
    return this.rpc.unary(APIGetBlockDesc, ProviderBlockRequest.fromPartial(request), metadata);
  }

  StreamBlock(request: DeepPartial<ProviderBlockRequest>, metadata?: grpc.Metadata): Observable<ProviderBlockResponse> {
    return this.rpc.invoke(APIStreamBlockDesc, ProviderBlockRequest.fromPartial(request), metadata);
  }

  GetEvents(request: DeepPartial<ProviderEventsRequest>, metadata?: grpc.Metadata): Promise<ProviderEventsResponse> {
    return this.rpc.unary(APIGetEventsDesc, ProviderEventsRequest.fromPartial(request), metadata);
  }

  StreamEvents(
    request: DeepPartial<ProviderEventsRequest>,
    metadata?: grpc.Metadata,
  ): Observable<ProviderEventsResponse> {
    return this.rpc.invoke(APIStreamEventsDesc, ProviderEventsRequest.fromPartial(request), metadata);
  }
}

export const APIDesc = { serviceName: "flux.indexer.provider.API" };

export const APIGetBlockDesc: UnaryMethodDefinitionish = {
  methodName: "GetBlock",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProviderBlockRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProviderBlockResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIStreamBlockDesc: UnaryMethodDefinitionish = {
  methodName: "StreamBlock",
  service: APIDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return ProviderBlockRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProviderBlockResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIGetEventsDesc: UnaryMethodDefinitionish = {
  methodName: "GetEvents",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProviderEventsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProviderEventsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIStreamEventsDesc: UnaryMethodDefinitionish = {
  methodName: "StreamEvents",
  service: APIDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return ProviderEventsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProviderEventsResponse.decode(data);
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
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
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

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes ?? [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const transport = this.options.streamingTransport ?? this.options.transport;
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          ...(transport !== undefined ? { transport } : {}),
          metadata: maybeCombinedMetadata ?? {},
          debug: this.options.debug ?? false,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
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
