/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { SimpleEntry } from "./oracle";

export interface GenesisState {
  simple_entries: SimpleEntry[];
  authorized_simple_entry_addresses: string[];
}

function createBaseGenesisState(): GenesisState {
  return { simple_entries: [], authorized_simple_entry_addresses: [] };
}

export const GenesisState = {
  $type: "flux.oracle.v1beta1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.simple_entries) {
      SimpleEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.authorized_simple_entry_addresses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.simple_entries.push(SimpleEntry.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authorized_simple_entry_addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      simple_entries: globalThis.Array.isArray(object?.simple_entries)
        ? object.simple_entries.map((e: any) => SimpleEntry.fromJSON(e))
        : [],
      authorized_simple_entry_addresses: globalThis.Array.isArray(object?.authorized_simple_entry_addresses)
        ? object.authorized_simple_entry_addresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.simple_entries?.length) {
      obj.simple_entries = message.simple_entries.map((e) => SimpleEntry.toJSON(e));
    }
    if (message.authorized_simple_entry_addresses?.length) {
      obj.authorized_simple_entry_addresses = message.authorized_simple_entry_addresses;
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.simple_entries = object.simple_entries?.map((e) => SimpleEntry.fromPartial(e)) || [];
    message.authorized_simple_entry_addresses = object.authorized_simple_entry_addresses?.map((e) => e) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
