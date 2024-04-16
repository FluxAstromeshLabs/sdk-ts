/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

/** Since: cosmos-sdk 0.43 */

/**
 * BasicAllowance implements Allowance with a one-time grant of coins
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowance {
  /**
   * spend_limit specifies the maximum amount of coins that can be spent
   * by this allowance and will be updated as coins are spent. If it is
   * empty, there is no spend limit and any amount of coins can be spent.
   */
  spend_limit: Coin[];
  /** expiration specifies an optional time when this allowance expires */
  expiration: Date | undefined;
}

/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowance {
  /** basic specifies a struct of `BasicAllowance` */
  basic:
    | BasicAllowance
    | undefined;
  /**
   * period specifies the time duration in which period_spend_limit coins can
   * be spent before that allowance is reset
   */
  period:
    | Duration
    | undefined;
  /**
   * period_spend_limit specifies the maximum number of coins that can be spent
   * in the period
   */
  period_spend_limit: Coin[];
  /** period_can_spend is the number of coins left to be spent before the period_reset time */
  period_can_spend: Coin[];
  /**
   * period_reset is the time at which this period resets and a new one begins,
   * it is calculated from the start time of the first transaction after the
   * last period ended
   */
  period_reset: Date | undefined;
}

/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowance {
  /** allowance can be any of basic and periodic fee allowance. */
  allowance:
    | Any
    | undefined;
  /** allowed_messages are the messages for which the grantee has the access. */
  allowed_messages: string[];
}

/** Grant is stored in the KVStore to record a grant with full context */
export interface Grant {
  /** granter is the address of the user granting an allowance of their funds. */
  granter: string;
  /** grantee is the address of the user being granted an allowance of another user's funds. */
  grantee: string;
  /** allowance can be any of basic, periodic, allowed fee allowance. */
  allowance: Any | undefined;
}

function createBaseBasicAllowance(): BasicAllowance {
  return { spend_limit: [], expiration: undefined };
}

