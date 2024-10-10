// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/evm/v1beta1/genesis.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Account, Code, ContractStorage, Params } from "./evm";

export interface GenesisState {
  params: Params | undefined;
  accounts: Account[];
  codes: Code[];
  contract_storages: ContractStorage[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, accounts: [], codes: [], contract_storages: [] };
}

export const GenesisState = {
  $type: "flux.evm.v1beta1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.accounts) {
      Account.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.contract_storages) {
      ContractStorage.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accounts.push(Account.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.codes.push(Code.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contract_storages.push(ContractStorage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      accounts: globalThis.Array.isArray(object?.accounts) ? object.accounts.map((e: any) => Account.fromJSON(e)) : [],
      codes: globalThis.Array.isArray(object?.codes) ? object.codes.map((e: any) => Code.fromJSON(e)) : [],
      contract_storages: globalThis.Array.isArray(object?.contract_storages)
        ? object.contract_storages.map((e: any) => ContractStorage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.accounts?.length) {
      obj.accounts = message.accounts.map((e) => Account.toJSON(e));
    }
    if (message.codes?.length) {
      obj.codes = message.codes.map((e) => Code.toJSON(e));
    }
    if (message.contract_storages?.length) {
      obj.contract_storages = message.contract_storages.map((e) => ContractStorage.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.accounts = object.accounts?.map((e) => Account.fromPartial(e)) || [];
    message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
    message.contract_storages = object.contract_storages?.map((e) => ContractStorage.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
