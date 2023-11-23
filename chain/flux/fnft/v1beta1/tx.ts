/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";

/** MsgCreate represents a message to create a nft from one account. */
export interface MsgCreate {
  /** sender is the address of the owner of nft */
  sender: string;
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** shares defines the number of shares this nft holds */
  supply: string;
  /** initial_price defines initial price of a share */
  initial_price: string;
  /** iso_timestamp defines when iso period is over */
  ISO_timestamp: string;
  ISO_success_percent: string;
  /** accepted_sponsorship_denoms defines accepted denoms for sponsorship */
  accepted_payment_denom: string;
  /** dividend_interval defines period to distribute dividend to shareholders */
  dividend_interval: string;
}

/** MsgCreateResponse defines the Msg/Create response type. */
export interface MsgCreateResponse {
}

/** MsgPurchaseShares represents a message to purchase a nft's shares. */
export interface MsgPurchaseShares {
  /** sender is the address of sender */
  sender: string;
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** id defines the monotonic increasing id of the nft in nft class */
  id: string;
  /** amount defines the number of shares to purchase */
  shares: string;
}

/** MsgPurchaseSharesResponse defines the Msg/PurchaseShares response type. */
export interface MsgPurchaseSharesResponse {
}

/** MsgTransferShares represents a message to transfer nft shares from one account to another account. */
export interface MsgTransferShares {
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** id defines the unique identification of nft */
  id: string;
  /** sender is the address of the owner of nft */
  sender: string;
  /** receiver is the receiver address of nft */
  receiver: string;
  /** shares is the share amount to transfer */
  shares: string;
}

/** MsgTransferSharesResponse defines the Msg/TransferShares response type. */
export interface MsgTransferSharesResponse {
}

/** MsgDepositShares represents a message to deposit nft shares from bank to fnft. */
export interface MsgDepositShares {
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** id defines the unique identification of nft */
  id: string;
  /** sender is the address of the owner of nft */
  sender: string;
  /** shares is the share amount to transfer */
  shares: string;
}

/** MsgDepositSharesResponse defines the Msg/DepositShares response type. */
export interface MsgDepositSharesResponse {
}

/** MsgWithdrawShares represents a message to withdraw nft shares from fnft to bank. */
export interface MsgWithdrawShares {
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** id defines the unique identification of nft */
  id: string;
  /** sender is the address of the owner of nft */
  sender: string;
  /** shares is the share amount to transfer */
  shares: string;
}

/** MsgWithdrawSharesResponse defines the Msg/WithdrawShares response type. */
export interface MsgWithdrawSharesResponse {
}

/** MsgSponsor represents a message to sponsor an nft project */
export interface MsgSponsor {
  /** sender is the address of sender */
  sender: string;
  /** class_id defines the unique identifier of the nft classification, similar to the contract address of ERC721 */
  class_id: string;
  /** id defines the unique identification of nft */
  id: string;
  /** coin defines the value of this sponsorship */
  coin: string;
  /** description defines nft sponsorship description */
  description: string;
}

/** MsgSponsorResponse defines the Msg/Sponsor response type. */
export interface MsgSponsorResponse {
}

function createBaseMsgCreate(): MsgCreate {
  return {
    sender: "",
    class_id: "",
    supply: "",
    initial_price: "",
    ISO_timestamp: "0",
    ISO_success_percent: "0",
    accepted_payment_denom: "",
    dividend_interval: "0",
  };
}

