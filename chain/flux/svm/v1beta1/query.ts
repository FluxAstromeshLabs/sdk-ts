// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/svm/v1beta1/query.proto

/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Account } from "./svm";

export interface AccountRequest {
  address: string;
}

export interface AccountResponse {
  account: Account | undefined;
}

export interface ProgramAccountsRequest {
  address: string;
}

export interface ProgramAccountsResponse {
  addresses: string[];
}

function createBaseAccountRequest(): AccountRequest {
  return { address: "" };
}

export const AccountRequest = {
  $type: "flux.svm.v1beta1.AccountRequest" as const,

  encode(message: AccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRequest();
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

  fromJSON(object: any): AccountRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: AccountRequest): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    return obj;
  },

  create(base?: DeepPartial<AccountRequest>): AccountRequest {
    return AccountRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AccountRequest>): AccountRequest {
    const message = createBaseAccountRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseAccountResponse(): AccountResponse {
  return { account: undefined };
}

export const AccountResponse = {
  $type: "flux.svm.v1beta1.AccountResponse" as const,

  encode(message: AccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = Account.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountResponse {
    return { account: isSet(object.account) ? Account.fromJSON(object.account) : undefined };
  },

  toJSON(message: AccountResponse): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = Account.toJSON(message.account);
    }
    return obj;
  },

  create(base?: DeepPartial<AccountResponse>): AccountResponse {
    return AccountResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AccountResponse>): AccountResponse {
    const message = createBaseAccountResponse();
    message.account = (object.account !== undefined && object.account !== null)
      ? Account.fromPartial(object.account)
      : undefined;
    return message;
  },
};

function createBaseProgramAccountsRequest(): ProgramAccountsRequest {
  return { address: "" };
}

export const ProgramAccountsRequest = {
  $type: "flux.svm.v1beta1.ProgramAccountsRequest" as const,

  encode(message: ProgramAccountsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProgramAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProgramAccountsRequest();
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

  fromJSON(object: any): ProgramAccountsRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: ProgramAccountsRequest): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    return obj;
  },

  create(base?: DeepPartial<ProgramAccountsRequest>): ProgramAccountsRequest {
    return ProgramAccountsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProgramAccountsRequest>): ProgramAccountsRequest {
    const message = createBaseProgramAccountsRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseProgramAccountsResponse(): ProgramAccountsResponse {
  return { addresses: [] };
}

export const ProgramAccountsResponse = {
  $type: "flux.svm.v1beta1.ProgramAccountsResponse" as const,

  encode(message: ProgramAccountsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProgramAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProgramAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProgramAccountsResponse {
    return {
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ProgramAccountsResponse): unknown {
    const obj: any = {};
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    return obj;
  },

  create(base?: DeepPartial<ProgramAccountsResponse>): ProgramAccountsResponse {
    return ProgramAccountsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProgramAccountsResponse>): ProgramAccountsResponse {
    const message = createBaseProgramAccountsResponse();
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

export interface Query {
  Account(request: DeepPartial<AccountRequest>, metadata?: grpc.Metadata): Promise<AccountResponse>;
  ProgramAccounts(
    request: DeepPartial<ProgramAccountsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProgramAccountsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Account = this.Account.bind(this);
    this.ProgramAccounts = this.ProgramAccounts.bind(this);
  }

  Account(request: DeepPartial<AccountRequest>, metadata?: grpc.Metadata): Promise<AccountResponse> {
    return this.rpc.unary(QueryAccountDesc, AccountRequest.fromPartial(request), metadata);
  }

  ProgramAccounts(
    request: DeepPartial<ProgramAccountsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProgramAccountsResponse> {
    return this.rpc.unary(QueryProgramAccountsDesc, ProgramAccountsRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.svm.v1beta1.Query" };

export const QueryAccountDesc: UnaryMethodDefinitionish = {
  methodName: "Account",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AccountRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AccountResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryProgramAccountsDesc: UnaryMethodDefinitionish = {
  methodName: "ProgramAccounts",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProgramAccountsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProgramAccountsResponse.decode(data);
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
