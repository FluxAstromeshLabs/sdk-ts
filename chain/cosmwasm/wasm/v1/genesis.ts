/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CodeInfo, ContractCodeHistoryEntry, ContractInfo, Model, Params } from "./types";

/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  params: Params | undefined;
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}

/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  code_id: string;
  code_info: CodeInfo | undefined;
  code_bytes: Uint8Array;
  /** Pinned to wasmvm cache */
  pinned: boolean;
}

/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contract_address: string;
  contract_info: ContractInfo | undefined;
  contract_state: Model[];
  contract_code_history: ContractCodeHistoryEntry[];
}

/** Sequence key and value of an id generation counter */
export interface Sequence {
  id_key: Uint8Array;
  value: string;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, codes: [], contracts: [], sequences: [] };
}

export const GenesisState = {
  $type: "cosmwasm.wasm.v1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sequences) {
      Sequence.encode(v!, writer.uint32(34).fork()).ldelim();
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

          message.codes.push(Code.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contracts.push(Contract.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sequences.push(Sequence.decode(reader, reader.uint32()));
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
      codes: Array.isArray(object?.codes) ? object.codes.map((e: any) => Code.fromJSON(e)) : [],
      contracts: Array.isArray(object?.contracts) ? object.contracts.map((e: any) => Contract.fromJSON(e)) : [],
      sequences: Array.isArray(object?.sequences) ? object.sequences.map((e: any) => Sequence.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.codes?.length) {
      obj.codes = message.codes.map((e) => Code.toJSON(e));
    }
    if (message.contracts?.length) {
      obj.contracts = message.contracts.map((e) => Contract.toJSON(e));
    }
    if (message.sequences?.length) {
      obj.sequences = message.sequences.map((e) => Sequence.toJSON(e));
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
    message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
    message.contracts = object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.sequences = object.sequences?.map((e) => Sequence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCode(): Code {
  return { code_id: "0", code_info: undefined, code_bytes: new Uint8Array(0), pinned: false };
}

export const Code = {
  $type: "cosmwasm.wasm.v1.Code" as const,

  encode(message: Code, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.code_info !== undefined) {
      CodeInfo.encode(message.code_info, writer.uint32(18).fork()).ldelim();
    }
    if (message.code_bytes.length !== 0) {
      writer.uint32(26).bytes(message.code_bytes);
    }
    if (message.pinned === true) {
      writer.uint32(32).bool(message.pinned);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Code {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.code_info = CodeInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.code_bytes = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pinned = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Code {
    return {
      code_id: isSet(object.code_id) ? String(object.code_id) : "0",
      code_info: isSet(object.code_info) ? CodeInfo.fromJSON(object.code_info) : undefined,
      code_bytes: isSet(object.code_bytes) ? bytesFromBase64(object.code_bytes) : new Uint8Array(0),
      pinned: isSet(object.pinned) ? Boolean(object.pinned) : false,
    };
  },

  toJSON(message: Code): unknown {
    const obj: any = {};
    if (message.code_id !== "0") {
      obj.code_id = message.code_id;
    }
    if (message.code_info !== undefined) {
      obj.code_info = CodeInfo.toJSON(message.code_info);
    }
    if (message.code_bytes.length !== 0) {
      obj.code_bytes = base64FromBytes(message.code_bytes);
    }
    if (message.pinned === true) {
      obj.pinned = message.pinned;
    }
    return obj;
  },

  create(base?: DeepPartial<Code>): Code {
    return Code.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Code>): Code {
    const message = createBaseCode();
    message.code_id = object.code_id ?? "0";
    message.code_info = (object.code_info !== undefined && object.code_info !== null)
      ? CodeInfo.fromPartial(object.code_info)
      : undefined;
    message.code_bytes = object.code_bytes ?? new Uint8Array(0);
    message.pinned = object.pinned ?? false;
    return message;
  },
};

function createBaseContract(): Contract {
  return { contract_address: "", contract_info: undefined, contract_state: [], contract_code_history: [] };
}

export const Contract = {
  $type: "cosmwasm.wasm.v1.Contract" as const,

  encode(message: Contract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contract_address !== "") {
      writer.uint32(10).string(message.contract_address);
    }
    if (message.contract_info !== undefined) {
      ContractInfo.encode(message.contract_info, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contract_state) {
      Model.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.contract_code_history) {
      ContractCodeHistoryEntry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contract_address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contract_info = ContractInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contract_state.push(Model.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contract_code_history.push(ContractCodeHistoryEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Contract {
    return {
      contract_address: isSet(object.contract_address) ? String(object.contract_address) : "",
      contract_info: isSet(object.contract_info) ? ContractInfo.fromJSON(object.contract_info) : undefined,
      contract_state: Array.isArray(object?.contract_state)
        ? object.contract_state.map((e: any) => Model.fromJSON(e))
        : [],
      contract_code_history: Array.isArray(object?.contract_code_history)
        ? object.contract_code_history.map((e: any) => ContractCodeHistoryEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    if (message.contract_address !== "") {
      obj.contract_address = message.contract_address;
    }
    if (message.contract_info !== undefined) {
      obj.contract_info = ContractInfo.toJSON(message.contract_info);
    }
    if (message.contract_state?.length) {
      obj.contract_state = message.contract_state.map((e) => Model.toJSON(e));
    }
    if (message.contract_code_history?.length) {
      obj.contract_code_history = message.contract_code_history.map((e) => ContractCodeHistoryEntry.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Contract>): Contract {
    return Contract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Contract>): Contract {
    const message = createBaseContract();
    message.contract_address = object.contract_address ?? "";
    message.contract_info = (object.contract_info !== undefined && object.contract_info !== null)
      ? ContractInfo.fromPartial(object.contract_info)
      : undefined;
    message.contract_state = object.contract_state?.map((e) => Model.fromPartial(e)) || [];
    message.contract_code_history = object.contract_code_history?.map((e) => ContractCodeHistoryEntry.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseSequence(): Sequence {
  return { id_key: new Uint8Array(0), value: "0" };
}

export const Sequence = {
  $type: "cosmwasm.wasm.v1.Sequence" as const,

  encode(message: Sequence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id_key.length !== 0) {
      writer.uint32(10).bytes(message.id_key);
    }
    if (message.value !== "0") {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id_key = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sequence {
    return {
      id_key: isSet(object.id_key) ? bytesFromBase64(object.id_key) : new Uint8Array(0),
      value: isSet(object.value) ? String(object.value) : "0",
    };
  },

  toJSON(message: Sequence): unknown {
    const obj: any = {};
    if (message.id_key.length !== 0) {
      obj.id_key = base64FromBytes(message.id_key);
    }
    if (message.value !== "0") {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<Sequence>): Sequence {
    return Sequence.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Sequence>): Sequence {
    const message = createBaseSequence();
    message.id_key = object.id_key ?? new Uint8Array(0);
    message.value = object.value ?? "0";
    return message;
  },
};

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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
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
