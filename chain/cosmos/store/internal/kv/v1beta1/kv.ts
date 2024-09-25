// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: cosmos/store/internal/kv/v1beta1/kv.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

/** Pairs defines a repeated slice of Pair objects. */
export interface Pairs {
  pairs: Pair[];
}

/** Pair defines a key/value bytes tuple. */
export interface Pair {
  key: Uint8Array;
  value: Uint8Array;
}

function createBasePairs(): Pairs {
  return { pairs: [] };
}

export const Pairs: MessageFns<Pairs, "cosmos.store.internal.kv.v1beta1.Pairs"> = {
  $type: "cosmos.store.internal.kv.v1beta1.Pairs" as const,

  encode(message: Pairs, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Pairs {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairs.push(Pair.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pairs {
    return { pairs: globalThis.Array.isArray(object?.pairs) ? object.pairs.map((e: any) => Pair.fromJSON(e)) : [] };
  },

  toJSON(message: Pairs): unknown {
    const obj: any = {};
    if (message.pairs?.length) {
      obj.pairs = message.pairs.map((e) => Pair.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Pairs>): Pairs {
    return Pairs.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Pairs>): Pairs {
    const message = createBasePairs();
    message.pairs = object.pairs?.map((e) => Pair.fromPartial(e)) || [];
    return message;
  },
};

function createBasePair(): Pair {
  return { key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const Pair: MessageFns<Pair, "cosmos.store.internal.kv.v1beta1.Pair"> = {
  $type: "cosmos.store.internal.kv.v1beta1.Pair" as const,

  encode(message: Pair, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Pair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pair {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: Pair): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Pair>): Pair {
    return Pair.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Pair>): Pair {
    const message = createBasePair();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
