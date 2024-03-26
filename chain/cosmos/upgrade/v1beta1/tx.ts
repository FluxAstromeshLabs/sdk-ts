/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Plan } from "./upgrade";

/** Since: cosmos-sdk 0.46 */

/**
 * MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgrade {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** plan is the upgrade plan. */
  plan: Plan | undefined;
}

/**
 * MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeResponse {
}

/**
 * MsgCancelUpgrade is the Msg/CancelUpgrade request type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgrade {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
}

/**
 * MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeResponse {
}

function createBaseMsgSoftwareUpgrade(): MsgSoftwareUpgrade {
  return { authority: "", plan: undefined };
}

export const MsgSoftwareUpgrade = {
  $type: "cosmos.upgrade.v1beta1.MsgSoftwareUpgrade" as const,

  encode(message: MsgSoftwareUpgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSoftwareUpgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSoftwareUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSoftwareUpgrade {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
    };
  },

  toJSON(message: MsgSoftwareUpgrade): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgSoftwareUpgrade>): MsgSoftwareUpgrade {
    return MsgSoftwareUpgrade.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgSoftwareUpgrade>): MsgSoftwareUpgrade {
    const message = createBaseMsgSoftwareUpgrade();
    message.authority = object.authority ?? "";
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    return message;
  },
};

function createBaseMsgSoftwareUpgradeResponse(): MsgSoftwareUpgradeResponse {
  return {};
}

export const MsgSoftwareUpgradeResponse = {
  $type: "cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse" as const,

  encode(_: MsgSoftwareUpgradeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSoftwareUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSoftwareUpgradeResponse();
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

  fromJSON(_: any): MsgSoftwareUpgradeResponse {
    return {};
  },

  toJSON(_: MsgSoftwareUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgSoftwareUpgradeResponse>): MsgSoftwareUpgradeResponse {
    return MsgSoftwareUpgradeResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgSoftwareUpgradeResponse>): MsgSoftwareUpgradeResponse {
    const message = createBaseMsgSoftwareUpgradeResponse();
    return message;
  },
};

function createBaseMsgCancelUpgrade(): MsgCancelUpgrade {
  return { authority: "" };
}

export const MsgCancelUpgrade = {
  $type: "cosmos.upgrade.v1beta1.MsgCancelUpgrade" as const,

  encode(message: MsgCancelUpgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelUpgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCancelUpgrade {
    return { authority: isSet(object.authority) ? globalThis.String(object.authority) : "" };
  },

  toJSON(message: MsgCancelUpgrade): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgCancelUpgrade>): MsgCancelUpgrade {
    return MsgCancelUpgrade.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgCancelUpgrade>): MsgCancelUpgrade {
    const message = createBaseMsgCancelUpgrade();
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBaseMsgCancelUpgradeResponse(): MsgCancelUpgradeResponse {
  return {};
}

export const MsgCancelUpgradeResponse = {
  $type: "cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse" as const,

  encode(_: MsgCancelUpgradeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelUpgradeResponse();
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

  fromJSON(_: any): MsgCancelUpgradeResponse {
    return {};
  },

  toJSON(_: MsgCancelUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgCancelUpgradeResponse>): MsgCancelUpgradeResponse {
    return MsgCancelUpgradeResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgCancelUpgradeResponse>): MsgCancelUpgradeResponse {
    const message = createBaseMsgCancelUpgradeResponse();
    return message;
  },
};

/** Msg defines the upgrade Msg service. */
export interface Msg {
  /**
   * SoftwareUpgrade is a governance operation for initiating a software upgrade.
   *
   * Since: cosmos-sdk 0.46
   */
  SoftwareUpgrade(
    request: DeepPartial<MsgSoftwareUpgrade>,
    metadata?: grpc.Metadata,
  ): Promise<MsgSoftwareUpgradeResponse>;
  /**
   * CancelUpgrade is a governance operation for cancelling a previously
   * approved software upgrade.
   *
   * Since: cosmos-sdk 0.46
   */
  CancelUpgrade(request: DeepPartial<MsgCancelUpgrade>, metadata?: grpc.Metadata): Promise<MsgCancelUpgradeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SoftwareUpgrade = this.SoftwareUpgrade.bind(this);
    this.CancelUpgrade = this.CancelUpgrade.bind(this);
  }

  SoftwareUpgrade(
    request: DeepPartial<MsgSoftwareUpgrade>,
    metadata?: grpc.Metadata,
  ): Promise<MsgSoftwareUpgradeResponse> {
    return this.rpc.unary(MsgSoftwareUpgradeDesc, MsgSoftwareUpgrade.fromPartial(request), metadata);
  }

  CancelUpgrade(request: DeepPartial<MsgCancelUpgrade>, metadata?: grpc.Metadata): Promise<MsgCancelUpgradeResponse> {
    return this.rpc.unary(MsgCancelUpgradeDesc, MsgCancelUpgrade.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "cosmos.upgrade.v1beta1.Msg" };

export const MsgSoftwareUpgradeDesc: UnaryMethodDefinitionish = {
  methodName: "SoftwareUpgrade",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgSoftwareUpgrade.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgSoftwareUpgradeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgCancelUpgradeDesc: UnaryMethodDefinitionish = {
  methodName: "CancelUpgrade",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgCancelUpgrade.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgCancelUpgradeResponse.decode(data);
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
