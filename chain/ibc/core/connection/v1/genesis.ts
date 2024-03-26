/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConnectionPaths, IdentifiedConnection, Params } from "./connection";

/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisState {
  connections: IdentifiedConnection[];
  client_connection_paths: ConnectionPaths[];
  /** the sequence for the next generated connection identifier */
  next_connection_sequence: string;
  params: Params | undefined;
}

function createBaseGenesisState(): GenesisState {
  return { connections: [], client_connection_paths: [], next_connection_sequence: "0", params: undefined };
}

export const GenesisState = {
  $type: "ibc.core.connection.v1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.connections) {
      IdentifiedConnection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.client_connection_paths) {
      ConnectionPaths.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.next_connection_sequence !== "0") {
      writer.uint32(24).uint64(message.next_connection_sequence);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
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

          message.connections.push(IdentifiedConnection.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client_connection_paths.push(ConnectionPaths.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.next_connection_sequence = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
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
      connections: globalThis.Array.isArray(object?.connections)
        ? object.connections.map((e: any) => IdentifiedConnection.fromJSON(e))
        : [],
      client_connection_paths: globalThis.Array.isArray(object?.client_connection_paths)
        ? object.client_connection_paths.map((e: any) => ConnectionPaths.fromJSON(e))
        : [],
      next_connection_sequence: isSet(object.next_connection_sequence)
        ? globalThis.String(object.next_connection_sequence)
        : "0",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.connections?.length) {
      obj.connections = message.connections.map((e) => IdentifiedConnection.toJSON(e));
    }
    if (message.client_connection_paths?.length) {
      obj.client_connection_paths = message.client_connection_paths.map((e) => ConnectionPaths.toJSON(e));
    }
    if (message.next_connection_sequence !== undefined) {
      obj.next_connection_sequence = message.next_connection_sequence;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.connections = object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
    message.client_connection_paths = object.client_connection_paths?.map((e) => ConnectionPaths.fromPartial(e)) || [];
    message.next_connection_sequence = object.next_connection_sequence ?? "0";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
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
