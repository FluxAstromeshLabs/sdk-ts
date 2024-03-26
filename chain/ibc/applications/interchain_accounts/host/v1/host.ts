/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * Params defines the set of on-chain interchain accounts parameters.
 * The following parameters may be used to disable the host submodule.
 */
export interface Params {
  /** host_enabled enables or disables the host submodule. */
  host_enabled: boolean;
  /** allow_messages defines a list of sdk message typeURLs allowed to be executed on a host chain. */
  allow_messages: string[];
}

function createBaseParams(): Params {
  return { host_enabled: false, allow_messages: [] };
}

export const Params = {
  $type: "ibc.applications.interchain_accounts.host.v1.Params" as const,

  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host_enabled === true) {
      writer.uint32(8).bool(message.host_enabled);
    }
    for (const v of message.allow_messages) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.host_enabled = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.allow_messages.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      host_enabled: isSet(object.host_enabled) ? globalThis.Boolean(object.host_enabled) : false,
      allow_messages: globalThis.Array.isArray(object?.allow_messages)
        ? object.allow_messages.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.host_enabled === true) {
      obj.host_enabled = message.host_enabled;
    }
    if (message.allow_messages?.length) {
      obj.allow_messages = message.allow_messages;
    }
    return obj;
  },

  create(base?: DeepPartial<Params>): Params {
    return Params.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.host_enabled = object.host_enabled ?? false;
    message.allow_messages = object.allow_messages?.map((e) => e) || [];
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
