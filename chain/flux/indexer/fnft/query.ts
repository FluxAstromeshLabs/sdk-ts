/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";
import { Class, Holder, NFT } from "../../fnft/v1beta1/nft";

export interface ClassesRequest {
}

export interface ClassesResponse {
  height: string;
  deleted: string;
  classes: Class[];
}

export interface NFTsRequest {
  class_id: string;
  id: string;
  owner: string;
  status: string;
}

export interface NFTsResponse {
  height: string;
  deleted: string;
  nfts: NFT[];
}

export interface HoldersRequest {
  class_id: string;
  id: string;
  address: string;
}

export interface HoldersResponse {
  height: string;
  deleted: string;
  holders: Holder[];
}

function createBaseClassesRequest(): ClassesRequest {
  return {};
}

export const ClassesRequest = {
  $type: "flux.indexer.fnft.ClassesRequest" as const,

  encode(_: ClassesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassesRequest();
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

  fromJSON(_: any): ClassesRequest {
    return {};
  },

  toJSON(_: ClassesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ClassesRequest>): ClassesRequest {
    return ClassesRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ClassesRequest>): ClassesRequest {
    const message = createBaseClassesRequest();
    return message;
  },
};

function createBaseClassesResponse(): ClassesResponse {
  return { height: "0", deleted: "0", classes: [] };
}

export const ClassesResponse = {
  $type: "flux.indexer.fnft.ClassesResponse" as const,

  encode(message: ClassesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.deleted !== "0") {
      writer.uint32(16).uint64(message.deleted);
    }
    for (const v of message.classes) {
      Class.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassesResponse();
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

          message.deleted = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.classes.push(Class.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassesResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      deleted: isSet(object.deleted) ? globalThis.String(object.deleted) : "0",
      classes: globalThis.Array.isArray(object?.classes) ? object.classes.map((e: any) => Class.fromJSON(e)) : [],
    };
  },

  toJSON(message: ClassesResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.deleted !== undefined) {
      obj.deleted = message.deleted;
    }
    if (message.classes?.length) {
      obj.classes = message.classes.map((e) => Class.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ClassesResponse>): ClassesResponse {
    return ClassesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ClassesResponse>): ClassesResponse {
    const message = createBaseClassesResponse();
    message.height = object.height ?? "0";
    message.deleted = object.deleted ?? "0";
    message.classes = object.classes?.map((e) => Class.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNFTsRequest(): NFTsRequest {
  return { class_id: "", id: "", owner: "", status: "" };
}

export const NFTsRequest = {
  $type: "flux.indexer.fnft.NFTsRequest" as const,

  encode(message: NFTsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFTsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFTsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NFTsRequest {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: NFTsRequest): unknown {
    const obj: any = {};
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    if (message.owner !== undefined) {
      obj.owner = message.owner;
    }
    if (message.status !== undefined) {
      obj.status = message.status;
    }
    return obj;
  },

  create(base?: DeepPartial<NFTsRequest>): NFTsRequest {
    return NFTsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NFTsRequest>): NFTsRequest {
    const message = createBaseNFTsRequest();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.owner = object.owner ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseNFTsResponse(): NFTsResponse {
  return { height: "0", deleted: "0", nfts: [] };
}

export const NFTsResponse = {
  $type: "flux.indexer.fnft.NFTsResponse" as const,

  encode(message: NFTsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.deleted !== "0") {
      writer.uint32(16).uint64(message.deleted);
    }
    for (const v of message.nfts) {
      NFT.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFTsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFTsResponse();
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

          message.deleted = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nfts.push(NFT.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NFTsResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      deleted: isSet(object.deleted) ? globalThis.String(object.deleted) : "0",
      nfts: globalThis.Array.isArray(object?.nfts) ? object.nfts.map((e: any) => NFT.fromJSON(e)) : [],
    };
  },

  toJSON(message: NFTsResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.deleted !== undefined) {
      obj.deleted = message.deleted;
    }
    if (message.nfts?.length) {
      obj.nfts = message.nfts.map((e) => NFT.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<NFTsResponse>): NFTsResponse {
    return NFTsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NFTsResponse>): NFTsResponse {
    const message = createBaseNFTsResponse();
    message.height = object.height ?? "0";
    message.deleted = object.deleted ?? "0";
    message.nfts = object.nfts?.map((e) => NFT.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHoldersRequest(): HoldersRequest {
  return { class_id: "", id: "", address: "" };
}

export const HoldersRequest = {
  $type: "flux.indexer.fnft.HoldersRequest" as const,

  encode(message: HoldersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HoldersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoldersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoldersRequest {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
    };
  },

  toJSON(message: HoldersRequest): unknown {
    const obj: any = {};
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    return obj;
  },

  create(base?: DeepPartial<HoldersRequest>): HoldersRequest {
    return HoldersRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HoldersRequest>): HoldersRequest {
    const message = createBaseHoldersRequest();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseHoldersResponse(): HoldersResponse {
  return { height: "0", deleted: "0", holders: [] };
}

export const HoldersResponse = {
  $type: "flux.indexer.fnft.HoldersResponse" as const,

  encode(message: HoldersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.deleted !== "0") {
      writer.uint32(16).uint64(message.deleted);
    }
    for (const v of message.holders) {
      Holder.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HoldersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoldersResponse();
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

          message.deleted = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.holders.push(Holder.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoldersResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      deleted: isSet(object.deleted) ? globalThis.String(object.deleted) : "0",
      holders: globalThis.Array.isArray(object?.holders) ? object.holders.map((e: any) => Holder.fromJSON(e)) : [],
    };
  },

  toJSON(message: HoldersResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.deleted !== undefined) {
      obj.deleted = message.deleted;
    }
    if (message.holders?.length) {
      obj.holders = message.holders.map((e) => Holder.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<HoldersResponse>): HoldersResponse {
    return HoldersResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HoldersResponse>): HoldersResponse {
    const message = createBaseHoldersResponse();
    message.height = object.height ?? "0";
    message.deleted = object.deleted ?? "0";
    message.holders = object.holders?.map((e) => Holder.fromPartial(e)) || [];
    return message;
  },
};

export interface API {
  GetClasses(request: DeepPartial<ClassesRequest>, metadata?: grpc.Metadata): Promise<ClassesResponse>;
  StreamClasses(request: DeepPartial<ClassesRequest>, metadata?: grpc.Metadata): Observable<ClassesResponse>;
  GetNFTs(request: DeepPartial<NFTsRequest>, metadata?: grpc.Metadata): Promise<NFTsResponse>;
  StreamNFTs(request: DeepPartial<NFTsRequest>, metadata?: grpc.Metadata): Observable<NFTsResponse>;
  GetHolders(request: DeepPartial<HoldersRequest>, metadata?: grpc.Metadata): Promise<HoldersResponse>;
  StreamHolders(request: DeepPartial<HoldersRequest>, metadata?: grpc.Metadata): Observable<HoldersResponse>;
}

export class APIClientImpl implements API {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetClasses = this.GetClasses.bind(this);
    this.StreamClasses = this.StreamClasses.bind(this);
    this.GetNFTs = this.GetNFTs.bind(this);
    this.StreamNFTs = this.StreamNFTs.bind(this);
    this.GetHolders = this.GetHolders.bind(this);
    this.StreamHolders = this.StreamHolders.bind(this);
  }

  GetClasses(request: DeepPartial<ClassesRequest>, metadata?: grpc.Metadata): Promise<ClassesResponse> {
    return this.rpc.unary(APIGetClassesDesc, ClassesRequest.fromPartial(request), metadata);
  }

  StreamClasses(request: DeepPartial<ClassesRequest>, metadata?: grpc.Metadata): Observable<ClassesResponse> {
    return this.rpc.invoke(APIStreamClassesDesc, ClassesRequest.fromPartial(request), metadata);
  }

  GetNFTs(request: DeepPartial<NFTsRequest>, metadata?: grpc.Metadata): Promise<NFTsResponse> {
    return this.rpc.unary(APIGetNFTsDesc, NFTsRequest.fromPartial(request), metadata);
  }

  StreamNFTs(request: DeepPartial<NFTsRequest>, metadata?: grpc.Metadata): Observable<NFTsResponse> {
    return this.rpc.invoke(APIStreamNFTsDesc, NFTsRequest.fromPartial(request), metadata);
  }

  GetHolders(request: DeepPartial<HoldersRequest>, metadata?: grpc.Metadata): Promise<HoldersResponse> {
    return this.rpc.unary(APIGetHoldersDesc, HoldersRequest.fromPartial(request), metadata);
  }

  StreamHolders(request: DeepPartial<HoldersRequest>, metadata?: grpc.Metadata): Observable<HoldersResponse> {
    return this.rpc.invoke(APIStreamHoldersDesc, HoldersRequest.fromPartial(request), metadata);
  }
}

export const APIDesc = { serviceName: "flux.indexer.fnft.API" };

export const APIGetClassesDesc: UnaryMethodDefinitionish = {
  methodName: "GetClasses",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ClassesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ClassesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIStreamClassesDesc: UnaryMethodDefinitionish = {
  methodName: "StreamClasses",
  service: APIDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return ClassesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ClassesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIGetNFTsDesc: UnaryMethodDefinitionish = {
  methodName: "GetNFTs",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return NFTsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = NFTsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIStreamNFTsDesc: UnaryMethodDefinitionish = {
  methodName: "StreamNFTs",
  service: APIDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return NFTsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = NFTsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIGetHoldersDesc: UnaryMethodDefinitionish = {
  methodName: "GetHolders",
  service: APIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HoldersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HoldersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const APIStreamHoldersDesc: UnaryMethodDefinitionish = {
  methodName: "StreamHolders",
  service: APIDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return HoldersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HoldersResponse.decode(data);
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
