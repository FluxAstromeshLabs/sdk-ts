/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Account {
  pubkey: Uint8Array;
  owner: Uint8Array;
  lamports: string;
  data: Uint8Array;
  executable: boolean;
  rent_epoch: string;
}

export interface InstructionAccount {
  id_index: number;
  caller_index: number;
  callee_index: number;
  is_signer: boolean;
  is_writable: boolean;
}

export interface Instruction {
  program_index: number[];
  accounts: InstructionAccount[];
  data: Uint8Array;
}

function createBaseAccount(): Account {
  return {
    pubkey: new Uint8Array(0),
    owner: new Uint8Array(0),
    lamports: "0",
    data: new Uint8Array(0),
    executable: false,
    rent_epoch: "0",
  };
}

export const Account = {
  $type: "flux.svm.v1beta1.Account" as const,

  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubkey.length !== 0) {
      writer.uint32(10).bytes(message.pubkey);
    }
    if (message.owner.length !== 0) {
      writer.uint32(18).bytes(message.owner);
    }
    if (message.lamports !== "0") {
      writer.uint32(24).uint64(message.lamports);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.executable === true) {
      writer.uint32(40).bool(message.executable);
    }
    if (message.rent_epoch !== "0") {
      writer.uint32(48).uint64(message.rent_epoch);
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

          message.pubkey = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lamports = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.executable = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.rent_epoch = longToString(reader.uint64() as Long);
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
      pubkey: isSet(object.pubkey) ? bytesFromBase64(object.pubkey) : new Uint8Array(0),
      owner: isSet(object.owner) ? bytesFromBase64(object.owner) : new Uint8Array(0),
      lamports: isSet(object.lamports) ? globalThis.String(object.lamports) : "0",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      executable: isSet(object.executable) ? globalThis.Boolean(object.executable) : false,
      rent_epoch: isSet(object.rent_epoch) ? globalThis.String(object.rent_epoch) : "0",
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.pubkey !== undefined) {
      obj.pubkey = base64FromBytes(message.pubkey);
    }
    if (message.owner !== undefined) {
      obj.owner = base64FromBytes(message.owner);
    }
    if (message.lamports !== undefined) {
      obj.lamports = message.lamports;
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.executable !== undefined) {
      obj.executable = message.executable;
    }
    if (message.rent_epoch !== undefined) {
      obj.rent_epoch = message.rent_epoch;
    }
    return obj;
  },

  create(base?: DeepPartial<Account>): Account {
    return Account.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Account>): Account {
    const message = createBaseAccount();
    message.pubkey = object.pubkey ?? new Uint8Array(0);
    message.owner = object.owner ?? new Uint8Array(0);
    message.lamports = object.lamports ?? "0";
    message.data = object.data ?? new Uint8Array(0);
    message.executable = object.executable ?? false;
    message.rent_epoch = object.rent_epoch ?? "0";
    return message;
  },
};

function createBaseInstructionAccount(): InstructionAccount {
  return { id_index: 0, caller_index: 0, callee_index: 0, is_signer: false, is_writable: false };
}

export const InstructionAccount = {
  $type: "flux.svm.v1beta1.InstructionAccount" as const,

  encode(message: InstructionAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id_index !== 0) {
      writer.uint32(8).uint32(message.id_index);
    }
    if (message.caller_index !== 0) {
      writer.uint32(16).uint32(message.caller_index);
    }
    if (message.callee_index !== 0) {
      writer.uint32(24).uint32(message.callee_index);
    }
    if (message.is_signer === true) {
      writer.uint32(32).bool(message.is_signer);
    }
    if (message.is_writable === true) {
      writer.uint32(40).bool(message.is_writable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstructionAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstructionAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id_index = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.caller_index = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.callee_index = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.is_signer = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.is_writable = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InstructionAccount {
    return {
      id_index: isSet(object.id_index) ? globalThis.Number(object.id_index) : 0,
      caller_index: isSet(object.caller_index) ? globalThis.Number(object.caller_index) : 0,
      callee_index: isSet(object.callee_index) ? globalThis.Number(object.callee_index) : 0,
      is_signer: isSet(object.is_signer) ? globalThis.Boolean(object.is_signer) : false,
      is_writable: isSet(object.is_writable) ? globalThis.Boolean(object.is_writable) : false,
    };
  },

  toJSON(message: InstructionAccount): unknown {
    const obj: any = {};
    if (message.id_index !== undefined) {
      obj.id_index = Math.round(message.id_index);
    }
    if (message.caller_index !== undefined) {
      obj.caller_index = Math.round(message.caller_index);
    }
    if (message.callee_index !== undefined) {
      obj.callee_index = Math.round(message.callee_index);
    }
    if (message.is_signer !== undefined) {
      obj.is_signer = message.is_signer;
    }
    if (message.is_writable !== undefined) {
      obj.is_writable = message.is_writable;
    }
    return obj;
  },

  create(base?: DeepPartial<InstructionAccount>): InstructionAccount {
    return InstructionAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InstructionAccount>): InstructionAccount {
    const message = createBaseInstructionAccount();
    message.id_index = object.id_index ?? 0;
    message.caller_index = object.caller_index ?? 0;
    message.callee_index = object.callee_index ?? 0;
    message.is_signer = object.is_signer ?? false;
    message.is_writable = object.is_writable ?? false;
    return message;
  },
};

function createBaseInstruction(): Instruction {
  return { program_index: [], accounts: [], data: new Uint8Array(0) };
}

export const Instruction = {
  $type: "flux.svm.v1beta1.Instruction" as const,

  encode(message: Instruction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.program_index) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.accounts) {
      InstructionAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Instruction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.program_index.push(reader.uint32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.program_index.push(reader.uint32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accounts.push(InstructionAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Instruction {
    return {
      program_index: globalThis.Array.isArray(object?.program_index)
        ? object.program_index.map((e: any) => globalThis.Number(e))
        : [],
      accounts: globalThis.Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) => InstructionAccount.fromJSON(e))
        : [],
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: Instruction): unknown {
    const obj: any = {};
    if (message.program_index?.length) {
      obj.program_index = message.program_index.map((e) => Math.round(e));
    }
    if (message.accounts?.length) {
      obj.accounts = message.accounts.map((e) => InstructionAccount.toJSON(e));
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<Instruction>): Instruction {
    return Instruction.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Instruction>): Instruction {
    const message = createBaseInstruction();
    message.program_index = object.program_index?.map((e) => e) || [];
    message.accounts = object.accounts?.map((e) => InstructionAccount.fromPartial(e)) || [];
    message.data = object.data ?? new Uint8Array(0);
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
