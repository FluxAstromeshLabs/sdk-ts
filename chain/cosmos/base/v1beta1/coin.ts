// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               unknown
// source: cosmos/base/v1beta1/coin.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * Coin defines a token with a denomination and an amount.
 *
 * NOTE: The amount field is an Int which implements the custom method
 * signatures required by gogoproto.
 */
export interface Coin {
  denom: string;
  amount: string;
}

/**
 * DecCoin defines a token with a denomination and a decimal amount.
 *
 * NOTE: The amount field is an Dec which implements the custom method
 * signatures required by gogoproto.
 */
export interface DecCoin {
  denom: string;
  amount: string;
}

/**
 * IntProto defines a Protobuf wrapper around an Int object.
 * Deprecated: Prefer to use math.Int directly. It supports binary Marshal and Unmarshal.
 */
export interface IntProto {
  int: string;
}

/**
 * DecProto defines a Protobuf wrapper around a Dec object.
 * Deprecated: Prefer to use math.LegacyDec directly. It supports binary Marshal and Unmarshal.
 */
export interface DecProto {
  dec: string;
}

function createBaseCoin(): Coin {
  return { denom: "", amount: "" };
}

export const Coin = {
  $type: "cosmos.base.v1beta1.Coin" as const,

  encode(message: Coin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Coin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoin();
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

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Coin {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: Coin): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = message.denom;
    }
    if (message.amount !== undefined) {
      obj.amount = message.amount;
    }
    return obj;
  },

  create(base?: DeepPartial<Coin>): Coin {
    return Coin.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Coin>): Coin {
    const message = createBaseCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseDecCoin(): DecCoin {
  return { denom: "", amount: "" };
}

export const DecCoin = {
  $type: "cosmos.base.v1beta1.DecCoin" as const,

  encode(message: DecCoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecCoin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecCoin();
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

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecCoin {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: DecCoin): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = message.denom;
    }
    if (message.amount !== undefined) {
      obj.amount = message.amount;
    }
    return obj;
  },

  create(base?: DeepPartial<DecCoin>): DecCoin {
    return DecCoin.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DecCoin>): DecCoin {
    const message = createBaseDecCoin();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseIntProto(): IntProto {
  return { int: "" };
}

export const IntProto = {
  $type: "cosmos.base.v1beta1.IntProto" as const,

  encode(message: IntProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.int !== "") {
      writer.uint32(10).string(message.int);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.int = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntProto {
    return { int: isSet(object.int) ? globalThis.String(object.int) : "" };
  },

  toJSON(message: IntProto): unknown {
    const obj: any = {};
    if (message.int !== undefined) {
      obj.int = message.int;
    }
    return obj;
  },

  create(base?: DeepPartial<IntProto>): IntProto {
    return IntProto.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<IntProto>): IntProto {
    const message = createBaseIntProto();
    message.int = object.int ?? "";
    return message;
  },
};

function createBaseDecProto(): DecProto {
  return { dec: "" };
}

export const DecProto = {
  $type: "cosmos.base.v1beta1.DecProto" as const,

  encode(message: DecProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dec !== "") {
      writer.uint32(10).string(message.dec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dec = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecProto {
    return { dec: isSet(object.dec) ? globalThis.String(object.dec) : "" };
  },

  toJSON(message: DecProto): unknown {
    const obj: any = {};
    if (message.dec !== undefined) {
      obj.dec = message.dec;
    }
    return obj;
  },

  create(base?: DeepPartial<DecProto>): DecProto {
    return DecProto.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DecProto>): DecProto {
    const message = createBaseDecProto();
    message.dec = object.dec ?? "";
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
