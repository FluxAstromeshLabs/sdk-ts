/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Grant } from "./authz";

/** Since: cosmos-sdk 0.43 */

/**
 * MsgGrant is a request type for Grant method. It declares authorization to the grantee
 * on behalf of the granter with the provided expiration time.
 */
export interface MsgGrant {
  granter: string;
  grantee: string;
  grant: Grant | undefined;
}

/** MsgGrantResponse defines the Msg/MsgGrant response type. */
export interface MsgGrantResponse {
}

/**
 * MsgExec attempts to execute the provided messages using
 * authorizations granted to the grantee. Each message should have only
 * one signer corresponding to the granter of the authorization.
 */
export interface MsgExec {
  grantee: string;
  /**
   * Execute Msg.
   * The x/authz will try to find a grant matching (msg.signers[0], grantee, MsgTypeURL(msg))
   * triple and validate it.
   */
  msgs: Any[];
}

/** MsgExecResponse defines the Msg/MsgExecResponse response type. */
export interface MsgExecResponse {
  results: Uint8Array[];
}

/**
 * MsgRevoke revokes any authorization with the provided sdk.Msg type on the
 * granter's account with that has been granted to the grantee.
 */
export interface MsgRevoke {
  granter: string;
  grantee: string;
  msg_type_url: string;
}

/** MsgRevokeResponse defines the Msg/MsgRevokeResponse response type. */
export interface MsgRevokeResponse {
}

function createBaseMsgGrant(): MsgGrant {
  return { granter: "", grantee: "", grant: undefined };
}

