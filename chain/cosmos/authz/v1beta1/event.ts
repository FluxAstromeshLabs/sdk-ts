// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: cosmos/authz/v1beta1/event.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

/** Since: cosmos-sdk 0.43 */

/** EventGrant is emitted on Msg/Grant */
export interface EventGrant {
  /** Msg type URL for which an autorization is granted */
  msg_type_url: string;
  /** Granter account address */
  granter: string;
  /** Grantee account address */
  grantee: string;
}

/** EventRevoke is emitted on Msg/Revoke */
export interface EventRevoke {
  /** Msg type URL for which an autorization is revoked */
  msg_type_url: string;
  /** Granter account address */
  granter: string;
  /** Grantee account address */
  grantee: string;
}

function createBaseEventGrant(): EventGrant {
  return { msg_type_url: "", granter: "", grantee: "" };
}

export const EventGrant: MessageFns<EventGrant, "cosmos.authz.v1beta1.EventGrant"> = {
  $type: "cosmos.authz.v1beta1.EventGrant" as const,

  encode(message: EventGrant, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.msg_type_url !== "") {
      writer.uint32(18).string(message.msg_type_url);
    }
    if (message.granter !== "") {
      writer.uint32(26).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(34).string(message.grantee);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventGrant {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.msg_type_url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.grantee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventGrant {
    return {
      msg_type_url: isSet(object.msg_type_url) ? globalThis.String(object.msg_type_url) : "",
      granter: isSet(object.granter) ? globalThis.String(object.granter) : "",
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
    };
  },

  toJSON(message: EventGrant): unknown {
    const obj: any = {};
    if (message.msg_type_url !== undefined) {
      obj.msg_type_url = message.msg_type_url;
    }
    if (message.granter !== undefined) {
      obj.granter = message.granter;
    }
    if (message.grantee !== undefined) {
      obj.grantee = message.grantee;
    }
    return obj;
  },

  create(base?: DeepPartial<EventGrant>): EventGrant {
    return EventGrant.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EventGrant>): EventGrant {
    const message = createBaseEventGrant();
    message.msg_type_url = object.msg_type_url ?? "";
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    return message;
  },
};

function createBaseEventRevoke(): EventRevoke {
  return { msg_type_url: "", granter: "", grantee: "" };
}

export const EventRevoke: MessageFns<EventRevoke, "cosmos.authz.v1beta1.EventRevoke"> = {
  $type: "cosmos.authz.v1beta1.EventRevoke" as const,

  encode(message: EventRevoke, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.msg_type_url !== "") {
      writer.uint32(18).string(message.msg_type_url);
    }
    if (message.granter !== "") {
      writer.uint32(26).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(34).string(message.grantee);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EventRevoke {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRevoke();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.msg_type_url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.granter = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.grantee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventRevoke {
    return {
      msg_type_url: isSet(object.msg_type_url) ? globalThis.String(object.msg_type_url) : "",
      granter: isSet(object.granter) ? globalThis.String(object.granter) : "",
      grantee: isSet(object.grantee) ? globalThis.String(object.grantee) : "",
    };
  },

  toJSON(message: EventRevoke): unknown {
    const obj: any = {};
    if (message.msg_type_url !== undefined) {
      obj.msg_type_url = message.msg_type_url;
    }
    if (message.granter !== undefined) {
      obj.granter = message.granter;
    }
    if (message.grantee !== undefined) {
      obj.grantee = message.grantee;
    }
    return obj;
  },

  create(base?: DeepPartial<EventRevoke>): EventRevoke {
    return EventRevoke.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EventRevoke>): EventRevoke {
    const message = createBaseEventRevoke();
    message.msg_type_url = object.msg_type_url ?? "";
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
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
