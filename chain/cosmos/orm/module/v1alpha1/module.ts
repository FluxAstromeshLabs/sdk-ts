/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * Module defines the ORM module which adds providers to the app container for
 * module-scoped DB's. In the future it may provide gRPC services for interacting
 * with ORM data.
 */
export interface Module {
}

function createBaseModule(): Module {
  return {};
}

export const Module = {
  $type: "cosmos.orm.module.v1alpha1.Module" as const,

  encode(_: Module, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Module {
    return {};
  },

  toJSON(_: Module): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<Module>): Module {
    return Module.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<Module>): Module {
    const message = createBaseModule();
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
