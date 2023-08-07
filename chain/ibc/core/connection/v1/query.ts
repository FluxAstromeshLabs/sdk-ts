/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import { ConnectionEnd, IdentifiedConnection, Params } from "./connection";

/**
 * QueryConnectionRequest is the request type for the Query/Connection RPC
 * method
 */
export interface QueryConnectionRequest {
  /** connection unique identifier */
  connection_id: string;
}

/**
 * QueryConnectionResponse is the response type for the Query/Connection RPC
 * method. Besides the connection end, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryConnectionResponse {
  /** connection associated with the request identifier */
  connection:
    | ConnectionEnd
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryConnectionsRequest is the request type for the Query/Connections RPC
 * method
 */
export interface QueryConnectionsRequest {
  pagination: PageRequest | undefined;
}

/**
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 */
export interface QueryConnectionsResponse {
  /** list of stored connections of the chain. */
  connections: IdentifiedConnection[];
  /** pagination response */
  pagination:
    | PageResponse
    | undefined;
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryClientConnectionsRequest is the request type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsRequest {
  /** client identifier associated with a connection */
  client_id: string;
}

/**
 * QueryClientConnectionsResponse is the response type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsResponse {
  /** slice of all the connection paths associated with a client. */
  connection_paths: string[];
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was generated */
  proof_height: Height | undefined;
}

/**
 * QueryConnectionClientStateRequest is the request type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateRequest {
  /** connection identifier */
  connection_id: string;
}

/**
 * QueryConnectionClientStateResponse is the response type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateResponse {
  /** client state associated with the channel */
  identified_client_state:
    | IdentifiedClientState
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryConnectionConsensusStateRequest is the request type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateRequest {
  /** connection identifier */
  connection_id: string;
  revision_number: string;
  revision_height: string;
}

/**
 * QueryConnectionConsensusStateResponse is the response type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateResponse {
  /** consensus state associated with the channel */
  consensus_state:
    | Any
    | undefined;
  /** client ID associated with the consensus state */
  client_id: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/** QueryConnectionParamsRequest is the request type for the Query/ConnectionParams RPC method. */
export interface QueryConnectionParamsRequest {
}

/** QueryConnectionParamsResponse is the response type for the Query/ConnectionParams RPC method. */
export interface QueryConnectionParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

function createBaseQueryConnectionRequest(): QueryConnectionRequest {
  return { connection_id: "" };
}

