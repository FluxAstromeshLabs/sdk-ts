// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: flux/fnft/v1beta1/genesis.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Class, Holder, NFT } from "./nft";

export interface GenesisState {
  classes: Class[];
  nfts: NFT[];
  holders: Holder[];
}

function createBaseGenesisState(): GenesisState {
  return { classes: [], nfts: [], holders: [] };
}

export const GenesisState: MessageFns<GenesisState, "flux.fnft.v1beta1.GenesisState"> = {
  $type: "flux.fnft.v1beta1.GenesisState" as const,

  encode(message: GenesisState, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.classes) {
      Class.encode(v!, writer.uint32(10).fork()).join();
    }
    for (const v of message.nfts) {
      NFT.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.holders) {
      Holder.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classes.push(Class.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nfts.push(NFT.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.holders.push(Holder.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      classes: globalThis.Array.isArray(object?.classes) ? object.classes.map((e: any) => Class.fromJSON(e)) : [],
      nfts: globalThis.Array.isArray(object?.nfts) ? object.nfts.map((e: any) => NFT.fromJSON(e)) : [],
      holders: globalThis.Array.isArray(object?.holders) ? object.holders.map((e: any) => Holder.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.classes?.length) {
      obj.classes = message.classes.map((e) => Class.toJSON(e));
    }
    if (message.nfts?.length) {
      obj.nfts = message.nfts.map((e) => NFT.toJSON(e));
    }
    if (message.holders?.length) {
      obj.holders = message.holders.map((e) => Holder.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.classes = object.classes?.map((e) => Class.fromPartial(e)) || [];
    message.nfts = object.nfts?.map((e) => NFT.fromPartial(e)) || [];
    message.holders = object.holders?.map((e) => Holder.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
