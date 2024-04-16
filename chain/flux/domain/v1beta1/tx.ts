/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export interface MsgClaim {
  sender: string;
  alias: string;
  amount: Coin | undefined;
}

export interface MsgClaimResponse {
}

export interface MsgExtend {
  sender: string;
  alias: string;
  amount: Coin | undefined;
}

export interface MsgExtendResponse {
}

export interface MsgTransfer {
  sender: string;
  receiver: string;
  domains: string[];
}

export interface MsgTransferResponse {
}

export interface MsgWithdraw {
  sender: string;
  domains: string[];
}

export interface MsgWithdrawResponse {
}

export interface MsgDeposit {
  sender: string;
  domains: Coin[];
}

export interface MsgDepositResponse {
}

function createBaseMsgClaim(): MsgClaim {
  return { sender: "", alias: "", amount: undefined };
}

export const MsgClaim = {
  $type: "flux.domain.v1beta1.MsgClaim" as const,

  encode(message: MsgClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.alias !== "") {
      writer.uint32(18).string(message.alias);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaim {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.alias = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaim {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      alias: isSet(object.alias) ? globalThis.String(object.alias) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: MsgClaim): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.alias !== undefined) {
      obj.alias = message.alias;
    }
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgClaim>): MsgClaim {
    return MsgClaim.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgClaim>): MsgClaim {
    const message = createBaseMsgClaim();
    message.sender = object.sender ?? "";
    message.alias = object.alias ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseMsgClaimResponse(): MsgClaimResponse {
  return {};
}

export const MsgClaimResponse = {
  $type: "flux.domain.v1beta1.MsgClaimResponse" as const,

  encode(_: MsgClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimResponse();
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

  fromJSON(_: any): MsgClaimResponse {
    return {};
  },

  toJSON(_: MsgClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgClaimResponse>): MsgClaimResponse {
    return MsgClaimResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgClaimResponse>): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    return message;
  },
};

function createBaseMsgExtend(): MsgExtend {
  return { sender: "", alias: "", amount: undefined };
}

export const MsgExtend = {
  $type: "flux.domain.v1beta1.MsgExtend" as const,

  encode(message: MsgExtend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.alias !== "") {
      writer.uint32(18).string(message.alias);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExtend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.alias = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExtend {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      alias: isSet(object.alias) ? globalThis.String(object.alias) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
    };
  },

  toJSON(message: MsgExtend): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.alias !== undefined) {
      obj.alias = message.alias;
    }
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExtend>): MsgExtend {
    return MsgExtend.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExtend>): MsgExtend {
    const message = createBaseMsgExtend();
    message.sender = object.sender ?? "";
    message.alias = object.alias ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseMsgExtendResponse(): MsgExtendResponse {
  return {};
}

export const MsgExtendResponse = {
  $type: "flux.domain.v1beta1.MsgExtendResponse" as const,

  encode(_: MsgExtendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExtendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtendResponse();
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

  fromJSON(_: any): MsgExtendResponse {
    return {};
  },

  toJSON(_: MsgExtendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgExtendResponse>): MsgExtendResponse {
    return MsgExtendResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgExtendResponse>): MsgExtendResponse {
    const message = createBaseMsgExtendResponse();
    return message;
  },
};

function createBaseMsgTransfer(): MsgTransfer {
  return { sender: "", receiver: "", domains: [] };
}

export const MsgTransfer = {
  $type: "flux.domain.v1beta1.MsgTransfer" as const,

  encode(message: MsgTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    for (const v of message.domains) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): MsgTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MsgTransfer): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.receiver !== undefined) {
      obj.receiver = message.receiver;
    }
    if (message.domains?.length) {
      obj.domains = message.domains;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgTransfer>): MsgTransfer {
    return MsgTransfer.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgTransfer>): MsgTransfer {
    const message = createBaseMsgTransfer();
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.domains = object.domains?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgTransferResponse(): MsgTransferResponse {
  return {};
}

export const MsgTransferResponse = {
  $type: "flux.domain.v1beta1.MsgTransferResponse" as const,

  encode(_: MsgTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferResponse();
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

  fromJSON(_: any): MsgTransferResponse {
    return {};
  },

  toJSON(_: MsgTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgTransferResponse>): MsgTransferResponse {
    return MsgTransferResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgTransferResponse>): MsgTransferResponse {
    const message = createBaseMsgTransferResponse();
    return message;
  },
};

function createBaseMsgWithdraw(): MsgWithdraw {
  return { sender: "", domains: [] };
}

export const MsgWithdraw = {
  $type: "flux.domain.v1beta1.MsgWithdraw" as const,

  encode(message: MsgWithdraw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.domains) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
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

  fromJSON(object: any): MsgWithdraw {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MsgWithdraw): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.domains?.length) {
      obj.domains = message.domains;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgWithdraw>): MsgWithdraw {
    return MsgWithdraw.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgWithdraw>): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.sender = object.sender ?? "";
    message.domains = object.domains?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {};
}

export const MsgWithdrawResponse = {
  $type: "flux.domain.v1beta1.MsgWithdrawResponse" as const,

  encode(_: MsgWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
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

  fromJSON(_: any): MsgWithdrawResponse {
    return {};
  },

  toJSON(_: MsgWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawResponse>): MsgWithdrawResponse {
    return MsgWithdrawResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgWithdrawResponse>): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    return message;
  },
};

function createBaseMsgDeposit(): MsgDeposit {
  return { sender: "", domains: [] };
}

export const MsgDeposit = {
  $type: "flux.domain.v1beta1.MsgDeposit" as const,

  encode(message: MsgDeposit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.domains) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.domains.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.domains?.length) {
      obj.domains = message.domains.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDeposit>): MsgDeposit {
    return MsgDeposit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDeposit>): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.sender = object.sender ?? "";
    message.domains = object.domains?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  $type: "flux.domain.v1beta1.MsgDepositResponse" as const,

  encode(_: MsgDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
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

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgDepositResponse>): MsgDepositResponse {
    return MsgDepositResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgDepositResponse>): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

/** Msg defines the nft Msg service. */
export interface Msg {
  Claim(request: DeepPartial<MsgClaim>, metadata?: grpc.Metadata): Promise<MsgClaimResponse>;
  Extend(request: DeepPartial<MsgExtend>, metadata?: grpc.Metadata): Promise<MsgExtendResponse>;
  Transfer(request: DeepPartial<MsgTransfer>, metadata?: grpc.Metadata): Promise<MsgTransferResponse>;
  Withdraw(request: DeepPartial<MsgWithdraw>, metadata?: grpc.Metadata): Promise<MsgWithdrawResponse>;
  Deposit(request: DeepPartial<MsgDeposit>, metadata?: grpc.Metadata): Promise<MsgDepositResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Claim = this.Claim.bind(this);
    this.Extend = this.Extend.bind(this);
    this.Transfer = this.Transfer.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.Deposit = this.Deposit.bind(this);
  }

  Claim(request: DeepPartial<MsgClaim>, metadata?: grpc.Metadata): Promise<MsgClaimResponse> {
    return this.rpc.unary(MsgClaimDesc, MsgClaim.fromPartial(request), metadata);
  }

  Extend(request: DeepPartial<MsgExtend>, metadata?: grpc.Metadata): Promise<MsgExtendResponse> {
    return this.rpc.unary(MsgExtendDesc, MsgExtend.fromPartial(request), metadata);
  }

  Transfer(request: DeepPartial<MsgTransfer>, metadata?: grpc.Metadata): Promise<MsgTransferResponse> {
    return this.rpc.unary(MsgTransferDesc, MsgTransfer.fromPartial(request), metadata);
  }

  Withdraw(request: DeepPartial<MsgWithdraw>, metadata?: grpc.Metadata): Promise<MsgWithdrawResponse> {
    return this.rpc.unary(MsgWithdrawDesc, MsgWithdraw.fromPartial(request), metadata);
  }

  Deposit(request: DeepPartial<MsgDeposit>, metadata?: grpc.Metadata): Promise<MsgDepositResponse> {
    return this.rpc.unary(MsgDepositDesc, MsgDeposit.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "flux.domain.v1beta1.Msg" };

export const MsgClaimDesc: UnaryMethodDefinitionish = {
  methodName: "Claim",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgClaim.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgClaimResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgExtendDesc: UnaryMethodDefinitionish = {
  methodName: "Extend",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgExtend.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgExtendResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgTransferDesc: UnaryMethodDefinitionish = {
  methodName: "Transfer",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgTransfer.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgTransferResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgWithdrawDesc: UnaryMethodDefinitionish = {
  methodName: "Withdraw",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgWithdraw.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgWithdrawResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgDepositDesc: UnaryMethodDefinitionish = {
  methodName: "Deposit",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgDeposit.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgDepositResponse.decode(data);
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
