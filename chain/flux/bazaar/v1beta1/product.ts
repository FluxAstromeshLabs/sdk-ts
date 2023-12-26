/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export interface Product {
  /** NFT class id reference */
  class_id: string;
  /** NFT id reference */
  id: string;
  /** product id */
  product_id: string;
  /** product offerings including gift, items, etc */
  offerings: Offering[];
  /** product revenue */
  revenue:
    | Coin
    | undefined;
  /** tags */
  tags: string[];
  /** verified */
  verified: boolean;
}

export interface Offering {
  url: string;
  price: Coin | undefined;
  purchase_count: string;
}

export interface ClassCommission {
  class_id: string;
  commission_mul: string;
  commission_div: string;
}

function createBaseProduct(): Product {
  return { class_id: "", id: "", product_id: "", offerings: [], revenue: undefined, tags: [], verified: false };
}

export const Product = {
  $type: "flux.bazaar.v1beta1.Product" as const,

  encode(message: Product, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.product_id !== "") {
      writer.uint32(26).string(message.product_id);
    }
    for (const v of message.offerings) {
      Offering.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.revenue !== undefined) {
      Coin.encode(message.revenue, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.tags) {
      writer.uint32(74).string(v!);
    }
    if (message.verified === true) {
      writer.uint32(80).bool(message.verified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Product {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.product_id = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.offerings.push(Offering.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.revenue = Coin.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.tags.push(reader.string());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.verified = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      product_id: isSet(object.product_id) ? globalThis.String(object.product_id) : "",
      offerings: globalThis.Array.isArray(object?.offerings)
        ? object.offerings.map((e: any) => Offering.fromJSON(e))
        : [],
      revenue: isSet(object.revenue) ? Coin.fromJSON(object.revenue) : undefined,
      tags: globalThis.Array.isArray(object?.tags) ? object.tags.map((e: any) => globalThis.String(e)) : [],
      verified: isSet(object.verified) ? globalThis.Boolean(object.verified) : false,
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.product_id !== "") {
      obj.product_id = message.product_id;
    }
    if (message.offerings?.length) {
      obj.offerings = message.offerings.map((e) => Offering.toJSON(e));
    }
    if (message.revenue !== undefined) {
      obj.revenue = Coin.toJSON(message.revenue);
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.verified === true) {
      obj.verified = message.verified;
    }
    return obj;
  },

  create(base?: DeepPartial<Product>): Product {
    return Product.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Product>): Product {
    const message = createBaseProduct();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.product_id = object.product_id ?? "";
    message.offerings = object.offerings?.map((e) => Offering.fromPartial(e)) || [];
    message.revenue = (object.revenue !== undefined && object.revenue !== null)
      ? Coin.fromPartial(object.revenue)
      : undefined;
    message.tags = object.tags?.map((e) => e) || [];
    message.verified = object.verified ?? false;
    return message;
  },
};

function createBaseOffering(): Offering {
  return { url: "", price: undefined, purchase_count: "0" };
}

export const Offering = {
  $type: "flux.bazaar.v1beta1.Offering" as const,

  encode(message: Offering, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(18).fork()).ldelim();
    }
    if (message.purchase_count !== "0") {
      writer.uint32(24).uint64(message.purchase_count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Offering {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOffering();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.price = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.purchase_count = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Offering {
    return {
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      price: isSet(object.price) ? Coin.fromJSON(object.price) : undefined,
      purchase_count: isSet(object.purchase_count) ? globalThis.String(object.purchase_count) : "0",
    };
  },

  toJSON(message: Offering): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.price !== undefined) {
      obj.price = Coin.toJSON(message.price);
    }
    if (message.purchase_count !== "0") {
      obj.purchase_count = message.purchase_count;
    }
    return obj;
  },

  create(base?: DeepPartial<Offering>): Offering {
    return Offering.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Offering>): Offering {
    const message = createBaseOffering();
    message.url = object.url ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Coin.fromPartial(object.price) : undefined;
    message.purchase_count = object.purchase_count ?? "0";
    return message;
  },
};

function createBaseClassCommission(): ClassCommission {
  return { class_id: "", commission_mul: "0", commission_div: "0" };
}

export const ClassCommission = {
  $type: "flux.bazaar.v1beta1.ClassCommission" as const,

  encode(message: ClassCommission, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.commission_mul !== "0") {
      writer.uint32(16).uint64(message.commission_mul);
    }
    if (message.commission_div !== "0") {
      writer.uint32(24).uint64(message.commission_div);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassCommission {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.commission_mul = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.commission_div = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassCommission {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      commission_mul: isSet(object.commission_mul) ? globalThis.String(object.commission_mul) : "0",
      commission_div: isSet(object.commission_div) ? globalThis.String(object.commission_div) : "0",
    };
  },

  toJSON(message: ClassCommission): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.commission_mul !== "0") {
      obj.commission_mul = message.commission_mul;
    }
    if (message.commission_div !== "0") {
      obj.commission_div = message.commission_div;
    }
    return obj;
  },

  create(base?: DeepPartial<ClassCommission>): ClassCommission {
    return ClassCommission.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ClassCommission>): ClassCommission {
    const message = createBaseClassCommission();
    message.class_id = object.class_id ?? "";
    message.commission_mul = object.commission_mul ?? "0";
    message.commission_div = object.commission_div ?? "0";
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