export const BasicAllowance = {
  $type: "cosmos.feegrant.v1beta1.BasicAllowance" as const,

  encode(message: BasicAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.spend_limit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.spend_limit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BasicAllowance {
    return {
      spend_limit: globalThis.Array.isArray(object?.spend_limit)
        ? object.spend_limit.map((e: any) => Coin.fromJSON(e))
        : [],
      expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
    };
  },

  toJSON(message: BasicAllowance): unknown {
    const obj: any = {};
    if (message.spend_limit?.length) {
      obj.spend_limit = message.spend_limit.map((e) => Coin.toJSON(e));
    }
    if (message.expiration !== undefined) {
      obj.expiration = message.expiration.toISOString();
    }
    return obj;
  },

  create(base?: DeepPartial<BasicAllowance>): BasicAllowance {
    return BasicAllowance.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BasicAllowance>): BasicAllowance {
    const message = createBaseBasicAllowance();
    message.spend_limit = object.spend_limit?.map((e) => Coin.fromPartial(e)) || [];
    message.expiration = object.expiration ?? undefined;
    return message;
  },
};

function createBasePeriodicAllowance(): PeriodicAllowance {
  return { basic: undefined, period: undefined, period_spend_limit: [], period_can_spend: [], period_reset: undefined };
}

export const PeriodicAllowance = {
  $type: "cosmos.feegrant.v1beta1.PeriodicAllowance" as const,

  encode(message: PeriodicAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.basic !== undefined) {
      BasicAllowance.encode(message.basic, writer.uint32(10).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.period_spend_limit) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.period_can_spend) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.period_reset !== undefined) {
      Timestamp.encode(toTimestamp(message.period_reset), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodicAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.basic = BasicAllowance.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.period = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.period_spend_limit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.period_can_spend.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.period_reset = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeriodicAllowance {
    return {
      basic: isSet(object.basic) ? BasicAllowance.fromJSON(object.basic) : undefined,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
      period_spend_limit: globalThis.Array.isArray(object?.period_spend_limit)
        ? object.period_spend_limit.map((e: any) => Coin.fromJSON(e))
        : [],
      period_can_spend: globalThis.Array.isArray(object?.period_can_spend)
        ? object.period_can_spend.map((e: any) => Coin.fromJSON(e))
        : [],
      period_reset: isSet(object.period_reset) ? fromJsonTimestamp(object.period_reset) : undefined,
    };
  },

  toJSON(message: PeriodicAllowance): unknown {
    const obj: any = {};
    if (message.basic !== undefined) {
      obj.basic = BasicAllowance.toJSON(message.basic);
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    if (message.period_spend_limit?.length) {
      obj.period_spend_limit = message.period_spend_limit.map((e) => Coin.toJSON(e));
    }
    if (message.period_can_spend?.length) {
      obj.period_can_spend = message.period_can_spend.map((e) => Coin.toJSON(e));
    }
    if (message.period_reset !== undefined) {
      obj.period_reset = message.period_reset.toISOString();
    }
    return obj;
  },

  create(base?: DeepPartial<PeriodicAllowance>): PeriodicAllowance {
    return PeriodicAllowance.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PeriodicAllowance>): PeriodicAllowance {
    const message = createBasePeriodicAllowance();
    message.basic = (object.basic !== undefined && object.basic !== null)
      ? BasicAllowance.fromPartial(object.basic)
      : undefined;
    message.period = (object.period !== undefined && object.period !== null)
      ? Duration.fromPartial(object.period)
      : undefined;
    message.period_spend_limit = object.period_spend_limit?.map((e) => Coin.fromPartial(e)) || [];
    message.period_can_spend = object.period_can_spend?.map((e) => Coin.fromPartial(e)) || [];
    message.period_reset = object.period_reset ?? undefined;
    return message;
  },
};

function createBaseAllowedMsgAllowance(): AllowedMsgAllowance {
  return { allowance: undefined, allowed_messages: [] };
}

export const AllowedMsgAllowance = {
  $type: "cosmos.feegrant.v1beta1.AllowedMsgAllowance" as const,

  encode(message: AllowedMsgAllowance, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.allowed_messages) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllowedMsgAllowance {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedMsgAllowance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.allowance = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.allowed_messages.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllowedMsgAllowance {
    return {
      allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
      allowed_messages: globalThis.Array.isArray(object?.allowed_messages)
        ? object.allowed_messages.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: AllowedMsgAllowance): unknown {
    const obj: any = {};
    if (message.allowance !== undefined) {
      obj.allowance = Any.toJSON(message.allowance);
    }
    if (message.allowed_messages?.length) {
      obj.allowed_messages = message.allowed_messages;
    }
    return obj;
  },

  create(base?: DeepPartial<AllowedMsgAllowance>): AllowedMsgAllowance {
    return AllowedMsgAllowance.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AllowedMsgAllowance>): AllowedMsgAllowance {
    const message = createBaseAllowedMsgAllowance();
    message.allowance = (object.allowance !== undefined && object.allowance !== null)
      ? Any.fromPartial(object.allowance)
      : undefined;
    message.allowed_messages = object.allowed_messages?.map((e) => e) || [];
    return message;
  },
};

function createBaseGrant(): Grant {
  return { granter: "", grantee: "", allowance: undefined };
}

export const Grant = {
  $type: "cosmos.feegrant.v1beta1.Grant" as const,

  encode(message: Grant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.allowance !== undefined) {
      Any.encode(message.allowance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Grant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantee = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.allowance = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Grant {
    return {
      granter: isSet(object.granter) ? globalThis.String(object.granter) : "",
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
      allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
    };
  },

  toJSON(message: Grant): unknown {
    const obj: any = {};
    if (message.granter !== undefined) {
      obj.granter = message.granter;
    }
    if (message.grantee !== undefined) {
      obj.grantee = message.grantee;
    }
    if (message.allowance !== undefined) {
      obj.allowance = Any.toJSON(message.allowance);
    }
    return obj;
  },

  create(base?: DeepPartial<Grant>): Grant {
    return Grant.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Grant>): Grant {
    const message = createBaseGrant();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.allowance = (object.allowance !== undefined && object.allowance !== null)
      ? Any.fromPartial(object.allowance)
      : undefined;
    return message;
  },
};

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
