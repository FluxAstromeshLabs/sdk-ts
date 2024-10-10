// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: tendermint/types/block.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { EvidenceList } from "./evidence";
import { Commit, Data, Header } from "./types";

export interface Block {
  header: Header | undefined;
  data: Data | undefined;
  evidence: EvidenceList | undefined;
  last_commit: Commit | undefined;
}

function createBaseBlock(): Block {
  return { header: undefined, data: undefined, evidence: undefined, last_commit: undefined };
}

export const Block: MessageFns<Block, "tendermint.types.Block"> = {
  $type: "tendermint.types.Block" as const,

  encode(message: Block, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).join();
    }
    if (message.data !== undefined) {
      Data.encode(message.data, writer.uint32(18).fork()).join();
    }
    if (message.evidence !== undefined) {
      EvidenceList.encode(message.evidence, writer.uint32(26).fork()).join();
    }
    if (message.last_commit !== undefined) {
      Commit.encode(message.last_commit, writer.uint32(34).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Block {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = Header.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = Data.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.evidence = EvidenceList.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.last_commit = Commit.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Block {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      data: isSet(object.data) ? Data.fromJSON(object.data) : undefined,
      evidence: isSet(object.evidence) ? EvidenceList.fromJSON(object.evidence) : undefined,
      last_commit: isSet(object.last_commit) ? Commit.fromJSON(object.last_commit) : undefined,
    };
  },

  toJSON(message: Block): unknown {
    const obj: any = {};
    if (message.header !== undefined) {
      obj.header = Header.toJSON(message.header);
    }
    if (message.data !== undefined) {
      obj.data = Data.toJSON(message.data);
    }
    if (message.evidence !== undefined) {
      obj.evidence = EvidenceList.toJSON(message.evidence);
    }
    if (message.last_commit !== undefined) {
      obj.last_commit = Commit.toJSON(message.last_commit);
    }
    return obj;
  },

  create(base?: DeepPartial<Block>): Block {
    return Block.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Block>): Block {
    const message = createBaseBlock();
    message.header = (object.header !== undefined && object.header !== null)
      ? Header.fromPartial(object.header)
      : undefined;
    message.data = (object.data !== undefined && object.data !== null) ? Data.fromPartial(object.data) : undefined;
    message.evidence = (object.evidence !== undefined && object.evidence !== null)
      ? EvidenceList.fromPartial(object.evidence)
      : undefined;
    message.last_commit = (object.last_commit !== undefined && object.last_commit !== null)
      ? Commit.fromPartial(object.last_commit)
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
