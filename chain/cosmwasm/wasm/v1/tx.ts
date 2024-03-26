/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { AccessConfig, Params } from "./types";

/** MsgStoreCode submit Wasm code to the system */
export interface MsgStoreCode {
  /** Sender is the actor that signed the messages */
  sender: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
  /**
   * InstantiatePermission access control to apply on contract creation,
   * optional
   */
  instantiate_permission: AccessConfig | undefined;
}

/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponse {
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
  /** Checksum is the sha256 hash of the stored code */
  checksum: Uint8Array;
}

/**
 * MsgInstantiateContract create a new smart contract instance for the given
 * code id.
 */
export interface MsgInstantiateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
  /** Label is optional metadata to be stored with a contract instance. */
  label: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
}

/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponse {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/**
 * MsgInstantiateContract2 create a new smart contract instance for the given
 * code id with a predicable address.
 */
export interface MsgInstantiateContract2 {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
  /** Label is optional metadata to be stored with a contract instance. */
  label: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on instantiation */
  funds: Coin[];
  /** Salt is an arbitrary value provided by the sender. Size can be 1 to 64. */
  salt: Uint8Array;
  /**
   * FixMsg include the msg value into the hash for the predictable address.
   * Default is false
   */
  fix_msg: boolean;
}

/** MsgInstantiateContract2Response return instantiation result data */
export interface MsgInstantiateContract2Response {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/** MsgExecuteContract submits the given message data to a smart contract */
export interface MsgExecuteContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract */
  msg: Uint8Array;
  /** Funds coins that are transferred to the contract on execution */
  funds: Coin[];
}

/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponse {
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** CodeID references the new WASM code */
  code_id: string;
  /** Msg json encoded message to be passed to the contract on migration */
  msg: Uint8Array;
}

/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponse {
  /**
   * Data contains same raw bytes returned as data from the wasm contract.
   * (May be empty)
   */
  data: Uint8Array;
}

/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** NewAdmin address to be set */
  new_admin: string;
  /** Contract is the address of the smart contract */
  contract: string;
}

/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponse {
}

