/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { DefaultNodeInfo } from "../../../../tendermint/p2p/types";
import { Block } from "../../../../tendermint/types/block";
import { BlockID } from "../../../../tendermint/types/types";
import { PageRequest, PageResponse } from "../../query/v1beta1/pagination";
import { Block as Block1 } from "./types";

/** GetValidatorSetByHeightRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightRequest {
  height: string;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightResponse {
  block_height: string;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** GetLatestValidatorSetRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetResponse {
  block_height: string;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** Validator is the type for the validator-set. */
export interface Validator {
  address: string;
  pub_key: Any | undefined;
  voting_power: string;
  proposer_priority: string;
}

/** GetBlockByHeightRequest is the request type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightRequest {
  height: string;
}

/** GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightResponse {
  block_id:
    | BlockID
    | undefined;
  /** Deprecated: please use `sdk_block` instead */
  block:
    | Block
    | undefined;
  /** Since: cosmos-sdk 0.47 */
  sdk_block: Block1 | undefined;
}

/** GetLatestBlockRequest is the request type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockRequest {
}

/** GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockResponse {
  block_id:
    | BlockID
    | undefined;
  /** Deprecated: please use `sdk_block` instead */
  block:
    | Block
    | undefined;
  /** Since: cosmos-sdk 0.47 */
  sdk_block: Block1 | undefined;
}

/** GetSyncingRequest is the request type for the Query/GetSyncing RPC method. */
export interface GetSyncingRequest {
}

/** GetSyncingResponse is the response type for the Query/GetSyncing RPC method. */
export interface GetSyncingResponse {
  syncing: boolean;
}

/** GetNodeInfoRequest is the request type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoRequest {
}

/** GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoResponse {
  default_node_info: DefaultNodeInfo | undefined;
  application_version: VersionInfo | undefined;
}

/** VersionInfo is the type for the GetNodeInfoResponse message. */
export interface VersionInfo {
  name: string;
  app_name: string;
  version: string;
  git_commit: string;
  build_tags: string;
  go_version: string;
  build_deps: Module[];
  /** Since: cosmos-sdk 0.43 */
  cosmos_sdk_version: string;
}

/** Module is the type for VersionInfo */
export interface Module {
  /** module path */
  path: string;
  /** module version */
  version: string;
  /** checksum */
  sum: string;
}

/** ABCIQueryRequest defines the request structure for the ABCIQuery gRPC query. */
export interface ABCIQueryRequest {
  data: Uint8Array;
  path: string;
  height: string;
  prove: boolean;
}

/**
 * ABCIQueryResponse defines the response structure for the ABCIQuery gRPC query.
 *
 * Note: This type is a duplicate of the ResponseQuery proto type defined in
 * Tendermint.
 */
export interface ABCIQueryResponse {
  code: number;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  index: string;
  key: Uint8Array;
  value: Uint8Array;
  proof_ops: ProofOps | undefined;
  height: string;
  codespace: string;
}

/**
 * ProofOp defines an operation used for calculating Merkle root. The data could
 * be arbitrary format, providing necessary data for example neighbouring node
 * hash.
 *
 * Note: This type is a duplicate of the ProofOp proto type defined in Tendermint.
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}

/**
 * ProofOps is Merkle proof defined by the list of ProofOps.
 *
 * Note: This type is a duplicate of the ProofOps proto type defined in Tendermint.
 */
export interface ProofOps {
  ops: ProofOp[];
}

function createBaseGetValidatorSetByHeightRequest(): GetValidatorSetByHeightRequest {
  return { height: "0", pagination: undefined };
}

export const GetValidatorSetByHeightRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightRequest" as const,

  encode(message: GetValidatorSetByHeightRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetValidatorSetByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetValidatorSetByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightRequest {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GetValidatorSetByHeightRequest): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetValidatorSetByHeightRequest>): GetValidatorSetByHeightRequest {
    return GetValidatorSetByHeightRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetValidatorSetByHeightRequest>): GetValidatorSetByHeightRequest {
    const message = createBaseGetValidatorSetByHeightRequest();
    message.height = object.height ?? "0";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGetValidatorSetByHeightResponse(): GetValidatorSetByHeightResponse {
  return { block_height: "0", validators: [], pagination: undefined };
}

export const GetValidatorSetByHeightResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightResponse" as const,

  encode(message: GetValidatorSetByHeightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetValidatorSetByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetValidatorSetByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.block_height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightResponse {
    return {
      block_height: isSet(object.block_height) ? globalThis.String(object.block_height) : "0",
      validators: globalThis.Array.isArray(object?.validators)
        ? object.validators.map((e: any) => Validator.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GetValidatorSetByHeightResponse): unknown {
    const obj: any = {};
    if (message.block_height !== "0") {
      obj.block_height = message.block_height;
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetValidatorSetByHeightResponse>): GetValidatorSetByHeightResponse {
    return GetValidatorSetByHeightResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetValidatorSetByHeightResponse>): GetValidatorSetByHeightResponse {
    const message = createBaseGetValidatorSetByHeightResponse();
    message.block_height = object.block_height ?? "0";
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGetLatestValidatorSetRequest(): GetLatestValidatorSetRequest {
  return { pagination: undefined };
}

export const GetLatestValidatorSetRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetLatestValidatorSetRequest" as const,

  encode(message: GetLatestValidatorSetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestValidatorSetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestValidatorSetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: GetLatestValidatorSetRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetLatestValidatorSetRequest>): GetLatestValidatorSetRequest {
    return GetLatestValidatorSetRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetLatestValidatorSetRequest>): GetLatestValidatorSetRequest {
    const message = createBaseGetLatestValidatorSetRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGetLatestValidatorSetResponse(): GetLatestValidatorSetResponse {
  return { block_height: "0", validators: [], pagination: undefined };
}

export const GetLatestValidatorSetResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetLatestValidatorSetResponse" as const,

  encode(message: GetLatestValidatorSetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_height !== "0") {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestValidatorSetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestValidatorSetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.block_height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetResponse {
    return {
      block_height: isSet(object.block_height) ? globalThis.String(object.block_height) : "0",
      validators: globalThis.Array.isArray(object?.validators)
        ? object.validators.map((e: any) => Validator.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GetLatestValidatorSetResponse): unknown {
    const obj: any = {};
    if (message.block_height !== "0") {
      obj.block_height = message.block_height;
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetLatestValidatorSetResponse>): GetLatestValidatorSetResponse {
    return GetLatestValidatorSetResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetLatestValidatorSetResponse>): GetLatestValidatorSetResponse {
    const message = createBaseGetLatestValidatorSetResponse();
    message.block_height = object.block_height ?? "0";
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { address: "", pub_key: undefined, voting_power: "0", proposer_priority: "0" };
}

export const Validator = {
  $type: "cosmos.base.tendermint.v1beta1.Validator" as const,

  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pub_key !== undefined) {
      Any.encode(message.pub_key, writer.uint32(18).fork()).ldelim();
    }
    if (message.voting_power !== "0") {
      writer.uint32(24).int64(message.voting_power);
    }
    if (message.proposer_priority !== "0") {
      writer.uint32(32).int64(message.proposer_priority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
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

          message.pub_key = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.voting_power = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.proposer_priority = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      pub_key: isSet(object.pub_key) ? Any.fromJSON(object.pub_key) : undefined,
      voting_power: isSet(object.voting_power) ? globalThis.String(object.voting_power) : "0",
      proposer_priority: isSet(object.proposer_priority) ? globalThis.String(object.proposer_priority) : "0",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pub_key !== undefined) {
      obj.pub_key = Any.toJSON(message.pub_key);
    }
    if (message.voting_power !== "0") {
      obj.voting_power = message.voting_power;
    }
    if (message.proposer_priority !== "0") {
      obj.proposer_priority = message.proposer_priority;
    }
    return obj;
  },

  create(base?: DeepPartial<Validator>): Validator {
    return Validator.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? "";
    message.pub_key = (object.pub_key !== undefined && object.pub_key !== null)
      ? Any.fromPartial(object.pub_key)
      : undefined;
    message.voting_power = object.voting_power ?? "0";
    message.proposer_priority = object.proposer_priority ?? "0";
    return message;
  },
};

function createBaseGetBlockByHeightRequest(): GetBlockByHeightRequest {
  return { height: "0" };
}

export const GetBlockByHeightRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetBlockByHeightRequest" as const,

  encode(message: GetBlockByHeightRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightRequest {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: GetBlockByHeightRequest): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockByHeightRequest>): GetBlockByHeightRequest {
    return GetBlockByHeightRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockByHeightRequest>): GetBlockByHeightRequest {
    const message = createBaseGetBlockByHeightRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseGetBlockByHeightResponse(): GetBlockByHeightResponse {
  return { block_id: undefined, block: undefined, sdk_block: undefined };
}

export const GetBlockByHeightResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetBlockByHeightResponse" as const,

  encode(message: GetBlockByHeightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.sdk_block !== undefined) {
      Block1.encode(message.sdk_block, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.block_id = BlockID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.block = Block.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sdk_block = Block1.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightResponse {
    return {
      block_id: isSet(object.block_id) ? BlockID.fromJSON(object.block_id) : undefined,
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
      sdk_block: isSet(object.sdk_block) ? Block1.fromJSON(object.sdk_block) : undefined,
    };
  },

  toJSON(message: GetBlockByHeightResponse): unknown {
    const obj: any = {};
    if (message.block_id !== undefined) {
      obj.block_id = BlockID.toJSON(message.block_id);
    }
    if (message.block !== undefined) {
      obj.block = Block.toJSON(message.block);
    }
    if (message.sdk_block !== undefined) {
      obj.sdk_block = Block1.toJSON(message.sdk_block);
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockByHeightResponse>): GetBlockByHeightResponse {
    return GetBlockByHeightResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockByHeightResponse>): GetBlockByHeightResponse {
    const message = createBaseGetBlockByHeightResponse();
    message.block_id = (object.block_id !== undefined && object.block_id !== null)
      ? BlockID.fromPartial(object.block_id)
      : undefined;
    message.block = (object.block !== undefined && object.block !== null) ? Block.fromPartial(object.block) : undefined;
    message.sdk_block = (object.sdk_block !== undefined && object.sdk_block !== null)
      ? Block1.fromPartial(object.sdk_block)
      : undefined;
    return message;
  },
};

function createBaseGetLatestBlockRequest(): GetLatestBlockRequest {
  return {};
}

export const GetLatestBlockRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetLatestBlockRequest" as const,

  encode(_: GetLatestBlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestBlockRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockRequest();
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

  fromJSON(_: any): GetLatestBlockRequest {
    return {};
  },

  toJSON(_: GetLatestBlockRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetLatestBlockRequest>): GetLatestBlockRequest {
    return GetLatestBlockRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetLatestBlockRequest>): GetLatestBlockRequest {
    const message = createBaseGetLatestBlockRequest();
    return message;
  },
};

function createBaseGetLatestBlockResponse(): GetLatestBlockResponse {
  return { block_id: undefined, block: undefined, sdk_block: undefined };
}

export const GetLatestBlockResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetLatestBlockResponse" as const,

  encode(message: GetLatestBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.sdk_block !== undefined) {
      Block1.encode(message.sdk_block, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLatestBlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLatestBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.block_id = BlockID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.block = Block.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sdk_block = Block1.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLatestBlockResponse {
    return {
      block_id: isSet(object.block_id) ? BlockID.fromJSON(object.block_id) : undefined,
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
      sdk_block: isSet(object.sdk_block) ? Block1.fromJSON(object.sdk_block) : undefined,
    };
  },

  toJSON(message: GetLatestBlockResponse): unknown {
    const obj: any = {};
    if (message.block_id !== undefined) {
      obj.block_id = BlockID.toJSON(message.block_id);
    }
    if (message.block !== undefined) {
      obj.block = Block.toJSON(message.block);
    }
    if (message.sdk_block !== undefined) {
      obj.sdk_block = Block1.toJSON(message.sdk_block);
    }
    return obj;
  },

  create(base?: DeepPartial<GetLatestBlockResponse>): GetLatestBlockResponse {
    return GetLatestBlockResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetLatestBlockResponse>): GetLatestBlockResponse {
    const message = createBaseGetLatestBlockResponse();
    message.block_id = (object.block_id !== undefined && object.block_id !== null)
      ? BlockID.fromPartial(object.block_id)
      : undefined;
    message.block = (object.block !== undefined && object.block !== null) ? Block.fromPartial(object.block) : undefined;
    message.sdk_block = (object.sdk_block !== undefined && object.sdk_block !== null)
      ? Block1.fromPartial(object.sdk_block)
      : undefined;
    return message;
  },
};

function createBaseGetSyncingRequest(): GetSyncingRequest {
  return {};
}

export const GetSyncingRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetSyncingRequest" as const,

  encode(_: GetSyncingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSyncingRequest();
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

  fromJSON(_: any): GetSyncingRequest {
    return {};
  },

  toJSON(_: GetSyncingRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetSyncingRequest>): GetSyncingRequest {
    return GetSyncingRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetSyncingRequest>): GetSyncingRequest {
    const message = createBaseGetSyncingRequest();
    return message;
  },
};

function createBaseGetSyncingResponse(): GetSyncingResponse {
  return { syncing: false };
}

export const GetSyncingResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetSyncingResponse" as const,

  encode(message: GetSyncingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.syncing === true) {
      writer.uint32(8).bool(message.syncing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSyncingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.syncing = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSyncingResponse {
    return { syncing: isSet(object.syncing) ? globalThis.Boolean(object.syncing) : false };
  },

  toJSON(message: GetSyncingResponse): unknown {
    const obj: any = {};
    if (message.syncing === true) {
      obj.syncing = message.syncing;
    }
    return obj;
  },

  create(base?: DeepPartial<GetSyncingResponse>): GetSyncingResponse {
    return GetSyncingResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetSyncingResponse>): GetSyncingResponse {
    const message = createBaseGetSyncingResponse();
    message.syncing = object.syncing ?? false;
    return message;
  },
};

function createBaseGetNodeInfoRequest(): GetNodeInfoRequest {
  return {};
}

export const GetNodeInfoRequest = {
  $type: "cosmos.base.tendermint.v1beta1.GetNodeInfoRequest" as const,

  encode(_: GetNodeInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeInfoRequest();
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

  fromJSON(_: any): GetNodeInfoRequest {
    return {};
  },

  toJSON(_: GetNodeInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetNodeInfoRequest>): GetNodeInfoRequest {
    return GetNodeInfoRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetNodeInfoRequest>): GetNodeInfoRequest {
    const message = createBaseGetNodeInfoRequest();
    return message;
  },
};

function createBaseGetNodeInfoResponse(): GetNodeInfoResponse {
  return { default_node_info: undefined, application_version: undefined };
}

export const GetNodeInfoResponse = {
  $type: "cosmos.base.tendermint.v1beta1.GetNodeInfoResponse" as const,

  encode(message: GetNodeInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.default_node_info !== undefined) {
      DefaultNodeInfo.encode(message.default_node_info, writer.uint32(10).fork()).ldelim();
    }
    if (message.application_version !== undefined) {
      VersionInfo.encode(message.application_version, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.default_node_info = DefaultNodeInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.application_version = VersionInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNodeInfoResponse {
    return {
      default_node_info: isSet(object.default_node_info)
        ? DefaultNodeInfo.fromJSON(object.default_node_info)
        : undefined,
      application_version: isSet(object.application_version)
        ? VersionInfo.fromJSON(object.application_version)
        : undefined,
    };
  },

  toJSON(message: GetNodeInfoResponse): unknown {
    const obj: any = {};
    if (message.default_node_info !== undefined) {
      obj.default_node_info = DefaultNodeInfo.toJSON(message.default_node_info);
    }
    if (message.application_version !== undefined) {
      obj.application_version = VersionInfo.toJSON(message.application_version);
    }
    return obj;
  },

  create(base?: DeepPartial<GetNodeInfoResponse>): GetNodeInfoResponse {
    return GetNodeInfoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetNodeInfoResponse>): GetNodeInfoResponse {
    const message = createBaseGetNodeInfoResponse();
    message.default_node_info = (object.default_node_info !== undefined && object.default_node_info !== null)
      ? DefaultNodeInfo.fromPartial(object.default_node_info)
      : undefined;
    message.application_version = (object.application_version !== undefined && object.application_version !== null)
      ? VersionInfo.fromPartial(object.application_version)
      : undefined;
    return message;
  },
};

function createBaseVersionInfo(): VersionInfo {
  return {
    name: "",
    app_name: "",
    version: "",
    git_commit: "",
    build_tags: "",
    go_version: "",
    build_deps: [],
    cosmos_sdk_version: "",
  };
}

export const VersionInfo = {
  $type: "cosmos.base.tendermint.v1beta1.VersionInfo" as const,

  encode(message: VersionInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.app_name !== "") {
      writer.uint32(18).string(message.app_name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.git_commit !== "") {
      writer.uint32(34).string(message.git_commit);
    }
    if (message.build_tags !== "") {
      writer.uint32(42).string(message.build_tags);
    }
    if (message.go_version !== "") {
      writer.uint32(50).string(message.go_version);
    }
    for (const v of message.build_deps) {
      Module.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.cosmos_sdk_version !== "") {
      writer.uint32(66).string(message.cosmos_sdk_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.app_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.git_commit = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.build_tags = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.go_version = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.build_deps.push(Module.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.cosmos_sdk_version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VersionInfo {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      app_name: isSet(object.app_name) ? globalThis.String(object.app_name) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      git_commit: isSet(object.git_commit) ? globalThis.String(object.git_commit) : "",
      build_tags: isSet(object.build_tags) ? globalThis.String(object.build_tags) : "",
      go_version: isSet(object.go_version) ? globalThis.String(object.go_version) : "",
      build_deps: globalThis.Array.isArray(object?.build_deps)
        ? object.build_deps.map((e: any) => Module.fromJSON(e))
        : [],
      cosmos_sdk_version: isSet(object.cosmos_sdk_version) ? globalThis.String(object.cosmos_sdk_version) : "",
    };
  },

  toJSON(message: VersionInfo): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.app_name !== "") {
      obj.app_name = message.app_name;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.git_commit !== "") {
      obj.git_commit = message.git_commit;
    }
    if (message.build_tags !== "") {
      obj.build_tags = message.build_tags;
    }
    if (message.go_version !== "") {
      obj.go_version = message.go_version;
    }
    if (message.build_deps?.length) {
      obj.build_deps = message.build_deps.map((e) => Module.toJSON(e));
    }
    if (message.cosmos_sdk_version !== "") {
      obj.cosmos_sdk_version = message.cosmos_sdk_version;
    }
    return obj;
  },

  create(base?: DeepPartial<VersionInfo>): VersionInfo {
    return VersionInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<VersionInfo>): VersionInfo {
    const message = createBaseVersionInfo();
    message.name = object.name ?? "";
    message.app_name = object.app_name ?? "";
    message.version = object.version ?? "";
    message.git_commit = object.git_commit ?? "";
    message.build_tags = object.build_tags ?? "";
    message.go_version = object.go_version ?? "";
    message.build_deps = object.build_deps?.map((e) => Module.fromPartial(e)) || [];
    message.cosmos_sdk_version = object.cosmos_sdk_version ?? "";
    return message;
  },
};

function createBaseModule(): Module {
  return { path: "", version: "", sum: "" };
}

export const Module = {
  $type: "cosmos.base.tendermint.v1beta1.Module" as const,

  encode(message: Module, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.sum !== "") {
      writer.uint32(26).string(message.sum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sum = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      sum: isSet(object.sum) ? globalThis.String(object.sum) : "",
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.sum !== "") {
      obj.sum = message.sum;
    }
    return obj;
  },

  create(base?: DeepPartial<Module>): Module {
    return Module.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Module>): Module {
    const message = createBaseModule();
    message.path = object.path ?? "";
    message.version = object.version ?? "";
    message.sum = object.sum ?? "";
    return message;
  },
};

function createBaseABCIQueryRequest(): ABCIQueryRequest {
  return { data: new Uint8Array(0), path: "", height: "0", prove: false };
}

export const ABCIQueryRequest = {
  $type: "cosmos.base.tendermint.v1beta1.ABCIQueryRequest" as const,

  encode(message: ABCIQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.prove = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ABCIQueryRequest {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      prove: isSet(object.prove) ? globalThis.Boolean(object.prove) : false,
    };
  },

  toJSON(message: ABCIQueryRequest): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.prove === true) {
      obj.prove = message.prove;
    }
    return obj;
  },

  create(base?: DeepPartial<ABCIQueryRequest>): ABCIQueryRequest {
    return ABCIQueryRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ABCIQueryRequest>): ABCIQueryRequest {
    const message = createBaseABCIQueryRequest();
    message.data = object.data ?? new Uint8Array(0);
    message.path = object.path ?? "";
    message.height = object.height ?? "0";
    message.prove = object.prove ?? false;
    return message;
  },
};

function createBaseABCIQueryResponse(): ABCIQueryResponse {
  return {
    code: 0,
    log: "",
    info: "",
    index: "0",
    key: new Uint8Array(0),
    value: new Uint8Array(0),
    proof_ops: undefined,
    height: "0",
    codespace: "",
  };
}

export const ABCIQueryResponse = {
  $type: "cosmos.base.tendermint.v1beta1.ABCIQueryResponse" as const,

  encode(message: ABCIQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== "0") {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      ProofOps.encode(message.proof_ops, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseABCIQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.index = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proof_ops = ProofOps.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ABCIQueryResponse {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      log: isSet(object.log) ? globalThis.String(object.log) : "",
      info: isSet(object.info) ? globalThis.String(object.info) : "",
      index: isSet(object.index) ? globalThis.String(object.index) : "0",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      proof_ops: isSet(object.proof_ops) ? ProofOps.fromJSON(object.proof_ops) : undefined,
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      codespace: isSet(object.codespace) ? globalThis.String(object.codespace) : "",
    };
  },

  toJSON(message: ABCIQueryResponse): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.index !== "0") {
      obj.index = message.index;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      obj.proof_ops = ProofOps.toJSON(message.proof_ops);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create(base?: DeepPartial<ABCIQueryResponse>): ABCIQueryResponse {
    return ABCIQueryResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ABCIQueryResponse>): ABCIQueryResponse {
    const message = createBaseABCIQueryResponse();
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? "0";
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.proof_ops = (object.proof_ops !== undefined && object.proof_ops !== null)
      ? ProofOps.fromPartial(object.proof_ops)
      : undefined;
    message.height = object.height ?? "0";
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseProofOp(): ProofOp {
  return { type: "", key: new Uint8Array(0), data: new Uint8Array(0) };
}

export const ProofOp = {
  $type: "cosmos.base.tendermint.v1beta1.ProofOp" as const,

  encode(message: ProofOp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
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

  fromJSON(object: any): ProofOp {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<ProofOp>): ProofOp {
    return ProofOp.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProofOp>): ProofOp {
    const message = createBaseProofOp();
    message.type = object.type ?? "";
    message.key = object.key ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseProofOps(): ProofOps {
  return { ops: [] };
}

export const ProofOps = {
  $type: "cosmos.base.tendermint.v1beta1.ProofOps" as const,

  encode(message: ProofOps, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProofOps {
    return { ops: globalThis.Array.isArray(object?.ops) ? object.ops.map((e: any) => ProofOp.fromJSON(e)) : [] };
  },

  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops?.length) {
      obj.ops = message.ops.map((e) => ProofOp.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ProofOps>): ProofOps {
    return ProofOps.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ProofOps>): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map((e) => ProofOp.fromPartial(e)) || [];
    return message;
  },
};

/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
  /** GetNodeInfo queries the current node info. */
  GetNodeInfo(request: DeepPartial<GetNodeInfoRequest>, metadata?: grpc.Metadata): Promise<GetNodeInfoResponse>;
  /** GetSyncing queries node syncing. */
  GetSyncing(request: DeepPartial<GetSyncingRequest>, metadata?: grpc.Metadata): Promise<GetSyncingResponse>;
  /** GetLatestBlock returns the latest block. */
  GetLatestBlock(
    request: DeepPartial<GetLatestBlockRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLatestBlockResponse>;
  /** GetBlockByHeight queries block for given height. */
  GetBlockByHeight(
    request: DeepPartial<GetBlockByHeightRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockByHeightResponse>;
  /** GetLatestValidatorSet queries latest validator-set. */
  GetLatestValidatorSet(
    request: DeepPartial<GetLatestValidatorSetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLatestValidatorSetResponse>;
  /** GetValidatorSetByHeight queries validator-set at a given height. */
  GetValidatorSetByHeight(
    request: DeepPartial<GetValidatorSetByHeightRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetValidatorSetByHeightResponse>;
  /**
   * ABCIQuery defines a query handler that supports ABCI queries directly to the
   * application, bypassing Tendermint completely. The ABCI query must contain
   * a valid and supported path, including app, custom, p2p, and store.
   *
   * Since: cosmos-sdk 0.46
   */
  ABCIQuery(request: DeepPartial<ABCIQueryRequest>, metadata?: grpc.Metadata): Promise<ABCIQueryResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetNodeInfo = this.GetNodeInfo.bind(this);
    this.GetSyncing = this.GetSyncing.bind(this);
    this.GetLatestBlock = this.GetLatestBlock.bind(this);
    this.GetBlockByHeight = this.GetBlockByHeight.bind(this);
    this.GetLatestValidatorSet = this.GetLatestValidatorSet.bind(this);
    this.GetValidatorSetByHeight = this.GetValidatorSetByHeight.bind(this);
    this.ABCIQuery = this.ABCIQuery.bind(this);
  }

  GetNodeInfo(request: DeepPartial<GetNodeInfoRequest>, metadata?: grpc.Metadata): Promise<GetNodeInfoResponse> {
    return this.rpc.unary(ServiceGetNodeInfoDesc, GetNodeInfoRequest.fromPartial(request), metadata);
  }

  GetSyncing(request: DeepPartial<GetSyncingRequest>, metadata?: grpc.Metadata): Promise<GetSyncingResponse> {
    return this.rpc.unary(ServiceGetSyncingDesc, GetSyncingRequest.fromPartial(request), metadata);
  }

  GetLatestBlock(
    request: DeepPartial<GetLatestBlockRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLatestBlockResponse> {
    return this.rpc.unary(ServiceGetLatestBlockDesc, GetLatestBlockRequest.fromPartial(request), metadata);
  }

  GetBlockByHeight(
    request: DeepPartial<GetBlockByHeightRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockByHeightResponse> {
    return this.rpc.unary(ServiceGetBlockByHeightDesc, GetBlockByHeightRequest.fromPartial(request), metadata);
  }

  GetLatestValidatorSet(
    request: DeepPartial<GetLatestValidatorSetRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetLatestValidatorSetResponse> {
    return this.rpc.unary(
      ServiceGetLatestValidatorSetDesc,
      GetLatestValidatorSetRequest.fromPartial(request),
      metadata,
    );
  }

  GetValidatorSetByHeight(
    request: DeepPartial<GetValidatorSetByHeightRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetValidatorSetByHeightResponse> {
    return this.rpc.unary(
      ServiceGetValidatorSetByHeightDesc,
      GetValidatorSetByHeightRequest.fromPartial(request),
      metadata,
    );
  }

  ABCIQuery(request: DeepPartial<ABCIQueryRequest>, metadata?: grpc.Metadata): Promise<ABCIQueryResponse> {
    return this.rpc.unary(ServiceABCIQueryDesc, ABCIQueryRequest.fromPartial(request), metadata);
  }
}

export const ServiceDesc = { serviceName: "cosmos.base.tendermint.v1beta1.Service" };

export const ServiceGetNodeInfoDesc: UnaryMethodDefinitionish = {
  methodName: "GetNodeInfo",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetNodeInfoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetNodeInfoResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetSyncingDesc: UnaryMethodDefinitionish = {
  methodName: "GetSyncing",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetSyncingRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetSyncingResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetLatestBlockDesc: UnaryMethodDefinitionish = {
  methodName: "GetLatestBlock",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLatestBlockRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLatestBlockResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetBlockByHeightDesc: UnaryMethodDefinitionish = {
  methodName: "GetBlockByHeight",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBlockByHeightRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBlockByHeightResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetLatestValidatorSetDesc: UnaryMethodDefinitionish = {
  methodName: "GetLatestValidatorSet",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLatestValidatorSetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLatestValidatorSetResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetValidatorSetByHeightDesc: UnaryMethodDefinitionish = {
  methodName: "GetValidatorSetByHeight",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetValidatorSetByHeightRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetValidatorSetByHeightResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceABCIQueryDesc: UnaryMethodDefinitionish = {
  methodName: "ABCIQuery",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ABCIQueryRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ABCIQueryResponse.decode(data);
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
