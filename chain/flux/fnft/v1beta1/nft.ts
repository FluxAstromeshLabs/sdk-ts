/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";

export enum NFTStatus {
  ISO = 0,
  Failed = 1,
  Active = 2,
  UNRECOGNIZED = -1,
}

export function nFTStatusFromJSON(object: any): NFTStatus {
  switch (object) {
    case 0:
    case "ISO":
      return NFTStatus.ISO;
    case 1:
    case "Failed":
      return NFTStatus.Failed;
    case 2:
    case "Active":
      return NFTStatus.Active;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NFTStatus.UNRECOGNIZED;
  }
}

export function nFTStatusToJSON(object: NFTStatus): string {
  switch (object) {
    case NFTStatus.ISO:
      return "ISO";
    case NFTStatus.Failed:
      return "Failed";
    case NFTStatus.Active:
      return "Active";
    case NFTStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Class defines the class of the nft type. */
export interface Class {
  /**
   * id defines the unique identifier of the NFT classification, similar to the
   * contract address of ERC721
   */
  id: string;
  /** name defines the human-readable name of the NFT classification. Optional */
  name: string;
  /** symbol is an abbreviated name for nft classification. Optional */
  symbol: string;
  /** description is a brief description of nft classification. Optional */
  description: string;
  /**
   * url for the class metadata stored off chain. It can define schema for Class
   * and NFT `Data` attributes. Optional
   */
  url: string;
  /** data is the app specific metadata of the NFT class. Optional */
  data: Any | undefined;
}

/** NFT defines the NFT. */
export interface NFT {
  /** class_id associated with the NFT, similar to the contract address of ERC721 */
  class_id: string;
  /** id is a unique identifier of the NFT */
  id: string;
  /** url for the NFT metadata stored off chain */
  url: string;
  /** supply is shares supply for this nft */
  supply: string;
  /** owner equity is the percentage of shares owner will receive via vesting */
  owner_equity_percent: string;
  /** available shares to purchase within iso period */
  available_shares: string;
  /** iso price per share */
  initial_price:
    | Coin
    | undefined;
  /** timestamp when iso period is over */
  ISO_timestamp: string;
  ISO_success_percent: string;
  /** sponsorships must use this denom */
  accepted_payment_denom: string;
  /** array of sponsorship in this dividend period */
  sponsorships: Sponsorship[];
  /** sponsorship coins will be accumulated in revenue */
  revenue:
    | Coin
    | undefined;
  /** interval to distribute dividend to users */
  dividend_interval: string;
  /** last dividend timestamp */
  last_dividend_timestamp: string;
  /** nft owner */
  owner: string;
  holder_count: string;
  /** indicate if nft passes iso or not */
  status: NFTStatus;
  /** data is an app specific data of the NFT. Optional */
  data: Any | undefined;
}

export interface Sponsorship {
  description: string;
  url: string;
}

export interface Holder {
  class_id: string;
  id: string;
  address: string;
  shares: string;
}

function createBaseClass(): Class {
  return { id: "", name: "", symbol: "", description: "", url: "", data: undefined };
}

export const Class = {
  $type: "flux.fnft.v1beta1.Class" as const,

  encode(message: Class, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Class {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.url = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Class {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: Class): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.data !== undefined) {
      obj.data = Any.toJSON(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<Class>): Class {
    return Class.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Class>): Class {
    const message = createBaseClass();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    return message;
  },
};

function createBaseNFT(): NFT {
  return {
    class_id: "",
    id: "",
    url: "",
    supply: "",
    owner_equity_percent: "",
    available_shares: "",
    initial_price: undefined,
    ISO_timestamp: "0",
    ISO_success_percent: "0",
    accepted_payment_denom: "",
    sponsorships: [],
    revenue: undefined,
    dividend_interval: "0",
    last_dividend_timestamp: "0",
    owner: "",
    holder_count: "0",
    status: 0,
    data: undefined,
  };
}

export const NFT = {
  $type: "flux.fnft.v1beta1.NFT" as const,

  encode(message: NFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.supply !== "") {
      writer.uint32(34).string(message.supply);
    }
    if (message.owner_equity_percent !== "") {
      writer.uint32(42).string(message.owner_equity_percent);
    }
    if (message.available_shares !== "") {
      writer.uint32(50).string(message.available_shares);
    }
    if (message.initial_price !== undefined) {
      Coin.encode(message.initial_price, writer.uint32(58).fork()).ldelim();
    }
    if (message.ISO_timestamp !== "0") {
      writer.uint32(64).uint64(message.ISO_timestamp);
    }
    if (message.ISO_success_percent !== "0") {
      writer.uint32(72).uint64(message.ISO_success_percent);
    }
    if (message.accepted_payment_denom !== "") {
      writer.uint32(82).string(message.accepted_payment_denom);
    }
    for (const v of message.sponsorships) {
      Sponsorship.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.revenue !== undefined) {
      Coin.encode(message.revenue, writer.uint32(98).fork()).ldelim();
    }
    if (message.dividend_interval !== "0") {
      writer.uint32(104).uint64(message.dividend_interval);
    }
    if (message.last_dividend_timestamp !== "0") {
      writer.uint32(112).uint64(message.last_dividend_timestamp);
    }
    if (message.owner !== "") {
      writer.uint32(122).string(message.owner);
    }
    if (message.holder_count !== "0") {
      writer.uint32(128).uint64(message.holder_count);
    }
    if (message.status !== 0) {
      writer.uint32(136).int32(message.status);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(146).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFT {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFT();
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

          message.url = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.supply = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.owner_equity_percent = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.available_shares = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.initial_price = Coin.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.ISO_timestamp = longToString(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.ISO_success_percent = longToString(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.accepted_payment_denom = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.sponsorships.push(Sponsorship.decode(reader, reader.uint32()));
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.revenue = Coin.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.dividend_interval = longToString(reader.uint64() as Long);
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.last_dividend_timestamp = longToString(reader.uint64() as Long);
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.holder_count = longToString(reader.uint64() as Long);
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NFT {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      supply: isSet(object.supply) ? globalThis.String(object.supply) : "",
      owner_equity_percent: isSet(object.owner_equity_percent) ? globalThis.String(object.owner_equity_percent) : "",
      available_shares: isSet(object.available_shares) ? globalThis.String(object.available_shares) : "",
      initial_price: isSet(object.initial_price) ? Coin.fromJSON(object.initial_price) : undefined,
      ISO_timestamp: isSet(object.ISO_timestamp) ? globalThis.String(object.ISO_timestamp) : "0",
      ISO_success_percent: isSet(object.ISO_success_percent) ? globalThis.String(object.ISO_success_percent) : "0",
      accepted_payment_denom: isSet(object.accepted_payment_denom)
        ? globalThis.String(object.accepted_payment_denom)
        : "",
      sponsorships: globalThis.Array.isArray(object?.sponsorships)
        ? object.sponsorships.map((e: any) => Sponsorship.fromJSON(e))
        : [],
      revenue: isSet(object.revenue) ? Coin.fromJSON(object.revenue) : undefined,
      dividend_interval: isSet(object.dividend_interval) ? globalThis.String(object.dividend_interval) : "0",
      last_dividend_timestamp: isSet(object.last_dividend_timestamp)
        ? globalThis.String(object.last_dividend_timestamp)
        : "0",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      holder_count: isSet(object.holder_count) ? globalThis.String(object.holder_count) : "0",
      status: isSet(object.status) ? nFTStatusFromJSON(object.status) : 0,
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: NFT): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.supply !== "") {
      obj.supply = message.supply;
    }
    if (message.owner_equity_percent !== "") {
      obj.owner_equity_percent = message.owner_equity_percent;
    }
    if (message.available_shares !== "") {
      obj.available_shares = message.available_shares;
    }
    if (message.initial_price !== undefined) {
      obj.initial_price = Coin.toJSON(message.initial_price);
    }
    if (message.ISO_timestamp !== "0") {
      obj.ISO_timestamp = message.ISO_timestamp;
    }
    if (message.ISO_success_percent !== "0") {
      obj.ISO_success_percent = message.ISO_success_percent;
    }
    if (message.accepted_payment_denom !== "") {
      obj.accepted_payment_denom = message.accepted_payment_denom;
    }
    if (message.sponsorships?.length) {
      obj.sponsorships = message.sponsorships.map((e) => Sponsorship.toJSON(e));
    }
    if (message.revenue !== undefined) {
      obj.revenue = Coin.toJSON(message.revenue);
    }
    if (message.dividend_interval !== "0") {
      obj.dividend_interval = message.dividend_interval;
    }
    if (message.last_dividend_timestamp !== "0") {
      obj.last_dividend_timestamp = message.last_dividend_timestamp;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.holder_count !== "0") {
      obj.holder_count = message.holder_count;
    }
    if (message.status !== 0) {
      obj.status = nFTStatusToJSON(message.status);
    }
    if (message.data !== undefined) {
      obj.data = Any.toJSON(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<NFT>): NFT {
    return NFT.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NFT>): NFT {
    const message = createBaseNFT();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.url = object.url ?? "";
    message.supply = object.supply ?? "";
    message.owner_equity_percent = object.owner_equity_percent ?? "";
    message.available_shares = object.available_shares ?? "";
    message.initial_price = (object.initial_price !== undefined && object.initial_price !== null)
      ? Coin.fromPartial(object.initial_price)
      : undefined;
    message.ISO_timestamp = object.ISO_timestamp ?? "0";
    message.ISO_success_percent = object.ISO_success_percent ?? "0";
    message.accepted_payment_denom = object.accepted_payment_denom ?? "";
    message.sponsorships = object.sponsorships?.map((e) => Sponsorship.fromPartial(e)) || [];
    message.revenue = (object.revenue !== undefined && object.revenue !== null)
      ? Coin.fromPartial(object.revenue)
      : undefined;
    message.dividend_interval = object.dividend_interval ?? "0";
    message.last_dividend_timestamp = object.last_dividend_timestamp ?? "0";
    message.owner = object.owner ?? "";
    message.holder_count = object.holder_count ?? "0";
    message.status = object.status ?? 0;
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    return message;
  },
};

function createBaseSponsorship(): Sponsorship {
  return { description: "", url: "" };
}

export const Sponsorship = {
  $type: "flux.fnft.v1beta1.Sponsorship" as const,

  encode(message: Sponsorship, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sponsorship {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSponsorship();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sponsorship {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: Sponsorship): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create(base?: DeepPartial<Sponsorship>): Sponsorship {
    return Sponsorship.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Sponsorship>): Sponsorship {
    const message = createBaseSponsorship();
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseHolder(): Holder {
  return { class_id: "", id: "", address: "", shares: "" };
}

export const Holder = {
  $type: "flux.fnft.v1beta1.Holder" as const,

  encode(message: Holder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.shares !== "") {
      writer.uint32(34).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Holder {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHolder();
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

          message.address = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.shares = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Holder {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: Holder): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<Holder>): Holder {
    return Holder.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Holder>): Holder {
    const message = createBaseHolder();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.address = object.address ?? "";
    message.shares = object.shares ?? "";
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