export const MsgGrant = {
  $type: "cosmos.authz.v1beta1.MsgGrant" as const,

  encode(message: MsgGrant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.grant !== undefined) {
      Grant.encode(message.grant, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.grant = Grant.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgGrant {
    return {
      granter: isSet(object.granter) ? globalThis.String(object.granter) : "",
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
      grant: isSet(object.grant) ? Grant.fromJSON(object.grant) : undefined,
    };
  },

  toJSON(message: MsgGrant): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.grant !== undefined) {
      obj.grant = Grant.toJSON(message.grant);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgGrant>): MsgGrant {
    return MsgGrant.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgGrant>): MsgGrant {
    const message = createBaseMsgGrant();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.grant = (object.grant !== undefined && object.grant !== null) ? Grant.fromPartial(object.grant) : undefined;
    return message;
  },
};

function createBaseMsgGrantResponse(): MsgGrantResponse {
  return {};
}

export const MsgGrantResponse = {
  $type: "cosmos.authz.v1beta1.MsgGrantResponse" as const,

  encode(_: MsgGrantResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgGrantResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGrantResponse();
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

  fromJSON(_: any): MsgGrantResponse {
    return {};
  },

  toJSON(_: MsgGrantResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgGrantResponse>): MsgGrantResponse {
    return MsgGrantResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgGrantResponse>): MsgGrantResponse {
    const message = createBaseMsgGrantResponse();
    return message;
  },
};

function createBaseMsgExec(): MsgExec {
  return { grantee: "", msgs: [] };
}

export const MsgExec = {
  $type: "cosmos.authz.v1beta1.MsgExec" as const,

  encode(message: MsgExec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.grantee !== "") {
      writer.uint32(10).string(message.grantee);
    }
    for (const v of message.msgs) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.msgs.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExec {
    return {
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
      msgs: globalThis.Array.isArray(object?.msgs) ? object.msgs.map((e: any) => Any.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.msgs?.length) {
      obj.msgs = message.msgs.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExec>): MsgExec {
    return MsgExec.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExec>): MsgExec {
    const message = createBaseMsgExec();
    message.grantee = object.grantee ?? "";
    message.msgs = object.msgs?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgExecResponse(): MsgExecResponse {
  return { results: [] };
}

export const MsgExecResponse = {
  $type: "cosmos.authz.v1beta1.MsgExecResponse" as const,

  encode(message: MsgExecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.results) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.results.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecResponse {
    return {
      results: globalThis.Array.isArray(object?.results) ? object.results.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: MsgExecResponse): unknown {
    const obj: any = {};
    if (message.results?.length) {
      obj.results = message.results.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExecResponse>): MsgExecResponse {
    return MsgExecResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExecResponse>): MsgExecResponse {
    const message = createBaseMsgExecResponse();
    message.results = object.results?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRevoke(): MsgRevoke {
  return { granter: "", grantee: "", msg_type_url: "" };
}

export const MsgRevoke = {
  $type: "cosmos.authz.v1beta1.MsgRevoke" as const,

  encode(message: MsgRevoke, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.msg_type_url !== "") {
      writer.uint32(26).string(message.msg_type_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevoke {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevoke();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msg_type_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevoke {
    return {
      granter: isSet(object.granter) ? globalThis.String(object.granter) : "",
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
      msg_type_url: isSet(object.msg_type_url) ? globalThis.String(object.msg_type_url) : "",
    };
  },

  toJSON(message: MsgRevoke): unknown {
    const obj: any = {};
    if (message.granter !== "") {
      obj.granter = message.granter;
    }
    if (message.grantee !== "") {
      obj.grantee = message.grantee;
    }
    if (message.msg_type_url !== "") {
      obj.msg_type_url = message.msg_type_url;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgRevoke>): MsgRevoke {
    return MsgRevoke.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgRevoke>): MsgRevoke {
    const message = createBaseMsgRevoke();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.msg_type_url = object.msg_type_url ?? "";
    return message;
  },
};

function createBaseMsgRevokeResponse(): MsgRevokeResponse {
  return {};
}

export const MsgRevokeResponse = {
  $type: "cosmos.authz.v1beta1.MsgRevokeResponse" as const,

  encode(_: MsgRevokeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeResponse();
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

  fromJSON(_: any): MsgRevokeResponse {
    return {};
  },

  toJSON(_: MsgRevokeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgRevokeResponse>): MsgRevokeResponse {
    return MsgRevokeResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgRevokeResponse>): MsgRevokeResponse {
    const message = createBaseMsgRevokeResponse();
    return message;
  },
};

/** Msg defines the authz Msg service. */
export interface Msg {
  /**
   * Grant grants the provided authorization to the grantee on the granter's
   * account with the provided expiration time. If there is already a grant
   * for the given (granter, grantee, Authorization) triple, then the grant
   * will be overwritten.
   */
  Grant(request: DeepPartial<MsgGrant>, metadata?: grpc.Metadata): Promise<MsgGrantResponse>;
  /**
   * Exec attempts to execute the provided messages using
   * authorizations granted to the grantee. Each message should have only
   * one signer corresponding to the granter of the authorization.
   */
  Exec(request: DeepPartial<MsgExec>, metadata?: grpc.Metadata): Promise<MsgExecResponse>;
  /**
   * Revoke revokes any authorization corresponding to the provided method name on the
   * granter's account that has been granted to the grantee.
   */
  Revoke(request: DeepPartial<MsgRevoke>, metadata?: grpc.Metadata): Promise<MsgRevokeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Grant = this.Grant.bind(this);
    this.Exec = this.Exec.bind(this);
    this.Revoke = this.Revoke.bind(this);
  }

  Grant(request: DeepPartial<MsgGrant>, metadata?: grpc.Metadata): Promise<MsgGrantResponse> {
    return this.rpc.unary(MsgGrantDesc, MsgGrant.fromPartial(request), metadata);
  }

  Exec(request: DeepPartial<MsgExec>, metadata?: grpc.Metadata): Promise<MsgExecResponse> {
    return this.rpc.unary(MsgExecDesc, MsgExec.fromPartial(request), metadata);
  }

  Revoke(request: DeepPartial<MsgRevoke>, metadata?: grpc.Metadata): Promise<MsgRevokeResponse> {
    return this.rpc.unary(MsgRevokeDesc, MsgRevoke.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "cosmos.authz.v1beta1.Msg" };

export const MsgGrantDesc: UnaryMethodDefinitionish = {
  methodName: "Grant",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgGrant.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgGrantResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgExecDesc: UnaryMethodDefinitionish = {
  methodName: "Exec",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgExec.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgExecResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgRevokeDesc: UnaryMethodDefinitionish = {
  methodName: "Revoke",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgRevoke.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgRevokeResponse.decode(data);
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

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
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
