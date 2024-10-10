// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: flux/bazaar/v1beta1/product.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
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
  /** owner */
  owner: string;
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
  return {
    class_id: "",
    id: "",
    product_id: "",
    offerings: [],
    revenue: undefined,
    tags: [],
    verified: false,
    owner: "",
  };
}

export const Product: MessageFns<Product, "flux.bazaar.v1beta1.Product"> = {
  $type: "flux.bazaar.v1beta1.Product" as const,

  encode(message: Product, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
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
      Offering.encode(v!, writer.uint32(58).fork()).join();
    }
    if (message.revenue !== undefined) {
      Coin.encode(message.revenue, writer.uint32(66).fork()).join();
    }
    for (const v of message.tags) {
      writer.uint32(74).string(v!);
    }
    if (message.verified !== false) {
      writer.uint32(80).bool(message.verified);
    }
    if (message.owner !== "") {
      writer.uint32(90).string(message.owner);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Product {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
        case 11:
          if (tag !== 90) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
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
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    if (message.product_id !== undefined) {
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
    if (message.verified !== undefined) {
      obj.verified = message.verified;
    }
    if (message.owner !== undefined) {
      obj.owner = message.owner;
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
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseOffering(): Offering {
  return { url: "", price: undefined, purchase_count: "0" };
}

export const Offering: MessageFns<Offering, "flux.bazaar.v1beta1.Offering"> = {
  $type: "flux.bazaar.v1beta1.Offering" as const,

  encode(message: Offering, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(18).fork()).join();
    }
    if (message.purchase_count !== "0") {
      writer.uint32(24).uint64(message.purchase_count);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Offering {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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

          message.purchase_count = reader.uint64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
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
    if (message.url !== undefined) {
      obj.url = message.url;
    }
    if (message.price !== undefined) {
      obj.price = Coin.toJSON(message.price);
    }
    if (message.purchase_count !== undefined) {
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

export const ClassCommission: MessageFns<ClassCommission, "flux.bazaar.v1beta1.ClassCommission"> = {
  $type: "flux.bazaar.v1beta1.ClassCommission" as const,

  encode(message: ClassCommission, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
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

  decode(input: BinaryReader | Uint8Array, length?: number): ClassCommission {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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

          message.commission_mul = reader.uint64().toString();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.commission_div = reader.uint64().toString();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
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
    if (message.class_id !== undefined) {
      obj.class_id = message.class_id;
    }
    if (message.commission_mul !== undefined) {
      obj.commission_mul = message.commission_mul;
    }
    if (message.commission_div !== undefined) {
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
