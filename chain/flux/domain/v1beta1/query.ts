/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

export interface QueryDomainInfoRequest {
  domain: string;
}

export interface QueryDomainInfoResponse {
  domain: string;
  available: boolean;
  price: string;
}

export interface QueryOwnerDomains {
  address: string;
}

export interface QueryOwnerDomainsResponse {
  address: string;
  domains: string[];
}

export interface QueryDomainOwner {
  domain: string;
}

export interface QueryDomainOwnerResponse {
  domain: string;
  owner: string;
}

function createBaseQueryDomainInfoRequest(): QueryDomainInfoRequest {
  return { domain: "" };
}

export const QueryDomainInfoRequest = {
  $type: "flux.domain.v1beta1.QueryDomainInfoRequest" as const,

  encode(message: QueryDomainInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDomainInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDomainInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDomainInfoRequest {
    return { domain: isSet(object.domain) ? globalThis.String(object.domain) : "" };
  },

  toJSON(message: QueryDomainInfoRequest): unknown {
    const obj: any = {};
    if (message.domain !== undefined) {
      obj.domain = message.domain;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDomainInfoRequest>): QueryDomainInfoRequest {
    return QueryDomainInfoRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDomainInfoRequest>): QueryDomainInfoRequest {
    const message = createBaseQueryDomainInfoRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseQueryDomainInfoResponse(): QueryDomainInfoResponse {
  return { domain: "", available: false, price: "" };
}

export const QueryDomainInfoResponse = {
  $type: "flux.domain.v1beta1.QueryDomainInfoResponse" as const,

  encode(message: QueryDomainInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.available === true) {
      writer.uint32(16).bool(message.available);
    }
    if (message.price !== "") {
      writer.uint32(26).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDomainInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDomainInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.available = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.price = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDomainInfoResponse {
    return {
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      available: isSet(object.available) ? globalThis.Boolean(object.available) : false,
      price: isSet(object.price) ? globalThis.String(object.price) : "",
    };
  },

  toJSON(message: QueryDomainInfoResponse): unknown {
    const obj: any = {};
    if (message.domain !== undefined) {
      obj.domain = message.domain;
    }
    if (message.available !== undefined) {
      obj.available = message.available;
    }
    if (message.price !== undefined) {
      obj.price = message.price;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDomainInfoResponse>): QueryDomainInfoResponse {
    return QueryDomainInfoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDomainInfoResponse>): QueryDomainInfoResponse {
    const message = createBaseQueryDomainInfoResponse();
    message.domain = object.domain ?? "";
    message.available = object.available ?? false;
    message.price = object.price ?? "";
    return message;
  },
};

function createBaseQueryOwnerDomains(): QueryOwnerDomains {
  return { address: "" };
}

export const QueryOwnerDomains = {
  $type: "flux.domain.v1beta1.QueryOwnerDomains" as const,

  encode(message: QueryOwnerDomains, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerDomains {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerDomains();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): QueryOwnerDomains {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: QueryOwnerDomains): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryOwnerDomains>): QueryOwnerDomains {
    return QueryOwnerDomains.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryOwnerDomains>): QueryOwnerDomains {
    const message = createBaseQueryOwnerDomains();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryOwnerDomainsResponse(): QueryOwnerDomainsResponse {
  return { address: "", domains: [] };
}

export const QueryOwnerDomainsResponse = {
  $type: "flux.domain.v1beta1.QueryOwnerDomainsResponse" as const,

  encode(message: QueryOwnerDomainsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.domains) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerDomainsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerDomainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.domains.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryOwnerDomainsResponse {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: QueryOwnerDomainsResponse): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.domains?.length) {
      obj.domains = message.domains;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryOwnerDomainsResponse>): QueryOwnerDomainsResponse {
    return QueryOwnerDomainsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryOwnerDomainsResponse>): QueryOwnerDomainsResponse {
    const message = createBaseQueryOwnerDomainsResponse();
    message.address = object.address ?? "";
    message.domains = object.domains?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryDomainOwner(): QueryDomainOwner {
  return { domain: "" };
}

export const QueryDomainOwner = {
  $type: "flux.domain.v1beta1.QueryDomainOwner" as const,

  encode(message: QueryDomainOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDomainOwner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDomainOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDomainOwner {
    return { domain: isSet(object.domain) ? globalThis.String(object.domain) : "" };
  },

  toJSON(message: QueryDomainOwner): unknown {
    const obj: any = {};
    if (message.domain !== undefined) {
      obj.domain = message.domain;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDomainOwner>): QueryDomainOwner {
    return QueryDomainOwner.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDomainOwner>): QueryDomainOwner {
    const message = createBaseQueryDomainOwner();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseQueryDomainOwnerResponse(): QueryDomainOwnerResponse {
  return { domain: "", owner: "" };
}

export const QueryDomainOwnerResponse = {
  $type: "flux.domain.v1beta1.QueryDomainOwnerResponse" as const,

  encode(message: QueryDomainOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDomainOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDomainOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.domain = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryDomainOwnerResponse {
    return {
      domain: isSet(object.domain) ? globalThis.String(object.domain) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: QueryDomainOwnerResponse): unknown {
    const obj: any = {};
    if (message.domain !== undefined) {
      obj.domain = message.domain;
    }
    if (message.owner !== undefined) {
      obj.owner = message.owner;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDomainOwnerResponse>): QueryDomainOwnerResponse {
    return QueryDomainOwnerResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDomainOwnerResponse>): QueryDomainOwnerResponse {
    const message = createBaseQueryDomainOwnerResponse();
    message.domain = object.domain ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

export interface Query {
  DomainInfo(request: DeepPartial<QueryDomainInfoRequest>, metadata?: grpc.Metadata): Promise<QueryDomainInfoResponse>;
  OwnerDomains(request: DeepPartial<QueryOwnerDomains>, metadata?: grpc.Metadata): Promise<QueryOwnerDomainsResponse>;
  DomainOwner(request: DeepPartial<QueryDomainOwner>, metadata?: grpc.Metadata): Promise<QueryDomainOwnerResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DomainInfo = this.DomainInfo.bind(this);
    this.OwnerDomains = this.OwnerDomains.bind(this);
    this.DomainOwner = this.DomainOwner.bind(this);
  }

  DomainInfo(request: DeepPartial<QueryDomainInfoRequest>, metadata?: grpc.Metadata): Promise<QueryDomainInfoResponse> {
    return this.rpc.unary(QueryDomainInfoDesc, QueryDomainInfoRequest.fromPartial(request), metadata);
  }

  OwnerDomains(request: DeepPartial<QueryOwnerDomains>, metadata?: grpc.Metadata): Promise<QueryOwnerDomainsResponse> {
    return this.rpc.unary(QueryOwnerDomainsDesc, QueryOwnerDomains.fromPartial(request), metadata);
  }

  DomainOwner(request: DeepPartial<QueryDomainOwner>, metadata?: grpc.Metadata): Promise<QueryDomainOwnerResponse> {
    return this.rpc.unary(QueryDomainOwnerDesc, QueryDomainOwner.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.domain.v1beta1.Query" };

export const QueryDomainInfoDesc: UnaryMethodDefinitionish = {
  methodName: "DomainInfo",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDomainInfoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDomainInfoResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryOwnerDomainsDesc: UnaryMethodDefinitionish = {
  methodName: "OwnerDomains",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryOwnerDomains.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryOwnerDomainsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryDomainOwnerDesc: UnaryMethodDefinitionish = {
  methodName: "DomainOwner",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDomainOwner.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDomainOwnerResponse.decode(data);
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
