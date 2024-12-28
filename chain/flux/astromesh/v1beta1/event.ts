// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/astromesh/v1beta1/event.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ContractInfo } from "../../../cosmwasm/wasm/v1/types";
import { Op, opFromJSON, opToJSON } from "../../eventstream/v1beta1/query";
import { Plane, planeFromJSON, planeToJSON } from "./tx";

export interface AccountBalance {
  acc: Uint8Array;
  balance: string;
}

export interface DenomBalanceUpdate {
  denom: string;
  balances: AccountBalance[];
}

export interface BalanceUpdateEvent {
  op: Op;
  upd: DenomBalanceUpdate[];
  plane: Plane;
}

export interface TokenMetadata {
  denom: string;
  plane: Plane;
  name: string;
  symbol: string;
  decimals: number;
  height: string;
  logo: string;
}

export interface TokenMetadataEvent {
  op: Op;
  metadata: TokenMetadata[];
}

export interface WasmContractEvent {
  op: Op;
  contract_address: string;
  info: ContractInfo | undefined;
}

function createBaseAccountBalance(): AccountBalance {
  return { acc: new Uint8Array(0), balance: "" };
}

export const AccountBalance = {
  $type: "flux.astromesh.v1beta1.AccountBalance" as const,

  encode(message: AccountBalance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.acc.length !== 0) {
      writer.uint32(10).bytes(message.acc);
    }
    if (message.balance !== "") {
      writer.uint32(18).string(message.balance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountBalance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acc = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.balance = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountBalance {
    return {
      acc: isSet(object.acc) ? bytesFromBase64(object.acc) : new Uint8Array(0),
      balance: isSet(object.balance) ? globalThis.String(object.balance) : "",
    };
  },

  toJSON(message: AccountBalance): unknown {
    const obj: any = {};
    if (message.acc !== undefined) {
      obj.acc = base64FromBytes(message.acc);
    }
    if (message.balance !== undefined) {
      obj.balance = message.balance;
    }
    return obj;
  },

  create(base?: DeepPartial<AccountBalance>): AccountBalance {
    return AccountBalance.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AccountBalance>): AccountBalance {
    const message = createBaseAccountBalance();
    message.acc = object.acc ?? new Uint8Array(0);
    message.balance = object.balance ?? "";
    return message;
  },
};

function createBaseDenomBalanceUpdate(): DenomBalanceUpdate {
  return { denom: "", balances: [] };
}

export const DenomBalanceUpdate = {
  $type: "flux.astromesh.v1beta1.DenomBalanceUpdate" as const,

  encode(message: DenomBalanceUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.balances) {
      AccountBalance.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomBalanceUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomBalanceUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.balances.push(AccountBalance.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomBalanceUpdate {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      balances: globalThis.Array.isArray(object?.balances)
        ? object.balances.map((e: any) => AccountBalance.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DenomBalanceUpdate): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = message.denom;
    }
    if (message.balances?.length) {
      obj.balances = message.balances.map((e) => AccountBalance.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<DenomBalanceUpdate>): DenomBalanceUpdate {
    return DenomBalanceUpdate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DenomBalanceUpdate>): DenomBalanceUpdate {
    const message = createBaseDenomBalanceUpdate();
    message.denom = object.denom ?? "";
    message.balances = object.balances?.map((e) => AccountBalance.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBalanceUpdateEvent(): BalanceUpdateEvent {
  return { op: 0, upd: [], plane: 0 };
}

export const BalanceUpdateEvent = {
  $type: "flux.astromesh.v1beta1.BalanceUpdateEvent" as const,

  encode(message: BalanceUpdateEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    for (const v of message.upd) {
      DenomBalanceUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.plane !== 0) {
      writer.uint32(24).int32(message.plane);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceUpdateEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalanceUpdateEvent();
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

          message.upd.push(DenomBalanceUpdate.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.plane = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalanceUpdateEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
      upd: globalThis.Array.isArray(object?.upd) ? object.upd.map((e: any) => DenomBalanceUpdate.fromJSON(e)) : [],
      plane: isSet(object.plane) ? planeFromJSON(object.plane) : 0,
    };
  },

  toJSON(message: BalanceUpdateEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
    if (message.upd?.length) {
      obj.upd = message.upd.map((e) => DenomBalanceUpdate.toJSON(e));
    }
    if (message.plane !== undefined) {
      obj.plane = planeToJSON(message.plane);
    }
    return obj;
  },

  create(base?: DeepPartial<BalanceUpdateEvent>): BalanceUpdateEvent {
    return BalanceUpdateEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BalanceUpdateEvent>): BalanceUpdateEvent {
    const message = createBaseBalanceUpdateEvent();
    message.op = object.op ?? 0;
    message.upd = object.upd?.map((e) => DenomBalanceUpdate.fromPartial(e)) || [];
    message.plane = object.plane ?? 0;
    return message;
  },
};

function createBaseTokenMetadata(): TokenMetadata {
  return { denom: "", plane: 0, name: "", symbol: "", decimals: 0, height: "0", logo: "" };
}

export const TokenMetadata = {
  $type: "flux.astromesh.v1beta1.TokenMetadata" as const,

  encode(message: TokenMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.plane !== 0) {
      writer.uint32(16).int32(message.plane);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (message.decimals !== 0) {
      writer.uint32(40).uint32(message.decimals);
    }
    if (message.height !== "0") {
      writer.uint32(48).int64(message.height);
    }
    if (message.logo !== "") {
      writer.uint32(58).string(message.logo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.plane = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.decimals = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.logo = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TokenMetadata {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      plane: isSet(object.plane) ? planeFromJSON(object.plane) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      decimals: isSet(object.decimals) ? globalThis.Number(object.decimals) : 0,
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      logo: isSet(object.logo) ? globalThis.String(object.logo) : "",
    };
  },

  toJSON(message: TokenMetadata): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = message.denom;
    }
    if (message.plane !== undefined) {
      obj.plane = planeToJSON(message.plane);
    }
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.symbol !== undefined) {
      obj.symbol = message.symbol;
    }
    if (message.decimals !== undefined) {
      obj.decimals = Math.round(message.decimals);
    }
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.logo !== undefined) {
      obj.logo = message.logo;
    }
    return obj;
  },

  create(base?: DeepPartial<TokenMetadata>): TokenMetadata {
    return TokenMetadata.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TokenMetadata>): TokenMetadata {
    const message = createBaseTokenMetadata();
    message.denom = object.denom ?? "";
    message.plane = object.plane ?? 0;
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.decimals = object.decimals ?? 0;
    message.height = object.height ?? "0";
    message.logo = object.logo ?? "";
    return message;
  },
};

function createBaseTokenMetadataEvent(): TokenMetadataEvent {
  return { op: 0, metadata: [] };
}

export const TokenMetadataEvent = {
  $type: "flux.astromesh.v1beta1.TokenMetadataEvent" as const,

  encode(message: TokenMetadataEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    for (const v of message.metadata) {
      TokenMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenMetadataEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenMetadataEvent();
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

          message.metadata.push(TokenMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TokenMetadataEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
      metadata: globalThis.Array.isArray(object?.metadata)
        ? object.metadata.map((e: any) => TokenMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TokenMetadataEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
    if (message.metadata?.length) {
      obj.metadata = message.metadata.map((e) => TokenMetadata.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<TokenMetadataEvent>): TokenMetadataEvent {
    return TokenMetadataEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TokenMetadataEvent>): TokenMetadataEvent {
    const message = createBaseTokenMetadataEvent();
    message.op = object.op ?? 0;
    message.metadata = object.metadata?.map((e) => TokenMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWasmContractEvent(): WasmContractEvent {
  return { op: 0, contract_address: "", info: undefined };
}

export const WasmContractEvent = {
  $type: "flux.astromesh.v1beta1.WasmContractEvent" as const,

  encode(message: WasmContractEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    if (message.contract_address !== "") {
      writer.uint32(18).string(message.contract_address);
    }
    if (message.info !== undefined) {
      ContractInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WasmContractEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWasmContractEvent();
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

          message.contract_address = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = ContractInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WasmContractEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
      contract_address: isSet(object.contract_address) ? globalThis.String(object.contract_address) : "",
      info: isSet(object.info) ? ContractInfo.fromJSON(object.info) : undefined,
    };
  },

  toJSON(message: WasmContractEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
    if (message.contract_address !== undefined) {
      obj.contract_address = message.contract_address;
    }
    if (message.info !== undefined) {
      obj.info = ContractInfo.toJSON(message.info);
    }
    return obj;
  },

  create(base?: DeepPartial<WasmContractEvent>): WasmContractEvent {
    return WasmContractEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<WasmContractEvent>): WasmContractEvent {
    const message = createBaseWasmContractEvent();
    message.op = object.op ?? 0;
    message.contract_address = object.contract_address ?? "";
    message.info = (object.info !== undefined && object.info !== null)
      ? ContractInfo.fromPartial(object.info)
      : undefined;
    return message;
  },
};

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
