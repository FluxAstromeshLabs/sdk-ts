// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: flux/strategy/v1beta1/event.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { BoolValue } from "../../../google/protobuf/wrappers";
import { FISQueryRequest } from "../../astromesh/v1beta1/query";
import { Op, opFromJSON, opToJSON } from "../../eventstream/v1beta1/query";
import { PermissionConfig, StrategyMetadata } from "./strategy";

export interface StrategyUpdateEvent {
  op: Op;
  id: Uint8Array;
  is_enabled: boolean | undefined;
  trigger_permission: PermissionConfig | undefined;
  query: FISQueryRequest | undefined;
  query_hash: Uint8Array;
  metadata: StrategyMetadata | undefined;
}

export interface StrategyTriggerEvent {
  op: Op;
  id: Uint8Array;
  executor: string;
  /** output (instructions) after fiswasm run */
  instructions: Uint8Array;
  /** output after fis executed (proto bytes) */
  fis_transaction_output: Uint8Array;
  /** error after fis execution (proto bytes) */
  error: string;
  gas_consumed: string;
  fee: string;
  height: string;
  time: string;
}

function createBaseStrategyUpdateEvent(): StrategyUpdateEvent {
  return {
    op: 0,
    id: new Uint8Array(0),
    is_enabled: undefined,
    trigger_permission: undefined,
    query: undefined,
    query_hash: new Uint8Array(0),
    metadata: undefined,
  };
}

export const StrategyUpdateEvent: MessageFns<StrategyUpdateEvent, "flux.strategy.v1beta1.StrategyUpdateEvent"> = {
  $type: "flux.strategy.v1beta1.StrategyUpdateEvent" as const,

  encode(message: StrategyUpdateEvent, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    if (message.id.length !== 0) {
      writer.uint32(18).bytes(message.id);
    }
    if (message.is_enabled !== undefined) {
      BoolValue.encode({ value: message.is_enabled! }, writer.uint32(26).fork()).join();
    }
    if (message.trigger_permission !== undefined) {
      PermissionConfig.encode(message.trigger_permission, writer.uint32(34).fork()).join();
    }
    if (message.query !== undefined) {
      FISQueryRequest.encode(message.query, writer.uint32(42).fork()).join();
    }
    if (message.query_hash.length !== 0) {
      writer.uint32(50).bytes(message.query_hash);
    }
    if (message.metadata !== undefined) {
      StrategyMetadata.encode(message.metadata, writer.uint32(58).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StrategyUpdateEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStrategyUpdateEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.op = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.is_enabled = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.trigger_permission = PermissionConfig.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.query = FISQueryRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.query_hash = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.metadata = StrategyMetadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StrategyUpdateEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
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

  toJSON(message: StrategyUpdateEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
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

  create(base?: DeepPartial<StrategyUpdateEvent>): StrategyUpdateEvent {
    return StrategyUpdateEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StrategyUpdateEvent>): StrategyUpdateEvent {
    const message = createBaseStrategyUpdateEvent();
    message.op = object.op ?? 0;
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

function createBaseStrategyTriggerEvent(): StrategyTriggerEvent {
  return {
    op: 0,
    id: new Uint8Array(0),
    executor: "",
    instructions: new Uint8Array(0),
    fis_transaction_output: new Uint8Array(0),
    error: "",
    gas_consumed: "0",
    fee: "",
    height: "0",
    time: "0",
  };
}

export const StrategyTriggerEvent: MessageFns<StrategyTriggerEvent, "flux.strategy.v1beta1.StrategyTriggerEvent"> = {
  $type: "flux.strategy.v1beta1.StrategyTriggerEvent" as const,

  encode(message: StrategyTriggerEvent, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    if (message.id.length !== 0) {
      writer.uint32(18).bytes(message.id);
    }
    if (message.executor !== "") {
      writer.uint32(26).string(message.executor);
    }
    if (message.instructions.length !== 0) {
      writer.uint32(34).bytes(message.instructions);
    }
    if (message.fis_transaction_output.length !== 0) {
      writer.uint32(42).bytes(message.fis_transaction_output);
    }
    if (message.error !== "") {
      writer.uint32(50).string(message.error);
    }
    if (message.gas_consumed !== "0") {
      writer.uint32(56).uint64(message.gas_consumed);
    }
    if (message.fee !== "") {
      writer.uint32(66).string(message.fee);
    }
    if (message.height !== "0") {
      writer.uint32(72).int64(message.height);
    }
    if (message.time !== "0") {
      writer.uint32(80).int64(message.time);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StrategyTriggerEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStrategyTriggerEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.op = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.executor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instructions = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fis_transaction_output = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.error = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.gas_consumed = reader.uint64().toString();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.fee = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.height = reader.int64().toString();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.time = reader.int64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StrategyTriggerEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
      id: isSet(object.id) ? bytesFromBase64(object.id) : new Uint8Array(0),
      executor: isSet(object.executor) ? globalThis.String(object.executor) : "",
      instructions: isSet(object.instructions) ? bytesFromBase64(object.instructions) : new Uint8Array(0),
      fis_transaction_output: isSet(object.fis_transaction_output)
        ? bytesFromBase64(object.fis_transaction_output)
        : new Uint8Array(0),
      error: isSet(object.error) ? globalThis.String(object.error) : "",
      gas_consumed: isSet(object.gas_consumed) ? globalThis.String(object.gas_consumed) : "0",
      fee: isSet(object.fee) ? globalThis.String(object.fee) : "",
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? globalThis.String(object.time) : "0",
    };
  },

  toJSON(message: StrategyTriggerEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
    if (message.id !== undefined) {
      obj.id = base64FromBytes(message.id);
    }
    if (message.executor !== undefined) {
      obj.executor = message.executor;
    }
    if (message.instructions !== undefined) {
      obj.instructions = base64FromBytes(message.instructions);
    }
    if (message.fis_transaction_output !== undefined) {
      obj.fis_transaction_output = base64FromBytes(message.fis_transaction_output);
    }
    if (message.error !== undefined) {
      obj.error = message.error;
    }
    if (message.gas_consumed !== undefined) {
      obj.gas_consumed = message.gas_consumed;
    }
    if (message.fee !== undefined) {
      obj.fee = message.fee;
    }
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time;
    }
    return obj;
  },

  create(base?: DeepPartial<StrategyTriggerEvent>): StrategyTriggerEvent {
    return StrategyTriggerEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StrategyTriggerEvent>): StrategyTriggerEvent {
    const message = createBaseStrategyTriggerEvent();
    message.op = object.op ?? 0;
    message.id = object.id ?? new Uint8Array(0);
    message.executor = object.executor ?? "";
    message.instructions = object.instructions ?? new Uint8Array(0);
    message.fis_transaction_output = object.fis_transaction_output ?? new Uint8Array(0);
    message.error = object.error ?? "";
    message.gas_consumed = object.gas_consumed ?? "0";
    message.fee = object.fee ?? "";
    message.height = object.height ?? "0";
    message.time = object.time ?? "0";
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

interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