/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdmin {
  /** Sender is the actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
}

/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponse {
}

/** MsgUpdateInstantiateConfig updates instantiate config for a smart contract */
export interface MsgUpdateInstantiateConfig {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** CodeID references the stored WASM code */
  code_id: string;
  /** NewInstantiatePermission is the new access control */
  new_instantiate_permission: AccessConfig | undefined;
}

/** MsgUpdateInstantiateConfigResponse returns empty data */
export interface MsgUpdateInstantiateConfigResponse {
}

/**
 * MsgUpdateParams is the MsgUpdateParams request type.
 *
 * Since: 0.40
 */
export interface MsgUpdateParams {
  /** Authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/wasm parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: 0.40
 */
export interface MsgUpdateParamsResponse {
}

/**
 * MsgSudoContract is the MsgSudoContract request type.
 *
 * Since: 0.40
 */
export interface MsgSudoContract {
  /** Authority is the address of the governance account. */
  authority: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract as sudo */
  msg: Uint8Array;
}

/**
 * MsgSudoContractResponse defines the response structure for executing a
 * MsgSudoContract message.
 *
 * Since: 0.40
 */
export interface MsgSudoContractResponse {
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/**
 * MsgPinCodes is the MsgPinCodes request type.
 *
 * Since: 0.40
 */
export interface MsgPinCodes {
  /** Authority is the address of the governance account. */
  authority: string;
  /** CodeIDs references the new WASM codes */
  code_ids: string[];
}

/**
 * MsgPinCodesResponse defines the response structure for executing a
 * MsgPinCodes message.
 *
 * Since: 0.40
 */
export interface MsgPinCodesResponse {
}

/**
 * MsgUnpinCodes is the MsgUnpinCodes request type.
 *
 * Since: 0.40
 */
export interface MsgUnpinCodes {
  /** Authority is the address of the governance account. */
  authority: string;
  /** CodeIDs references the WASM codes */
  code_ids: string[];
}

/**
 * MsgUnpinCodesResponse defines the response structure for executing a
 * MsgUnpinCodes message.
 *
 * Since: 0.40
 */
export interface MsgUnpinCodesResponse {
}

/**
 * MsgStoreAndInstantiateContract is the MsgStoreAndInstantiateContract
 * request type.
 *
 * Since: 0.40
 */
export interface MsgStoreAndInstantiateContract {
  /** Authority is the address of the governance account. */
  authority: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiate_permission:
    | AccessConfig
    | undefined;
  /**
   * UnpinCode code on upload, optional. As default the uploaded contract is
   * pinned to cache.
   */
  unpin_code: boolean;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Label is optional metadata to be stored with a constract instance. */
  label: string;
  /** Msg json encoded message to be passed to the contract on instantiation */
  msg: Uint8Array;
  /**
   * Funds coins that are transferred from the authority account to the contract
   * on instantiation
   */
  funds: Coin[];
  /** Source is the URL where the code is hosted */
  source: string;
  /**
   * Builder is the docker image used to build the code deterministically, used
   * for smart contract verification
   */
  builder: string;
  /**
   * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
   * contract verification
   */
  code_hash: Uint8Array;
}

/**
 * MsgStoreAndInstantiateContractResponse defines the response structure
 * for executing a MsgStoreAndInstantiateContract message.
 *
 * Since: 0.40
 */
export interface MsgStoreAndInstantiateContractResponse {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/**
 * MsgAddCodeUploadParamsAddresses is the
 * MsgAddCodeUploadParamsAddresses request type.
 */
export interface MsgAddCodeUploadParamsAddresses {
  /** Authority is the address of the governance account. */
  authority: string;
  addresses: string[];
}

/**
 * MsgAddCodeUploadParamsAddressesResponse defines the response
 * structure for executing a MsgAddCodeUploadParamsAddresses message.
 */
export interface MsgAddCodeUploadParamsAddressesResponse {
}

/**
 * MsgRemoveCodeUploadParamsAddresses is the
 * MsgRemoveCodeUploadParamsAddresses request type.
 */
export interface MsgRemoveCodeUploadParamsAddresses {
  /** Authority is the address of the governance account. */
  authority: string;
  addresses: string[];
}

/**
 * MsgRemoveCodeUploadParamsAddressesResponse defines the response
 * structure for executing a MsgRemoveCodeUploadParamsAddresses message.
 */
export interface MsgRemoveCodeUploadParamsAddressesResponse {
}

/**
 * MsgStoreAndMigrateContract is the MsgStoreAndMigrateContract
 * request type.
 *
 * Since: 0.42
 */
export interface MsgStoreAndMigrateContract {
  /** Authority is the address of the governance account. */
  authority: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
  /** InstantiatePermission to apply on contract creation, optional */
  instantiate_permission:
    | AccessConfig
    | undefined;
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg json encoded message to be passed to the contract on migration */
  msg: Uint8Array;
}

/**
 * MsgStoreAndMigrateContractResponse defines the response structure
 * for executing a MsgStoreAndMigrateContract message.
 *
 * Since: 0.42
 */
export interface MsgStoreAndMigrateContractResponse {
  /** CodeID is the reference to the stored WASM code */
  code_id: string;
  /** Checksum is the sha256 hash of the stored code */
  checksum: Uint8Array;
  /** Data contains bytes to returned from the contract */
  data: Uint8Array;
}

/** MsgUpdateContractLabel sets a new label for a smart contract */
export interface MsgUpdateContractLabel {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** NewLabel string to be set */
  new_label: string;
  /** Contract is the address of the smart contract */
  contract: string;
}

/** MsgUpdateContractLabelResponse returns empty data */
export interface MsgUpdateContractLabelResponse {
}

function createBaseMsgStoreCode(): MsgStoreCode {
  return { sender: "", wasm_byte_code: new Uint8Array(0), instantiate_permission: undefined };
}

export const MsgStoreCode = {
  $type: "cosmwasm.wasm.v1.MsgStoreCode" as const,

  encode(message: MsgStoreCode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(18).bytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      AccessConfig.encode(message.instantiate_permission, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCode();
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

          message.wasm_byte_code = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.instantiate_permission = AccessConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCode {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      wasm_byte_code: isSet(object.wasm_byte_code) ? bytesFromBase64(object.wasm_byte_code) : new Uint8Array(0),
      instantiate_permission: isSet(object.instantiate_permission)
        ? AccessConfig.fromJSON(object.instantiate_permission)
        : undefined,
    };
  },

  toJSON(message: MsgStoreCode): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.wasm_byte_code !== undefined) {
      obj.wasm_byte_code = base64FromBytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      obj.instantiate_permission = AccessConfig.toJSON(message.instantiate_permission);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreCode>): MsgStoreCode {
    return MsgStoreCode.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreCode>): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    message.sender = object.sender ?? "";
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array(0);
    message.instantiate_permission =
      (object.instantiate_permission !== undefined && object.instantiate_permission !== null)
        ? AccessConfig.fromPartial(object.instantiate_permission)
        : undefined;
    return message;
  },
};

function createBaseMsgStoreCodeResponse(): MsgStoreCodeResponse {
  return { code_id: "0", checksum: new Uint8Array(0) };
}

export const MsgStoreCodeResponse = {
  $type: "cosmwasm.wasm.v1.MsgStoreCodeResponse" as const,

  encode(message: MsgStoreCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(18).bytes(message.checksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.checksum = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCodeResponse {
    return {
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreCodeResponse): unknown {
    const obj: any = {};
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.checksum !== undefined) {
      obj.checksum = base64FromBytes(message.checksum);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    return MsgStoreCodeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    message.code_id = object.code_id ?? "0";
    message.checksum = object.checksum ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgInstantiateContract(): MsgInstantiateContract {
  return { sender: "", admin: "", code_id: "0", label: "", msg: new Uint8Array(0), funds: [] };
}

export const MsgInstantiateContract = {
  $type: "cosmwasm.wasm.v1.MsgInstantiateContract" as const,

  encode(message: MsgInstantiateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    if (message.code_id !== "0") {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(42).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContract();
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

          message.admin = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.label = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.msg = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.funds.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInstantiateContract {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
      funds: globalThis.Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgInstantiateContract): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.admin !== undefined) {
      obj.admin = message.admin;
    }
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    if (message.funds?.length) {
      obj.funds = message.funds.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MsgInstantiateContract>): MsgInstantiateContract {
    return MsgInstantiateContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgInstantiateContract>): MsgInstantiateContract {
    const message = createBaseMsgInstantiateContract();
    message.sender = object.sender ?? "";
    message.admin = object.admin ?? "";
    message.code_id = object.code_id ?? "0";
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgInstantiateContractResponse(): MsgInstantiateContractResponse {
  return { address: "", data: new Uint8Array(0) };
}

export const MsgInstantiateContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgInstantiateContractResponse" as const,

  encode(message: MsgInstantiateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInstantiateContractResponse {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgInstantiateContractResponse): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgInstantiateContractResponse>): MsgInstantiateContractResponse {
    return MsgInstantiateContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgInstantiateContractResponse>): MsgInstantiateContractResponse {
    const message = createBaseMsgInstantiateContractResponse();
    message.address = object.address ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgInstantiateContract2(): MsgInstantiateContract2 {
  return {
    sender: "",
    admin: "",
    code_id: "0",
    label: "",
    msg: new Uint8Array(0),
    funds: [],
    salt: new Uint8Array(0),
    fix_msg: false,
  };
}

export const MsgInstantiateContract2 = {
  $type: "cosmwasm.wasm.v1.MsgInstantiateContract2" as const,

  encode(message: MsgInstantiateContract2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    if (message.code_id !== "0") {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(42).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.salt.length !== 0) {
      writer.uint32(58).bytes(message.salt);
    }
    if (message.fix_msg === true) {
      writer.uint32(64).bool(message.fix_msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContract2();
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

          message.admin = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.label = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.msg = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.funds.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.salt = reader.bytes();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.fix_msg = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInstantiateContract2 {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
      funds: globalThis.Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
      salt: isSet(object.salt) ? bytesFromBase64(object.salt) : new Uint8Array(0),
      fix_msg: isSet(object.fix_msg) ? globalThis.Boolean(object.fix_msg) : false,
    };
  },

  toJSON(message: MsgInstantiateContract2): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.admin !== undefined) {
      obj.admin = message.admin;
    }
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    if (message.funds?.length) {
      obj.funds = message.funds.map((e) => Coin.toJSON(e));
    }
    if (message.salt !== undefined) {
      obj.salt = base64FromBytes(message.salt);
    }
    if (message.fix_msg !== undefined) {
      obj.fix_msg = message.fix_msg;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgInstantiateContract2>): MsgInstantiateContract2 {
    return MsgInstantiateContract2.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgInstantiateContract2>): MsgInstantiateContract2 {
    const message = createBaseMsgInstantiateContract2();
    message.sender = object.sender ?? "";
    message.admin = object.admin ?? "";
    message.code_id = object.code_id ?? "0";
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
    message.salt = object.salt ?? new Uint8Array(0);
    message.fix_msg = object.fix_msg ?? false;
    return message;
  },
};

function createBaseMsgInstantiateContract2Response(): MsgInstantiateContract2Response {
  return { address: "", data: new Uint8Array(0) };
}

export const MsgInstantiateContract2Response = {
  $type: "cosmwasm.wasm.v1.MsgInstantiateContract2Response" as const,

  encode(message: MsgInstantiateContract2Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract2Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContract2Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInstantiateContract2Response {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgInstantiateContract2Response): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgInstantiateContract2Response>): MsgInstantiateContract2Response {
    return MsgInstantiateContract2Response.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgInstantiateContract2Response>): MsgInstantiateContract2Response {
    const message = createBaseMsgInstantiateContract2Response();
    message.address = object.address ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgExecuteContract(): MsgExecuteContract {
  return { sender: "", contract: "", msg: new Uint8Array(0), funds: [] };
}

export const MsgExecuteContract = {
  $type: "cosmwasm.wasm.v1.MsgExecuteContract" as const,

  encode(message: MsgExecuteContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(18).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(26).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContract();
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

          message.contract = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msg = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.funds.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteContract {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
      funds: globalThis.Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgExecuteContract): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    if (message.funds?.length) {
      obj.funds = message.funds.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExecuteContract>): MsgExecuteContract {
    return MsgExecuteContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExecuteContract>): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgExecuteContractResponse(): MsgExecuteContractResponse {
  return { data: new Uint8Array(0) };
}

export const MsgExecuteContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgExecuteContractResponse" as const,

  encode(message: MsgExecuteContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteContractResponse {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: MsgExecuteContractResponse): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExecuteContractResponse>): MsgExecuteContractResponse {
    return MsgExecuteContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExecuteContractResponse>): MsgExecuteContractResponse {
    const message = createBaseMsgExecuteContractResponse();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgMigrateContract(): MsgMigrateContract {
  return { sender: "", contract: "", code_id: "0", msg: new Uint8Array(0) };
}

export const MsgMigrateContract = {
  $type: "cosmwasm.wasm.v1.MsgMigrateContract" as const,

  encode(message: MsgMigrateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(18).string(message.contract);
    }
    if (message.code_id !== "0") {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContract();
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

          message.contract = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.msg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMigrateContract {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgMigrateContract): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgMigrateContract>): MsgMigrateContract {
    return MsgMigrateContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgMigrateContract>): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.code_id = object.code_id ?? "0";
    message.msg = object.msg ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgMigrateContractResponse(): MsgMigrateContractResponse {
  return { data: new Uint8Array(0) };
}

export const MsgMigrateContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgMigrateContractResponse" as const,

  encode(message: MsgMigrateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMigrateContractResponse {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: MsgMigrateContractResponse): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgMigrateContractResponse>): MsgMigrateContractResponse {
    return MsgMigrateContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgMigrateContractResponse>): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgUpdateAdmin(): MsgUpdateAdmin {
  return { sender: "", new_admin: "", contract: "" };
}

export const MsgUpdateAdmin = {
  $type: "cosmwasm.wasm.v1.MsgUpdateAdmin" as const,

  encode(message: MsgUpdateAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.new_admin !== "") {
      writer.uint32(18).string(message.new_admin);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAdmin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdmin();
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

          message.new_admin = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contract = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateAdmin {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      new_admin: isSet(object.new_admin) ? globalThis.String(object.new_admin) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
    };
  },

  toJSON(message: MsgUpdateAdmin): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.new_admin !== undefined) {
      obj.new_admin = message.new_admin;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateAdmin>): MsgUpdateAdmin {
    return MsgUpdateAdmin.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUpdateAdmin>): MsgUpdateAdmin {
    const message = createBaseMsgUpdateAdmin();
    message.sender = object.sender ?? "";
    message.new_admin = object.new_admin ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
};

function createBaseMsgUpdateAdminResponse(): MsgUpdateAdminResponse {
  return {};
}

export const MsgUpdateAdminResponse = {
  $type: "cosmwasm.wasm.v1.MsgUpdateAdminResponse" as const,

  encode(_: MsgUpdateAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdminResponse();
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

  fromJSON(_: any): MsgUpdateAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateAdminResponse>): MsgUpdateAdminResponse {
    return MsgUpdateAdminResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUpdateAdminResponse>): MsgUpdateAdminResponse {
    const message = createBaseMsgUpdateAdminResponse();
    return message;
  },
};

function createBaseMsgClearAdmin(): MsgClearAdmin {
  return { sender: "", contract: "" };
}

export const MsgClearAdmin = {
  $type: "cosmwasm.wasm.v1.MsgClearAdmin" as const,

  encode(message: MsgClearAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClearAdmin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contract = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClearAdmin {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
    };
  },

  toJSON(message: MsgClearAdmin): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgClearAdmin>): MsgClearAdmin {
    return MsgClearAdmin.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgClearAdmin>): MsgClearAdmin {
    const message = createBaseMsgClearAdmin();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
};

function createBaseMsgClearAdminResponse(): MsgClearAdminResponse {
  return {};
}

export const MsgClearAdminResponse = {
  $type: "cosmwasm.wasm.v1.MsgClearAdminResponse" as const,

  encode(_: MsgClearAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClearAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdminResponse();
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

  fromJSON(_: any): MsgClearAdminResponse {
    return {};
  },

  toJSON(_: MsgClearAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgClearAdminResponse>): MsgClearAdminResponse {
    return MsgClearAdminResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgClearAdminResponse>): MsgClearAdminResponse {
    const message = createBaseMsgClearAdminResponse();
    return message;
  },
};

function createBaseMsgUpdateInstantiateConfig(): MsgUpdateInstantiateConfig {
  return { sender: "", code_id: "0", new_instantiate_permission: undefined };
}

export const MsgUpdateInstantiateConfig = {
  $type: "cosmwasm.wasm.v1.MsgUpdateInstantiateConfig" as const,

  encode(message: MsgUpdateInstantiateConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.code_id !== "0") {
      writer.uint32(16).uint64(message.code_id);
    }
    if (message.new_instantiate_permission !== undefined) {
      AccessConfig.encode(message.new_instantiate_permission, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInstantiateConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInstantiateConfig();
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
          if (tag !== 16) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.new_instantiate_permission = AccessConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateInstantiateConfig {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      new_instantiate_permission: isSet(object.new_instantiate_permission)
        ? AccessConfig.fromJSON(object.new_instantiate_permission)
        : undefined,
    };
  },

  toJSON(message: MsgUpdateInstantiateConfig): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.new_instantiate_permission !== undefined) {
      obj.new_instantiate_permission = AccessConfig.toJSON(message.new_instantiate_permission);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateInstantiateConfig>): MsgUpdateInstantiateConfig {
    return MsgUpdateInstantiateConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUpdateInstantiateConfig>): MsgUpdateInstantiateConfig {
    const message = createBaseMsgUpdateInstantiateConfig();
    message.sender = object.sender ?? "";
    message.code_id = object.code_id ?? "0";
    message.new_instantiate_permission =
      (object.new_instantiate_permission !== undefined && object.new_instantiate_permission !== null)
        ? AccessConfig.fromPartial(object.new_instantiate_permission)
        : undefined;
    return message;
  },
};

function createBaseMsgUpdateInstantiateConfigResponse(): MsgUpdateInstantiateConfigResponse {
  return {};
}

export const MsgUpdateInstantiateConfigResponse = {
  $type: "cosmwasm.wasm.v1.MsgUpdateInstantiateConfigResponse" as const,

  encode(_: MsgUpdateInstantiateConfigResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInstantiateConfigResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInstantiateConfigResponse();
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

  fromJSON(_: any): MsgUpdateInstantiateConfigResponse {
    return {};
  },

  toJSON(_: MsgUpdateInstantiateConfigResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateInstantiateConfigResponse>): MsgUpdateInstantiateConfigResponse {
    return MsgUpdateInstantiateConfigResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUpdateInstantiateConfigResponse>): MsgUpdateInstantiateConfigResponse {
    const message = createBaseMsgUpdateInstantiateConfigResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  $type: "cosmwasm.wasm.v1.MsgUpdateParams" as const,

  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  $type: "cosmwasm.wasm.v1.MsgUpdateParamsResponse" as const,

  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgSudoContract(): MsgSudoContract {
  return { authority: "", contract: "", msg: new Uint8Array(0) };
}

export const MsgSudoContract = {
  $type: "cosmwasm.wasm.v1.MsgSudoContract" as const,

  encode(message: MsgSudoContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.contract !== "") {
      writer.uint32(18).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(26).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSudoContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSudoContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contract = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.msg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSudoContract {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgSudoContract): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgSudoContract>): MsgSudoContract {
    return MsgSudoContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgSudoContract>): MsgSudoContract {
    const message = createBaseMsgSudoContract();
    message.authority = object.authority ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgSudoContractResponse(): MsgSudoContractResponse {
  return { data: new Uint8Array(0) };
}

export const MsgSudoContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgSudoContractResponse" as const,

  encode(message: MsgSudoContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSudoContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSudoContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSudoContractResponse {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: MsgSudoContractResponse): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgSudoContractResponse>): MsgSudoContractResponse {
    return MsgSudoContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgSudoContractResponse>): MsgSudoContractResponse {
    const message = createBaseMsgSudoContractResponse();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgPinCodes(): MsgPinCodes {
  return { authority: "", code_ids: [] };
}

export const MsgPinCodes = {
  $type: "cosmwasm.wasm.v1.MsgPinCodes" as const,

  encode(message: MsgPinCodes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    writer.uint32(18).fork();
    for (const v of message.code_ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPinCodes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPinCodes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.code_ids.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.code_ids.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgPinCodes {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      code_ids: globalThis.Array.isArray(object?.code_ids) ? object.code_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MsgPinCodes): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.code_ids?.length) {
      obj.code_ids = message.code_ids;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgPinCodes>): MsgPinCodes {
    return MsgPinCodes.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgPinCodes>): MsgPinCodes {
    const message = createBaseMsgPinCodes();
    message.authority = object.authority ?? "";
    message.code_ids = object.code_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgPinCodesResponse(): MsgPinCodesResponse {
  return {};
}

export const MsgPinCodesResponse = {
  $type: "cosmwasm.wasm.v1.MsgPinCodesResponse" as const,

  encode(_: MsgPinCodesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPinCodesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPinCodesResponse();
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

  fromJSON(_: any): MsgPinCodesResponse {
    return {};
  },

  toJSON(_: MsgPinCodesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgPinCodesResponse>): MsgPinCodesResponse {
    return MsgPinCodesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgPinCodesResponse>): MsgPinCodesResponse {
    const message = createBaseMsgPinCodesResponse();
    return message;
  },
};

function createBaseMsgUnpinCodes(): MsgUnpinCodes {
  return { authority: "", code_ids: [] };
}

export const MsgUnpinCodes = {
  $type: "cosmwasm.wasm.v1.MsgUnpinCodes" as const,

  encode(message: MsgUnpinCodes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    writer.uint32(18).fork();
    for (const v of message.code_ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnpinCodes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpinCodes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.code_ids.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.code_ids.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnpinCodes {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      code_ids: globalThis.Array.isArray(object?.code_ids) ? object.code_ids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MsgUnpinCodes): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.code_ids?.length) {
      obj.code_ids = message.code_ids;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUnpinCodes>): MsgUnpinCodes {
    return MsgUnpinCodes.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUnpinCodes>): MsgUnpinCodes {
    const message = createBaseMsgUnpinCodes();
    message.authority = object.authority ?? "";
    message.code_ids = object.code_ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgUnpinCodesResponse(): MsgUnpinCodesResponse {
  return {};
}

export const MsgUnpinCodesResponse = {
  $type: "cosmwasm.wasm.v1.MsgUnpinCodesResponse" as const,

  encode(_: MsgUnpinCodesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnpinCodesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpinCodesResponse();
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

  fromJSON(_: any): MsgUnpinCodesResponse {
    return {};
  },

  toJSON(_: MsgUnpinCodesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUnpinCodesResponse>): MsgUnpinCodesResponse {
    return MsgUnpinCodesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUnpinCodesResponse>): MsgUnpinCodesResponse {
    const message = createBaseMsgUnpinCodesResponse();
    return message;
  },
};

function createBaseMsgStoreAndInstantiateContract(): MsgStoreAndInstantiateContract {
  return {
    authority: "",
    wasm_byte_code: new Uint8Array(0),
    instantiate_permission: undefined,
    unpin_code: false,
    admin: "",
    label: "",
    msg: new Uint8Array(0),
    funds: [],
    source: "",
    builder: "",
    code_hash: new Uint8Array(0),
  };
}

export const MsgStoreAndInstantiateContract = {
  $type: "cosmwasm.wasm.v1.MsgStoreAndInstantiateContract" as const,

  encode(message: MsgStoreAndInstantiateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(26).bytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      AccessConfig.encode(message.instantiate_permission, writer.uint32(34).fork()).ldelim();
    }
    if (message.unpin_code === true) {
      writer.uint32(40).bool(message.unpin_code);
    }
    if (message.admin !== "") {
      writer.uint32(50).string(message.admin);
    }
    if (message.label !== "") {
      writer.uint32(58).string(message.label);
    }
    if (message.msg.length !== 0) {
      writer.uint32(66).bytes(message.msg);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.source !== "") {
      writer.uint32(82).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(90).string(message.builder);
    }
    if (message.code_hash.length !== 0) {
      writer.uint32(98).bytes(message.code_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndInstantiateContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreAndInstantiateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.wasm_byte_code = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instantiate_permission = AccessConfig.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.unpin_code = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.label = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.msg = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.funds.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.source = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.builder = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.code_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreAndInstantiateContract {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      wasm_byte_code: isSet(object.wasm_byte_code) ? bytesFromBase64(object.wasm_byte_code) : new Uint8Array(0),
      instantiate_permission: isSet(object.instantiate_permission)
        ? AccessConfig.fromJSON(object.instantiate_permission)
        : undefined,
      unpin_code: isSet(object.unpin_code) ? globalThis.Boolean(object.unpin_code) : false,
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      label: isSet(object.label) ? globalThis.String(object.label) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
      funds: globalThis.Array.isArray(object?.funds) ? object.funds.map((e: any) => Coin.fromJSON(e)) : [],
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      builder: isSet(object.builder) ? globalThis.String(object.builder) : "",
      code_hash: isSet(object.code_hash) ? bytesFromBase64(object.code_hash) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreAndInstantiateContract): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.wasm_byte_code !== undefined) {
      obj.wasm_byte_code = base64FromBytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      obj.instantiate_permission = AccessConfig.toJSON(message.instantiate_permission);
    }
    if (message.unpin_code !== undefined) {
      obj.unpin_code = message.unpin_code;
    }
    if (message.admin !== undefined) {
      obj.admin = message.admin;
    }
    if (message.label !== undefined) {
      obj.label = message.label;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    if (message.funds?.length) {
      obj.funds = message.funds.map((e) => Coin.toJSON(e));
    }
    if (message.source !== undefined) {
      obj.source = message.source;
    }
    if (message.builder !== undefined) {
      obj.builder = message.builder;
    }
    if (message.code_hash !== undefined) {
      obj.code_hash = base64FromBytes(message.code_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreAndInstantiateContract>): MsgStoreAndInstantiateContract {
    return MsgStoreAndInstantiateContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreAndInstantiateContract>): MsgStoreAndInstantiateContract {
    const message = createBaseMsgStoreAndInstantiateContract();
    message.authority = object.authority ?? "";
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array(0);
    message.instantiate_permission =
      (object.instantiate_permission !== undefined && object.instantiate_permission !== null)
        ? AccessConfig.fromPartial(object.instantiate_permission)
        : undefined;
    message.unpin_code = object.unpin_code ?? false;
    message.admin = object.admin ?? "";
    message.label = object.label ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    message.code_hash = object.code_hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgStoreAndInstantiateContractResponse(): MsgStoreAndInstantiateContractResponse {
  return { address: "", data: new Uint8Array(0) };
}

export const MsgStoreAndInstantiateContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgStoreAndInstantiateContractResponse" as const,

  encode(message: MsgStoreAndInstantiateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndInstantiateContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreAndInstantiateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreAndInstantiateContractResponse {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreAndInstantiateContractResponse): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreAndInstantiateContractResponse>): MsgStoreAndInstantiateContractResponse {
    return MsgStoreAndInstantiateContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreAndInstantiateContractResponse>): MsgStoreAndInstantiateContractResponse {
    const message = createBaseMsgStoreAndInstantiateContractResponse();
    message.address = object.address ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgAddCodeUploadParamsAddresses(): MsgAddCodeUploadParamsAddresses {
  return { authority: "", addresses: [] };
}

export const MsgAddCodeUploadParamsAddresses = {
  $type: "cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddresses" as const,

  encode(message: MsgAddCodeUploadParamsAddresses, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.addresses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddCodeUploadParamsAddresses {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCodeUploadParamsAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddCodeUploadParamsAddresses {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: MsgAddCodeUploadParamsAddresses): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgAddCodeUploadParamsAddresses>): MsgAddCodeUploadParamsAddresses {
    return MsgAddCodeUploadParamsAddresses.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgAddCodeUploadParamsAddresses>): MsgAddCodeUploadParamsAddresses {
    const message = createBaseMsgAddCodeUploadParamsAddresses();
    message.authority = object.authority ?? "";
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAddCodeUploadParamsAddressesResponse(): MsgAddCodeUploadParamsAddressesResponse {
  return {};
}

export const MsgAddCodeUploadParamsAddressesResponse = {
  $type: "cosmwasm.wasm.v1.MsgAddCodeUploadParamsAddressesResponse" as const,

  encode(_: MsgAddCodeUploadParamsAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddCodeUploadParamsAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddCodeUploadParamsAddressesResponse();
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

  fromJSON(_: any): MsgAddCodeUploadParamsAddressesResponse {
    return {};
  },

  toJSON(_: MsgAddCodeUploadParamsAddressesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgAddCodeUploadParamsAddressesResponse>): MsgAddCodeUploadParamsAddressesResponse {
    return MsgAddCodeUploadParamsAddressesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgAddCodeUploadParamsAddressesResponse>): MsgAddCodeUploadParamsAddressesResponse {
    const message = createBaseMsgAddCodeUploadParamsAddressesResponse();
    return message;
  },
};

function createBaseMsgRemoveCodeUploadParamsAddresses(): MsgRemoveCodeUploadParamsAddresses {
  return { authority: "", addresses: [] };
}

export const MsgRemoveCodeUploadParamsAddresses = {
  $type: "cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddresses" as const,

  encode(message: MsgRemoveCodeUploadParamsAddresses, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.addresses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveCodeUploadParamsAddresses {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveCodeUploadParamsAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveCodeUploadParamsAddresses {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: MsgRemoveCodeUploadParamsAddresses): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgRemoveCodeUploadParamsAddresses>): MsgRemoveCodeUploadParamsAddresses {
    return MsgRemoveCodeUploadParamsAddresses.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgRemoveCodeUploadParamsAddresses>): MsgRemoveCodeUploadParamsAddresses {
    const message = createBaseMsgRemoveCodeUploadParamsAddresses();
    message.authority = object.authority ?? "";
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgRemoveCodeUploadParamsAddressesResponse(): MsgRemoveCodeUploadParamsAddressesResponse {
  return {};
}

export const MsgRemoveCodeUploadParamsAddressesResponse = {
  $type: "cosmwasm.wasm.v1.MsgRemoveCodeUploadParamsAddressesResponse" as const,

  encode(_: MsgRemoveCodeUploadParamsAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveCodeUploadParamsAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveCodeUploadParamsAddressesResponse();
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

  fromJSON(_: any): MsgRemoveCodeUploadParamsAddressesResponse {
    return {};
  },

  toJSON(_: MsgRemoveCodeUploadParamsAddressesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgRemoveCodeUploadParamsAddressesResponse>): MsgRemoveCodeUploadParamsAddressesResponse {
    return MsgRemoveCodeUploadParamsAddressesResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgRemoveCodeUploadParamsAddressesResponse>): MsgRemoveCodeUploadParamsAddressesResponse {
    const message = createBaseMsgRemoveCodeUploadParamsAddressesResponse();
    return message;
  },
};

function createBaseMsgStoreAndMigrateContract(): MsgStoreAndMigrateContract {
  return {
    authority: "",
    wasm_byte_code: new Uint8Array(0),
    instantiate_permission: undefined,
    contract: "",
    msg: new Uint8Array(0),
  };
}

export const MsgStoreAndMigrateContract = {
  $type: "cosmwasm.wasm.v1.MsgStoreAndMigrateContract" as const,

  encode(message: MsgStoreAndMigrateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(18).bytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      AccessConfig.encode(message.instantiate_permission, writer.uint32(26).fork()).ldelim();
    }
    if (message.contract !== "") {
      writer.uint32(34).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(42).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndMigrateContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreAndMigrateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.wasm_byte_code = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.instantiate_permission = AccessConfig.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contract = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.msg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreAndMigrateContract {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      wasm_byte_code: isSet(object.wasm_byte_code) ? bytesFromBase64(object.wasm_byte_code) : new Uint8Array(0),
      instantiate_permission: isSet(object.instantiate_permission)
        ? AccessConfig.fromJSON(object.instantiate_permission)
        : undefined,
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreAndMigrateContract): unknown {
    const obj: any = {};
    if (message.authority !== undefined) {
      obj.authority = message.authority;
    }
    if (message.wasm_byte_code !== undefined) {
      obj.wasm_byte_code = base64FromBytes(message.wasm_byte_code);
    }
    if (message.instantiate_permission !== undefined) {
      obj.instantiate_permission = AccessConfig.toJSON(message.instantiate_permission);
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    if (message.msg !== undefined) {
      obj.msg = base64FromBytes(message.msg);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreAndMigrateContract>): MsgStoreAndMigrateContract {
    return MsgStoreAndMigrateContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreAndMigrateContract>): MsgStoreAndMigrateContract {
    const message = createBaseMsgStoreAndMigrateContract();
    message.authority = object.authority ?? "";
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array(0);
    message.instantiate_permission =
      (object.instantiate_permission !== undefined && object.instantiate_permission !== null)
        ? AccessConfig.fromPartial(object.instantiate_permission)
        : undefined;
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgStoreAndMigrateContractResponse(): MsgStoreAndMigrateContractResponse {
  return { code_id: "0", checksum: new Uint8Array(0), data: new Uint8Array(0) };
}

export const MsgStoreAndMigrateContractResponse = {
  $type: "cosmwasm.wasm.v1.MsgStoreAndMigrateContractResponse" as const,

  encode(message: MsgStoreAndMigrateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code_id !== "0") {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(18).bytes(message.checksum);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndMigrateContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreAndMigrateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code_id = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.checksum = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreAndMigrateContractResponse {
    return {
      code_id: isSet(object.code_id) ? globalThis.String(object.code_id) : "0",
      checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreAndMigrateContractResponse): unknown {
    const obj: any = {};
    if (message.code_id !== undefined) {
      obj.code_id = message.code_id;
    }
    if (message.checksum !== undefined) {
      obj.checksum = base64FromBytes(message.checksum);
    }
    if (message.data !== undefined) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreAndMigrateContractResponse>): MsgStoreAndMigrateContractResponse {
    return MsgStoreAndMigrateContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreAndMigrateContractResponse>): MsgStoreAndMigrateContractResponse {
    const message = createBaseMsgStoreAndMigrateContractResponse();
    message.code_id = object.code_id ?? "0";
    message.checksum = object.checksum ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgUpdateContractLabel(): MsgUpdateContractLabel {
  return { sender: "", new_label: "", contract: "" };
}

export const MsgUpdateContractLabel = {
  $type: "cosmwasm.wasm.v1.MsgUpdateContractLabel" as const,

  encode(message: MsgUpdateContractLabel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.new_label !== "") {
      writer.uint32(18).string(message.new_label);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateContractLabel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateContractLabel();
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

          message.new_label = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contract = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateContractLabel {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      new_label: isSet(object.new_label) ? globalThis.String(object.new_label) : "",
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
    };
  },

  toJSON(message: MsgUpdateContractLabel): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.new_label !== undefined) {
      obj.new_label = message.new_label;
    }
    if (message.contract !== undefined) {
      obj.contract = message.contract;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateContractLabel>): MsgUpdateContractLabel {
    return MsgUpdateContractLabel.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUpdateContractLabel>): MsgUpdateContractLabel {
    const message = createBaseMsgUpdateContractLabel();
    message.sender = object.sender ?? "";
    message.new_label = object.new_label ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
};

function createBaseMsgUpdateContractLabelResponse(): MsgUpdateContractLabelResponse {
  return {};
}

export const MsgUpdateContractLabelResponse = {
  $type: "cosmwasm.wasm.v1.MsgUpdateContractLabelResponse" as const,

  encode(_: MsgUpdateContractLabelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateContractLabelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateContractLabelResponse();
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

  fromJSON(_: any): MsgUpdateContractLabelResponse {
    return {};
  },

  toJSON(_: MsgUpdateContractLabelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUpdateContractLabelResponse>): MsgUpdateContractLabelResponse {
    return MsgUpdateContractLabelResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUpdateContractLabelResponse>): MsgUpdateContractLabelResponse {
    const message = createBaseMsgUpdateContractLabelResponse();
    return message;
  },
};

/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  StoreCode(request: DeepPartial<MsgStoreCode>, metadata?: grpc.Metadata): Promise<MsgStoreCodeResponse>;
  /**
   * InstantiateContract creates a new smart contract instance for the given
   *  code id.
   */
  InstantiateContract(
    request: DeepPartial<MsgInstantiateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgInstantiateContractResponse>;
  /**
   * InstantiateContract2 creates a new smart contract instance for the given
   *  code id with a predictable address
   */
  InstantiateContract2(
    request: DeepPartial<MsgInstantiateContract2>,
    metadata?: grpc.Metadata,
  ): Promise<MsgInstantiateContract2Response>;
  /** Execute submits the given message data to a smart contract */
  ExecuteContract(
    request: DeepPartial<MsgExecuteContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecuteContractResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  MigrateContract(
    request: DeepPartial<MsgMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgMigrateContractResponse>;
  /** UpdateAdmin sets a new admin for a smart contract */
  UpdateAdmin(request: DeepPartial<MsgUpdateAdmin>, metadata?: grpc.Metadata): Promise<MsgUpdateAdminResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  ClearAdmin(request: DeepPartial<MsgClearAdmin>, metadata?: grpc.Metadata): Promise<MsgClearAdminResponse>;
  /** UpdateInstantiateConfig updates instantiate config for a smart contract */
  UpdateInstantiateConfig(
    request: DeepPartial<MsgUpdateInstantiateConfig>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUpdateInstantiateConfigResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/wasm
   * module parameters. The authority is defined in the keeper.
   *
   * Since: 0.40
   */
  UpdateParams(request: DeepPartial<MsgUpdateParams>, metadata?: grpc.Metadata): Promise<MsgUpdateParamsResponse>;
  /**
   * SudoContract defines a governance operation for calling sudo
   * on a contract. The authority is defined in the keeper.
   *
   * Since: 0.40
   */
  SudoContract(request: DeepPartial<MsgSudoContract>, metadata?: grpc.Metadata): Promise<MsgSudoContractResponse>;
  /**
   * PinCodes defines a governance operation for pinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   *
   * Since: 0.40
   */
  PinCodes(request: DeepPartial<MsgPinCodes>, metadata?: grpc.Metadata): Promise<MsgPinCodesResponse>;
  /**
   * UnpinCodes defines a governance operation for unpinning a set of
   * code ids in the wasmvm cache. The authority is defined in the keeper.
   *
   * Since: 0.40
   */
  UnpinCodes(request: DeepPartial<MsgUnpinCodes>, metadata?: grpc.Metadata): Promise<MsgUnpinCodesResponse>;
  /**
   * StoreAndInstantiateContract defines a governance operation for storing
   * and instantiating the contract. The authority is defined in the keeper.
   *
   * Since: 0.40
   */
  StoreAndInstantiateContract(
    request: DeepPartial<MsgStoreAndInstantiateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgStoreAndInstantiateContractResponse>;
  /**
   * RemoveCodeUploadParamsAddresses defines a governance operation for
   * removing addresses from code upload params.
   * The authority is defined in the keeper.
   */
  RemoveCodeUploadParamsAddresses(
    request: DeepPartial<MsgRemoveCodeUploadParamsAddresses>,
    metadata?: grpc.Metadata,
  ): Promise<MsgRemoveCodeUploadParamsAddressesResponse>;
  /**
   * AddCodeUploadParamsAddresses defines a governance operation for
   * adding addresses to code upload params.
   * The authority is defined in the keeper.
   */
  AddCodeUploadParamsAddresses(
    request: DeepPartial<MsgAddCodeUploadParamsAddresses>,
    metadata?: grpc.Metadata,
  ): Promise<MsgAddCodeUploadParamsAddressesResponse>;
  /**
   * StoreAndMigrateContract defines a governance operation for storing
   * and migrating the contract. The authority is defined in the keeper.
   *
   * Since: 0.42
   */
  StoreAndMigrateContract(
    request: DeepPartial<MsgStoreAndMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgStoreAndMigrateContractResponse>;
  /**
   * UpdateContractLabel sets a new label for a smart contract
   *
   * Since: 0.43
   */
  UpdateContractLabel(
    request: DeepPartial<MsgUpdateContractLabel>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUpdateContractLabelResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreCode = this.StoreCode.bind(this);
    this.InstantiateContract = this.InstantiateContract.bind(this);
    this.InstantiateContract2 = this.InstantiateContract2.bind(this);
    this.ExecuteContract = this.ExecuteContract.bind(this);
    this.MigrateContract = this.MigrateContract.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.ClearAdmin = this.ClearAdmin.bind(this);
    this.UpdateInstantiateConfig = this.UpdateInstantiateConfig.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.SudoContract = this.SudoContract.bind(this);
    this.PinCodes = this.PinCodes.bind(this);
    this.UnpinCodes = this.UnpinCodes.bind(this);
    this.StoreAndInstantiateContract = this.StoreAndInstantiateContract.bind(this);
    this.RemoveCodeUploadParamsAddresses = this.RemoveCodeUploadParamsAddresses.bind(this);
    this.AddCodeUploadParamsAddresses = this.AddCodeUploadParamsAddresses.bind(this);
    this.StoreAndMigrateContract = this.StoreAndMigrateContract.bind(this);
    this.UpdateContractLabel = this.UpdateContractLabel.bind(this);
  }

  StoreCode(request: DeepPartial<MsgStoreCode>, metadata?: grpc.Metadata): Promise<MsgStoreCodeResponse> {
    return this.rpc.unary(MsgStoreCodeDesc, MsgStoreCode.fromPartial(request), metadata);
  }

  InstantiateContract(
    request: DeepPartial<MsgInstantiateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgInstantiateContractResponse> {
    return this.rpc.unary(MsgInstantiateContractDesc, MsgInstantiateContract.fromPartial(request), metadata);
  }

  InstantiateContract2(
    request: DeepPartial<MsgInstantiateContract2>,
    metadata?: grpc.Metadata,
  ): Promise<MsgInstantiateContract2Response> {
    return this.rpc.unary(MsgInstantiateContract2Desc, MsgInstantiateContract2.fromPartial(request), metadata);
  }

  ExecuteContract(
    request: DeepPartial<MsgExecuteContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecuteContractResponse> {
    return this.rpc.unary(MsgExecuteContractDesc, MsgExecuteContract.fromPartial(request), metadata);
  }

  MigrateContract(
    request: DeepPartial<MsgMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgMigrateContractResponse> {
    return this.rpc.unary(MsgMigrateContractDesc, MsgMigrateContract.fromPartial(request), metadata);
  }

  UpdateAdmin(request: DeepPartial<MsgUpdateAdmin>, metadata?: grpc.Metadata): Promise<MsgUpdateAdminResponse> {
    return this.rpc.unary(MsgUpdateAdminDesc, MsgUpdateAdmin.fromPartial(request), metadata);
  }

  ClearAdmin(request: DeepPartial<MsgClearAdmin>, metadata?: grpc.Metadata): Promise<MsgClearAdminResponse> {
    return this.rpc.unary(MsgClearAdminDesc, MsgClearAdmin.fromPartial(request), metadata);
  }

  UpdateInstantiateConfig(
    request: DeepPartial<MsgUpdateInstantiateConfig>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUpdateInstantiateConfigResponse> {
    return this.rpc.unary(MsgUpdateInstantiateConfigDesc, MsgUpdateInstantiateConfig.fromPartial(request), metadata);
  }

  UpdateParams(request: DeepPartial<MsgUpdateParams>, metadata?: grpc.Metadata): Promise<MsgUpdateParamsResponse> {
    return this.rpc.unary(MsgUpdateParamsDesc, MsgUpdateParams.fromPartial(request), metadata);
  }

  SudoContract(request: DeepPartial<MsgSudoContract>, metadata?: grpc.Metadata): Promise<MsgSudoContractResponse> {
    return this.rpc.unary(MsgSudoContractDesc, MsgSudoContract.fromPartial(request), metadata);
  }

  PinCodes(request: DeepPartial<MsgPinCodes>, metadata?: grpc.Metadata): Promise<MsgPinCodesResponse> {
    return this.rpc.unary(MsgPinCodesDesc, MsgPinCodes.fromPartial(request), metadata);
  }

  UnpinCodes(request: DeepPartial<MsgUnpinCodes>, metadata?: grpc.Metadata): Promise<MsgUnpinCodesResponse> {
    return this.rpc.unary(MsgUnpinCodesDesc, MsgUnpinCodes.fromPartial(request), metadata);
  }

  StoreAndInstantiateContract(
    request: DeepPartial<MsgStoreAndInstantiateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgStoreAndInstantiateContractResponse> {
    return this.rpc.unary(
      MsgStoreAndInstantiateContractDesc,
      MsgStoreAndInstantiateContract.fromPartial(request),
      metadata,
    );
  }

  RemoveCodeUploadParamsAddresses(
    request: DeepPartial<MsgRemoveCodeUploadParamsAddresses>,
    metadata?: grpc.Metadata,
  ): Promise<MsgRemoveCodeUploadParamsAddressesResponse> {
    return this.rpc.unary(
      MsgRemoveCodeUploadParamsAddressesDesc,
      MsgRemoveCodeUploadParamsAddresses.fromPartial(request),
      metadata,
    );
  }

  AddCodeUploadParamsAddresses(
    request: DeepPartial<MsgAddCodeUploadParamsAddresses>,
    metadata?: grpc.Metadata,
  ): Promise<MsgAddCodeUploadParamsAddressesResponse> {
    return this.rpc.unary(
      MsgAddCodeUploadParamsAddressesDesc,
      MsgAddCodeUploadParamsAddresses.fromPartial(request),
      metadata,
    );
  }

  StoreAndMigrateContract(
    request: DeepPartial<MsgStoreAndMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgStoreAndMigrateContractResponse> {
    return this.rpc.unary(MsgStoreAndMigrateContractDesc, MsgStoreAndMigrateContract.fromPartial(request), metadata);
  }

  UpdateContractLabel(
    request: DeepPartial<MsgUpdateContractLabel>,
    metadata?: grpc.Metadata,
  ): Promise<MsgUpdateContractLabelResponse> {
    return this.rpc.unary(MsgUpdateContractLabelDesc, MsgUpdateContractLabel.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "cosmwasm.wasm.v1.Msg" };

export const MsgStoreCodeDesc: UnaryMethodDefinitionish = {
  methodName: "StoreCode",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgStoreCode.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgStoreCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgInstantiateContractDesc: UnaryMethodDefinitionish = {
  methodName: "InstantiateContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgInstantiateContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgInstantiateContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgInstantiateContract2Desc: UnaryMethodDefinitionish = {
  methodName: "InstantiateContract2",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgInstantiateContract2.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgInstantiateContract2Response.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgExecuteContractDesc: UnaryMethodDefinitionish = {
  methodName: "ExecuteContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgExecuteContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgExecuteContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgMigrateContractDesc: UnaryMethodDefinitionish = {
  methodName: "MigrateContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgMigrateContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgMigrateContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUpdateAdminDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateAdmin",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUpdateAdmin.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUpdateAdminResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgClearAdminDesc: UnaryMethodDefinitionish = {
  methodName: "ClearAdmin",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgClearAdmin.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgClearAdminResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUpdateInstantiateConfigDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateInstantiateConfig",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUpdateInstantiateConfig.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUpdateInstantiateConfigResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUpdateParamsDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateParams",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUpdateParams.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUpdateParamsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgSudoContractDesc: UnaryMethodDefinitionish = {
  methodName: "SudoContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgSudoContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgSudoContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgPinCodesDesc: UnaryMethodDefinitionish = {
  methodName: "PinCodes",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgPinCodes.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgPinCodesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUnpinCodesDesc: UnaryMethodDefinitionish = {
  methodName: "UnpinCodes",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUnpinCodes.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUnpinCodesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgStoreAndInstantiateContractDesc: UnaryMethodDefinitionish = {
  methodName: "StoreAndInstantiateContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgStoreAndInstantiateContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgStoreAndInstantiateContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgRemoveCodeUploadParamsAddressesDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveCodeUploadParamsAddresses",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgRemoveCodeUploadParamsAddresses.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgRemoveCodeUploadParamsAddressesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgAddCodeUploadParamsAddressesDesc: UnaryMethodDefinitionish = {
  methodName: "AddCodeUploadParamsAddresses",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgAddCodeUploadParamsAddresses.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgAddCodeUploadParamsAddressesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgStoreAndMigrateContractDesc: UnaryMethodDefinitionish = {
  methodName: "StoreAndMigrateContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgStoreAndMigrateContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgStoreAndMigrateContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUpdateContractLabelDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateContractLabel",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUpdateContractLabel.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUpdateContractLabelResponse.decode(data);
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

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
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