export const QueryConnectionRequest = {
  $type: "ibc.core.connection.v1.QueryConnectionRequest" as const,

  encode(message: QueryConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionRequest {
    return { connection_id: isSet(object.connection_id) ? String(object.connection_id) : "" };
  },

  toJSON(message: QueryConnectionRequest): unknown {
    const obj: any = {};
    if (message.connection_id !== "") {
      obj.connection_id = message.connection_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionRequest>): QueryConnectionRequest {
    return QueryConnectionRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionRequest>): QueryConnectionRequest {
    const message = createBaseQueryConnectionRequest();
    message.connection_id = object.connection_id ?? "";
    return message;
  },
};

function createBaseQueryConnectionResponse(): QueryConnectionResponse {
  return { connection: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryConnectionResponse = {
  $type: "ibc.core.connection.v1.QueryConnectionResponse" as const,

  encode(message: QueryConnectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection !== undefined) {
      ConnectionEnd.encode(message.connection, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection = ConnectionEnd.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryConnectionResponse {
    return {
      connection: isSet(object.connection) ? ConnectionEnd.fromJSON(object.connection) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryConnectionResponse): unknown {
    const obj: any = {};
    if (message.connection !== undefined) {
      obj.connection = ConnectionEnd.toJSON(message.connection);
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionResponse>): QueryConnectionResponse {
    return QueryConnectionResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionResponse>): QueryConnectionResponse {
    const message = createBaseQueryConnectionResponse();
    message.connection = (object.connection !== undefined && object.connection !== null)
      ? ConnectionEnd.fromPartial(object.connection)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionsRequest(): QueryConnectionsRequest {
  return { pagination: undefined };
}

export const QueryConnectionsRequest = {
  $type: "ibc.core.connection.v1.QueryConnectionsRequest" as const,

  encode(message: QueryConnectionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionsRequest();
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

  fromJSON(object: any): QueryConnectionsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryConnectionsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionsRequest>): QueryConnectionsRequest {
    return QueryConnectionsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionsRequest>): QueryConnectionsRequest {
    const message = createBaseQueryConnectionsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionsResponse(): QueryConnectionsResponse {
  return { connections: [], pagination: undefined, height: undefined };
}

export const QueryConnectionsResponse = {
  $type: "ibc.core.connection.v1.QueryConnectionsResponse" as const,

  encode(message: QueryConnectionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.connections) {
      IdentifiedConnection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connections.push(IdentifiedConnection.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.height = Height.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionsResponse {
    return {
      connections: Array.isArray(object?.connections)
        ? object.connections.map((e: any) => IdentifiedConnection.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryConnectionsResponse): unknown {
    const obj: any = {};
    if (message.connections?.length) {
      obj.connections = message.connections.map((e) => IdentifiedConnection.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionsResponse>): QueryConnectionsResponse {
    return QueryConnectionsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionsResponse>): QueryConnectionsResponse {
    const message = createBaseQueryConnectionsResponse();
    message.connections = object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryClientConnectionsRequest(): QueryClientConnectionsRequest {
  return { client_id: "" };
}

export const QueryClientConnectionsRequest = {
  $type: "ibc.core.connection.v1.QueryClientConnectionsRequest" as const,

  encode(message: QueryClientConnectionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientConnectionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientConnectionsRequest();
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

  fromJSON(object: any): QueryClientConnectionsRequest {
    return { client_id: isSet(object.client_id) ? String(object.client_id) : "" };
  },

  toJSON(message: QueryClientConnectionsRequest): unknown {
    const obj: any = {};
    if (message.client_id !== "") {
      obj.client_id = message.client_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientConnectionsRequest>): QueryClientConnectionsRequest {
    return QueryClientConnectionsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientConnectionsRequest>): QueryClientConnectionsRequest {
    const message = createBaseQueryClientConnectionsRequest();
    message.client_id = object.client_id ?? "";
    return message;
  },
};

function createBaseQueryClientConnectionsResponse(): QueryClientConnectionsResponse {
  return { connection_paths: [], proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryClientConnectionsResponse = {
  $type: "ibc.core.connection.v1.QueryClientConnectionsResponse" as const,

  encode(message: QueryClientConnectionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.connection_paths) {
      writer.uint32(10).string(v!);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientConnectionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientConnectionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_paths.push(reader.string());
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

  fromJSON(object: any): QueryClientConnectionsResponse {
    return {
      connection_paths: Array.isArray(object?.connection_paths)
        ? object.connection_paths.map((e: any) => String(e))
        : [],
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryClientConnectionsResponse): unknown {
    const obj: any = {};
    if (message.connection_paths?.length) {
      obj.connection_paths = message.connection_paths;
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryClientConnectionsResponse>): QueryClientConnectionsResponse {
    return QueryClientConnectionsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryClientConnectionsResponse>): QueryClientConnectionsResponse {
    const message = createBaseQueryClientConnectionsResponse();
    message.connection_paths = object.connection_paths?.map((e) => e) || [];
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionClientStateRequest(): QueryConnectionClientStateRequest {
  return { connection_id: "" };
}

export const QueryConnectionClientStateRequest = {
  $type: "ibc.core.connection.v1.QueryConnectionClientStateRequest" as const,

  encode(message: QueryConnectionClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionClientStateRequest {
    return { connection_id: isSet(object.connection_id) ? String(object.connection_id) : "" };
  },

  toJSON(message: QueryConnectionClientStateRequest): unknown {
    const obj: any = {};
    if (message.connection_id !== "") {
      obj.connection_id = message.connection_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionClientStateRequest>): QueryConnectionClientStateRequest {
    return QueryConnectionClientStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionClientStateRequest>): QueryConnectionClientStateRequest {
    const message = createBaseQueryConnectionClientStateRequest();
    message.connection_id = object.connection_id ?? "";
    return message;
  },
};

function createBaseQueryConnectionClientStateResponse(): QueryConnectionClientStateResponse {
  return { identified_client_state: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryConnectionClientStateResponse = {
  $type: "ibc.core.connection.v1.QueryConnectionClientStateResponse" as const,

  encode(message: QueryConnectionClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identified_client_state !== undefined) {
      IdentifiedClientState.encode(message.identified_client_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identified_client_state = IdentifiedClientState.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryConnectionClientStateResponse {
    return {
      identified_client_state: isSet(object.identified_client_state)
        ? IdentifiedClientState.fromJSON(object.identified_client_state)
        : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryConnectionClientStateResponse): unknown {
    const obj: any = {};
    if (message.identified_client_state !== undefined) {
      obj.identified_client_state = IdentifiedClientState.toJSON(message.identified_client_state);
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionClientStateResponse>): QueryConnectionClientStateResponse {
    return QueryConnectionClientStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionClientStateResponse>): QueryConnectionClientStateResponse {
    const message = createBaseQueryConnectionClientStateResponse();
    message.identified_client_state =
      (object.identified_client_state !== undefined && object.identified_client_state !== null)
        ? IdentifiedClientState.fromPartial(object.identified_client_state)
        : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionConsensusStateRequest(): QueryConnectionConsensusStateRequest {
  return { connection_id: "", revision_number: "0", revision_height: "0" };
}

export const QueryConnectionConsensusStateRequest = {
  $type: "ibc.core.connection.v1.QueryConnectionConsensusStateRequest" as const,

  encode(message: QueryConnectionConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.revision_number !== "0") {
      writer.uint32(16).uint64(message.revision_number);
    }
    if (message.revision_height !== "0") {
      writer.uint32(24).uint64(message.revision_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_id = reader.string();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryConnectionConsensusStateRequest {
    return {
      connection_id: isSet(object.connection_id) ? String(object.connection_id) : "",
      revision_number: isSet(object.revision_number) ? String(object.revision_number) : "0",
      revision_height: isSet(object.revision_height) ? String(object.revision_height) : "0",
    };
  },

  toJSON(message: QueryConnectionConsensusStateRequest): unknown {
    const obj: any = {};
    if (message.connection_id !== "") {
      obj.connection_id = message.connection_id;
    }
    if (message.revision_number !== "0") {
      obj.revision_number = message.revision_number;
    }
    if (message.revision_height !== "0") {
      obj.revision_height = message.revision_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionConsensusStateRequest>): QueryConnectionConsensusStateRequest {
    return QueryConnectionConsensusStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionConsensusStateRequest>): QueryConnectionConsensusStateRequest {
    const message = createBaseQueryConnectionConsensusStateRequest();
    message.connection_id = object.connection_id ?? "";
    message.revision_number = object.revision_number ?? "0";
    message.revision_height = object.revision_height ?? "0";
    return message;
  },
};

function createBaseQueryConnectionConsensusStateResponse(): QueryConnectionConsensusStateResponse {
  return { consensus_state: undefined, client_id: "", proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryConnectionConsensusStateResponse = {
  $type: "ibc.core.connection.v1.QueryConnectionConsensusStateResponse" as const,

  encode(message: QueryConnectionConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.client_id !== "") {
      writer.uint32(18).string(message.client_id);
    }
    if (message.proof.length !== 0) {
      writer.uint32(26).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionConsensusStateResponse();
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

          message.client_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proof = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): QueryConnectionConsensusStateResponse {
    return {
      consensus_state: isSet(object.consensus_state) ? Any.fromJSON(object.consensus_state) : undefined,
      client_id: isSet(object.client_id) ? String(object.client_id) : "",
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryConnectionConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.consensus_state !== undefined) {
      obj.consensus_state = Any.toJSON(message.consensus_state);
    }
    if (message.client_id !== "") {
      obj.client_id = message.client_id;
    }
    if (message.proof.length !== 0) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionConsensusStateResponse>): QueryConnectionConsensusStateResponse {
    return QueryConnectionConsensusStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionConsensusStateResponse>): QueryConnectionConsensusStateResponse {
    const message = createBaseQueryConnectionConsensusStateResponse();
    message.consensus_state = (object.consensus_state !== undefined && object.consensus_state !== null)
      ? Any.fromPartial(object.consensus_state)
      : undefined;
    message.client_id = object.client_id ?? "";
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionParamsRequest(): QueryConnectionParamsRequest {
  return {};
}

export const QueryConnectionParamsRequest = {
  $type: "ibc.core.connection.v1.QueryConnectionParamsRequest" as const,

  encode(_: QueryConnectionParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionParamsRequest();
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

  fromJSON(_: any): QueryConnectionParamsRequest {
    return {};
  },

  toJSON(_: QueryConnectionParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionParamsRequest>): QueryConnectionParamsRequest {
    return QueryConnectionParamsRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryConnectionParamsRequest>): QueryConnectionParamsRequest {
    const message = createBaseQueryConnectionParamsRequest();
    return message;
  },
};

function createBaseQueryConnectionParamsResponse(): QueryConnectionParamsResponse {
  return { params: undefined };
}

export const QueryConnectionParamsResponse = {
  $type: "ibc.core.connection.v1.QueryConnectionParamsResponse" as const,

  encode(message: QueryConnectionParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionParamsResponse();
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

  fromJSON(object: any): QueryConnectionParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryConnectionParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionParamsResponse>): QueryConnectionParamsResponse {
    return QueryConnectionParamsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionParamsResponse>): QueryConnectionParamsResponse {
    const message = createBaseQueryConnectionParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Connection queries an IBC connection end. */
  Connection(request: DeepPartial<QueryConnectionRequest>, metadata?: grpc.Metadata): Promise<QueryConnectionResponse>;
  /** Connections queries all the IBC connections of a chain. */
  Connections(
    request: DeepPartial<QueryConnectionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionsResponse>;
  /**
   * ClientConnections queries the connection paths associated with a client
   * state.
   */
  ClientConnections(
    request: DeepPartial<QueryClientConnectionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientConnectionsResponse>;
  /**
   * ConnectionClientState queries the client state associated with the
   * connection.
   */
  ConnectionClientState(
    request: DeepPartial<QueryConnectionClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionClientStateResponse>;
  /**
   * ConnectionConsensusState queries the consensus state associated with the
   * connection.
   */
  ConnectionConsensusState(
    request: DeepPartial<QueryConnectionConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionConsensusStateResponse>;
  /** ConnectionParams queries all parameters of the ibc connection submodule. */
  ConnectionParams(
    request: DeepPartial<QueryConnectionParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Connection = this.Connection.bind(this);
    this.Connections = this.Connections.bind(this);
    this.ClientConnections = this.ClientConnections.bind(this);
    this.ConnectionClientState = this.ConnectionClientState.bind(this);
    this.ConnectionConsensusState = this.ConnectionConsensusState.bind(this);
    this.ConnectionParams = this.ConnectionParams.bind(this);
  }

  Connection(request: DeepPartial<QueryConnectionRequest>, metadata?: grpc.Metadata): Promise<QueryConnectionResponse> {
    return this.rpc.unary(QueryConnectionDesc, QueryConnectionRequest.fromPartial(request), metadata);
  }

  Connections(
    request: DeepPartial<QueryConnectionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionsResponse> {
    return this.rpc.unary(QueryConnectionsDesc, QueryConnectionsRequest.fromPartial(request), metadata);
  }

  ClientConnections(
    request: DeepPartial<QueryClientConnectionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryClientConnectionsResponse> {
    return this.rpc.unary(QueryClientConnectionsDesc, QueryClientConnectionsRequest.fromPartial(request), metadata);
  }

  ConnectionClientState(
    request: DeepPartial<QueryConnectionClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionClientStateResponse> {
    return this.rpc.unary(
      QueryConnectionClientStateDesc,
      QueryConnectionClientStateRequest.fromPartial(request),
      metadata,
    );
  }

  ConnectionConsensusState(
    request: DeepPartial<QueryConnectionConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionConsensusStateResponse> {
    return this.rpc.unary(
      QueryConnectionConsensusStateDesc,
      QueryConnectionConsensusStateRequest.fromPartial(request),
      metadata,
    );
  }

  ConnectionParams(
    request: DeepPartial<QueryConnectionParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionParamsResponse> {
    return this.rpc.unary(QueryConnectionParamsDesc, QueryConnectionParamsRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "ibc.core.connection.v1.Query" };

export const QueryConnectionDesc: UnaryMethodDefinitionish = {
  methodName: "Connection",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConnectionsDesc: UnaryMethodDefinitionish = {
  methodName: "Connections",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryClientConnectionsDesc: UnaryMethodDefinitionish = {
  methodName: "ClientConnections",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryClientConnectionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryClientConnectionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConnectionClientStateDesc: UnaryMethodDefinitionish = {
  methodName: "ConnectionClientState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionClientStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionClientStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConnectionConsensusStateDesc: UnaryMethodDefinitionish = {
  methodName: "ConnectionConsensusState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionConsensusStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionConsensusStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConnectionParamsDesc: UnaryMethodDefinitionish = {
  methodName: "ConnectionParams",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionParamsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionParamsResponse.decode(data);
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

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
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

export class GrpcWebError extends tsProtoGlobalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
