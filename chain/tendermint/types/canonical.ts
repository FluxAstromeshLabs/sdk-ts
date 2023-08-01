/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { SignedMsgType, signedMsgTypeFromJSON, signedMsgTypeToJSON } from "./types";

export interface CanonicalBlockID {
  hash: Uint8Array;
  partSetHeader: CanonicalPartSetHeader | undefined;
}

export interface CanonicalPartSetHeader {
  total: number;
  hash: Uint8Array;
}

export interface CanonicalProposal {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: string;
  /** canonicalization requires fixed size encoding here */
  round: string;
  polRound: string;
  blockId: CanonicalBlockID | undefined;
  timestamp: Date | undefined;
  chainId: string;
}

export interface CanonicalVote {
  /** type alias for byte */
  type: SignedMsgType;
  /** canonicalization requires fixed size encoding here */
  height: string;
  /** canonicalization requires fixed size encoding here */
  round: string;
  blockId: CanonicalBlockID | undefined;
  timestamp: Date | undefined;
  chainId: string;
}

function createBaseCanonicalBlockID(): CanonicalBlockID {
  return { hash: new Uint8Array(0), partSetHeader: undefined };
}

export const CanonicalBlockID = {
  $type: "tendermint.types.CanonicalBlockID" as const,

  encode(message: CanonicalBlockID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      CanonicalPartSetHeader.encode(message.partSetHeader, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalBlockID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalBlockID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.partSetHeader = CanonicalPartSetHeader.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CanonicalBlockID {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      partSetHeader: isSet(object.partSetHeader) ? CanonicalPartSetHeader.fromJSON(object.partSetHeader) : undefined,
    };
  },

  toJSON(message: CanonicalBlockID): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.partSetHeader !== undefined) {
      obj.partSetHeader = CanonicalPartSetHeader.toJSON(message.partSetHeader);
    }
    return obj;
  },

  create(base?: DeepPartial<CanonicalBlockID>): CanonicalBlockID {
    return CanonicalBlockID.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CanonicalBlockID>): CanonicalBlockID {
    const message = createBaseCanonicalBlockID();
    message.hash = object.hash ?? new Uint8Array(0);
    message.partSetHeader = (object.partSetHeader !== undefined && object.partSetHeader !== null)
      ? CanonicalPartSetHeader.fromPartial(object.partSetHeader)
      : undefined;
    return message;
  },
};

function createBaseCanonicalPartSetHeader(): CanonicalPartSetHeader {
  return { total: 0, hash: new Uint8Array(0) };
}

export const CanonicalPartSetHeader = {
  $type: "tendermint.types.CanonicalPartSetHeader" as const,

  encode(message: CanonicalPartSetHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalPartSetHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalPartSetHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CanonicalPartSetHeader {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
    };
  },

  toJSON(message: CanonicalPartSetHeader): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    return obj;
  },

  create(base?: DeepPartial<CanonicalPartSetHeader>): CanonicalPartSetHeader {
    return CanonicalPartSetHeader.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CanonicalPartSetHeader>): CanonicalPartSetHeader {
    const message = createBaseCanonicalPartSetHeader();
    message.total = object.total ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCanonicalProposal(): CanonicalProposal {
  return { type: 0, height: "0", round: "0", polRound: "0", blockId: undefined, timestamp: undefined, chainId: "" };
}

export const CanonicalProposal = {
  $type: "tendermint.types.CanonicalProposal" as const,

  encode(message: CanonicalProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(17).sfixed64(message.height);
    }
    if (message.round !== "0") {
      writer.uint32(25).sfixed64(message.round);
    }
    if (message.polRound !== "0") {
      writer.uint32(32).int64(message.polRound);
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(message.blockId, writer.uint32(42).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(50).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(58).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.height = longToString(reader.sfixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.round = longToString(reader.sfixed64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.polRound = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.chainId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CanonicalProposal {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? String(object.round) : "0",
      polRound: isSet(object.polRound) ? String(object.polRound) : "0",
      blockId: isSet(object.blockId) ? CanonicalBlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
    };
  },

  toJSON(message: CanonicalProposal): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.round !== "0") {
      obj.round = message.round;
    }
    if (message.polRound !== "0") {
      obj.polRound = message.polRound;
    }
    if (message.blockId !== undefined) {
      obj.blockId = CanonicalBlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    return obj;
  },

  create(base?: DeepPartial<CanonicalProposal>): CanonicalProposal {
    return CanonicalProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CanonicalProposal>): CanonicalProposal {
    const message = createBaseCanonicalProposal();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? "0";
    message.polRound = object.polRound ?? "0";
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? CanonicalBlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseCanonicalVote(): CanonicalVote {
  return { type: 0, height: "0", round: "0", blockId: undefined, timestamp: undefined, chainId: "" };
}

export const CanonicalVote = {
  $type: "tendermint.types.CanonicalVote" as const,

  encode(message: CanonicalVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.height !== "0") {
      writer.uint32(17).sfixed64(message.height);
    }
    if (message.round !== "0") {
      writer.uint32(25).sfixed64(message.round);
    }
    if (message.blockId !== undefined) {
      CanonicalBlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
    }
    if (message.chainId !== "") {
      writer.uint32(50).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CanonicalVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanonicalVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.height = longToString(reader.sfixed64() as Long);
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.round = longToString(reader.sfixed64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.blockId = CanonicalBlockID.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.chainId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CanonicalVote {
    return {
      type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? String(object.height) : "0",
      round: isSet(object.round) ? String(object.round) : "0",
      blockId: isSet(object.blockId) ? CanonicalBlockID.fromJSON(object.blockId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
    };
  },

  toJSON(message: CanonicalVote): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = signedMsgTypeToJSON(message.type);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.round !== "0") {
      obj.round = message.round;
    }
    if (message.blockId !== undefined) {
      obj.blockId = CanonicalBlockID.toJSON(message.blockId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    return obj;
  },

  create(base?: DeepPartial<CanonicalVote>): CanonicalVote {
    return CanonicalVote.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CanonicalVote>): CanonicalVote {
    const message = createBaseCanonicalVote();
    message.type = object.type ?? 0;
    message.height = object.height ?? "0";
    message.round = object.round ?? "0";
    message.blockId = (object.blockId !== undefined && object.blockId !== null)
      ? CanonicalBlockID.fromPartial(object.blockId)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.chainId = object.chainId ?? "";
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
