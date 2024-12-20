// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/interpool/v1beta1/interpool.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface InterPool {
  pool_id: string;
  operator_addr: string;
  /** on-going assets */
  inventory_snapshot: string[];
  /** initial assets before any trades from the pool */
  base_capital: string[];
  operator_commission: string;
  /** flow control data for cron service */
  input_blob: Uint8Array;
  /** pool extra state for lp, reward tokens created by cron service */
  output_blob: Uint8Array;
}

export interface PoolShares {
  pool_id: string;
  liquidity_provider_addr: string;
  /** on-going assets of users */
  asset_snapshot: string[];
  /** initial assets of users */
  base_capital: string[];
  /** ownership percentage */
  shares: string;
}

function createBaseInterPool(): InterPool {
  return {
    pool_id: "",
    operator_addr: "",
    inventory_snapshot: [],
    base_capital: [],
    operator_commission: "0",
    input_blob: new Uint8Array(0),
    output_blob: new Uint8Array(0),
  };
}

export const InterPool = {
  $type: "flux.interpool.v1beta1.InterPool" as const,

  encode(message: InterPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "") {
      writer.uint32(10).string(message.pool_id);
    }
    if (message.operator_addr !== "") {
      writer.uint32(18).string(message.operator_addr);
    }
    for (const v of message.inventory_snapshot) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.base_capital) {
      writer.uint32(34).string(v!);
    }
    if (message.operator_commission !== "0") {
      writer.uint32(40).uint64(message.operator_commission);
    }
    if (message.input_blob.length !== 0) {
      writer.uint32(50).bytes(message.input_blob);
    }
    if (message.output_blob.length !== 0) {
      writer.uint32(58).bytes(message.output_blob);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.operator_addr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.inventory_snapshot.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.base_capital.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.operator_commission = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.input_blob = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.output_blob = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterPool {
    return {
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      operator_addr: isSet(object.operator_addr) ? globalThis.String(object.operator_addr) : "",
      inventory_snapshot: globalThis.Array.isArray(object?.inventory_snapshot)
        ? object.inventory_snapshot.map((e: any) => globalThis.String(e))
        : [],
      base_capital: globalThis.Array.isArray(object?.base_capital)
        ? object.base_capital.map((e: any) => globalThis.String(e))
        : [],
      operator_commission: isSet(object.operator_commission) ? globalThis.String(object.operator_commission) : "0",
      input_blob: isSet(object.input_blob) ? bytesFromBase64(object.input_blob) : new Uint8Array(0),
      output_blob: isSet(object.output_blob) ? bytesFromBase64(object.output_blob) : new Uint8Array(0),
    };
  },

  toJSON(message: InterPool): unknown {
    const obj: any = {};
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.operator_addr !== undefined) {
      obj.operator_addr = message.operator_addr;
    }
    if (message.inventory_snapshot?.length) {
      obj.inventory_snapshot = message.inventory_snapshot;
    }
    if (message.base_capital?.length) {
      obj.base_capital = message.base_capital;
    }
    if (message.operator_commission !== undefined) {
      obj.operator_commission = message.operator_commission;
    }
    if (message.input_blob !== undefined) {
      obj.input_blob = base64FromBytes(message.input_blob);
    }
    if (message.output_blob !== undefined) {
      obj.output_blob = base64FromBytes(message.output_blob);
    }
    return obj;
  },

  create(base?: DeepPartial<InterPool>): InterPool {
    return InterPool.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InterPool>): InterPool {
    const message = createBaseInterPool();
    message.pool_id = object.pool_id ?? "";
    message.operator_addr = object.operator_addr ?? "";
    message.inventory_snapshot = object.inventory_snapshot?.map((e) => e) || [];
    message.base_capital = object.base_capital?.map((e) => e) || [];
    message.operator_commission = object.operator_commission ?? "0";
    message.input_blob = object.input_blob ?? new Uint8Array(0);
    message.output_blob = object.output_blob ?? new Uint8Array(0);
    return message;
  },
};

function createBasePoolShares(): PoolShares {
  return { pool_id: "", liquidity_provider_addr: "", asset_snapshot: [], base_capital: [], shares: "" };
}

export const PoolShares = {
  $type: "flux.interpool.v1beta1.PoolShares" as const,

  encode(message: PoolShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "") {
      writer.uint32(10).string(message.pool_id);
    }
    if (message.liquidity_provider_addr !== "") {
      writer.uint32(18).string(message.liquidity_provider_addr);
    }
    for (const v of message.asset_snapshot) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.base_capital) {
      writer.uint32(34).string(v!);
    }
    if (message.shares !== "") {
      writer.uint32(42).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolShares {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolShares();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.liquidity_provider_addr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.asset_snapshot.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.base_capital.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.shares = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolShares {
    return {
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      liquidity_provider_addr: isSet(object.liquidity_provider_addr)
        ? globalThis.String(object.liquidity_provider_addr)
        : "",
      asset_snapshot: globalThis.Array.isArray(object?.asset_snapshot)
        ? object.asset_snapshot.map((e: any) => globalThis.String(e))
        : [],
      base_capital: globalThis.Array.isArray(object?.base_capital)
        ? object.base_capital.map((e: any) => globalThis.String(e))
        : [],
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: PoolShares): unknown {
    const obj: any = {};
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.liquidity_provider_addr !== undefined) {
      obj.liquidity_provider_addr = message.liquidity_provider_addr;
    }
    if (message.asset_snapshot?.length) {
      obj.asset_snapshot = message.asset_snapshot;
    }
    if (message.base_capital?.length) {
      obj.base_capital = message.base_capital;
    }
    if (message.shares !== undefined) {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<PoolShares>): PoolShares {
    return PoolShares.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PoolShares>): PoolShares {
    const message = createBasePoolShares();
    message.pool_id = object.pool_id ?? "";
    message.liquidity_provider_addr = object.liquidity_provider_addr ?? "";
    message.asset_snapshot = object.asset_snapshot?.map((e) => e) || [];
    message.base_capital = object.base_capital?.map((e) => e) || [];
    message.shares = object.shares ?? "";
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
