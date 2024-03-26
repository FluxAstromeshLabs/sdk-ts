/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { AccessConfig } from "./types";

/**
 * StoreCodeAuthorization defines authorization for wasm code upload.
 * Since: wasmd 0.42
 */
export interface StoreCodeAuthorization {
  /** Grants for code upload */
  grants: CodeGrant[];
}

/**
 * ContractExecutionAuthorization defines authorization for wasm execute.
 * Since: wasmd 0.30
 */
export interface ContractExecutionAuthorization {
  /** Grants for contract executions */
  grants: ContractGrant[];
}

/**
 * ContractMigrationAuthorization defines authorization for wasm contract
 * migration. Since: wasmd 0.30
 */
export interface ContractMigrationAuthorization {
  /** Grants for contract migrations */
  grants: ContractGrant[];
}

/** CodeGrant a granted permission for a single code */
export interface CodeGrant {
  /**
   * CodeHash is the unique identifier created by wasmvm
   * Wildcard "*" is used to specify any kind of grant.
   */
  code_hash: Uint8Array;
  /**
   * InstantiatePermission is the superset access control to apply
   * on contract creation.
   * Optional
   */
  instantiate_permission: AccessConfig | undefined;
}

/**
 * ContractGrant a granted permission for a single contract
 * Since: wasmd 0.30
 */
export interface ContractGrant {
  /** Contract is the bech32 address of the smart contract */
  contract: string;
  /**
   * Limit defines execution limits that are enforced and updated when the grant
   * is applied. When the limit lapsed the grant is removed.
   */
  limit:
    | Any
    | undefined;
  /**
   * Filter define more fine-grained control on the message payload passed
   * to the contract in the operation. When no filter applies on execution, the
   * operation is prohibited.
   */
  filter: Any | undefined;
}

/**
 * MaxCallsLimit limited number of calls to the contract. No funds transferable.
 * Since: wasmd 0.30
 */
export interface MaxCallsLimit {
  /** Remaining number that is decremented on each execution */
  remaining: string;
}

/**
 * MaxFundsLimit defines the maximal amounts that can be sent to the contract.
 * Since: wasmd 0.30
 */
export interface MaxFundsLimit {
  /** Amounts is the maximal amount of tokens transferable to the contract. */
  amounts: Coin[];
}

/**
 * CombinedLimit defines the maximal amounts that can be sent to a contract and
 * the maximal number of calls executable. Both need to remain >0 to be valid.
 * Since: wasmd 0.30
 */
export interface CombinedLimit {
  /** Remaining number that is decremented on each execution */
  calls_remaining: string;
  /** Amounts is the maximal amount of tokens transferable to the contract. */
  amounts: Coin[];
}

/**
 * AllowAllMessagesFilter is a wildcard to allow any type of contract payload
 * message.
 * Since: wasmd 0.30
 */
export interface AllowAllMessagesFilter {
}

/**
 * AcceptedMessageKeysFilter accept only the specific contract message keys in
 * the json object to be executed.
 * Since: wasmd 0.30
 */
export interface AcceptedMessageKeysFilter {
  /** Messages is the list of unique keys */
  keys: string[];
}

/**
 * AcceptedMessagesFilter accept only the specific raw contract messages to be
 * executed.
 * Since: wasmd 0.30
 */
export interface AcceptedMessagesFilter {
  /** Messages is the list of raw contract messages */
  messages: Uint8Array[];
}

function createBaseStoreCodeAuthorization(): StoreCodeAuthorization {
  return { grants: [] };
}

