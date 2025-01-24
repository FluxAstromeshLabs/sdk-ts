// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/indexer/campclash/balance.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

/** EventSetBalance is an event that tracks the latest bank balance. */
export interface EventSetBalances {
  balance_updates: BalanceUpdate[];
}

/** BalanceUpdate contains a given address's latest balance */
export interface BalanceUpdate {
  addr: Uint8Array;
  denom: Uint8Array;
  /** the latest amount */
  amt: string;
}

function createBaseEventSetBalances(): EventSetBalances {
  return { balance_updates: [] };
}

export const EventSetBalances = {
  $type: "flux.indexer.campclash.EventSetBalances" as const,

  encode(message: EventSetBalances, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.balance_updates) {
      BalanceUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSetBalances {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetBalances();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balance_updates.push(BalanceUpdate.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventSetBalances {
    return {
      balance_updates: globalThis.Array.isArray(object?.balance_updates)
        ? object.balance_updates.map((e: any) => BalanceUpdate.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventSetBalances): unknown {
    const obj: any = {};
    if (message.balance_updates?.length) {
      obj.balance_updates = message.balance_updates.map((e) => BalanceUpdate.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<EventSetBalances>): EventSetBalances {
    return EventSetBalances.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EventSetBalances>): EventSetBalances {
    const message = createBaseEventSetBalances();
    message.balance_updates = object.balance_updates?.map((e) => BalanceUpdate.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBalanceUpdate(): BalanceUpdate {
  return { addr: new Uint8Array(0), denom: new Uint8Array(0), amt: "" };
}

export const BalanceUpdate = {
  $type: "flux.indexer.campclash.BalanceUpdate" as const,

  encode(message: BalanceUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.addr.length !== 0) {
      writer.uint32(10).bytes(message.addr);
    }
    if (message.denom.length !== 0) {
      writer.uint32(18).bytes(message.denom);
    }
    if (message.amt !== "") {
      writer.uint32(26).string(message.amt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalanceUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addr = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalanceUpdate {
    return {
      addr: isSet(object.addr) ? bytesFromBase64(object.addr) : new Uint8Array(0),
      denom: isSet(object.denom) ? bytesFromBase64(object.denom) : new Uint8Array(0),
      amt: isSet(object.amt) ? globalThis.String(object.amt) : "",
    };
  },

  toJSON(message: BalanceUpdate): unknown {
    const obj: any = {};
    if (message.addr !== undefined) {
      obj.addr = base64FromBytes(message.addr);
    }
    if (message.denom !== undefined) {
      obj.denom = base64FromBytes(message.denom);
    }
    if (message.amt !== undefined) {
      obj.amt = message.amt;
    }
    return obj;
  },

  create(base?: DeepPartial<BalanceUpdate>): BalanceUpdate {
    return BalanceUpdate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BalanceUpdate>): BalanceUpdate {
    const message = createBaseBalanceUpdate();
    message.addr = object.addr ?? new Uint8Array(0);
    message.denom = object.denom ?? new Uint8Array(0);
    message.amt = object.amt ?? "";
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
