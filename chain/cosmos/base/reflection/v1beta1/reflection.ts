/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

/** ListAllInterfacesRequest is the request type of the ListAllInterfaces RPC. */
export interface ListAllInterfacesRequest {
}

/** ListAllInterfacesResponse is the response type of the ListAllInterfaces RPC. */
export interface ListAllInterfacesResponse {
  /** interface_names is an array of all the registered interfaces. */
  interfaceNames: string[];
}

/**
 * ListImplementationsRequest is the request type of the ListImplementations
 * RPC.
 */
export interface ListImplementationsRequest {
  /** interface_name defines the interface to query the implementations for. */
  interfaceName: string;
}

/**
 * ListImplementationsResponse is the response type of the ListImplementations
 * RPC.
 */
export interface ListImplementationsResponse {
  implementationMessageNames: string[];
}

function createBaseListAllInterfacesRequest(): ListAllInterfacesRequest {
  return {};
}

export const ListAllInterfacesRequest = {
  $type: "cosmos.base.reflection.v1beta1.ListAllInterfacesRequest" as const,

  encode(_: ListAllInterfacesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAllInterfacesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAllInterfacesRequest();
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

  fromJSON(_: any): ListAllInterfacesRequest {
    return {};
  },

  toJSON(_: ListAllInterfacesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ListAllInterfacesRequest>): ListAllInterfacesRequest {
    return ListAllInterfacesRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ListAllInterfacesRequest>): ListAllInterfacesRequest {
    const message = createBaseListAllInterfacesRequest();
    return message;
  },
};

function createBaseListAllInterfacesResponse(): ListAllInterfacesResponse {
  return { interfaceNames: [] };
}

export const ListAllInterfacesResponse = {
  $type: "cosmos.base.reflection.v1beta1.ListAllInterfacesResponse" as const,

  encode(message: ListAllInterfacesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.interfaceNames) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAllInterfacesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListAllInterfacesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.interfaceNames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListAllInterfacesResponse {
    return {
      interfaceNames: Array.isArray(object?.interfaceNames) ? object.interfaceNames.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ListAllInterfacesResponse): unknown {
    const obj: any = {};
    if (message.interfaceNames?.length) {
      obj.interfaceNames = message.interfaceNames;
    }
    return obj;
  },

  create(base?: DeepPartial<ListAllInterfacesResponse>): ListAllInterfacesResponse {
    return ListAllInterfacesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListAllInterfacesResponse>): ListAllInterfacesResponse {
    const message = createBaseListAllInterfacesResponse();
    message.interfaceNames = object.interfaceNames?.map((e) => e) || [];
    return message;
  },
};

function createBaseListImplementationsRequest(): ListImplementationsRequest {
  return { interfaceName: "" };
}

export const ListImplementationsRequest = {
  $type: "cosmos.base.reflection.v1beta1.ListImplementationsRequest" as const,

  encode(message: ListImplementationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interfaceName !== "") {
      writer.uint32(10).string(message.interfaceName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListImplementationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImplementationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.interfaceName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListImplementationsRequest {
    return { interfaceName: isSet(object.interfaceName) ? String(object.interfaceName) : "" };
  },

  toJSON(message: ListImplementationsRequest): unknown {
    const obj: any = {};
    if (message.interfaceName !== "") {
      obj.interfaceName = message.interfaceName;
    }
    return obj;
  },

  create(base?: DeepPartial<ListImplementationsRequest>): ListImplementationsRequest {
    return ListImplementationsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListImplementationsRequest>): ListImplementationsRequest {
    const message = createBaseListImplementationsRequest();
    message.interfaceName = object.interfaceName ?? "";
    return message;
  },
};

function createBaseListImplementationsResponse(): ListImplementationsResponse {
  return { implementationMessageNames: [] };
}

export const ListImplementationsResponse = {
  $type: "cosmos.base.reflection.v1beta1.ListImplementationsResponse" as const,

  encode(message: ListImplementationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.implementationMessageNames) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListImplementationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListImplementationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.implementationMessageNames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListImplementationsResponse {
    return {
      implementationMessageNames: Array.isArray(object?.implementationMessageNames)
        ? object.implementationMessageNames.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListImplementationsResponse): unknown {
    const obj: any = {};
    if (message.implementationMessageNames?.length) {
      obj.implementationMessageNames = message.implementationMessageNames;
    }
    return obj;
  },

  create(base?: DeepPartial<ListImplementationsResponse>): ListImplementationsResponse {
    return ListImplementationsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListImplementationsResponse>): ListImplementationsResponse {
    const message = createBaseListImplementationsResponse();
    message.implementationMessageNames = object.implementationMessageNames?.map((e) => e) || [];
    return message;
  },
};

/** ReflectionService defines a service for interface reflection. */
export interface ReflectionService {
  /**
   * ListAllInterfaces lists all the interfaces registered in the interface
   * registry.
   */
  ListAllInterfaces(
    request: DeepPartial<ListAllInterfacesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAllInterfacesResponse>;
  /**
   * ListImplementations list all the concrete types that implement a given
   * interface.
   */
  ListImplementations(
    request: DeepPartial<ListImplementationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListImplementationsResponse>;
}

export class ReflectionServiceClientImpl implements ReflectionService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ListAllInterfaces = this.ListAllInterfaces.bind(this);
    this.ListImplementations = this.ListImplementations.bind(this);
  }

  ListAllInterfaces(
    request: DeepPartial<ListAllInterfacesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListAllInterfacesResponse> {
    return this.rpc.unary(
      ReflectionServiceListAllInterfacesDesc,
      ListAllInterfacesRequest.fromPartial(request),
      metadata,
    );
  }

  ListImplementations(
    request: DeepPartial<ListImplementationsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListImplementationsResponse> {
    return this.rpc.unary(
      ReflectionServiceListImplementationsDesc,
      ListImplementationsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const ReflectionServiceDesc = { serviceName: "cosmos.base.reflection.v1beta1.ReflectionService" };

export const ReflectionServiceListAllInterfacesDesc: UnaryMethodDefinitionish = {
  methodName: "ListAllInterfaces",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListAllInterfacesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListAllInterfacesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceListImplementationsDesc: UnaryMethodDefinitionish = {
  methodName: "ListImplementations",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListImplementationsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListImplementationsResponse.decode(data);
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

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