export const MsgCreate = {
  $type: "flux.fnft.v1beta1.MsgCreate" as const,

  encode(message: MsgCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.class_id !== "") {
      writer.uint32(18).string(message.class_id);
    }
    if (message.supply !== "") {
      writer.uint32(26).string(message.supply);
    }
    if (message.initial_price !== "") {
      writer.uint32(34).string(message.initial_price);
    }
    if (message.ISO_timestamp !== "0") {
      writer.uint32(40).uint64(message.ISO_timestamp);
    }
    if (message.ISO_success_percent !== "0") {
      writer.uint32(48).uint64(message.ISO_success_percent);
    }
    if (message.accepted_payment_denom !== "") {
      writer.uint32(58).string(message.accepted_payment_denom);
    }
    if (message.dividend_interval !== "0") {
      writer.uint32(64).uint64(message.dividend_interval);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.supply = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.initial_price = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.ISO_timestamp = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.ISO_success_percent = longToString(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.accepted_payment_denom = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.dividend_interval = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreate {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      supply: isSet(object.supply) ? globalThis.String(object.supply) : "",
      initial_price: isSet(object.initial_price) ? globalThis.String(object.initial_price) : "",
      ISO_timestamp: isSet(object.ISO_timestamp) ? globalThis.String(object.ISO_timestamp) : "0",
      ISO_success_percent: isSet(object.ISO_success_percent) ? globalThis.String(object.ISO_success_percent) : "0",
      accepted_payment_denom: isSet(object.accepted_payment_denom)
        ? globalThis.String(object.accepted_payment_denom)
        : "",
      dividend_interval: isSet(object.dividend_interval) ? globalThis.String(object.dividend_interval) : "0",
    };
  },

  toJSON(message: MsgCreate): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.supply !== "") {
      obj.supply = message.supply;
    }
    if (message.initial_price !== "") {
      obj.initial_price = message.initial_price;
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
    if (message.dividend_interval !== "0") {
      obj.dividend_interval = message.dividend_interval;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgCreate>): MsgCreate {
    return MsgCreate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgCreate>): MsgCreate {
    const message = createBaseMsgCreate();
    message.sender = object.sender ?? "";
    message.class_id = object.class_id ?? "";
    message.supply = object.supply ?? "";
    message.initial_price = object.initial_price ?? "";
    message.ISO_timestamp = object.ISO_timestamp ?? "0";
    message.ISO_success_percent = object.ISO_success_percent ?? "0";
    message.accepted_payment_denom = object.accepted_payment_denom ?? "";
    message.dividend_interval = object.dividend_interval ?? "0";
    return message;
  },
};

function createBaseMsgCreateResponse(): MsgCreateResponse {
  return {};
}

export const MsgCreateResponse = {
  $type: "flux.fnft.v1beta1.MsgCreateResponse" as const,

  encode(_: MsgCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResponse();
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

  fromJSON(_: any): MsgCreateResponse {
    return {};
  },

  toJSON(_: MsgCreateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgCreateResponse>): MsgCreateResponse {
    return MsgCreateResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgCreateResponse>): MsgCreateResponse {
    const message = createBaseMsgCreateResponse();
    return message;
  },
};

function createBaseMsgPurchaseShares(): MsgPurchaseShares {
  return { sender: "", class_id: "", id: "", shares: "" };
}

export const MsgPurchaseShares = {
  $type: "flux.fnft.v1beta1.MsgPurchaseShares" as const,

  encode(message: MsgPurchaseShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.class_id !== "") {
      writer.uint32(18).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.shares !== "") {
      writer.uint32(34).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPurchaseShares {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPurchaseShares();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.id = reader.string();
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

  fromJSON(object: any): MsgPurchaseShares {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: MsgPurchaseShares): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgPurchaseShares>): MsgPurchaseShares {
    return MsgPurchaseShares.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgPurchaseShares>): MsgPurchaseShares {
    const message = createBaseMsgPurchaseShares();
    message.sender = object.sender ?? "";
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseMsgPurchaseSharesResponse(): MsgPurchaseSharesResponse {
  return {};
}

export const MsgPurchaseSharesResponse = {
  $type: "flux.fnft.v1beta1.MsgPurchaseSharesResponse" as const,

  encode(_: MsgPurchaseSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPurchaseSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPurchaseSharesResponse();
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

  fromJSON(_: any): MsgPurchaseSharesResponse {
    return {};
  },

  toJSON(_: MsgPurchaseSharesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgPurchaseSharesResponse>): MsgPurchaseSharesResponse {
    return MsgPurchaseSharesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgPurchaseSharesResponse>): MsgPurchaseSharesResponse {
    const message = createBaseMsgPurchaseSharesResponse();
    return message;
  },
};

function createBaseMsgTransferShares(): MsgTransferShares {
  return { class_id: "", id: "", sender: "", receiver: "", shares: "" };
}

export const MsgTransferShares = {
  $type: "flux.fnft.v1beta1.MsgTransferShares" as const,

  encode(message: MsgTransferShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(34).string(message.receiver);
    }
    if (message.shares !== "") {
      writer.uint32(42).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferShares {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferShares();
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

          message.sender = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): MsgTransferShares {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: MsgTransferShares): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgTransferShares>): MsgTransferShares {
    return MsgTransferShares.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgTransferShares>): MsgTransferShares {
    const message = createBaseMsgTransferShares();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseMsgTransferSharesResponse(): MsgTransferSharesResponse {
  return {};
}

export const MsgTransferSharesResponse = {
  $type: "flux.fnft.v1beta1.MsgTransferSharesResponse" as const,

  encode(_: MsgTransferSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferSharesResponse();
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

  fromJSON(_: any): MsgTransferSharesResponse {
    return {};
  },

  toJSON(_: MsgTransferSharesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgTransferSharesResponse>): MsgTransferSharesResponse {
    return MsgTransferSharesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgTransferSharesResponse>): MsgTransferSharesResponse {
    const message = createBaseMsgTransferSharesResponse();
    return message;
  },
};

function createBaseMsgDepositShares(): MsgDepositShares {
  return { class_id: "", id: "", sender: "", shares: "" };
}

export const MsgDepositShares = {
  $type: "flux.fnft.v1beta1.MsgDepositShares" as const,

  encode(message: MsgDepositShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.shares !== "") {
      writer.uint32(42).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositShares {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositShares();
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

          message.sender = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): MsgDepositShares {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: MsgDepositShares): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDepositShares>): MsgDepositShares {
    return MsgDepositShares.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDepositShares>): MsgDepositShares {
    const message = createBaseMsgDepositShares();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseMsgDepositSharesResponse(): MsgDepositSharesResponse {
  return {};
}

export const MsgDepositSharesResponse = {
  $type: "flux.fnft.v1beta1.MsgDepositSharesResponse" as const,

  encode(_: MsgDepositSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositSharesResponse();
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

  fromJSON(_: any): MsgDepositSharesResponse {
    return {};
  },

  toJSON(_: MsgDepositSharesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgDepositSharesResponse>): MsgDepositSharesResponse {
    return MsgDepositSharesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgDepositSharesResponse>): MsgDepositSharesResponse {
    const message = createBaseMsgDepositSharesResponse();
    return message;
  },
};

function createBaseMsgWithdrawShares(): MsgWithdrawShares {
  return { class_id: "", id: "", sender: "", shares: "" };
}

export const MsgWithdrawShares = {
  $type: "flux.fnft.v1beta1.MsgWithdrawShares" as const,

  encode(message: MsgWithdrawShares, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class_id !== "") {
      writer.uint32(10).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.shares !== "") {
      writer.uint32(42).string(message.shares);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawShares {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawShares();
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

          message.sender = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): MsgWithdrawShares {
    return {
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      shares: isSet(object.shares) ? globalThis.String(object.shares) : "",
    };
  },

  toJSON(message: MsgWithdrawShares): unknown {
    const obj: any = {};
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawShares>): MsgWithdrawShares {
    return MsgWithdrawShares.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgWithdrawShares>): MsgWithdrawShares {
    const message = createBaseMsgWithdrawShares();
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.shares = object.shares ?? "";
    return message;
  },
};

function createBaseMsgWithdrawSharesResponse(): MsgWithdrawSharesResponse {
  return {};
}

export const MsgWithdrawSharesResponse = {
  $type: "flux.fnft.v1beta1.MsgWithdrawSharesResponse" as const,

  encode(_: MsgWithdrawSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawSharesResponse();
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

  fromJSON(_: any): MsgWithdrawSharesResponse {
    return {};
  },

  toJSON(_: MsgWithdrawSharesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawSharesResponse>): MsgWithdrawSharesResponse {
    return MsgWithdrawSharesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgWithdrawSharesResponse>): MsgWithdrawSharesResponse {
    const message = createBaseMsgWithdrawSharesResponse();
    return message;
  },
};

function createBaseMsgSponsor(): MsgSponsor {
  return { sender: "", class_id: "", id: "", coin: "", description: "" };
}

export const MsgSponsor = {
  $type: "flux.fnft.v1beta1.MsgSponsor" as const,

  encode(message: MsgSponsor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.class_id !== "") {
      writer.uint32(18).string(message.class_id);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.coin !== "") {
      writer.uint32(34).string(message.coin);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSponsor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSponsor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.class_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.coin = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSponsor {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      class_id: isSet(object.class_id) ? globalThis.String(object.class_id) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      coin: isSet(object.coin) ? globalThis.String(object.coin) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: MsgSponsor): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.class_id !== "") {
      obj.class_id = message.class_id;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.coin !== "") {
      obj.coin = message.coin;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgSponsor>): MsgSponsor {
    return MsgSponsor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgSponsor>): MsgSponsor {
    const message = createBaseMsgSponsor();
    message.sender = object.sender ?? "";
    message.class_id = object.class_id ?? "";
    message.id = object.id ?? "";
    message.coin = object.coin ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgSponsorResponse(): MsgSponsorResponse {
  return {};
}

export const MsgSponsorResponse = {
  $type: "flux.fnft.v1beta1.MsgSponsorResponse" as const,

  encode(_: MsgSponsorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSponsorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSponsorResponse();
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

  fromJSON(_: any): MsgSponsorResponse {
    return {};
  },

  toJSON(_: MsgSponsorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgSponsorResponse>): MsgSponsorResponse {
    return MsgSponsorResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgSponsorResponse>): MsgSponsorResponse {
    const message = createBaseMsgSponsorResponse();
    return message;
  },
};

/** Msg defines the nft Msg service. */
export interface Msg {
  /** Create defines a method to create a nft from one account. */
  Create(request: DeepPartial<MsgCreate>, metadata?: grpc.Metadata): Promise<MsgCreateResponse>;
  /** PurchaseShares defines a method to purchase shares from a nft. */
  PurchaseShares(request: DeepPartial<MsgPurchaseShares>, metadata?: grpc.Metadata): Promise<MsgPurchaseSharesResponse>;
  /** TransferShares defines a method to TransferShares a nft shares one account to another. */
  TransferShares(request: DeepPartial<MsgTransferShares>, metadata?: grpc.Metadata): Promise<MsgTransferSharesResponse>;
  /** TransferShares defines a method to TransferShares a nft shares one account to another. */
  DepositShares(request: DeepPartial<MsgDepositShares>, metadata?: grpc.Metadata): Promise<MsgDepositSharesResponse>;
  /** TransferShares defines a method to TransferShares a nft shares one account to another. */
  WithdrawShares(request: DeepPartial<MsgWithdrawShares>, metadata?: grpc.Metadata): Promise<MsgWithdrawSharesResponse>;
  /** Sponsor defines a method to sponsor a nft project */
  Sponsor(request: DeepPartial<MsgSponsor>, metadata?: grpc.Metadata): Promise<MsgSponsorResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.PurchaseShares = this.PurchaseShares.bind(this);
    this.TransferShares = this.TransferShares.bind(this);
    this.DepositShares = this.DepositShares.bind(this);
    this.WithdrawShares = this.WithdrawShares.bind(this);
    this.Sponsor = this.Sponsor.bind(this);
  }

  Create(request: DeepPartial<MsgCreate>, metadata?: grpc.Metadata): Promise<MsgCreateResponse> {
    return this.rpc.unary(MsgCreateDesc, MsgCreate.fromPartial(request), metadata);
  }

  PurchaseShares(
    request: DeepPartial<MsgPurchaseShares>,
    metadata?: grpc.Metadata,
  ): Promise<MsgPurchaseSharesResponse> {
    return this.rpc.unary(MsgPurchaseSharesDesc, MsgPurchaseShares.fromPartial(request), metadata);
  }

  TransferShares(
    request: DeepPartial<MsgTransferShares>,
    metadata?: grpc.Metadata,
  ): Promise<MsgTransferSharesResponse> {
    return this.rpc.unary(MsgTransferSharesDesc, MsgTransferShares.fromPartial(request), metadata);
  }

  DepositShares(request: DeepPartial<MsgDepositShares>, metadata?: grpc.Metadata): Promise<MsgDepositSharesResponse> {
    return this.rpc.unary(MsgDepositSharesDesc, MsgDepositShares.fromPartial(request), metadata);
  }

  WithdrawShares(
    request: DeepPartial<MsgWithdrawShares>,
    metadata?: grpc.Metadata,
  ): Promise<MsgWithdrawSharesResponse> {
    return this.rpc.unary(MsgWithdrawSharesDesc, MsgWithdrawShares.fromPartial(request), metadata);
  }

  Sponsor(request: DeepPartial<MsgSponsor>, metadata?: grpc.Metadata): Promise<MsgSponsorResponse> {
    return this.rpc.unary(MsgSponsorDesc, MsgSponsor.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "flux.fnft.v1beta1.Msg" };

export const MsgCreateDesc: UnaryMethodDefinitionish = {
  methodName: "Create",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgCreate.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgCreateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgPurchaseSharesDesc: UnaryMethodDefinitionish = {
  methodName: "PurchaseShares",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgPurchaseShares.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgPurchaseSharesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgTransferSharesDesc: UnaryMethodDefinitionish = {
  methodName: "TransferShares",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgTransferShares.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgTransferSharesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgDepositSharesDesc: UnaryMethodDefinitionish = {
  methodName: "DepositShares",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgDepositShares.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgDepositSharesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgWithdrawSharesDesc: UnaryMethodDefinitionish = {
  methodName: "WithdrawShares",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgWithdrawShares.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgWithdrawSharesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgSponsorDesc: UnaryMethodDefinitionish = {
  methodName: "Sponsor",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgSponsor.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgSponsorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
