/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ClassCommission } from "./product";

export interface ClassCommissionsProposal {
  title: string;
  description: string;
  class_commissions: ClassCommission[];
}

export interface VerifiersProposal {
  title: string;
  description: string;
  verifiers: string[];
}

function createBaseClassCommissionsProposal(): ClassCommissionsProposal {
  return { title: "", description: "", class_commissions: [] };
}

export const ClassCommissionsProposal = {
  $type: "flux.bazaar.v1beta1.ClassCommissionsProposal" as const,

  encode(message: ClassCommissionsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.class_commissions) {
      ClassCommission.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassCommissionsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassCommissionsProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.class_commissions.push(ClassCommission.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassCommissionsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      class_commissions: globalThis.Array.isArray(object?.class_commissions)
        ? object.class_commissions.map((e: any) => ClassCommission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClassCommissionsProposal): unknown {
    const obj: any = {};
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.class_commissions?.length) {
      obj.class_commissions = message.class_commissions.map((e) => ClassCommission.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ClassCommissionsProposal>): ClassCommissionsProposal {
    return ClassCommissionsProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ClassCommissionsProposal>): ClassCommissionsProposal {
    const message = createBaseClassCommissionsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.class_commissions = object.class_commissions?.map((e) => ClassCommission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVerifiersProposal(): VerifiersProposal {
  return { title: "", description: "", verifiers: [] };
}

export const VerifiersProposal = {
  $type: "flux.bazaar.v1beta1.VerifiersProposal" as const,

  encode(message: VerifiersProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.verifiers) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifiersProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifiersProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.verifiers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifiersProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      verifiers: globalThis.Array.isArray(object?.verifiers)
        ? object.verifiers.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: VerifiersProposal): unknown {
    const obj: any = {};
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.verifiers?.length) {
      obj.verifiers = message.verifiers;
    }
    return obj;
  },

  create(base?: DeepPartial<VerifiersProposal>): VerifiersProposal {
    return VerifiersProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<VerifiersProposal>): VerifiersProposal {
    const message = createBaseVerifiersProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.verifiers = object.verifiers?.map((e) => e) || [];
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
