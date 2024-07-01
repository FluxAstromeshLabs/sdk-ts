// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/strategy/v1beta1/event.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BoolValue } from "../../../google/protobuf/wrappers";
import { FISQueryRequest } from "../../astromesh/v1beta1/query";
import { PermissionConfig, StrategyMetadata } from "./strategy";

export interface StrategyUpdate {
  id: Uint8Array;
  is_enabled: boolean | undefined;
  trigger_permission: PermissionConfig | undefined;
  query: FISQueryRequest | undefined;
  query_hash: Uint8Array;
  metadata: StrategyMetadata | undefined;
}

function createBaseStrategyUpdate(): StrategyUpdate {
  return {
    id: new Uint8Array(0),
    is_enabled: undefined,
    trigger_permission: undefined,
    query: undefined,
    query_hash: new Uint8Array(0),
    metadata: undefined,
  };
}

export const StrategyUpdate = {
  $type: "flux.strategy.v1beta1.StrategyUpdate" as const,

  encode(message: StrategyUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.is_enabled !== undefined) {
      BoolValue.encode({ value: message.is_enabled! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.trigger_permission !== undefined) {
      PermissionConfig.encode(message.trigger_permission, writer.uint32(26).fork()).ldelim();
    }
    if (message.query !== undefined) {
      FISQueryRequest.encode(message.query, writer.uint32(34).fork()).ldelim();
    }
    if (message.query_hash.length !== 0) {
      writer.uint32(42).bytes(message.query_hash);
    }
    if (message.metadata !== undefined) {
      StrategyMetadata.encode(message.metadata, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StrategyUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStrategyUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.is_enabled = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.trigger_permission = PermissionConfig.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.query = FISQueryRequest.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.query_hash = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.metadata = StrategyMetadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StrategyUpdate {
    return {
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      is_enabled: isSet(object.is_enabled) ? Boolean(object.is_enabled) : undefined,
      trigger_permission: isSet(object.trigger_permission)
        ? PermissionConfig.fromJSON(object.trigger_permission)
        : undefined,
      query: isSet(object.query) ? FISQueryRequest.fromJSON(object.query) : undefined,
      query_hash: isSet(object.query_hash) ? bytesFromBase64(object.query_hash) : new Uint8Array(0),
      metadata: isSet(object.metadata) ? StrategyMetadata.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: StrategyUpdate): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.is_enabled !== undefined) {
      obj.is_enabled = message.is_enabled;
    }
    if (message.trigger_permission !== undefined) {
      obj.trigger_permission = PermissionConfig.toJSON(message.trigger_permission);
    }
    if (message.query !== undefined) {
      obj.query = FISQueryRequest.toJSON(message.query);
    }
    if (message.query_hash !== undefined) {
      obj.query_hash = base64FromBytes(message.query_hash);
    }
    if (message.metadata !== undefined) {
      obj.metadata = StrategyMetadata.toJSON(message.metadata);
    }
    return obj;
  },

  create(base?: DeepPartial<StrategyUpdate>): StrategyUpdate {
    return StrategyUpdate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StrategyUpdate>): StrategyUpdate {
    const message = createBaseStrategyUpdate();
    message.id = object.id ?? new Uint8Array(0);
    message.is_enabled = object.is_enabled ?? undefined;
    message.trigger_permission = (object.trigger_permission !== undefined && object.trigger_permission !== null)
      ? PermissionConfig.fromPartial(object.trigger_permission)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null)
      ? FISQueryRequest.fromPartial(object.query)
      : undefined;
    message.query_hash = object.query_hash ?? new Uint8Array(0);
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? StrategyMetadata.fromPartial(object.metadata)
      : undefined;
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
