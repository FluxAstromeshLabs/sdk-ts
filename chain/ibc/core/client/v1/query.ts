/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { MerklePath } from "../../commitment/v1/commitment";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client";

/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
  /** client state unique identifier */
  client_id: string;
}

/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
  /** client state associated with the request identifier */
  client_state:
    | Any
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  client_states: IdentifiedClientState[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
  /** client identifier */
  client_id: string;
  /** consensus state revision number */
  revision_number: string;
  /** consensus state revision height */
  revision_height: string;
  /**
   * latest_height overrides the height field and queries the latest stored
   * ConsensusState
   */
  latest_height: boolean;
}

/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
  /** consensus state associated with the client identifier at the given height */
  consensus_state:
    | Any
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
  /** client identifier */
  client_id: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensus_states: ConsensusStateWithHeight[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequest {
  /** client identifier */
  client_id: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponse {
  /** consensus state heights */
  consensus_state_heights: Height[];
  /** pagination response */
  pagination: PageResponse | undefined;
}

/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
  /** client unique identifier */
  client_id: string;
}

/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
  status: string;
}

/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {
}

/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {
}

/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
  /** client state associated with the request identifier */
  upgraded_client_state: Any | undefined;
}

/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  /** Consensus state associated with the request identifier */
  upgraded_consensus_state: Any | undefined;
}

/** QueryVerifyMembershipRequest is the request type for the Query/VerifyMembership RPC method */
export interface QueryVerifyMembershipRequest {
  /** client unique identifier. */
  client_id: string;
  /** the proof to be verified by the client. */
  proof: Uint8Array;
  /** the height of the commitment root at which the proof is verified. */
  proof_height:
    | Height
    | undefined;
  /** the commitment key path. */
  merkle_path:
    | MerklePath
    | undefined;
  /** the value which is proven. */
  value: Uint8Array;
  /** optional time delay */
  time_delay: string;
  /** optional block delay */
  block_delay: string;
}

/** QueryVerifyMembershipResponse is the response type for the Query/VerifyMembership RPC method */
export interface QueryVerifyMembershipResponse {
  /** boolean indicating success or failure of proof verification. */
  success: boolean;
}

function createBaseQueryClientStateRequest(): QueryClientStateRequest {
  return { client_id: "" };
}

