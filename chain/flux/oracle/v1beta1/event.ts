// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: flux/oracle/v1beta1/event.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Op, opFromJSON, opToJSON } from "../../eventstream/v1beta1/query";
import { SimpleEntry } from "./oracle";

export interface PythOracleEvent {
  op: Op;
  entry: SimpleEntry | undefined;
}

function createBasePythOracleEvent(): PythOracleEvent {
  return { op: 0, entry: undefined };
}

export const PythOracleEvent: MessageFns<PythOracleEvent, "flux.oracle.v1beta1.PythOracleEvent"> = {
  $type: "flux.oracle.v1beta1.PythOracleEvent" as const,

  encode(message: PythOracleEvent, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.op !== 0) {
      writer.uint32(8).int32(message.op);
    }
    if (message.entry !== undefined) {
      SimpleEntry.encode(message.entry, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PythOracleEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePythOracleEvent();
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

          message.entry = SimpleEntry.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PythOracleEvent {
    return {
      op: isSet(object.op) ? opFromJSON(object.op) : 0,
      entry: isSet(object.entry) ? SimpleEntry.fromJSON(object.entry) : undefined,
    };
  },

  toJSON(message: PythOracleEvent): unknown {
    const obj: any = {};
    if (message.op !== undefined) {
      obj.op = opToJSON(message.op);
    }
    if (message.entry !== undefined) {
      obj.entry = SimpleEntry.toJSON(message.entry);
    }
    return obj;
  },

  create(base?: DeepPartial<PythOracleEvent>): PythOracleEvent {
    return PythOracleEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PythOracleEvent>): PythOracleEvent {
    const message = createBasePythOracleEvent();
    message.op = object.op ?? 0;
    message.entry = (object.entry !== undefined && object.entry !== null)
      ? SimpleEntry.fromPartial(object.entry)
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
