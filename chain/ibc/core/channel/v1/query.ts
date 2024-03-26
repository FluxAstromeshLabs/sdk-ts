/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import { Channel, IdentifiedChannel, PacketState, Params } from "./channel";
import { ErrorReceipt, Upgrade } from "./upgrade";

/** QueryChannelRequest is the request type for the Query/Channel RPC method */
export interface QueryChannelRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
}

/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 */
export interface QueryChannelResponse {
  /** channel associated with the request identifiers */
  channel:
    | Channel
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/** QueryChannelsRequest is the request type for the Query/Channels RPC method */
export interface QueryChannelsRequest {
  /** pagination request */
  pagination: PageRequest | undefined;
}

/** QueryChannelsResponse is the response type for the Query/Channels RPC method. */
export interface QueryChannelsResponse {
  /** list of stored channels of the chain. */
  channels: IdentifiedChannel[];
  /** pagination response */
  pagination:
    | PageResponse
    | undefined;
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryConnectionChannelsRequest is the request type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsRequest {
  /** connection unique identifier */
  connection: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryConnectionChannelsResponse is the Response type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsResponse {
  /** list of channels associated with a connection. */
  channels: IdentifiedChannel[];
  /** pagination response */
  pagination:
    | PageResponse
    | undefined;
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryChannelClientStateRequest is the request type for the Query/ClientState
 * RPC method
 */
export interface QueryChannelClientStateRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
}

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelClientStateResponse {
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
 * QueryChannelConsensusStateRequest is the request type for the
 * Query/ConsensusState RPC method
 */
export interface QueryChannelConsensusStateRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** revision number of the consensus state */
  revision_number: string;
  /** revision height of the consensus state */
  revision_height: string;
}

/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelConsensusStateResponse {
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

/**
 * QueryPacketCommitmentRequest is the request type for the
 * Query/PacketCommitment RPC method
 */
export interface QueryPacketCommitmentRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** packet sequence */
  sequence: string;
}

/**
 * QueryPacketCommitmentResponse defines the client query response for a packet
 * which also includes a proof and the height from which the proof was
 * retrieved
 */
export interface QueryPacketCommitmentResponse {
  /** packet associated with the request fields */
  commitment: Uint8Array;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryPacketCommitmentsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** pagination request */
  pagination: PageRequest | undefined;
}

/**
 * QueryPacketCommitmentsResponse is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsResponse {
  commitments: PacketState[];
  /** pagination response */
  pagination:
    | PageResponse
    | undefined;
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryPacketReceiptRequest is the request type for the
 * Query/PacketReceipt RPC method
 */
export interface QueryPacketReceiptRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** packet sequence */
  sequence: string;
}

/**
 * QueryPacketReceiptResponse defines the client query response for a packet
 * receipt which also includes a proof, and the height from which the proof was
 * retrieved
 */
export interface QueryPacketReceiptResponse {
  /** success flag for if receipt exists */
  received: boolean;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryPacketAcknowledgementRequest is the request type for the
 * Query/PacketAcknowledgement RPC method
 */
export interface QueryPacketAcknowledgementRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** packet sequence */
  sequence: string;
}

/**
 * QueryPacketAcknowledgementResponse defines the client query response for a
 * packet which also includes a proof and the height from which the
 * proof was retrieved
 */
export interface QueryPacketAcknowledgementResponse {
  /** packet associated with the request fields */
  acknowledgement: Uint8Array;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryPacketAcknowledgementsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketAcknowledgementsRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** pagination request */
  pagination:
    | PageRequest
    | undefined;
  /** list of packet sequences */
  packet_commitment_sequences: string[];
}

/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 */
export interface QueryPacketAcknowledgementsResponse {
  acknowledgements: PacketState[];
  /** pagination response */
  pagination:
    | PageResponse
    | undefined;
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryUnreceivedPacketsRequest is the request type for the
 * Query/UnreceivedPackets RPC method
 */
export interface QueryUnreceivedPacketsRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** list of packet sequences */
  packet_commitment_sequences: string[];
}

/**
 * QueryUnreceivedPacketsResponse is the response type for the
 * Query/UnreceivedPacketCommitments RPC method
 */
export interface QueryUnreceivedPacketsResponse {
  /** list of unreceived packet sequences */
  sequences: string[];
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryUnreceivedAcks is the request type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
  /** list of acknowledgement sequences */
  packet_ack_sequences: string[];
}

/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksResponse {
  /** list of unreceived acknowledgement sequences */
  sequences: string[];
  /** query block height */
  height: Height | undefined;
}

/**
 * QueryNextSequenceReceiveRequest is the request type for the
 * Query/QueryNextSequenceReceiveRequest RPC method
 */
export interface QueryNextSequenceReceiveRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
}

/**
 * QuerySequenceResponse is the response type for the
 * Query/QueryNextSequenceReceiveResponse RPC method
 */
export interface QueryNextSequenceReceiveResponse {
  /** next sequence receive number */
  next_sequence_receive: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/**
 * QueryNextSequenceSendRequest is the request type for the
 * Query/QueryNextSequenceSend RPC method
 */
export interface QueryNextSequenceSendRequest {
  /** port unique identifier */
  port_id: string;
  /** channel unique identifier */
  channel_id: string;
}

/**
 * QueryNextSequenceSendResponse is the request type for the
 * Query/QueryNextSequenceSend RPC method
 */
export interface QueryNextSequenceSendResponse {
  /** next sequence send number */
  next_sequence_send: string;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/** QueryUpgradeErrorRequest is the request type for the Query/QueryUpgradeError RPC method */
export interface QueryUpgradeErrorRequest {
  port_id: string;
  channel_id: string;
}

/** QueryUpgradeErrorResponse is the response type for the Query/QueryUpgradeError RPC method */
export interface QueryUpgradeErrorResponse {
  error_receipt:
    | ErrorReceipt
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/** QueryUpgradeRequest is the request type for the QueryUpgradeRequest RPC method */
export interface QueryUpgradeRequest {
  port_id: string;
  channel_id: string;
}

/** QueryUpgradeResponse is the response type for the QueryUpgradeResponse RPC method */
export interface QueryUpgradeResponse {
  upgrade:
    | Upgrade
    | undefined;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proof_height: Height | undefined;
}

/** QueryChannelParamsRequest is the request type for the Query/ChannelParams RPC method. */
export interface QueryChannelParamsRequest {
}

/** QueryChannelParamsResponse is the response type for the Query/ChannelParams RPC method. */
export interface QueryChannelParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

function createBaseQueryChannelRequest(): QueryChannelRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryChannelRequest = {
  $type: "ibc.core.channel.v1.QueryChannelRequest" as const,

  encode(message: QueryChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryChannelRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryChannelRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelRequest>): QueryChannelRequest {
    return QueryChannelRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelRequest>): QueryChannelRequest {
    const message = createBaseQueryChannelRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryChannelResponse(): QueryChannelResponse {
  return { channel: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryChannelResponse = {
  $type: "ibc.core.channel.v1.QueryChannelResponse" as const,

  encode(message: QueryChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel = Channel.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryChannelResponse {
    return {
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryChannelResponse): unknown {
    const obj: any = {};
    if (message.channel !== undefined) {
      obj.channel = Channel.toJSON(message.channel);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelResponse>): QueryChannelResponse {
    return QueryChannelResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelResponse>): QueryChannelResponse {
    const message = createBaseQueryChannelResponse();
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryChannelsRequest(): QueryChannelsRequest {
  return { pagination: undefined };
}

export const QueryChannelsRequest = {
  $type: "ibc.core.channel.v1.QueryChannelsRequest" as const,

  encode(message: QueryChannelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelsRequest();
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

  fromJSON(object: any): QueryChannelsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryChannelsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelsRequest>): QueryChannelsRequest {
    return QueryChannelsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelsRequest>): QueryChannelsRequest {
    const message = createBaseQueryChannelsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryChannelsResponse(): QueryChannelsResponse {
  return { channels: [], pagination: undefined, height: undefined };
}

export const QueryChannelsResponse = {
  $type: "ibc.core.channel.v1.QueryChannelsResponse" as const,

  encode(message: QueryChannelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channels.push(IdentifiedChannel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryChannelsResponse {
    return {
      channels: globalThis.Array.isArray(object?.channels)
        ? object.channels.map((e: any) => IdentifiedChannel.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryChannelsResponse): unknown {
    const obj: any = {};
    if (message.channels?.length) {
      obj.channels = message.channels.map((e) => IdentifiedChannel.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelsResponse>): QueryChannelsResponse {
    return QueryChannelsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelsResponse>): QueryChannelsResponse {
    const message = createBaseQueryChannelsResponse();
    message.channels = object.channels?.map((e) => IdentifiedChannel.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionChannelsRequest(): QueryConnectionChannelsRequest {
  return { connection: "", pagination: undefined };
}

export const QueryConnectionChannelsRequest = {
  $type: "ibc.core.channel.v1.QueryConnectionChannelsRequest" as const,

  encode(message: QueryConnectionChannelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection !== "") {
      writer.uint32(10).string(message.connection);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionChannelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionChannelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection = reader.string();
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

  fromJSON(object: any): QueryConnectionChannelsRequest {
    return {
      connection: isSet(object.connection) ? globalThis.String(object.connection) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryConnectionChannelsRequest): unknown {
    const obj: any = {};
    if (message.connection !== undefined) {
      obj.connection = message.connection;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionChannelsRequest>): QueryConnectionChannelsRequest {
    return QueryConnectionChannelsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionChannelsRequest>): QueryConnectionChannelsRequest {
    const message = createBaseQueryConnectionChannelsRequest();
    message.connection = object.connection ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryConnectionChannelsResponse(): QueryConnectionChannelsResponse {
  return { channels: [], pagination: undefined, height: undefined };
}

export const QueryConnectionChannelsResponse = {
  $type: "ibc.core.channel.v1.QueryConnectionChannelsResponse" as const,

  encode(message: QueryConnectionChannelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.channels) {
      IdentifiedChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionChannelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConnectionChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channels.push(IdentifiedChannel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryConnectionChannelsResponse {
    return {
      channels: globalThis.Array.isArray(object?.channels)
        ? object.channels.map((e: any) => IdentifiedChannel.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryConnectionChannelsResponse): unknown {
    const obj: any = {};
    if (message.channels?.length) {
      obj.channels = message.channels.map((e) => IdentifiedChannel.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryConnectionChannelsResponse>): QueryConnectionChannelsResponse {
    return QueryConnectionChannelsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryConnectionChannelsResponse>): QueryConnectionChannelsResponse {
    const message = createBaseQueryConnectionChannelsResponse();
    message.channels = object.channels?.map((e) => IdentifiedChannel.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryChannelClientStateRequest(): QueryChannelClientStateRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryChannelClientStateRequest = {
  $type: "ibc.core.channel.v1.QueryChannelClientStateRequest" as const,

  encode(message: QueryChannelClientStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelClientStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryChannelClientStateRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryChannelClientStateRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelClientStateRequest>): QueryChannelClientStateRequest {
    return QueryChannelClientStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelClientStateRequest>): QueryChannelClientStateRequest {
    const message = createBaseQueryChannelClientStateRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryChannelClientStateResponse(): QueryChannelClientStateResponse {
  return { identified_client_state: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryChannelClientStateResponse = {
  $type: "ibc.core.channel.v1.QueryChannelClientStateResponse" as const,

  encode(message: QueryChannelClientStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelClientStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelClientStateResponse();
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

  fromJSON(object: any): QueryChannelClientStateResponse {
    return {
      identified_client_state: isSet(object.identified_client_state)
        ? IdentifiedClientState.fromJSON(object.identified_client_state)
        : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryChannelClientStateResponse): unknown {
    const obj: any = {};
    if (message.identified_client_state !== undefined) {
      obj.identified_client_state = IdentifiedClientState.toJSON(message.identified_client_state);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelClientStateResponse>): QueryChannelClientStateResponse {
    return QueryChannelClientStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelClientStateResponse>): QueryChannelClientStateResponse {
    const message = createBaseQueryChannelClientStateResponse();
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

function createBaseQueryChannelConsensusStateRequest(): QueryChannelConsensusStateRequest {
  return { port_id: "", channel_id: "", revision_number: "0", revision_height: "0" };
}

export const QueryChannelConsensusStateRequest = {
  $type: "ibc.core.channel.v1.QueryChannelConsensusStateRequest" as const,

  encode(message: QueryChannelConsensusStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.revision_number !== "0") {
      writer.uint32(24).uint64(message.revision_number);
    }
    if (message.revision_height !== "0") {
      writer.uint32(32).uint64(message.revision_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelConsensusStateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.revision_number = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): QueryChannelConsensusStateRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      revision_number: isSet(object.revision_number) ? globalThis.String(object.revision_number) : "0",
      revision_height: isSet(object.revision_height) ? globalThis.String(object.revision_height) : "0",
    };
  },

  toJSON(message: QueryChannelConsensusStateRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.revision_number !== undefined) {
      obj.revision_number = message.revision_number;
    }
    if (message.revision_height !== undefined) {
      obj.revision_height = message.revision_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelConsensusStateRequest>): QueryChannelConsensusStateRequest {
    return QueryChannelConsensusStateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelConsensusStateRequest>): QueryChannelConsensusStateRequest {
    const message = createBaseQueryChannelConsensusStateRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.revision_number = object.revision_number ?? "0";
    message.revision_height = object.revision_height ?? "0";
    return message;
  },
};

function createBaseQueryChannelConsensusStateResponse(): QueryChannelConsensusStateResponse {
  return { consensus_state: undefined, client_id: "", proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryChannelConsensusStateResponse = {
  $type: "ibc.core.channel.v1.QueryChannelConsensusStateResponse" as const,

  encode(message: QueryChannelConsensusStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelConsensusStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelConsensusStateResponse();
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

  fromJSON(object: any): QueryChannelConsensusStateResponse {
    return {
      consensus_state: isSet(object.consensus_state) ? Any.fromJSON(object.consensus_state) : undefined,
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryChannelConsensusStateResponse): unknown {
    const obj: any = {};
    if (message.consensus_state !== undefined) {
      obj.consensus_state = Any.toJSON(message.consensus_state);
    }
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelConsensusStateResponse>): QueryChannelConsensusStateResponse {
    return QueryChannelConsensusStateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelConsensusStateResponse>): QueryChannelConsensusStateResponse {
    const message = createBaseQueryChannelConsensusStateResponse();
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

function createBaseQueryPacketCommitmentRequest(): QueryPacketCommitmentRequest {
  return { port_id: "", channel_id: "", sequence: "0" };
}

export const QueryPacketCommitmentRequest = {
  $type: "ibc.core.channel.v1.QueryPacketCommitmentRequest" as const,

  encode(message: QueryPacketCommitmentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketCommitmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequence = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPacketCommitmentRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      sequence: isSet(object.sequence) ? globalThis.String(object.sequence) : "0",
    };
  },

  toJSON(message: QueryPacketCommitmentRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.sequence !== undefined) {
      obj.sequence = message.sequence;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketCommitmentRequest>): QueryPacketCommitmentRequest {
    return QueryPacketCommitmentRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentRequest>): QueryPacketCommitmentRequest {
    const message = createBaseQueryPacketCommitmentRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseQueryPacketCommitmentResponse(): QueryPacketCommitmentResponse {
  return { commitment: new Uint8Array(0), proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryPacketCommitmentResponse = {
  $type: "ibc.core.channel.v1.QueryPacketCommitmentResponse" as const,

  encode(message: QueryPacketCommitmentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.commitment.length !== 0) {
      writer.uint32(10).bytes(message.commitment);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketCommitmentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commitment = reader.bytes();
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

  fromJSON(object: any): QueryPacketCommitmentResponse {
    return {
      commitment: isSet(object.commitment) ? bytesFromBase64(object.commitment) : new Uint8Array(0),
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryPacketCommitmentResponse): unknown {
    const obj: any = {};
    if (message.commitment !== undefined) {
      obj.commitment = base64FromBytes(message.commitment);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketCommitmentResponse>): QueryPacketCommitmentResponse {
    return QueryPacketCommitmentResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentResponse>): QueryPacketCommitmentResponse {
    const message = createBaseQueryPacketCommitmentResponse();
    message.commitment = object.commitment ?? new Uint8Array(0);
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryPacketCommitmentsRequest(): QueryPacketCommitmentsRequest {
  return { port_id: "", channel_id: "", pagination: undefined };
}

export const QueryPacketCommitmentsRequest = {
  $type: "ibc.core.channel.v1.QueryPacketCommitmentsRequest" as const,

  encode(message: QueryPacketCommitmentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketCommitmentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): QueryPacketCommitmentsRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPacketCommitmentsRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketCommitmentsRequest>): QueryPacketCommitmentsRequest {
    return QueryPacketCommitmentsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentsRequest>): QueryPacketCommitmentsRequest {
    const message = createBaseQueryPacketCommitmentsRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPacketCommitmentsResponse(): QueryPacketCommitmentsResponse {
  return { commitments: [], pagination: undefined, height: undefined };
}

export const QueryPacketCommitmentsResponse = {
  $type: "ibc.core.channel.v1.QueryPacketCommitmentsResponse" as const,

  encode(message: QueryPacketCommitmentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commitments) {
      PacketState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketCommitmentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commitments.push(PacketState.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryPacketCommitmentsResponse {
    return {
      commitments: globalThis.Array.isArray(object?.commitments)
        ? object.commitments.map((e: any) => PacketState.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryPacketCommitmentsResponse): unknown {
    const obj: any = {};
    if (message.commitments?.length) {
      obj.commitments = message.commitments.map((e) => PacketState.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketCommitmentsResponse>): QueryPacketCommitmentsResponse {
    return QueryPacketCommitmentsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketCommitmentsResponse>): QueryPacketCommitmentsResponse {
    const message = createBaseQueryPacketCommitmentsResponse();
    message.commitments = object.commitments?.map((e) => PacketState.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryPacketReceiptRequest(): QueryPacketReceiptRequest {
  return { port_id: "", channel_id: "", sequence: "0" };
}

export const QueryPacketReceiptRequest = {
  $type: "ibc.core.channel.v1.QueryPacketReceiptRequest" as const,

  encode(message: QueryPacketReceiptRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketReceiptRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketReceiptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequence = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPacketReceiptRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      sequence: isSet(object.sequence) ? globalThis.String(object.sequence) : "0",
    };
  },

  toJSON(message: QueryPacketReceiptRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.sequence !== undefined) {
      obj.sequence = message.sequence;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketReceiptRequest>): QueryPacketReceiptRequest {
    return QueryPacketReceiptRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketReceiptRequest>): QueryPacketReceiptRequest {
    const message = createBaseQueryPacketReceiptRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseQueryPacketReceiptResponse(): QueryPacketReceiptResponse {
  return { received: false, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryPacketReceiptResponse = {
  $type: "ibc.core.channel.v1.QueryPacketReceiptResponse" as const,

  encode(message: QueryPacketReceiptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.received === true) {
      writer.uint32(16).bool(message.received);
    }
    if (message.proof.length !== 0) {
      writer.uint32(26).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketReceiptResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketReceiptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.received = reader.bool();
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

  fromJSON(object: any): QueryPacketReceiptResponse {
    return {
      received: isSet(object.received) ? globalThis.Boolean(object.received) : false,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryPacketReceiptResponse): unknown {
    const obj: any = {};
    if (message.received !== undefined) {
      obj.received = message.received;
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketReceiptResponse>): QueryPacketReceiptResponse {
    return QueryPacketReceiptResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketReceiptResponse>): QueryPacketReceiptResponse {
    const message = createBaseQueryPacketReceiptResponse();
    message.received = object.received ?? false;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryPacketAcknowledgementRequest(): QueryPacketAcknowledgementRequest {
  return { port_id: "", channel_id: "", sequence: "0" };
}

export const QueryPacketAcknowledgementRequest = {
  $type: "ibc.core.channel.v1.QueryPacketAcknowledgementRequest" as const,

  encode(message: QueryPacketAcknowledgementRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketAcknowledgementRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequence = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPacketAcknowledgementRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      sequence: isSet(object.sequence) ? globalThis.String(object.sequence) : "0",
    };
  },

  toJSON(message: QueryPacketAcknowledgementRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.sequence !== undefined) {
      obj.sequence = message.sequence;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketAcknowledgementRequest>): QueryPacketAcknowledgementRequest {
    return QueryPacketAcknowledgementRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementRequest>): QueryPacketAcknowledgementRequest {
    const message = createBaseQueryPacketAcknowledgementRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.sequence = object.sequence ?? "0";
    return message;
  },
};

function createBaseQueryPacketAcknowledgementResponse(): QueryPacketAcknowledgementResponse {
  return { acknowledgement: new Uint8Array(0), proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryPacketAcknowledgementResponse = {
  $type: "ibc.core.channel.v1.QueryPacketAcknowledgementResponse" as const,

  encode(message: QueryPacketAcknowledgementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.acknowledgement.length !== 0) {
      writer.uint32(10).bytes(message.acknowledgement);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketAcknowledgementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acknowledgement = reader.bytes();
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

  fromJSON(object: any): QueryPacketAcknowledgementResponse {
    return {
      acknowledgement: isSet(object.acknowledgement) ? bytesFromBase64(object.acknowledgement) : new Uint8Array(0),
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryPacketAcknowledgementResponse): unknown {
    const obj: any = {};
    if (message.acknowledgement !== undefined) {
      obj.acknowledgement = base64FromBytes(message.acknowledgement);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketAcknowledgementResponse>): QueryPacketAcknowledgementResponse {
    return QueryPacketAcknowledgementResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementResponse>): QueryPacketAcknowledgementResponse {
    const message = createBaseQueryPacketAcknowledgementResponse();
    message.acknowledgement = object.acknowledgement ?? new Uint8Array(0);
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryPacketAcknowledgementsRequest(): QueryPacketAcknowledgementsRequest {
  return { port_id: "", channel_id: "", pagination: undefined, packet_commitment_sequences: [] };
}

export const QueryPacketAcknowledgementsRequest = {
  $type: "ibc.core.channel.v1.QueryPacketAcknowledgementsRequest" as const,

  encode(message: QueryPacketAcknowledgementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.packet_commitment_sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketAcknowledgementsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag === 32) {
            message.packet_commitment_sequences.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packet_commitment_sequences.push(longToString(reader.uint64() as Long));
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

  fromJSON(object: any): QueryPacketAcknowledgementsRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      packet_commitment_sequences: globalThis.Array.isArray(object?.packet_commitment_sequences)
        ? object.packet_commitment_sequences.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryPacketAcknowledgementsRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.packet_commitment_sequences?.length) {
      obj.packet_commitment_sequences = message.packet_commitment_sequences;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketAcknowledgementsRequest>): QueryPacketAcknowledgementsRequest {
    return QueryPacketAcknowledgementsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsRequest>): QueryPacketAcknowledgementsRequest {
    const message = createBaseQueryPacketAcknowledgementsRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.packet_commitment_sequences = object.packet_commitment_sequences?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryPacketAcknowledgementsResponse(): QueryPacketAcknowledgementsResponse {
  return { acknowledgements: [], pagination: undefined, height: undefined };
}

export const QueryPacketAcknowledgementsResponse = {
  $type: "ibc.core.channel.v1.QueryPacketAcknowledgementsResponse" as const,

  encode(message: QueryPacketAcknowledgementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.acknowledgements) {
      PacketState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPacketAcknowledgementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acknowledgements.push(PacketState.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryPacketAcknowledgementsResponse {
    return {
      acknowledgements: globalThis.Array.isArray(object?.acknowledgements)
        ? object.acknowledgements.map((e: any) => PacketState.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryPacketAcknowledgementsResponse): unknown {
    const obj: any = {};
    if (message.acknowledgements?.length) {
      obj.acknowledgements = message.acknowledgements.map((e) => PacketState.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPacketAcknowledgementsResponse>): QueryPacketAcknowledgementsResponse {
    return QueryPacketAcknowledgementsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPacketAcknowledgementsResponse>): QueryPacketAcknowledgementsResponse {
    const message = createBaseQueryPacketAcknowledgementsResponse();
    message.acknowledgements = object.acknowledgements?.map((e) => PacketState.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryUnreceivedPacketsRequest(): QueryUnreceivedPacketsRequest {
  return { port_id: "", channel_id: "", packet_commitment_sequences: [] };
}

export const QueryUnreceivedPacketsRequest = {
  $type: "ibc.core.channel.v1.QueryUnreceivedPacketsRequest" as const,

  encode(message: QueryUnreceivedPacketsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    writer.uint32(26).fork();
    for (const v of message.packet_commitment_sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedPacketsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnreceivedPacketsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.packet_commitment_sequences.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packet_commitment_sequences.push(longToString(reader.uint64() as Long));
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

  fromJSON(object: any): QueryUnreceivedPacketsRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      packet_commitment_sequences: globalThis.Array.isArray(object?.packet_commitment_sequences)
        ? object.packet_commitment_sequences.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryUnreceivedPacketsRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.packet_commitment_sequences?.length) {
      obj.packet_commitment_sequences = message.packet_commitment_sequences;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUnreceivedPacketsRequest>): QueryUnreceivedPacketsRequest {
    return QueryUnreceivedPacketsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsRequest>): QueryUnreceivedPacketsRequest {
    const message = createBaseQueryUnreceivedPacketsRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.packet_commitment_sequences = object.packet_commitment_sequences?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryUnreceivedPacketsResponse(): QueryUnreceivedPacketsResponse {
  return { sequences: [], height: undefined };
}

export const QueryUnreceivedPacketsResponse = {
  $type: "ibc.core.channel.v1.QueryUnreceivedPacketsResponse" as const,

  encode(message: QueryUnreceivedPacketsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedPacketsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnreceivedPacketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.sequences.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sequences.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryUnreceivedPacketsResponse {
    return {
      sequences: globalThis.Array.isArray(object?.sequences)
        ? object.sequences.map((e: any) => globalThis.String(e))
        : [],
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryUnreceivedPacketsResponse): unknown {
    const obj: any = {};
    if (message.sequences?.length) {
      obj.sequences = message.sequences;
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUnreceivedPacketsResponse>): QueryUnreceivedPacketsResponse {
    return QueryUnreceivedPacketsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUnreceivedPacketsResponse>): QueryUnreceivedPacketsResponse {
    const message = createBaseQueryUnreceivedPacketsResponse();
    message.sequences = object.sequences?.map((e) => e) || [];
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryUnreceivedAcksRequest(): QueryUnreceivedAcksRequest {
  return { port_id: "", channel_id: "", packet_ack_sequences: [] };
}

export const QueryUnreceivedAcksRequest = {
  $type: "ibc.core.channel.v1.QueryUnreceivedAcksRequest" as const,

  encode(message: QueryUnreceivedAcksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    writer.uint32(26).fork();
    for (const v of message.packet_ack_sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedAcksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnreceivedAcksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.packet_ack_sequences.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packet_ack_sequences.push(longToString(reader.uint64() as Long));
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

  fromJSON(object: any): QueryUnreceivedAcksRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      packet_ack_sequences: globalThis.Array.isArray(object?.packet_ack_sequences)
        ? object.packet_ack_sequences.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryUnreceivedAcksRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.packet_ack_sequences?.length) {
      obj.packet_ack_sequences = message.packet_ack_sequences;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUnreceivedAcksRequest>): QueryUnreceivedAcksRequest {
    return QueryUnreceivedAcksRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUnreceivedAcksRequest>): QueryUnreceivedAcksRequest {
    const message = createBaseQueryUnreceivedAcksRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.packet_ack_sequences = object.packet_ack_sequences?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryUnreceivedAcksResponse(): QueryUnreceivedAcksResponse {
  return { sequences: [], height: undefined };
}

export const QueryUnreceivedAcksResponse = {
  $type: "ibc.core.channel.v1.QueryUnreceivedAcksResponse" as const,

  encode(message: QueryUnreceivedAcksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.sequences) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedAcksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnreceivedAcksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.sequences.push(longToString(reader.uint64() as Long));

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sequences.push(longToString(reader.uint64() as Long));
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryUnreceivedAcksResponse {
    return {
      sequences: globalThis.Array.isArray(object?.sequences)
        ? object.sequences.map((e: any) => globalThis.String(e))
        : [],
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
    };
  },

  toJSON(message: QueryUnreceivedAcksResponse): unknown {
    const obj: any = {};
    if (message.sequences?.length) {
      obj.sequences = message.sequences;
    }
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUnreceivedAcksResponse>): QueryUnreceivedAcksResponse {
    return QueryUnreceivedAcksResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUnreceivedAcksResponse>): QueryUnreceivedAcksResponse {
    const message = createBaseQueryUnreceivedAcksResponse();
    message.sequences = object.sequences?.map((e) => e) || [];
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    return message;
  },
};

function createBaseQueryNextSequenceReceiveRequest(): QueryNextSequenceReceiveRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryNextSequenceReceiveRequest = {
  $type: "ibc.core.channel.v1.QueryNextSequenceReceiveRequest" as const,

  encode(message: QueryNextSequenceReceiveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceReceiveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextSequenceReceiveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNextSequenceReceiveRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryNextSequenceReceiveRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNextSequenceReceiveRequest>): QueryNextSequenceReceiveRequest {
    return QueryNextSequenceReceiveRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveRequest>): QueryNextSequenceReceiveRequest {
    const message = createBaseQueryNextSequenceReceiveRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryNextSequenceReceiveResponse(): QueryNextSequenceReceiveResponse {
  return { next_sequence_receive: "0", proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryNextSequenceReceiveResponse = {
  $type: "ibc.core.channel.v1.QueryNextSequenceReceiveResponse" as const,

  encode(message: QueryNextSequenceReceiveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.next_sequence_receive !== "0") {
      writer.uint32(8).uint64(message.next_sequence_receive);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceReceiveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextSequenceReceiveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.next_sequence_receive = longToString(reader.uint64() as Long);
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

  fromJSON(object: any): QueryNextSequenceReceiveResponse {
    return {
      next_sequence_receive: isSet(object.next_sequence_receive)
        ? globalThis.String(object.next_sequence_receive)
        : "0",
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryNextSequenceReceiveResponse): unknown {
    const obj: any = {};
    if (message.next_sequence_receive !== undefined) {
      obj.next_sequence_receive = message.next_sequence_receive;
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNextSequenceReceiveResponse>): QueryNextSequenceReceiveResponse {
    return QueryNextSequenceReceiveResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNextSequenceReceiveResponse>): QueryNextSequenceReceiveResponse {
    const message = createBaseQueryNextSequenceReceiveResponse();
    message.next_sequence_receive = object.next_sequence_receive ?? "0";
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryNextSequenceSendRequest(): QueryNextSequenceSendRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryNextSequenceSendRequest = {
  $type: "ibc.core.channel.v1.QueryNextSequenceSendRequest" as const,

  encode(message: QueryNextSequenceSendRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceSendRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextSequenceSendRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNextSequenceSendRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryNextSequenceSendRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNextSequenceSendRequest>): QueryNextSequenceSendRequest {
    return QueryNextSequenceSendRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNextSequenceSendRequest>): QueryNextSequenceSendRequest {
    const message = createBaseQueryNextSequenceSendRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryNextSequenceSendResponse(): QueryNextSequenceSendResponse {
  return { next_sequence_send: "0", proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryNextSequenceSendResponse = {
  $type: "ibc.core.channel.v1.QueryNextSequenceSendResponse" as const,

  encode(message: QueryNextSequenceSendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.next_sequence_send !== "0") {
      writer.uint32(8).uint64(message.next_sequence_send);
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceSendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNextSequenceSendResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.next_sequence_send = longToString(reader.uint64() as Long);
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

  fromJSON(object: any): QueryNextSequenceSendResponse {
    return {
      next_sequence_send: isSet(object.next_sequence_send) ? globalThis.String(object.next_sequence_send) : "0",
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryNextSequenceSendResponse): unknown {
    const obj: any = {};
    if (message.next_sequence_send !== undefined) {
      obj.next_sequence_send = message.next_sequence_send;
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryNextSequenceSendResponse>): QueryNextSequenceSendResponse {
    return QueryNextSequenceSendResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryNextSequenceSendResponse>): QueryNextSequenceSendResponse {
    const message = createBaseQueryNextSequenceSendResponse();
    message.next_sequence_send = object.next_sequence_send ?? "0";
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryUpgradeErrorRequest(): QueryUpgradeErrorRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryUpgradeErrorRequest = {
  $type: "ibc.core.channel.v1.QueryUpgradeErrorRequest" as const,

  encode(message: QueryUpgradeErrorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeErrorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradeErrorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradeErrorRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryUpgradeErrorRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradeErrorRequest>): QueryUpgradeErrorRequest {
    return QueryUpgradeErrorRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradeErrorRequest>): QueryUpgradeErrorRequest {
    const message = createBaseQueryUpgradeErrorRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryUpgradeErrorResponse(): QueryUpgradeErrorResponse {
  return { error_receipt: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryUpgradeErrorResponse = {
  $type: "ibc.core.channel.v1.QueryUpgradeErrorResponse" as const,

  encode(message: QueryUpgradeErrorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error_receipt !== undefined) {
      ErrorReceipt.encode(message.error_receipt, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeErrorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradeErrorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error_receipt = ErrorReceipt.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryUpgradeErrorResponse {
    return {
      error_receipt: isSet(object.error_receipt) ? ErrorReceipt.fromJSON(object.error_receipt) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryUpgradeErrorResponse): unknown {
    const obj: any = {};
    if (message.error_receipt !== undefined) {
      obj.error_receipt = ErrorReceipt.toJSON(message.error_receipt);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradeErrorResponse>): QueryUpgradeErrorResponse {
    return QueryUpgradeErrorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradeErrorResponse>): QueryUpgradeErrorResponse {
    const message = createBaseQueryUpgradeErrorResponse();
    message.error_receipt = (object.error_receipt !== undefined && object.error_receipt !== null)
      ? ErrorReceipt.fromPartial(object.error_receipt)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryUpgradeRequest(): QueryUpgradeRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryUpgradeRequest = {
  $type: "ibc.core.channel.v1.QueryUpgradeRequest" as const,

  encode(message: QueryUpgradeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradeRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryUpgradeRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradeRequest>): QueryUpgradeRequest {
    return QueryUpgradeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradeRequest>): QueryUpgradeRequest {
    const message = createBaseQueryUpgradeRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryUpgradeResponse(): QueryUpgradeResponse {
  return { upgrade: undefined, proof: new Uint8Array(0), proof_height: undefined };
}

export const QueryUpgradeResponse = {
  $type: "ibc.core.channel.v1.QueryUpgradeResponse" as const,

  encode(message: QueryUpgradeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgrade = Upgrade.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryUpgradeResponse {
    return {
      upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
      proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
      proof_height: isSet(object.proof_height) ? Height.fromJSON(object.proof_height) : undefined,
    };
  },

  toJSON(message: QueryUpgradeResponse): unknown {
    const obj: any = {};
    if (message.upgrade !== undefined) {
      obj.upgrade = Upgrade.toJSON(message.upgrade);
    }
    if (message.proof !== undefined) {
      obj.proof = base64FromBytes(message.proof);
    }
    if (message.proof_height !== undefined) {
      obj.proof_height = Height.toJSON(message.proof_height);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryUpgradeResponse>): QueryUpgradeResponse {
    return QueryUpgradeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryUpgradeResponse>): QueryUpgradeResponse {
    const message = createBaseQueryUpgradeResponse();
    message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
      ? Upgrade.fromPartial(object.upgrade)
      : undefined;
    message.proof = object.proof ?? new Uint8Array(0);
    message.proof_height = (object.proof_height !== undefined && object.proof_height !== null)
      ? Height.fromPartial(object.proof_height)
      : undefined;
    return message;
  },
};

function createBaseQueryChannelParamsRequest(): QueryChannelParamsRequest {
  return {};
}

export const QueryChannelParamsRequest = {
  $type: "ibc.core.channel.v1.QueryChannelParamsRequest" as const,

  encode(_: QueryChannelParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelParamsRequest();
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

  fromJSON(_: any): QueryChannelParamsRequest {
    return {};
  },

  toJSON(_: QueryChannelParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryChannelParamsRequest>): QueryChannelParamsRequest {
    return QueryChannelParamsRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryChannelParamsRequest>): QueryChannelParamsRequest {
    const message = createBaseQueryChannelParamsRequest();
    return message;
  },
};

function createBaseQueryChannelParamsResponse(): QueryChannelParamsResponse {
  return { params: undefined };
}

export const QueryChannelParamsResponse = {
  $type: "ibc.core.channel.v1.QueryChannelParamsResponse" as const,

  encode(message: QueryChannelParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChannelParamsResponse();
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

  fromJSON(object: any): QueryChannelParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryChannelParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryChannelParamsResponse>): QueryChannelParamsResponse {
    return QueryChannelParamsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryChannelParamsResponse>): QueryChannelParamsResponse {
    const message = createBaseQueryChannelParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service */
export interface Query {
  /** Channel queries an IBC Channel. */
  Channel(request: DeepPartial<QueryChannelRequest>, metadata?: grpc.Metadata): Promise<QueryChannelResponse>;
  /** Channels queries all the IBC channels of a chain. */
  Channels(request: DeepPartial<QueryChannelsRequest>, metadata?: grpc.Metadata): Promise<QueryChannelsResponse>;
  /**
   * ConnectionChannels queries all the channels associated with a connection
   * end.
   */
  ConnectionChannels(
    request: DeepPartial<QueryConnectionChannelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionChannelsResponse>;
  /**
   * ChannelClientState queries for the client state for the channel associated
   * with the provided channel identifiers.
   */
  ChannelClientState(
    request: DeepPartial<QueryChannelClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelClientStateResponse>;
  /**
   * ChannelConsensusState queries for the consensus state for the channel
   * associated with the provided channel identifiers.
   */
  ChannelConsensusState(
    request: DeepPartial<QueryChannelConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelConsensusStateResponse>;
  /** PacketCommitment queries a stored packet commitment hash. */
  PacketCommitment(
    request: DeepPartial<QueryPacketCommitmentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketCommitmentResponse>;
  /**
   * PacketCommitments returns all the packet commitments hashes associated
   * with a channel.
   */
  PacketCommitments(
    request: DeepPartial<QueryPacketCommitmentsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketCommitmentsResponse>;
  /**
   * PacketReceipt queries if a given packet sequence has been received on the
   * queried chain
   */
  PacketReceipt(
    request: DeepPartial<QueryPacketReceiptRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketReceiptResponse>;
  /** PacketAcknowledgement queries a stored packet acknowledgement hash. */
  PacketAcknowledgement(
    request: DeepPartial<QueryPacketAcknowledgementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketAcknowledgementResponse>;
  /**
   * PacketAcknowledgements returns all the packet acknowledgements associated
   * with a channel.
   */
  PacketAcknowledgements(
    request: DeepPartial<QueryPacketAcknowledgementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketAcknowledgementsResponse>;
  /**
   * UnreceivedPackets returns all the unreceived IBC packets associated with a
   * channel and sequences.
   */
  UnreceivedPackets(
    request: DeepPartial<QueryUnreceivedPacketsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUnreceivedPacketsResponse>;
  /**
   * UnreceivedAcks returns all the unreceived IBC acknowledgements associated
   * with a channel and sequences.
   */
  UnreceivedAcks(
    request: DeepPartial<QueryUnreceivedAcksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUnreceivedAcksResponse>;
  /** NextSequenceReceive returns the next receive sequence for a given channel. */
  NextSequenceReceive(
    request: DeepPartial<QueryNextSequenceReceiveRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNextSequenceReceiveResponse>;
  /** NextSequenceSend returns the next send sequence for a given channel. */
  NextSequenceSend(
    request: DeepPartial<QueryNextSequenceSendRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNextSequenceSendResponse>;
  /** UpgradeError returns the error receipt if the upgrade handshake failed. */
  UpgradeError(
    request: DeepPartial<QueryUpgradeErrorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradeErrorResponse>;
  /** Upgrade returns the upgrade for a given port and channel id. */
  Upgrade(request: DeepPartial<QueryUpgradeRequest>, metadata?: grpc.Metadata): Promise<QueryUpgradeResponse>;
  /** ChannelParams queries all parameters of the ibc channel submodule. */
  ChannelParams(
    request: DeepPartial<QueryChannelParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Channel = this.Channel.bind(this);
    this.Channels = this.Channels.bind(this);
    this.ConnectionChannels = this.ConnectionChannels.bind(this);
    this.ChannelClientState = this.ChannelClientState.bind(this);
    this.ChannelConsensusState = this.ChannelConsensusState.bind(this);
    this.PacketCommitment = this.PacketCommitment.bind(this);
    this.PacketCommitments = this.PacketCommitments.bind(this);
    this.PacketReceipt = this.PacketReceipt.bind(this);
    this.PacketAcknowledgement = this.PacketAcknowledgement.bind(this);
    this.PacketAcknowledgements = this.PacketAcknowledgements.bind(this);
    this.UnreceivedPackets = this.UnreceivedPackets.bind(this);
    this.UnreceivedAcks = this.UnreceivedAcks.bind(this);
    this.NextSequenceReceive = this.NextSequenceReceive.bind(this);
    this.NextSequenceSend = this.NextSequenceSend.bind(this);
    this.UpgradeError = this.UpgradeError.bind(this);
    this.Upgrade = this.Upgrade.bind(this);
    this.ChannelParams = this.ChannelParams.bind(this);
  }

  Channel(request: DeepPartial<QueryChannelRequest>, metadata?: grpc.Metadata): Promise<QueryChannelResponse> {
    return this.rpc.unary(QueryChannelDesc, QueryChannelRequest.fromPartial(request), metadata);
  }

  Channels(request: DeepPartial<QueryChannelsRequest>, metadata?: grpc.Metadata): Promise<QueryChannelsResponse> {
    return this.rpc.unary(QueryChannelsDesc, QueryChannelsRequest.fromPartial(request), metadata);
  }

  ConnectionChannels(
    request: DeepPartial<QueryConnectionChannelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryConnectionChannelsResponse> {
    return this.rpc.unary(QueryConnectionChannelsDesc, QueryConnectionChannelsRequest.fromPartial(request), metadata);
  }

  ChannelClientState(
    request: DeepPartial<QueryChannelClientStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelClientStateResponse> {
    return this.rpc.unary(QueryChannelClientStateDesc, QueryChannelClientStateRequest.fromPartial(request), metadata);
  }

  ChannelConsensusState(
    request: DeepPartial<QueryChannelConsensusStateRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelConsensusStateResponse> {
    return this.rpc.unary(
      QueryChannelConsensusStateDesc,
      QueryChannelConsensusStateRequest.fromPartial(request),
      metadata,
    );
  }

  PacketCommitment(
    request: DeepPartial<QueryPacketCommitmentRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketCommitmentResponse> {
    return this.rpc.unary(QueryPacketCommitmentDesc, QueryPacketCommitmentRequest.fromPartial(request), metadata);
  }

  PacketCommitments(
    request: DeepPartial<QueryPacketCommitmentsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketCommitmentsResponse> {
    return this.rpc.unary(QueryPacketCommitmentsDesc, QueryPacketCommitmentsRequest.fromPartial(request), metadata);
  }

  PacketReceipt(
    request: DeepPartial<QueryPacketReceiptRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketReceiptResponse> {
    return this.rpc.unary(QueryPacketReceiptDesc, QueryPacketReceiptRequest.fromPartial(request), metadata);
  }

  PacketAcknowledgement(
    request: DeepPartial<QueryPacketAcknowledgementRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketAcknowledgementResponse> {
    return this.rpc.unary(
      QueryPacketAcknowledgementDesc,
      QueryPacketAcknowledgementRequest.fromPartial(request),
      metadata,
    );
  }

  PacketAcknowledgements(
    request: DeepPartial<QueryPacketAcknowledgementsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryPacketAcknowledgementsResponse> {
    return this.rpc.unary(
      QueryPacketAcknowledgementsDesc,
      QueryPacketAcknowledgementsRequest.fromPartial(request),
      metadata,
    );
  }

  UnreceivedPackets(
    request: DeepPartial<QueryUnreceivedPacketsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUnreceivedPacketsResponse> {
    return this.rpc.unary(QueryUnreceivedPacketsDesc, QueryUnreceivedPacketsRequest.fromPartial(request), metadata);
  }

  UnreceivedAcks(
    request: DeepPartial<QueryUnreceivedAcksRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUnreceivedAcksResponse> {
    return this.rpc.unary(QueryUnreceivedAcksDesc, QueryUnreceivedAcksRequest.fromPartial(request), metadata);
  }

  NextSequenceReceive(
    request: DeepPartial<QueryNextSequenceReceiveRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNextSequenceReceiveResponse> {
    return this.rpc.unary(QueryNextSequenceReceiveDesc, QueryNextSequenceReceiveRequest.fromPartial(request), metadata);
  }

  NextSequenceSend(
    request: DeepPartial<QueryNextSequenceSendRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryNextSequenceSendResponse> {
    return this.rpc.unary(QueryNextSequenceSendDesc, QueryNextSequenceSendRequest.fromPartial(request), metadata);
  }

  UpgradeError(
    request: DeepPartial<QueryUpgradeErrorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryUpgradeErrorResponse> {
    return this.rpc.unary(QueryUpgradeErrorDesc, QueryUpgradeErrorRequest.fromPartial(request), metadata);
  }

  Upgrade(request: DeepPartial<QueryUpgradeRequest>, metadata?: grpc.Metadata): Promise<QueryUpgradeResponse> {
    return this.rpc.unary(QueryUpgradeDesc, QueryUpgradeRequest.fromPartial(request), metadata);
  }

  ChannelParams(
    request: DeepPartial<QueryChannelParamsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryChannelParamsResponse> {
    return this.rpc.unary(QueryChannelParamsDesc, QueryChannelParamsRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "ibc.core.channel.v1.Query" };

export const QueryChannelDesc: UnaryMethodDefinitionish = {
  methodName: "Channel",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryChannelRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryChannelResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryChannelsDesc: UnaryMethodDefinitionish = {
  methodName: "Channels",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryChannelsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryChannelsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryConnectionChannelsDesc: UnaryMethodDefinitionish = {
  methodName: "ConnectionChannels",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryConnectionChannelsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryConnectionChannelsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryChannelClientStateDesc: UnaryMethodDefinitionish = {
  methodName: "ChannelClientState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryChannelClientStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryChannelClientStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryChannelConsensusStateDesc: UnaryMethodDefinitionish = {
  methodName: "ChannelConsensusState",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryChannelConsensusStateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryChannelConsensusStateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPacketCommitmentDesc: UnaryMethodDefinitionish = {
  methodName: "PacketCommitment",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPacketCommitmentRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPacketCommitmentResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPacketCommitmentsDesc: UnaryMethodDefinitionish = {
  methodName: "PacketCommitments",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPacketCommitmentsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPacketCommitmentsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPacketReceiptDesc: UnaryMethodDefinitionish = {
  methodName: "PacketReceipt",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPacketReceiptRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPacketReceiptResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPacketAcknowledgementDesc: UnaryMethodDefinitionish = {
  methodName: "PacketAcknowledgement",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPacketAcknowledgementRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPacketAcknowledgementResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPacketAcknowledgementsDesc: UnaryMethodDefinitionish = {
  methodName: "PacketAcknowledgements",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPacketAcknowledgementsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPacketAcknowledgementsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUnreceivedPacketsDesc: UnaryMethodDefinitionish = {
  methodName: "UnreceivedPackets",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUnreceivedPacketsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUnreceivedPacketsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUnreceivedAcksDesc: UnaryMethodDefinitionish = {
  methodName: "UnreceivedAcks",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUnreceivedAcksRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUnreceivedAcksResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryNextSequenceReceiveDesc: UnaryMethodDefinitionish = {
  methodName: "NextSequenceReceive",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryNextSequenceReceiveRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryNextSequenceReceiveResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryNextSequenceSendDesc: UnaryMethodDefinitionish = {
  methodName: "NextSequenceSend",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryNextSequenceSendRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryNextSequenceSendResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUpgradeErrorDesc: UnaryMethodDefinitionish = {
  methodName: "UpgradeError",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUpgradeErrorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUpgradeErrorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryUpgradeDesc: UnaryMethodDefinitionish = {
  methodName: "Upgrade",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryUpgradeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryUpgradeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryChannelParamsDesc: UnaryMethodDefinitionish = {
  methodName: "ChannelParams",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryChannelParamsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryChannelParamsResponse.decode(data);
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
