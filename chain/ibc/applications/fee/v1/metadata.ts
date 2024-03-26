/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export interface Metadata {
  /** fee_version defines the ICS29 fee version */
  fee_version: string;
  /** app_version defines the underlying application version, which may or may not be a JSON encoded bytestring */
  app_version: string;
}

function createBaseMetadata(): Metadata {
  return { fee_version: "", app_version: "" };
}

export const Metadata = {
  $type: "ibc.applications.fee.v1.Metadata" as const,

  encode(message: Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fee_version !== "") {
      writer.uint32(10).string(message.fee_version);
    }
    if (message.app_version !== "") {
      writer.uint32(18).string(message.app_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fee_version = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.app_version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      fee_version: isSet(object.fee_version) ? globalThis.String(object.fee_version) : "",
      app_version: isSet(object.app_version) ? globalThis.String(object.app_version) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.fee_version !== "") {
      obj.fee_version = message.fee_version;
    }
    if (message.app_version !== "") {
      obj.app_version = message.app_version;
    }
    return obj;
  },

  create(base?: DeepPartial<Metadata>): Metadata {
    return Metadata.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Metadata>): Metadata {
    const message = createBaseMetadata();
    message.fee_version = object.fee_version ?? "";
    message.app_version = object.app_version ?? "";
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
