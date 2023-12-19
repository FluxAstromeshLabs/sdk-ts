/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

/**
 * CommitInfo defines commit information used by the multi-store when committing
 * a version/height.
 */
export interface CommitInfo {
  version: string;
  store_infos: StoreInfo[];
  timestamp: Date | undefined;
}

/**
 * StoreInfo defines store-specific commit information. It contains a reference
 * between a store name and the commit ID.
 */
export interface StoreInfo {
  name: string;
  commit_id: CommitID | undefined;
}

/**
 * CommitID defines the commitment information when a specific store is
 * committed.
 */
export interface CommitID {
  version: string;
  hash: Uint8Array;
}

function createBaseCommitInfo(): CommitInfo {
  return { version: "0", store_infos: [], timestamp: undefined };
}

export const CommitInfo = {
  $type: "cosmos.store.v1beta1.CommitInfo" as const,

  encode(message: CommitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "0") {
      writer.uint32(8).int64(message.version);
    }
    for (const v of message.store_infos) {
      StoreInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.store_infos.push(StoreInfo.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommitInfo {
    return {
      version: isSet(object.version) ? globalThis.String(object.version) : "0",
      store_infos: globalThis.Array.isArray(object?.store_infos)
        ? object.store_infos.map((e: any) => StoreInfo.fromJSON(e))
        : [],
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: CommitInfo): unknown {
    const obj: any = {};
    if (message.version !== "0") {
      obj.version = message.version;
    }
    if (message.store_infos?.length) {
      obj.store_infos = message.store_infos.map((e) => StoreInfo.toJSON(e));
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create(base?: DeepPartial<CommitInfo>): CommitInfo {
    return CommitInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommitInfo>): CommitInfo {
    const message = createBaseCommitInfo();
    message.version = object.version ?? "0";
    message.store_infos = object.store_infos?.map((e) => StoreInfo.fromPartial(e)) || [];
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseStoreInfo(): StoreInfo {
  return { name: "", commit_id: undefined };
}

export const StoreInfo = {
  $type: "cosmos.store.v1beta1.StoreInfo" as const,

  encode(message: StoreInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.commit_id !== undefined) {
      CommitID.encode(message.commit_id, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.commit_id = CommitID.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoreInfo {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      commit_id: isSet(object.commit_id) ? CommitID.fromJSON(object.commit_id) : undefined,
    };
  },

  toJSON(message: StoreInfo): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.commit_id !== undefined) {
      obj.commit_id = CommitID.toJSON(message.commit_id);
    }
    return obj;
  },

  create(base?: DeepPartial<StoreInfo>): StoreInfo {
    return StoreInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StoreInfo>): StoreInfo {
    const message = createBaseStoreInfo();
    message.name = object.name ?? "";
    message.commit_id = (object.commit_id !== undefined && object.commit_id !== null)
      ? CommitID.fromPartial(object.commit_id)
      : undefined;
    return message;
  },
};

function createBaseCommitID(): CommitID {
  return { version: "0", hash: new Uint8Array(0) };
}

export const CommitID = {
  $type: "cosmos.store.v1beta1.CommitID" as const,

  encode(message: CommitID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "0") {
      writer.uint32(8).int64(message.version);
    }
    if (message.hash.length !== 0) {
      writer.uint32(18).bytes(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = longToString(reader.int64() as Long);
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

  fromJSON(object: any): CommitID {
    return {
      version: isSet(object.version) ? globalThis.String(object.version) : "0",
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
    };
  },

  toJSON(message: CommitID): unknown {
    const obj: any = {};
    if (message.version !== "0") {
      obj.version = message.version;
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    return obj;
  },

  create(base?: DeepPartial<CommitID>): CommitID {
    return CommitID.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommitID>): CommitID {
    const message = createBaseCommitID();
    message.version = object.version ?? "0";
    message.hash = object.hash ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
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
  if (globalThis.Buffer) {
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
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