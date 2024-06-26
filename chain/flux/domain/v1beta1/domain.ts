// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/domain/v1beta1/domain.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Domain {
  alias: string;
  owner: string;
  expiry: string;
  price: string;
}

function createBaseDomain(): Domain {
  return { alias: "", owner: "", expiry: "0", price: "" };
}

export const Domain = {
  $type: "flux.domain.v1beta1.Domain" as const,

  encode(message: Domain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.alias !== "") {
      writer.uint32(10).string(message.alias);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.expiry !== "0") {
      writer.uint32(24).uint64(message.expiry);
    }
    if (message.price !== "") {
      writer.uint32(34).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Domain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDomain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.alias = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expiry = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.price = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Domain {
    return {
      alias: isSet(object.alias) ? globalThis.String(object.alias) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      expiry: isSet(object.expiry) ? globalThis.String(object.expiry) : "0",
      price: isSet(object.price) ? globalThis.String(object.price) : "",
    };
  },

  toJSON(message: Domain): unknown {
    const obj: any = {};
    if (message.alias !== undefined) {
      obj.alias = message.alias;
    }
    if (message.owner !== undefined) {
      obj.owner = message.owner;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry;
    }
    if (message.price !== undefined) {
      obj.price = message.price;
    }
    return obj;
  },

  create(base?: DeepPartial<Domain>): Domain {
    return Domain.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Domain>): Domain {
    const message = createBaseDomain();
    message.alias = object.alias ?? "";
    message.owner = object.owner ?? "";
    message.expiry = object.expiry ?? "0";
    message.price = object.price ?? "";
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
