// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               unknown
// source: flux/evm/v1beta1/evm.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Account {
  address: string;
  balance: Uint8Array;
}

export interface Code {
  address: string;
  bytecode: Uint8Array;
}

export interface ContractStorage {
  address: string;
  storages: Storage[];
}

export interface Storage {
  key: Uint8Array;
  value: Uint8Array;
}

export interface ContractInfo {
  address: string;
  bytecode: Uint8Array;
  hash: Uint8Array;
  sender: string;
  calldata: Uint8Array;
  value: Uint8Array;
  number: string;
}

function createBaseAccount(): Account {
  return { address: "", balance: new Uint8Array(0) };
}

export const Account = {
  $type: "flux.evm.v1beta1.Account" as const,

  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.balance.length !== 0) {
      writer.uint32(18).bytes(message.balance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
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

          message.balance = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      balance: isSet(object.balance) ? bytesFromBase64(object.balance) : new Uint8Array(0),
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.balance !== undefined) {
      obj.balance = base64FromBytes(message.balance);
    }
    return obj;
  },

  create(base?: DeepPartial<Account>): Account {
    return Account.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Account>): Account {
    const message = createBaseAccount();
    message.address = object.address ?? "";
    message.balance = object.balance ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCode(): Code {
  return { address: "", bytecode: new Uint8Array(0) };
}

export const Code = {
  $type: "flux.evm.v1beta1.Code" as const,

  encode(message: Code, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.bytecode.length !== 0) {
      writer.uint32(18).bytes(message.bytecode);
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
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bytecode = reader.bytes();
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
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      bytecode: isSet(object.bytecode) ? bytesFromBase64(object.bytecode) : new Uint8Array(0),
    };
  },

  toJSON(message: Code): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.bytecode !== undefined) {
      obj.bytecode = base64FromBytes(message.bytecode);
    }
    return obj;
  },

  create(base?: DeepPartial<Code>): Code {
    return Code.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Code>): Code {
    const message = createBaseCode();
    message.address = object.address ?? "";
    message.bytecode = object.bytecode ?? new Uint8Array(0);
    return message;
  },
};

function createBaseContractStorage(): ContractStorage {
  return { address: "", storages: [] };
}

export const ContractStorage = {
  $type: "flux.evm.v1beta1.ContractStorage" as const,

  encode(message: ContractStorage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.storages) {
      Storage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractStorage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractStorage();
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

          message.storages.push(Storage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractStorage {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      storages: globalThis.Array.isArray(object?.storages) ? object.storages.map((e: any) => Storage.fromJSON(e)) : [],
    };
  },

  toJSON(message: ContractStorage): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.storages?.length) {
      obj.storages = message.storages.map((e) => Storage.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ContractStorage>): ContractStorage {
    return ContractStorage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContractStorage>): ContractStorage {
    const message = createBaseContractStorage();
    message.address = object.address ?? "";
    message.storages = object.storages?.map((e) => Storage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorage(): Storage {
  return { key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const Storage = {
  $type: "flux.evm.v1beta1.Storage" as const,

  encode(message: Storage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Storage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Storage {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: Storage): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Storage>): Storage {
    return Storage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Storage>): Storage {
    const message = createBaseStorage();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseContractInfo(): ContractInfo {
  return {
    address: "",
    bytecode: new Uint8Array(0),
    hash: new Uint8Array(0),
    sender: "",
    calldata: new Uint8Array(0),
    value: new Uint8Array(0),
    number: "0",
  };
}

export const ContractInfo = {
  $type: "flux.evm.v1beta1.ContractInfo" as const,

  encode(message: ContractInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.bytecode.length !== 0) {
      writer.uint32(18).bytes(message.bytecode);
    }
    if (message.hash.length !== 0) {
      writer.uint32(26).bytes(message.hash);
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    if (message.calldata.length !== 0) {
      writer.uint32(42).bytes(message.calldata);
    }
    if (message.value.length !== 0) {
      writer.uint32(50).bytes(message.value);
    }
    if (message.number !== "0") {
      writer.uint32(56).int64(message.number);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfo();
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

          message.bytecode = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.calldata = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.number = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractInfo {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      bytecode: isSet(object.bytecode) ? bytesFromBase64(object.bytecode) : new Uint8Array(0),
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      calldata: isSet(object.calldata) ? bytesFromBase64(object.calldata) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      number: isSet(object.number) ? globalThis.String(object.number) : "0",
    };
  },

  toJSON(message: ContractInfo): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.bytecode !== undefined) {
      obj.bytecode = base64FromBytes(message.bytecode);
    }
    if (message.hash !== undefined) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.calldata !== undefined) {
      obj.calldata = base64FromBytes(message.calldata);
    }
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.number !== undefined) {
      obj.number = message.number;
    }
    return obj;
  },

  create(base?: DeepPartial<ContractInfo>): ContractInfo {
    return ContractInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContractInfo>): ContractInfo {
    const message = createBaseContractInfo();
    message.address = object.address ?? "";
    message.bytecode = object.bytecode ?? new Uint8Array(0);
    message.hash = object.hash ?? new Uint8Array(0);
    message.sender = object.sender ?? "";
    message.calldata = object.calldata ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.number = object.number ?? "0";
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
