/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Product } from "./product";

export interface QueryNFTProductsRequest {
  class_id: string;
  id: string;
}

export interface QueryNFTProductsResponse {
  products: Product[];
}

export interface QueryNFTProductRequest {
  class_id: string;
  id: string;
  product_id: string;
}

export interface QueryNFTProductResponse {
  product: Product | undefined;
}

export interface QueryVerifiersRequest {
}

export interface QueryVerifiersResponse {
  verifiers: string[];
}

function createBaseQueryNFTProductsRequest(): QueryNFTProductsRequest {
  return { class_id: "", id: "" };
}

export const QueryNFTProductsRequest = {
  $type: "flux.bazaar.v1beta1.QueryNFTProductsRequest" as const,

  encode(message: QueryNFTProductsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTProductsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTProductsRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTProductsRequest {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: QueryNFTProductsRequest): unknown {
    const obj: any = {};
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNFTProductsRequest>): QueryNFTProductsRequest {
    return QueryNFTProductsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNFTProductsRequest>): QueryNFTProductsRequest {
    const message = createBaseQueryNFTProductsRequest();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryNFTProductsResponse(): QueryNFTProductsResponse {
  return { products: [] };
}

export const QueryNFTProductsResponse = {
  $type: "flux.bazaar.v1beta1.QueryNFTProductsResponse" as const,

  encode(message: QueryNFTProductsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTProductsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTProductsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.products.push(Product.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTProductsResponse {
    return {
      products: globalThis.Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryNFTProductsResponse): unknown {
    const obj: any = {};
    if (message.products?.length) {
      obj.products = message.products.map((e) => Product.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNFTProductsResponse>): QueryNFTProductsResponse {
    return QueryNFTProductsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNFTProductsResponse>): QueryNFTProductsResponse {
    const message = createBaseQueryNFTProductsResponse();
    message.products = object.products?.map((e) => Product.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryNFTProductRequest(): QueryNFTProductRequest {
  return { class_id: "", id: "", product_id: "" };
}

export const QueryNFTProductRequest = {
  $type: "flux.bazaar.v1beta1.QueryNFTProductRequest" as const,

  encode(message: QueryNFTProductRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.product_id !== "") {
      writer.uint32(26).string(message.product_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTProductRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTProductRequest();
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

          message.product_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTProductRequest {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      product_id: isSet(object.product_id) ? globalThis.String(object.product_id) : "",
    };
  },

  toJSON(message: QueryNFTProductRequest): unknown {
    const obj: any = {};
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    if (message.product_id !== undefined) {
      obj.product_id = message.product_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNFTProductRequest>): QueryNFTProductRequest {
    return QueryNFTProductRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNFTProductRequest>): QueryNFTProductRequest {
    const message = createBaseQueryNFTProductRequest();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.product_id = object.product_id ?? "";
    return message;
  },
};

function createBaseQueryNFTProductResponse(): QueryNFTProductResponse {
  return { product: undefined };
}

export const QueryNFTProductResponse = {
  $type: "flux.bazaar.v1beta1.QueryNFTProductResponse" as const,

  encode(message: QueryNFTProductResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.product !== undefined) {
      Product.encode(message.product, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTProductResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTProductResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.product = Product.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTProductResponse {
    return { product: isSet(object.product) ? Product.fromJSON(object.product) : undefined };
  },

  toJSON(message: QueryNFTProductResponse): unknown {
    const obj: any = {};
    if (message.product !== undefined) {
      obj.product = Product.toJSON(message.product);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNFTProductResponse>): QueryNFTProductResponse {
    return QueryNFTProductResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNFTProductResponse>): QueryNFTProductResponse {
    const message = createBaseQueryNFTProductResponse();
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    return message;
  },
};

function createBaseQueryVerifiersRequest(): QueryVerifiersRequest {
  return {};
}

export const QueryVerifiersRequest = {
  $type: "flux.bazaar.v1beta1.QueryVerifiersRequest" as const,

  encode(_: QueryVerifiersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVerifiersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVerifiersRequest();
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

  fromJSON(_: any): QueryVerifiersRequest {
    return {};
  },

  toJSON(_: QueryVerifiersRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryVerifiersRequest>): QueryVerifiersRequest {
    return QueryVerifiersRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryVerifiersRequest>): QueryVerifiersRequest {
    const message = createBaseQueryVerifiersRequest();
    return message;
  },
};

function createBaseQueryVerifiersResponse(): QueryVerifiersResponse {
  return { verifiers: [] };
}

export const QueryVerifiersResponse = {
  $type: "flux.bazaar.v1beta1.QueryVerifiersResponse" as const,

  encode(message: QueryVerifiersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.verifiers) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVerifiersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVerifiersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verifiers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVerifiersResponse {
    return {
      verifiers: globalThis.Array.isArray(object?.verifiers)
        ? object.verifiers.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryVerifiersResponse): unknown {
    const obj: any = {};
    if (message.verifiers?.length) {
      obj.verifiers = message.verifiers;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryVerifiersResponse>): QueryVerifiersResponse {
    return QueryVerifiersResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryVerifiersResponse>): QueryVerifiersResponse {
    const message = createBaseQueryVerifiersResponse();
    message.verifiers = object.verifiers?.map((e) => e) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  NFTProducts(
    request: DeepPartial<QueryNFTProductsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNFTProductsResponse>;
  NFTProduct(request: DeepPartial<QueryNFTProductRequest>, metadata?: grpc.Metadata): Promise<QueryNFTProductResponse>;
  Verifiers(request: DeepPartial<QueryVerifiersRequest>, metadata?: grpc.Metadata): Promise<QueryVerifiersResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.NFTProducts = this.NFTProducts.bind(this);
    this.NFTProduct = this.NFTProduct.bind(this);
    this.Verifiers = this.Verifiers.bind(this);
  }

  NFTProducts(
    request: DeepPartial<QueryNFTProductsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNFTProductsResponse> {
    return this.rpc.unary(QueryNFTProductsDesc, QueryNFTProductsRequest.fromPartial(request), metadata);
  }

  NFTProduct(request: DeepPartial<QueryNFTProductRequest>, metadata?: grpc.Metadata): Promise<QueryNFTProductResponse> {
    return this.rpc.unary(QueryNFTProductDesc, QueryNFTProductRequest.fromPartial(request), metadata);
  }

  Verifiers(request: DeepPartial<QueryVerifiersRequest>, metadata?: grpc.Metadata): Promise<QueryVerifiersResponse> {
    return this.rpc.unary(QueryVerifiersDesc, QueryVerifiersRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.bazaar.v1beta1.Query" };

export const QueryNFTProductsDesc: UnaryMethodDefinitionish = {
  methodName: "NFTProducts",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryNFTProductsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryNFTProductsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryNFTProductDesc: UnaryMethodDefinitionish = {
  methodName: "NFTProduct",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryNFTProductRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryNFTProductResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryVerifiersDesc: UnaryMethodDefinitionish = {
  methodName: "Verifiers",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryVerifiersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryVerifiersResponse.decode(data);
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