export const QueryClientStateRequest = {
  $type: "ibc.core.client.v1.QueryClientStateRequest" as const,

  encode(message: QueryClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStateRequest {
    return { client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "" };
  },

  toJSON(message: QueryClientStateRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStateRequest>): QueryClientStateRequest {
    return QueryClientStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStateRequest>): QueryClientStateRequest {
    const message = createBaseQueryClientStateRequest();
    message.client_id = object.client_id ?? "";
    return message;
  },
};

function createBaseQueryClientStateResponse(): QueryClientStateResponse {
  return { client_state: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryClientStateResponse = {
  $type: "ibc.core.client.v1.QueryClientStateResponse" as const,

  encode(message: QueryClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_state = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof_height = Height.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStateResponse {
    return {
      client_state: isSet(object.client_state) ? Any.fromJSON(object.client_state) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryClientStateResponse): unknown {
    const obj: any = {};
    if (message.client_state !== undefined) {
      obj.client_state = Any.toJSON(message.client_state);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStateResponse>): QueryClientStateResponse {
    return QueryClientStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStateResponse>): QueryClientStateResponse {
    const message = createBaseQueryClientStateResponse();
    message.client_state = (object.client_state !== undefined && object.client_state !== null)
      ? Any.fromPartial(object.client_state)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatesRequest(): QueryClientStatesRequest {
  return { pagination: undefined };
}

export const QueryClientStatesRequest = {
  $type: "ibc.core.client.v1.QueryClientStatesRequest" as const,

  encode(message: QueryClientStatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesRequest();
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

  fromJSON(object: any): QueryClientStatesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryClientStatesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStatesRequest>): QueryClientStatesRequest {
    return QueryClientStatesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStatesRequest>): QueryClientStatesRequest {
    const message = createBaseQueryClientStatesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatesResponse(): QueryClientStatesResponse {
  return { client_states: [], pagination: undefined };
}

export const QueryClientStatesResponse = {
  $type: "ibc.core.client.v1.QueryClientStatesResponse" as const,

  encode(message: QueryClientStatesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.client_states) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_states.push(IdentifiedClientState.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryClientStatesResponse {
    return {
      client_states: globalThis.Array.isArray(object?.client_states)
        ? object.client_states.map((e: any) => IdentifiedClientState.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryClientStatesResponse): unknown {
    const obj: any = {};
    if (message.client_states?.length) {
      obj.client_states = message.client_states.map((e) => IdentifiedClientState.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStatesResponse>): QueryClientStatesResponse {
    return QueryClientStatesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStatesResponse>): QueryClientStatesResponse {
    const message = createBaseQueryClientStatesResponse();
    message.client_states = object.client_states?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateRequest(): QueryConsensusStateRequest {
  return { client_id: "", revision_number: "0", revision_height: "0", latest_height: false };
}

export const QueryConsensusStateRequest = {
  $type: "ibc.core.client.v1.QueryConsensusStateRequest" as const,

  encode(message: QueryConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.revision_number !== "0") {
      writer.uint32(16).uint64(message.revision_number);
    }
    if (message.revision_height !== "0") {
      writer.uint32(24).uint64(message.revision_height);
    }
    if (message.latest_height === true) {
      writer.uint32(32).bool(message.latest_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.revision_number = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.revision_height = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.latest_height = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConsensusStateRequest {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      revision_number: isSet(object.revision_number) ? globalThis.String(object.revision_number) : "0",
      revision_height: isSet(object.revision_height) ? globalThis.String(object.revision_height) : "0",
      latest_height: isSet(object.latest_height) ? globalThis.Boolean(object.latest_height) : false,
    };
  },

  toJSON(message: QueryConsensusStateRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.revision_number !== undefined) {
      obj.revision_number = message.revision_number;
    }
    if (message.revision_height !== undefined) {
      obj.revision_height = message.revision_height;
    }
    if (message.latest_height !== undefined) {
      obj.latest_height = message.latest_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStateRequest>): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStateRequest>): QueryConsensusStateRequest {
    const message = createBaseQueryConsensusStateRequest();
    message.client_id = object.client_id ?? "";
    message.revision_number = object.revision_number ?? "0";
    message.revision_height = object.revision_height ?? "0";
    message.latest_height = object.latest_height ?? false;
    return message;
  },
};

function createBaseQueryConsensusStateResponse(): QueryConsensusStateResponse {
  return { consensus_state: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryConsensusStateResponse = {
  $type: "ibc.core.client.v1.QueryConsensusStateResponse" as const,

  encode(message: QueryConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensus_state = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof_height = Height.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConsensusStateResponse {
    return {
      consensus_state: isSet(object.consensus_state) ? Any.fromJSON(object.consensus_state) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.consensus_state !== undefined) {
      obj.consensus_state = Any.toJSON(message.consensus_state);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStateResponse>): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStateResponse>): QueryConsensusStateResponse {
    const message = createBaseQueryConsensusStateResponse();
    message.consensus_state = (object.consensus_state !== undefined && object.consensus_state !== null)
      ? Any.fromPartial(object.consensus_state)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStatesRequest(): QueryConsensusStatesRequest {
  return { client_id: "", pagination: undefined };
}

export const QueryConsensusStatesRequest = {
  $type: "ibc.core.client.v1.QueryConsensusStatesRequest" as const,

  encode(message: QueryConsensusStatesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
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

  fromJSON(object: any): QueryConsensusStatesRequest {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStatesRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStatesRequest>): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStatesRequest>): QueryConsensusStatesRequest {
    const message = createBaseQueryConsensusStatesRequest();
    message.client_id = object.client_id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStatesResponse(): QueryConsensusStatesResponse {
  return { consensus_states: [], pagination: undefined };
}

export const QueryConsensusStatesResponse = {
  $type: "ibc.core.client.v1.QueryConsensusStatesResponse" as const,

  encode(message: QueryConsensusStatesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.consensus_states) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensus_states.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryConsensusStatesResponse {
    return {
      consensus_states: globalThis.Array.isArray(object?.consensus_states)
        ? object.consensus_states.map((e: any) => ConsensusStateWithHeight.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStatesResponse): unknown {
    const obj: any = {};
    if (message.consensus_states?.length) {
      obj.consensus_states = message.consensus_states.map((e) => ConsensusStateWithHeight.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStatesResponse>): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStatesResponse>): QueryConsensusStatesResponse {
    const message = createBaseQueryConsensusStatesResponse();
    message.consensus_states = object.consensus_states?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateHeightsRequest(): QueryConsensusStateHeightsRequest {
  return { client_id: "", pagination: undefined };
}

export const QueryConsensusStateHeightsRequest = {
  $type: "ibc.core.client.v1.QueryConsensusStateHeightsRequest" as const,

  encode(message: QueryConsensusStateHeightsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
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

  fromJSON(object: any): QueryConsensusStateHeightsRequest {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateHeightsRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStateHeightsRequest>): QueryConsensusStateHeightsRequest {
    return QueryConsensusStateHeightsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStateHeightsRequest>): QueryConsensusStateHeightsRequest {
    const message = createBaseQueryConsensusStateHeightsRequest();
    message.client_id = object.client_id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConsensusStateHeightsResponse(): QueryConsensusStateHeightsResponse {
  return { consensus_state_heights: [], pagination: undefined };
}

export const QueryConsensusStateHeightsResponse = {
  $type: "ibc.core.client.v1.QueryConsensusStateHeightsResponse" as const,

  encode(message: QueryConsensusStateHeightsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.consensus_state_heights) {
      Height.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateHeightsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensus_state_heights.push(Height.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryConsensusStateHeightsResponse {
    return {
      consensus_state_heights: globalThis.Array.isArray(object?.consensus_state_heights)
        ? object.consensus_state_heights.map((e: any) => Height.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConsensusStateHeightsResponse): unknown {
    const obj: any = {};
    if (message.consensus_state_heights?.length) {
      obj.consensus_state_heights = message.consensus_state_heights.map((e) => Height.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConsensusStateHeightsResponse>): QueryConsensusStateHeightsResponse {
    return QueryConsensusStateHeightsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConsensusStateHeightsResponse>): QueryConsensusStateHeightsResponse {
    const message = createBaseQueryConsensusStateHeightsResponse();
    message.consensus_state_heights = object.consensus_state_heights?.map((e) => Height.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClientStatusRequest(): QueryClientStatusRequest {
  return { client_id: "" };
}

export const QueryClientStatusRequest = {
  $type: "ibc.core.client.v1.QueryClientStatusRequest" as const,

  encode(message: QueryClientStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStatusRequest {
    return { client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "" };
  },

  toJSON(message: QueryClientStatusRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStatusRequest>): QueryClientStatusRequest {
    return QueryClientStatusRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStatusRequest>): QueryClientStatusRequest {
    const message = createBaseQueryClientStatusRequest();
    message.client_id = object.client_id ?? "";
    return message;
  },
};

function createBaseQueryClientStatusResponse(): QueryClientStatusResponse {
  return { status: "" };
}

export const QueryClientStatusResponse = {
  $type: "ibc.core.client.v1.QueryClientStatusResponse" as const,

  encode(message: QueryClientStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClientStatusResponse {
    return { status: isSet(object.status) ? globalThis.String(object.status) : "" };
  },

  toJSON(message: QueryClientStatusResponse): unknown {
    const obj: any = {};
    if (message.status !== undefined) {
      obj.status = message.status;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientStatusResponse>): QueryClientStatusResponse {
    return QueryClientStatusResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientStatusResponse>): QueryClientStatusResponse {
    const message = createBaseQueryClientStatusResponse();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseQueryClientParamsRequest(): QueryClientParamsRequest {
  return {};
}

export const QueryClientParamsRequest = {
  $type: "ibc.core.client.v1.QueryClientParamsRequest" as const,

  encode(_: QueryClientParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsRequest();
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

  fromJSON(_: any): QueryClientParamsRequest {
    return {};
  },

  toJSON(_: QueryClientParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryClientParamsRequest>): QueryClientParamsRequest {
    return QueryClientParamsRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryClientParamsRequest>): QueryClientParamsRequest {
    const message = createBaseQueryClientParamsRequest();
    return message;
  },
};

function createBaseQueryClientParamsResponse(): QueryClientParamsResponse {
  return { params: undefined };
}

export const QueryClientParamsResponse = {
  $type: "ibc.core.client.v1.QueryClientParamsResponse" as const,

  encode(message: QueryClientParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): QueryClientParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryClientParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientParamsResponse>): QueryClientParamsResponse {
    return QueryClientParamsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientParamsResponse>): QueryClientParamsResponse {
    const message = createBaseQueryClientParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryUpgradedClientStateRequest(): QueryUpgradedClientStateRequest {
  return {};
}

export const QueryUpgradedClientStateRequest = {
  $type: "ibc.core.client.v1.QueryUpgradedClientStateRequest" as const,

  encode(_: QueryUpgradedClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateRequest();
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

  fromJSON(_: any): QueryUpgradedClientStateRequest {
    return {};
  },

  toJSON(_: QueryUpgradedClientStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradedClientStateRequest>): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryUpgradedClientStateRequest>): QueryUpgradedClientStateRequest {
    const message = createBaseQueryUpgradedClientStateRequest();
    return message;
  },
};

function createBaseQueryUpgradedClientStateResponse(): QueryUpgradedClientStateResponse {
  return { upgraded_client_state: undefined };
}

export const QueryUpgradedClientStateResponse = {
  $type: "ibc.core.client.v1.QueryUpgradedClientStateResponse" as const,

  encode(message: QueryUpgradedClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgraded_client_state !== undefined) {
      Any.encode(message.upgraded_client_state, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgraded_client_state = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedClientStateResponse {
    return {
      upgraded_client_state: isSet(object.upgraded_client_state)
        ? Any.fromJSON(object.upgraded_client_state)
        : undefined,
    };
  },

  toJSON(message: QueryUpgradedClientStateResponse): unknown {
    const obj: any = {};
    if (message.upgraded_client_state !== undefined) {
      obj.upgraded_client_state = Any.toJSON(message.upgraded_client_state);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradedClientStateResponse>): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradedClientStateResponse>): QueryUpgradedClientStateResponse {
    const message = createBaseQueryUpgradedClientStateResponse();
    message.upgraded_client_state =
      (object.upgraded_client_state !== undefined && object.upgraded_client_state !== null)
        ? Any.fromPartial(object.upgraded_client_state)
        : undefined;
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return {};
}

export const QueryUpgradedConsensusStateRequest = {
  $type: "ibc.core.client.v1.QueryUpgradedConsensusStateRequest" as const,

  encode(_: QueryUpgradedConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
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

  fromJSON(_: any): QueryUpgradedConsensusStateRequest {
    return {};
  },

  toJSON(_: QueryUpgradedConsensusStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradedConsensusStateRequest>): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryUpgradedConsensusStateRequest>): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    return message;
  },
};

function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return { upgraded_consensus_state: undefined };
}

export const QueryUpgradedConsensusStateResponse = {
  $type: "ibc.core.client.v1.QueryUpgradedConsensusStateResponse" as const,

  encode(message: QueryUpgradedConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgraded_consensus_state !== undefined) {
      Any.encode(message.upgraded_consensus_state, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgraded_consensus_state = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateResponse {
    return {
      upgraded_consensus_state: isSet(object.upgraded_consensus_state)
        ? Any.fromJSON(object.upgraded_consensus_state)
        : undefined,
    };
  },

  toJSON(message: QueryUpgradedConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.upgraded_consensus_state !== undefined) {
      obj.upgraded_consensus_state = Any.toJSON(message.upgraded_consensus_state);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradedConsensusStateResponse>): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradedConsensusStateResponse>): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    message.upgraded_consensus_state =
      (object.upgraded_consensus_state !== undefined && object.upgraded_consensus_state !== null)
        ? Any.fromPartial(object.upgraded_consensus_state)
        : undefined;
    return message;
  },
};

function createBaseQueryVerifyMembershipRequest(): QueryVerifyMembershipRequest {
  return {
    client_id: "",
    proof: new Uint8Array(0),
    proof_height: undefined,
    merkle_path: undefined,
    value: new Uint8Array(0),
    time_delay: "0",
    block_delay: "0",
  };
}

export const QueryVerifyMembershipRequest = {
  $type: "ibc.core.client.v1.QueryVerifyMembershipRequest" as const,

  encode(message: QueryVerifyMembershipRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    if (message.merkle_path !== undefined) {
      MerklePath.encode(message.merkle_path, writer.uint32(34).fork()).ldelim();
    }
    if (message.value.length !== 0) {
      writer.uint32(42).bytes(message.value);
    }
    if (message.time_delay !== "0") {
      writer.uint32(48).uint64(message.time_delay);
    }
    if (message.block_delay !== "0") {
      writer.uint32(56).uint64(message.block_delay);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVerifyMembershipRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVerifyMembershipRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof_height = Height.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.merkle_path = MerklePath.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.time_delay = longToString(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.block_delay = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVerifyMembershipRequest {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
      merkle_path: isSet(object.merkle_path) ? MerklePath.fromJSON(object.merkle_path) : undefined,
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      time_delay: isSet(object.time_delay) ? globalThis.String(object.time_delay) : "0",
      block_delay: isSet(object.block_delay) ? globalThis.String(object.block_delay) : "0",
    };
  },

  toJSON(message: QueryVerifyMembershipRequest): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    if (message.merkle_path !== undefined) {
      obj.merkle_path = MerklePath.toJSON(message.merkle_path);
    }
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.time_delay !== undefined) {
      obj.time_delay = message.time_delay;
    }
    if (message.block_delay !== undefined) {
      obj.block_delay = message.block_delay;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryVerifyMembershipRequest>): QueryVerifyMembershipRequest {
    return QueryVerifyMembershipRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryVerifyMembershipRequest>): QueryVerifyMembershipRequest {
    const message = createBaseQueryVerifyMembershipRequest();
    message.client_id = object.client_id ?? "";
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    message.merkle_path = (object.merkle_path !== undefined && object.merkle_path !== null)
      ? MerklePath.fromPartial(object.merkle_path)
      : undefined;
    message.value = object.value ?? new Uint8Array(0);
    message.time_delay = object.time_delay ?? "0";
    message.block_delay = object.block_delay ?? "0";
    return message;
  },
};

function createBaseQueryVerifyMembershipResponse(): QueryVerifyMembershipResponse {
  return { success: false };
}

export const QueryVerifyMembershipResponse = {
  $type: "ibc.core.client.v1.QueryVerifyMembershipResponse" as const,

  encode(message: QueryVerifyMembershipResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVerifyMembershipResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVerifyMembershipResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVerifyMembershipResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: QueryVerifyMembershipResponse): unknown {
    const obj: any = {};
    if (message.success !== undefined) {
      obj.success = message.success;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryVerifyMembershipResponse>): QueryVerifyMembershipResponse {
    return QueryVerifyMembershipResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryVerifyMembershipResponse>): QueryVerifyMembershipResponse {
    const message = createBaseQueryVerifyMembershipResponse();
    message.success = object.success ?? false;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** ClientState queries an IBC light client. */
  ClientState(
    request: DeepPartial<QueryClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStateResponse>;
  /** ClientStates queries all the IBC light clients of a chain. */
  ClientStates(
    request: DeepPartial<QueryClientStatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStatesResponse>;
  /**
   * ConsensusState queries a consensus state associated with a client state at
   * a given height.
   */
  ConsensusState(
    request: DeepPartial<QueryConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStateResponse>;
  /**
   * ConsensusStates queries all the consensus state associated with a given
   * client.
   */
  ConsensusStates(
    request: DeepPartial<QueryConsensusStatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStatesResponse>;
  /** ConsensusStateHeights queries the height of every consensus states associated with a given client. */
  ConsensusStateHeights(
    request: DeepPartial<QueryConsensusStateHeightsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStateHeightsResponse>;
  /** Status queries the status of an IBC client. */
  ClientStatus(
    request: DeepPartial<QueryClientStatusRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStatusResponse>;
  /** ClientParams queries all parameters of the ibc client submodule. */
  ClientParams(
    request: DeepPartial<QueryClientParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientParamsResponse>;
  /** UpgradedClientState queries an Upgraded IBC light client. */
  UpgradedClientState(
    request: DeepPartial<QueryUpgradedClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedClientStateResponse>;
  /** UpgradedConsensusState queries an Upgraded IBC consensus state. */
  UpgradedConsensusState(
    request: DeepPartial<QueryUpgradedConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedConsensusStateResponse>;
  /** VerifyMembership queries an IBC light client for proof verification of a value at a given key path. */
  VerifyMembership(
    request: DeepPartial<QueryVerifyMembershipRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryVerifyMembershipResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ClientState = this.ClientState.bind(this);
    this.ClientStates = this.ClientStates.bind(this);
    this.ConsensusState = this.ConsensusState.bind(this);
    this.ConsensusStates = this.ConsensusStates.bind(this);
    this.ConsensusStateHeights = this.ConsensusStateHeights.bind(this);
    this.ClientStatus = this.ClientStatus.bind(this);
    this.ClientParams = this.ClientParams.bind(this);
    this.UpgradedClientState = this.UpgradedClientState.bind(this);
    this.UpgradedConsensusState = this.UpgradedConsensusState.bind(this);
    this.VerifyMembership = this.VerifyMembership.bind(this);
  }

  ClientState(
    request: DeepPartial<QueryClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStateResponse> {
    return this.rpc.unary(QueryClientStateDesc, QueryClientStateRequest.fromPartial(request), metadata);
  }

  ClientStates(
    request: DeepPartial<QueryClientStatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStatesResponse> {
    return this.rpc.unary(QueryClientStatesDesc, QueryClientStatesRequest.fromPartial(request), metadata);
  }

  ConsensusState(
    request: DeepPartial<QueryConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStateResponse> {
    return this.rpc.unary(QueryConsensusStateDesc, QueryConsensusStateRequest.fromPartial(request), metadata);
  }

  ConsensusStates(
    request: DeepPartial<QueryConsensusStatesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStatesResponse> {
    return this.rpc.unary(QueryConsensusStatesDesc, QueryConsensusStatesRequest.fromPartial(request), metadata);
  }

  ConsensusStateHeights(
    request: DeepPartial<QueryConsensusStateHeightsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConsensusStateHeightsResponse> {
    return this.rpc.unary(
      QueryConsensusStateHeightsDesc,
      QueryConsensusStateHeightsRequest.fromPartial(request),
      metadata,
    );
  }

  ClientStatus(
    request: DeepPartial<QueryClientStatusRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientStatusResponse> {
    return this.rpc.unary(QueryClientStatusDesc, QueryClientStatusRequest.fromPartial(request), metadata);
  }

  ClientParams(
    request: DeepPartial<QueryClientParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientParamsResponse> {
    return this.rpc.unary(QueryClientParamsDesc, QueryClientParamsRequest.fromPartial(request), metadata);
  }

  UpgradedClientState(
    request: DeepPartial<QueryUpgradedClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedClientStateResponse> {
    return this.rpc.unary(QueryUpgradedClientStateDesc, QueryUpgradedClientStateRequest.fromPartial(request), metadata);
  }

  UpgradedConsensusState(
    request: DeepPartial<QueryUpgradedConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradedConsensusStateResponse> {
    return this.rpc.unary(
      QueryUpgradedConsensusStateDesc,
      QueryUpgradedConsensusStateRequest.fromPartial(request),
      metadata,
    );
  }

  VerifyMembership(
    request: DeepPartial<QueryVerifyMembershipRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryVerifyMembershipResponse> {
    return this.rpc.unary(QueryVerifyMembershipDesc, QueryVerifyMembershipRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "ibc.core.client.v1.Query" };

export const QueryClientStateDesc: UnaryMethodDefinitionish = {
  methodName: "ClientState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryClientStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryClientStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryClientStatesDesc: UnaryMethodDefinitionish = {
  methodName: "ClientStates",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryClientStatesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryClientStatesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConsensusStateDesc: UnaryMethodDefinitionish = {
  methodName: "ConsensusState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConsensusStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConsensusStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConsensusStatesDesc: UnaryMethodDefinitionish = {
  methodName: "ConsensusStates",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConsensusStatesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConsensusStatesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConsensusStateHeightsDesc: UnaryMethodDefinitionish = {
  methodName: "ConsensusStateHeights",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConsensusStateHeightsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConsensusStateHeightsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryClientStatusDesc: UnaryMethodDefinitionish = {
  methodName: "ClientStatus",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryClientStatusRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryClientStatusResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryClientParamsDesc: UnaryMethodDefinitionish = {
  methodName: "ClientParams",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryClientParamsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryClientParamsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUpgradedClientStateDesc: UnaryMethodDefinitionish = {
  methodName: "UpgradedClientState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUpgradedClientStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUpgradedClientStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUpgradedConsensusStateDesc: UnaryMethodDefinitionish = {
  methodName: "UpgradedConsensusState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUpgradedConsensusStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUpgradedConsensusStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryVerifyMembershipDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyMembership",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryVerifyMembershipRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryVerifyMembershipResponse.decode(data);
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