export const StoreCodeAuthorization = {
  $type: "cosmwasm.wasm.v1.StoreCodeAuthorization" as const,

  encode(message: StoreCodeAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      CodeGrant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreCodeAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreCodeAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(CodeGrant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoreCodeAuthorization {
    return {
      grants: globalThis.Array.isArray(object?.grants) ? object.grants.map((e: any) => CodeGrant.fromJSON(e)) : [],
    };
  },

  toJSON(message: StoreCodeAuthorization): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => CodeGrant.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<StoreCodeAuthorization>): StoreCodeAuthorization {
    return StoreCodeAuthorization.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StoreCodeAuthorization>): StoreCodeAuthorization {
    const message = createBaseStoreCodeAuthorization();
    message.grants = object.grants?.map((e) => CodeGrant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContractExecutionAuthorization(): ContractExecutionAuthorization {
  return { grants: [] };
}

export const ContractExecutionAuthorization = {
  $type: "cosmwasm.wasm.v1.ContractExecutionAuthorization" as const,

  encode(message: ContractExecutionAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      ContractGrant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractExecutionAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractExecutionAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(ContractGrant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractExecutionAuthorization {
    return {
      grants: globalThis.Array.isArray(object?.grants) ? object.grants.map((e: any) => ContractGrant.fromJSON(e)) : [],
    };
  },

  toJSON(message: ContractExecutionAuthorization): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => ContractGrant.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ContractExecutionAuthorization>): ContractExecutionAuthorization {
    return ContractExecutionAuthorization.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContractExecutionAuthorization>): ContractExecutionAuthorization {
    const message = createBaseContractExecutionAuthorization();
    message.grants = object.grants?.map((e) => ContractGrant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContractMigrationAuthorization(): ContractMigrationAuthorization {
  return { grants: [] };
}

export const ContractMigrationAuthorization = {
  $type: "cosmwasm.wasm.v1.ContractMigrationAuthorization" as const,

  encode(message: ContractMigrationAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.grants) {
      ContractGrant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractMigrationAuthorization {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractMigrationAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grants.push(ContractGrant.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractMigrationAuthorization {
    return {
      grants: globalThis.Array.isArray(object?.grants) ? object.grants.map((e: any) => ContractGrant.fromJSON(e)) : [],
    };
  },

  toJSON(message: ContractMigrationAuthorization): unknown {
    const obj: any = {};
    if (message.grants?.length) {
      obj.grants = message.grants.map((e) => ContractGrant.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ContractMigrationAuthorization>): ContractMigrationAuthorization {
    return ContractMigrationAuthorization.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContractMigrationAuthorization>): ContractMigrationAuthorization {
    const message = createBaseContractMigrationAuthorization();
    message.grants = object.grants?.map((e) => ContractGrant.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCodeGrant(): CodeGrant {
  return { code_hash: new Uint8Array(0), instantiate_permission: undefined };
}

export const CodeGrant = {
  $type: "cosmwasm.wasm.v1.CodeGrant" as const,

  encode(message: CodeGrant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code_hash.length !== 0) {
      writer.uint32(10).bytes(message.code_hash);
    }
    if (message.instantiate_permission !== undefined) {
      AccessConfig.encode(message.instantiate_permission, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeGrant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code_hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): CodeGrant {
    return {
      code_hash: isSet(object.code_hash) ? bytesFromBase64(object.code_hash) : new Uint8Array(0),
      instantiate_permission: isSet(object.instantiate_permission)
        ? AccessConfig.fromJSON(object.instantiate_permission)
        : undefined,
    };
  },

  toJSON(message: CodeGrant): unknown {
    const obj: any = {};
    if (message.code_hash.length !== 0) {
      obj.code_hash = base64FromBytes(message.code_hash);
    }
    if (message.instantiate_permission !== undefined) {
      obj.instantiate_permission = AccessConfig.toJSON(message.instantiate_permission);
    }
    return obj;
  },

  create(base?: DeepPartial<CodeGrant>): CodeGrant {
    return CodeGrant.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CodeGrant>): CodeGrant {
    const message = createBaseCodeGrant();
    message.code_hash = object.code_hash ?? new Uint8Array(0);
    message.instantiate_permission =
      (object.instantiate_permission !== undefined && object.instantiate_permission !== null)
        ? AccessConfig.fromPartial(object.instantiate_permission)
        : undefined;
    return message;
  },
};

function createBaseContractGrant(): ContractGrant {
  return { contract: "", limit: undefined, filter: undefined };
}

export const ContractGrant = {
  $type: "cosmwasm.wasm.v1.ContractGrant" as const,

  encode(message: ContractGrant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contract !== "") {
      writer.uint32(10).string(message.contract);
    }
    if (message.limit !== undefined) {
      Any.encode(message.limit, writer.uint32(18).fork()).ldelim();
    }
    if (message.filter !== undefined) {
      Any.encode(message.filter, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractGrant {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contract = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.filter = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractGrant {
    return {
      contract: isSet(object.contract) ? globalThis.String(object.contract) : "",
      limit: isSet(object.limit) ? Any.fromJSON(object.limit) : undefined,
      filter: isSet(object.filter) ? Any.fromJSON(object.filter) : undefined,
    };
  },

  toJSON(message: ContractGrant): unknown {
    const obj: any = {};
    if (message.contract !== "") {
      obj.contract = message.contract;
    }
    if (message.limit !== undefined) {
      obj.limit = Any.toJSON(message.limit);
    }
    if (message.filter !== undefined) {
      obj.filter = Any.toJSON(message.filter);
    }
    return obj;
  },

  create(base?: DeepPartial<ContractGrant>): ContractGrant {
    return ContractGrant.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ContractGrant>): ContractGrant {
    const message = createBaseContractGrant();
    message.contract = object.contract ?? "";
    message.limit = (object.limit !== undefined && object.limit !== null) ? Any.fromPartial(object.limit) : undefined;
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? Any.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseMaxCallsLimit(): MaxCallsLimit {
  return { remaining: "0" };
}

export const MaxCallsLimit = {
  $type: "cosmwasm.wasm.v1.MaxCallsLimit" as const,

  encode(message: MaxCallsLimit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.remaining !== "0") {
      writer.uint32(8).uint64(message.remaining);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MaxCallsLimit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaxCallsLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.remaining = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MaxCallsLimit {
    return { remaining: isSet(object.remaining) ? globalThis.String(object.remaining) : "0" };
  },

  toJSON(message: MaxCallsLimit): unknown {
    const obj: any = {};
    if (message.remaining !== "0") {
      obj.remaining = message.remaining;
    }
    return obj;
  },

  create(base?: DeepPartial<MaxCallsLimit>): MaxCallsLimit {
    return MaxCallsLimit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MaxCallsLimit>): MaxCallsLimit {
    const message = createBaseMaxCallsLimit();
    message.remaining = object.remaining ?? "0";
    return message;
  },
};

function createBaseMaxFundsLimit(): MaxFundsLimit {
  return { amounts: [] };
}

export const MaxFundsLimit = {
  $type: "cosmwasm.wasm.v1.MaxFundsLimit" as const,

  encode(message: MaxFundsLimit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amounts) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MaxFundsLimit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaxFundsLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amounts.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MaxFundsLimit {
    return {
      amounts: globalThis.Array.isArray(object?.amounts) ? object.amounts.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MaxFundsLimit): unknown {
    const obj: any = {};
    if (message.amounts?.length) {
      obj.amounts = message.amounts.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MaxFundsLimit>): MaxFundsLimit {
    return MaxFundsLimit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MaxFundsLimit>): MaxFundsLimit {
    const message = createBaseMaxFundsLimit();
    message.amounts = object.amounts?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCombinedLimit(): CombinedLimit {
  return { calls_remaining: "0", amounts: [] };
}

export const CombinedLimit = {
  $type: "cosmwasm.wasm.v1.CombinedLimit" as const,

  encode(message: CombinedLimit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.calls_remaining !== "0") {
      writer.uint32(8).uint64(message.calls_remaining);
    }
    for (const v of message.amounts) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CombinedLimit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCombinedLimit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.calls_remaining = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amounts.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CombinedLimit {
    return {
      calls_remaining: isSet(object.calls_remaining) ? globalThis.String(object.calls_remaining) : "0",
      amounts: globalThis.Array.isArray(object?.amounts) ? object.amounts.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: CombinedLimit): unknown {
    const obj: any = {};
    if (message.calls_remaining !== "0") {
      obj.calls_remaining = message.calls_remaining;
    }
    if (message.amounts?.length) {
      obj.amounts = message.amounts.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<CombinedLimit>): CombinedLimit {
    return CombinedLimit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CombinedLimit>): CombinedLimit {
    const message = createBaseCombinedLimit();
    message.calls_remaining = object.calls_remaining ?? "0";
    message.amounts = object.amounts?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAllowAllMessagesFilter(): AllowAllMessagesFilter {
  return {};
}

export const AllowAllMessagesFilter = {
  $type: "cosmwasm.wasm.v1.AllowAllMessagesFilter" as const,

  encode(_: AllowAllMessagesFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllowAllMessagesFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowAllMessagesFilter();
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

  fromJSON(_: any): AllowAllMessagesFilter {
    return {};
  },

  toJSON(_: AllowAllMessagesFilter): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<AllowAllMessagesFilter>): AllowAllMessagesFilter {
    return AllowAllMessagesFilter.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<AllowAllMessagesFilter>): AllowAllMessagesFilter {
    const message = createBaseAllowAllMessagesFilter();
    return message;
  },
};

function createBaseAcceptedMessageKeysFilter(): AcceptedMessageKeysFilter {
  return { keys: [] };
}

export const AcceptedMessageKeysFilter = {
  $type: "cosmwasm.wasm.v1.AcceptedMessageKeysFilter" as const,

  encode(message: AcceptedMessageKeysFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptedMessageKeysFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptedMessageKeysFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keys.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AcceptedMessageKeysFilter {
    return { keys: globalThis.Array.isArray(object?.keys) ? object.keys.map((e: any) => globalThis.String(e)) : [] };
  },

  toJSON(message: AcceptedMessageKeysFilter): unknown {
    const obj: any = {};
    if (message.keys?.length) {
      obj.keys = message.keys;
    }
    return obj;
  },

  create(base?: DeepPartial<AcceptedMessageKeysFilter>): AcceptedMessageKeysFilter {
    return AcceptedMessageKeysFilter.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AcceptedMessageKeysFilter>): AcceptedMessageKeysFilter {
    const message = createBaseAcceptedMessageKeysFilter();
    message.keys = object.keys?.map((e) => e) || [];
    return message;
  },
};

function createBaseAcceptedMessagesFilter(): AcceptedMessagesFilter {
  return { messages: [] };
}

export const AcceptedMessagesFilter = {
  $type: "cosmwasm.wasm.v1.AcceptedMessagesFilter" as const,

  encode(message: AcceptedMessagesFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptedMessagesFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptedMessagesFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AcceptedMessagesFilter {
    return {
      messages: globalThis.Array.isArray(object?.messages) ? object.messages.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: AcceptedMessagesFilter): unknown {
    const obj: any = {};
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create(base?: DeepPartial<AcceptedMessagesFilter>): AcceptedMessagesFilter {
    return AcceptedMessagesFilter.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AcceptedMessagesFilter>): AcceptedMessagesFilter {
    const message = createBaseAcceptedMessagesFilter();
    message.messages = object.messages?.map((e) => e) || [];
    return message;
  },
};

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
