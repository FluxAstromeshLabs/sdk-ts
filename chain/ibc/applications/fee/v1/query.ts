/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
import { FeeEnabledChannel } from "./genesis";

/** QueryIncentivizedPacketsRequest defines the request type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination:
    | PageRequest
    | undefined;
  /** block height at which to query */
  query_height: string;
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsResponse {
  /** list of identified fees for incentivized packets */
  incentivized_packets: IdentifiedPacketFees[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryIncentivizedPacketRequest defines the request type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketRequest {
  /** unique packet identifier comprised of channel ID, port ID and sequence */
  packet_id:
    | PacketId
    | undefined;
  /** block height at which to query */
  query_height: string;
}

/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketResponse {
  /** the identified fees for the incentivized packet */
  incentivized_packet: IdentifiedPacketFees | undefined;
}

/**
 * QueryIncentivizedPacketsForChannelRequest defines the request type for querying for all incentivized packets
 * for a specific channel
 */
export interface QueryIncentivizedPacketsForChannelRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
  port_id: string;
  channel_id: string;
  /** Height to query at */
  query_height: string;
}

/** QueryIncentivizedPacketsResponse defines the response type for the incentivized packets RPC */
export interface QueryIncentivizedPacketsForChannelResponse {
  /** Map of all incentivized_packets */
  incentivized_packets: IdentifiedPacketFees[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryTotalRecvFeesRequest defines the request type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesRequest {
  /** the packet identifier for the associated fees */
  packet_id: PacketId | undefined;
}

/** QueryTotalRecvFeesResponse defines the response type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesResponse {
  /** the total packet receive fees */
  recv_fees: Coin[];
}

/** QueryTotalAckFeesRequest defines the request type for the TotalAckFees rpc */
export interface QueryTotalAckFeesRequest {
  /** the packet identifier for the associated fees */
  packet_id: PacketId | undefined;
}

/** QueryTotalAckFeesResponse defines the response type for the TotalAckFees rpc */
export interface QueryTotalAckFeesResponse {
  /** the total packet acknowledgement fees */
  ack_fees: Coin[];
}

/** QueryTotalTimeoutFeesRequest defines the request type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesRequest {
  /** the packet identifier for the associated fees */
  packet_id: PacketId | undefined;
}

/** QueryTotalTimeoutFeesResponse defines the response type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesResponse {
  /** the total packet timeout fees */
  timeout_fees: Coin[];
}

/** QueryPayeeRequest defines the request type for the Payee rpc */
export interface QueryPayeeRequest {
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address to which the distribution address is registered */
  relayer: string;
}

/** QueryPayeeResponse defines the response type for the Payee rpc */
export interface QueryPayeeResponse {
  /** the payee address to which packet fees are paid out */
  payee_address: string;
}

/** QueryCounterpartyPayeeRequest defines the request type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeRequest {
  /** unique channel identifier */
  channel_id: string;
  /** the relayer address to which the counterparty is registered */
  relayer: string;
}

/** QueryCounterpartyPayeeResponse defines the response type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeResponse {
  /** the counterparty payee address used to compensate forward relaying */
  counterparty_payee: string;
}

/** QueryFeeEnabledChannelsRequest defines the request type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination:
    | PageRequest
    | undefined;
  /** block height at which to query */
  query_height: string;
}

/** QueryFeeEnabledChannelsResponse defines the response type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsResponse {
  /** list of fee enabled channels */
  fee_enabled_channels: FeeEnabledChannel[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryFeeEnabledChannelRequest defines the request type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelRequest {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
}

/** QueryFeeEnabledChannelResponse defines the response type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelResponse {
  /** boolean flag representing the fee enabled channel status */
  fee_enabled: boolean;
}

function createBaseQueryIncentivizedPacketsRequest(): QueryIncentivizedPacketsRequest {
  return { pagination: undefined, query_height: "0" };
}

export const QueryIncentivizedPacketsRequest = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketsRequest" as const,

  encode(message: QueryIncentivizedPacketsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.query_height !== "0") {
      writer.uint32(16).uint64(message.query_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.query_height = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      query_height: isSet(object.query_height) ? globalThis.String(object.query_height) : "0",
    };
  },

  toJSON(message: QueryIncentivizedPacketsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.query_height !== undefined) {
      obj.query_height = message.query_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketsRequest>): QueryIncentivizedPacketsRequest {
    return QueryIncentivizedPacketsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryIncentivizedPacketsRequest>): QueryIncentivizedPacketsRequest {
    const message = createBaseQueryIncentivizedPacketsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.query_height = object.query_height ?? "0";
    return message;
  },
};

function createBaseQueryIncentivizedPacketsResponse(): QueryIncentivizedPacketsResponse {
  return { incentivized_packets: [], pagination: undefined };
}

export const QueryIncentivizedPacketsResponse = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketsResponse" as const,

  encode(message: QueryIncentivizedPacketsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentivized_packets) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivized_packets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryIncentivizedPacketsResponse {
    return {
      incentivized_packets: globalThis.Array.isArray(object?.incentivized_packets)
        ? object.incentivized_packets.map((e: any) => IdentifiedPacketFees.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketsResponse): unknown {
    const obj: any = {};
    if (message.incentivized_packets?.length) {
      obj.incentivized_packets = message.incentivized_packets.map((e) => IdentifiedPacketFees.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketsResponse>): QueryIncentivizedPacketsResponse {
    return QueryIncentivizedPacketsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryIncentivizedPacketsResponse>): QueryIncentivizedPacketsResponse {
    const message = createBaseQueryIncentivizedPacketsResponse();
    message.incentivized_packets = object.incentivized_packets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryIncentivizedPacketRequest(): QueryIncentivizedPacketRequest {
  return { packet_id: undefined, query_height: "0" };
}

export const QueryIncentivizedPacketRequest = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketRequest" as const,

  encode(message: QueryIncentivizedPacketRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.query_height !== "0") {
      writer.uint32(16).uint64(message.query_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet_id = PacketId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.query_height = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketRequest {
    return {
      packet_id: isSet(object.packet_id) ? PacketId.fromJSON(object.packet_id) : undefined,
      query_height: isSet(object.query_height) ? globalThis.String(object.query_height) : "0",
    };
  },

  toJSON(message: QueryIncentivizedPacketRequest): unknown {
    const obj: any = {};
    if (message.packet_id !== undefined) {
      obj.packet_id = PacketId.toJSON(message.packet_id);
    }
    if (message.query_height !== undefined) {
      obj.query_height = message.query_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketRequest>): QueryIncentivizedPacketRequest {
    return QueryIncentivizedPacketRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryIncentivizedPacketRequest>): QueryIncentivizedPacketRequest {
    const message = createBaseQueryIncentivizedPacketRequest();
    message.packet_id = (object.packet_id !== undefined && object.packet_id !== null)
      ? PacketId.fromPartial(object.packet_id)
      : undefined;
    message.query_height = object.query_height ?? "0";
    return message;
  },
};

function createBaseQueryIncentivizedPacketResponse(): QueryIncentivizedPacketResponse {
  return { incentivized_packet: undefined };
}

export const QueryIncentivizedPacketResponse = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketResponse" as const,

  encode(message: QueryIncentivizedPacketResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.incentivized_packet !== undefined) {
      IdentifiedPacketFees.encode(message.incentivized_packet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivized_packet = IdentifiedPacketFees.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketResponse {
    return {
      incentivized_packet: isSet(object.incentivized_packet)
        ? IdentifiedPacketFees.fromJSON(object.incentivized_packet)
        : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketResponse): unknown {
    const obj: any = {};
    if (message.incentivized_packet !== undefined) {
      obj.incentivized_packet = IdentifiedPacketFees.toJSON(message.incentivized_packet);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketResponse>): QueryIncentivizedPacketResponse {
    return QueryIncentivizedPacketResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryIncentivizedPacketResponse>): QueryIncentivizedPacketResponse {
    const message = createBaseQueryIncentivizedPacketResponse();
    message.incentivized_packet = (object.incentivized_packet !== undefined && object.incentivized_packet !== null)
      ? IdentifiedPacketFees.fromPartial(object.incentivized_packet)
      : undefined;
    return message;
  },
};

function createBaseQueryIncentivizedPacketsForChannelRequest(): QueryIncentivizedPacketsForChannelRequest {
  return { pagination: undefined, port_id: "", channel_id: "", query_height: "0" };
}

export const QueryIncentivizedPacketsForChannelRequest = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelRequest" as const,

  encode(message: QueryIncentivizedPacketsForChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.query_height !== "0") {
      writer.uint32(32).uint64(message.query_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsForChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.query_height = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPacketsForChannelRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      query_height: isSet(object.query_height) ? globalThis.String(object.query_height) : "0",
    };
  },

  toJSON(message: QueryIncentivizedPacketsForChannelRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.query_height !== undefined) {
      obj.query_height = message.query_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketsForChannelRequest>): QueryIncentivizedPacketsForChannelRequest {
    return QueryIncentivizedPacketsForChannelRequest.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<QueryIncentivizedPacketsForChannelRequest>,
  ): QueryIncentivizedPacketsForChannelRequest {
    const message = createBaseQueryIncentivizedPacketsForChannelRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.query_height = object.query_height ?? "0";
    return message;
  },
};

function createBaseQueryIncentivizedPacketsForChannelResponse(): QueryIncentivizedPacketsForChannelResponse {
  return { incentivized_packets: [], pagination: undefined };
}

export const QueryIncentivizedPacketsForChannelResponse = {
  $type: "ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelResponse" as const,

  encode(message: QueryIncentivizedPacketsForChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentivized_packets) {
      IdentifiedPacketFees.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPacketsForChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivized_packets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryIncentivizedPacketsForChannelResponse {
    return {
      incentivized_packets: globalThis.Array.isArray(object?.incentivized_packets)
        ? object.incentivized_packets.map((e: any) => IdentifiedPacketFees.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryIncentivizedPacketsForChannelResponse): unknown {
    const obj: any = {};
    if (message.incentivized_packets?.length) {
      obj.incentivized_packets = message.incentivized_packets.map((e) => IdentifiedPacketFees.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryIncentivizedPacketsForChannelResponse>): QueryIncentivizedPacketsForChannelResponse {
    return QueryIncentivizedPacketsForChannelResponse.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<QueryIncentivizedPacketsForChannelResponse>,
  ): QueryIncentivizedPacketsForChannelResponse {
    const message = createBaseQueryIncentivizedPacketsForChannelResponse();
    message.incentivized_packets = object.incentivized_packets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalRecvFeesRequest(): QueryTotalRecvFeesRequest {
  return { packet_id: undefined };
}

export const QueryTotalRecvFeesRequest = {
  $type: "ibc.applications.fee.v1.QueryTotalRecvFeesRequest" as const,

  encode(message: QueryTotalRecvFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalRecvFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet_id = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalRecvFeesRequest {
    return { packet_id: isSet(object.packet_id) ? PacketId.fromJSON(object.packet_id) : undefined };
  },

  toJSON(message: QueryTotalRecvFeesRequest): unknown {
    const obj: any = {};
    if (message.packet_id !== undefined) {
      obj.packet_id = PacketId.toJSON(message.packet_id);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalRecvFeesRequest>): QueryTotalRecvFeesRequest {
    return QueryTotalRecvFeesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalRecvFeesRequest>): QueryTotalRecvFeesRequest {
    const message = createBaseQueryTotalRecvFeesRequest();
    message.packet_id = (object.packet_id !== undefined && object.packet_id !== null)
      ? PacketId.fromPartial(object.packet_id)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalRecvFeesResponse(): QueryTotalRecvFeesResponse {
  return { recv_fees: [] };
}

export const QueryTotalRecvFeesResponse = {
  $type: "ibc.applications.fee.v1.QueryTotalRecvFeesResponse" as const,

  encode(message: QueryTotalRecvFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.recv_fees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalRecvFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recv_fees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalRecvFeesResponse {
    return {
      recv_fees: globalThis.Array.isArray(object?.recv_fees) ? object.recv_fees.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalRecvFeesResponse): unknown {
    const obj: any = {};
    if (message.recv_fees?.length) {
      obj.recv_fees = message.recv_fees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalRecvFeesResponse>): QueryTotalRecvFeesResponse {
    return QueryTotalRecvFeesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalRecvFeesResponse>): QueryTotalRecvFeesResponse {
    const message = createBaseQueryTotalRecvFeesResponse();
    message.recv_fees = object.recv_fees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalAckFeesRequest(): QueryTotalAckFeesRequest {
  return { packet_id: undefined };
}

export const QueryTotalAckFeesRequest = {
  $type: "ibc.applications.fee.v1.QueryTotalAckFeesRequest" as const,

  encode(message: QueryTotalAckFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalAckFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet_id = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalAckFeesRequest {
    return { packet_id: isSet(object.packet_id) ? PacketId.fromJSON(object.packet_id) : undefined };
  },

  toJSON(message: QueryTotalAckFeesRequest): unknown {
    const obj: any = {};
    if (message.packet_id !== undefined) {
      obj.packet_id = PacketId.toJSON(message.packet_id);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalAckFeesRequest>): QueryTotalAckFeesRequest {
    return QueryTotalAckFeesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalAckFeesRequest>): QueryTotalAckFeesRequest {
    const message = createBaseQueryTotalAckFeesRequest();
    message.packet_id = (object.packet_id !== undefined && object.packet_id !== null)
      ? PacketId.fromPartial(object.packet_id)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalAckFeesResponse(): QueryTotalAckFeesResponse {
  return { ack_fees: [] };
}

export const QueryTotalAckFeesResponse = {
  $type: "ibc.applications.fee.v1.QueryTotalAckFeesResponse" as const,

  encode(message: QueryTotalAckFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ack_fees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalAckFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ack_fees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalAckFeesResponse {
    return {
      ack_fees: globalThis.Array.isArray(object?.ack_fees) ? object.ack_fees.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalAckFeesResponse): unknown {
    const obj: any = {};
    if (message.ack_fees?.length) {
      obj.ack_fees = message.ack_fees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalAckFeesResponse>): QueryTotalAckFeesResponse {
    return QueryTotalAckFeesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalAckFeesResponse>): QueryTotalAckFeesResponse {
    const message = createBaseQueryTotalAckFeesResponse();
    message.ack_fees = object.ack_fees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalTimeoutFeesRequest(): QueryTotalTimeoutFeesRequest {
  return { packet_id: undefined };
}

export const QueryTotalTimeoutFeesRequest = {
  $type: "ibc.applications.fee.v1.QueryTotalTimeoutFeesRequest" as const,

  encode(message: QueryTotalTimeoutFeesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet_id !== undefined) {
      PacketId.encode(message.packet_id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalTimeoutFeesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet_id = PacketId.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalTimeoutFeesRequest {
    return { packet_id: isSet(object.packet_id) ? PacketId.fromJSON(object.packet_id) : undefined };
  },

  toJSON(message: QueryTotalTimeoutFeesRequest): unknown {
    const obj: any = {};
    if (message.packet_id !== undefined) {
      obj.packet_id = PacketId.toJSON(message.packet_id);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalTimeoutFeesRequest>): QueryTotalTimeoutFeesRequest {
    return QueryTotalTimeoutFeesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalTimeoutFeesRequest>): QueryTotalTimeoutFeesRequest {
    const message = createBaseQueryTotalTimeoutFeesRequest();
    message.packet_id = (object.packet_id !== undefined && object.packet_id !== null)
      ? PacketId.fromPartial(object.packet_id)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalTimeoutFeesResponse(): QueryTotalTimeoutFeesResponse {
  return { timeout_fees: [] };
}

export const QueryTotalTimeoutFeesResponse = {
  $type: "ibc.applications.fee.v1.QueryTotalTimeoutFeesResponse" as const,

  encode(message: QueryTotalTimeoutFeesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.timeout_fees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalTimeoutFeesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timeout_fees.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalTimeoutFeesResponse {
    return {
      timeout_fees: globalThis.Array.isArray(object?.timeout_fees)
        ? object.timeout_fees.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryTotalTimeoutFeesResponse): unknown {
    const obj: any = {};
    if (message.timeout_fees?.length) {
      obj.timeout_fees = message.timeout_fees.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalTimeoutFeesResponse>): QueryTotalTimeoutFeesResponse {
    return QueryTotalTimeoutFeesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalTimeoutFeesResponse>): QueryTotalTimeoutFeesResponse {
    const message = createBaseQueryTotalTimeoutFeesResponse();
    message.timeout_fees = object.timeout_fees?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryPayeeRequest(): QueryPayeeRequest {
  return { channel_id: "", relayer: "" };
}

export const QueryPayeeRequest = {
  $type: "ibc.applications.fee.v1.QueryPayeeRequest" as const,

  encode(message: QueryPayeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPayeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relayer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPayeeRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      relayer: isSet(object.relayer) ? globalThis.String(object.relayer) : "",
    };
  },

  toJSON(message: QueryPayeeRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.relayer !== undefined) {
      obj.relayer = message.relayer;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPayeeRequest>): QueryPayeeRequest {
    return QueryPayeeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPayeeRequest>): QueryPayeeRequest {
    const message = createBaseQueryPayeeRequest();
    message.channel_id = object.channel_id ?? "";
    message.relayer = object.relayer ?? "";
    return message;
  },
};

function createBaseQueryPayeeResponse(): QueryPayeeResponse {
  return { payee_address: "" };
}

export const QueryPayeeResponse = {
  $type: "ibc.applications.fee.v1.QueryPayeeResponse" as const,

  encode(message: QueryPayeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payee_address !== "") {
      writer.uint32(10).string(message.payee_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPayeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.payee_address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPayeeResponse {
    return { payee_address: isSet(object.payee_address) ? globalThis.String(object.payee_address) : "" };
  },

  toJSON(message: QueryPayeeResponse): unknown {
    const obj: any = {};
    if (message.payee_address !== undefined) {
      obj.payee_address = message.payee_address;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryPayeeResponse>): QueryPayeeResponse {
    return QueryPayeeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryPayeeResponse>): QueryPayeeResponse {
    const message = createBaseQueryPayeeResponse();
    message.payee_address = object.payee_address ?? "";
    return message;
  },
};

function createBaseQueryCounterpartyPayeeRequest(): QueryCounterpartyPayeeRequest {
  return { channel_id: "", relayer: "" };
}

export const QueryCounterpartyPayeeRequest = {
  $type: "ibc.applications.fee.v1.QueryCounterpartyPayeeRequest" as const,

  encode(message: QueryCounterpartyPayeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel_id !== "") {
      writer.uint32(10).string(message.channel_id);
    }
    if (message.relayer !== "") {
      writer.uint32(18).string(message.relayer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterpartyPayeeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.relayer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCounterpartyPayeeRequest {
    return {
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      relayer: isSet(object.relayer) ? globalThis.String(object.relayer) : "",
    };
  },

  toJSON(message: QueryCounterpartyPayeeRequest): unknown {
    const obj: any = {};
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    if (message.relayer !== undefined) {
      obj.relayer = message.relayer;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryCounterpartyPayeeRequest>): QueryCounterpartyPayeeRequest {
    return QueryCounterpartyPayeeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryCounterpartyPayeeRequest>): QueryCounterpartyPayeeRequest {
    const message = createBaseQueryCounterpartyPayeeRequest();
    message.channel_id = object.channel_id ?? "";
    message.relayer = object.relayer ?? "";
    return message;
  },
};

function createBaseQueryCounterpartyPayeeResponse(): QueryCounterpartyPayeeResponse {
  return { counterparty_payee: "" };
}

export const QueryCounterpartyPayeeResponse = {
  $type: "ibc.applications.fee.v1.QueryCounterpartyPayeeResponse" as const,

  encode(message: QueryCounterpartyPayeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.counterparty_payee !== "") {
      writer.uint32(10).string(message.counterparty_payee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterpartyPayeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.counterparty_payee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCounterpartyPayeeResponse {
    return { counterparty_payee: isSet(object.counterparty_payee) ? globalThis.String(object.counterparty_payee) : "" };
  },

  toJSON(message: QueryCounterpartyPayeeResponse): unknown {
    const obj: any = {};
    if (message.counterparty_payee !== undefined) {
      obj.counterparty_payee = message.counterparty_payee;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryCounterpartyPayeeResponse>): QueryCounterpartyPayeeResponse {
    return QueryCounterpartyPayeeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryCounterpartyPayeeResponse>): QueryCounterpartyPayeeResponse {
    const message = createBaseQueryCounterpartyPayeeResponse();
    message.counterparty_payee = object.counterparty_payee ?? "";
    return message;
  },
};

function createBaseQueryFeeEnabledChannelsRequest(): QueryFeeEnabledChannelsRequest {
  return { pagination: undefined, query_height: "0" };
}

export const QueryFeeEnabledChannelsRequest = {
  $type: "ibc.applications.fee.v1.QueryFeeEnabledChannelsRequest" as const,

  encode(message: QueryFeeEnabledChannelsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.query_height !== "0") {
      writer.uint32(16).uint64(message.query_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.query_height = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFeeEnabledChannelsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      query_height: isSet(object.query_height) ? globalThis.String(object.query_height) : "0",
    };
  },

  toJSON(message: QueryFeeEnabledChannelsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.query_height !== undefined) {
      obj.query_height = message.query_height;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryFeeEnabledChannelsRequest>): QueryFeeEnabledChannelsRequest {
    return QueryFeeEnabledChannelsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryFeeEnabledChannelsRequest>): QueryFeeEnabledChannelsRequest {
    const message = createBaseQueryFeeEnabledChannelsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.query_height = object.query_height ?? "0";
    return message;
  },
};

function createBaseQueryFeeEnabledChannelsResponse(): QueryFeeEnabledChannelsResponse {
  return { fee_enabled_channels: [], pagination: undefined };
}

export const QueryFeeEnabledChannelsResponse = {
  $type: "ibc.applications.fee.v1.QueryFeeEnabledChannelsResponse" as const,

  encode(message: QueryFeeEnabledChannelsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fee_enabled_channels) {
      FeeEnabledChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fee_enabled_channels.push(FeeEnabledChannel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryFeeEnabledChannelsResponse {
    return {
      fee_enabled_channels: globalThis.Array.isArray(object?.fee_enabled_channels)
        ? object.fee_enabled_channels.map((e: any) => FeeEnabledChannel.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryFeeEnabledChannelsResponse): unknown {
    const obj: any = {};
    if (message.fee_enabled_channels?.length) {
      obj.fee_enabled_channels = message.fee_enabled_channels.map((e) => FeeEnabledChannel.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryFeeEnabledChannelsResponse>): QueryFeeEnabledChannelsResponse {
    return QueryFeeEnabledChannelsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryFeeEnabledChannelsResponse>): QueryFeeEnabledChannelsResponse {
    const message = createBaseQueryFeeEnabledChannelsResponse();
    message.fee_enabled_channels = object.fee_enabled_channels?.map((e) => FeeEnabledChannel.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryFeeEnabledChannelRequest(): QueryFeeEnabledChannelRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryFeeEnabledChannelRequest = {
  $type: "ibc.applications.fee.v1.QueryFeeEnabledChannelRequest" as const,

  encode(message: QueryFeeEnabledChannelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelRequest();
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

  fromJSON(object: any): QueryFeeEnabledChannelRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryFeeEnabledChannelRequest): unknown {
    const obj: any = {};
    if (message.port_id !== undefined) {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== undefined) {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryFeeEnabledChannelRequest>): QueryFeeEnabledChannelRequest {
    return QueryFeeEnabledChannelRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryFeeEnabledChannelRequest>): QueryFeeEnabledChannelRequest {
    const message = createBaseQueryFeeEnabledChannelRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryFeeEnabledChannelResponse(): QueryFeeEnabledChannelResponse {
  return { fee_enabled: false };
}

export const QueryFeeEnabledChannelResponse = {
  $type: "ibc.applications.fee.v1.QueryFeeEnabledChannelResponse" as const,

  encode(message: QueryFeeEnabledChannelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fee_enabled === true) {
      writer.uint32(8).bool(message.fee_enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeEnabledChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fee_enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFeeEnabledChannelResponse {
    return { fee_enabled: isSet(object.fee_enabled) ? globalThis.Boolean(object.fee_enabled) : false };
  },

  toJSON(message: QueryFeeEnabledChannelResponse): unknown {
    const obj: any = {};
    if (message.fee_enabled !== undefined) {
      obj.fee_enabled = message.fee_enabled;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryFeeEnabledChannelResponse>): QueryFeeEnabledChannelResponse {
    return QueryFeeEnabledChannelResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryFeeEnabledChannelResponse>): QueryFeeEnabledChannelResponse {
    const message = createBaseQueryFeeEnabledChannelResponse();
    message.fee_enabled = object.fee_enabled ?? false;
    return message;
  },
};

/** Query defines the ICS29 gRPC querier service. */
export interface Query {
  /** IncentivizedPackets returns all incentivized packets and their associated fees */
  IncentivizedPackets(
    request: DeepPartial<QueryIncentivizedPacketsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketsResponse>;
  /** IncentivizedPacket returns all packet fees for a packet given its identifier */
  IncentivizedPacket(
    request: DeepPartial<QueryIncentivizedPacketRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketResponse>;
  /** Gets all incentivized packets for a specific channel */
  IncentivizedPacketsForChannel(
    request: DeepPartial<QueryIncentivizedPacketsForChannelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketsForChannelResponse>;
  /** TotalRecvFees returns the total receive fees for a packet given its identifier */
  TotalRecvFees(
    request: DeepPartial<QueryTotalRecvFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalRecvFeesResponse>;
  /** TotalAckFees returns the total acknowledgement fees for a packet given its identifier */
  TotalAckFees(
    request: DeepPartial<QueryTotalAckFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalAckFeesResponse>;
  /** TotalTimeoutFees returns the total timeout fees for a packet given its identifier */
  TotalTimeoutFees(
    request: DeepPartial<QueryTotalTimeoutFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalTimeoutFeesResponse>;
  /** Payee returns the registered payee address for a specific channel given the relayer address */
  Payee(request: DeepPartial<QueryPayeeRequest>, metadata?: grpc.Metadata): Promise<QueryPayeeResponse>;
  /** CounterpartyPayee returns the registered counterparty payee for forward relaying */
  CounterpartyPayee(
    request: DeepPartial<QueryCounterpartyPayeeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCounterpartyPayeeResponse>;
  /** FeeEnabledChannels returns a list of all fee enabled channels */
  FeeEnabledChannels(
    request: DeepPartial<QueryFeeEnabledChannelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryFeeEnabledChannelsResponse>;
  /** FeeEnabledChannel returns true if the provided port and channel identifiers belong to a fee enabled channel */
  FeeEnabledChannel(
    request: DeepPartial<QueryFeeEnabledChannelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryFeeEnabledChannelResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IncentivizedPackets = this.IncentivizedPackets.bind(this);
    this.IncentivizedPacket = this.IncentivizedPacket.bind(this);
    this.IncentivizedPacketsForChannel = this.IncentivizedPacketsForChannel.bind(this);
    this.TotalRecvFees = this.TotalRecvFees.bind(this);
    this.TotalAckFees = this.TotalAckFees.bind(this);
    this.TotalTimeoutFees = this.TotalTimeoutFees.bind(this);
    this.Payee = this.Payee.bind(this);
    this.CounterpartyPayee = this.CounterpartyPayee.bind(this);
    this.FeeEnabledChannels = this.FeeEnabledChannels.bind(this);
    this.FeeEnabledChannel = this.FeeEnabledChannel.bind(this);
  }

  IncentivizedPackets(
    request: DeepPartial<QueryIncentivizedPacketsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketsResponse> {
    return this.rpc.unary(QueryIncentivizedPacketsDesc, QueryIncentivizedPacketsRequest.fromPartial(request), metadata);
  }

  IncentivizedPacket(
    request: DeepPartial<QueryIncentivizedPacketRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketResponse> {
    return this.rpc.unary(QueryIncentivizedPacketDesc, QueryIncentivizedPacketRequest.fromPartial(request), metadata);
  }

  IncentivizedPacketsForChannel(
    request: DeepPartial<QueryIncentivizedPacketsForChannelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryIncentivizedPacketsForChannelResponse> {
    return this.rpc.unary(
      QueryIncentivizedPacketsForChannelDesc,
      QueryIncentivizedPacketsForChannelRequest.fromPartial(request),
      metadata,
    );
  }

  TotalRecvFees(
    request: DeepPartial<QueryTotalRecvFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalRecvFeesResponse> {
    return this.rpc.unary(QueryTotalRecvFeesDesc, QueryTotalRecvFeesRequest.fromPartial(request), metadata);
  }

  TotalAckFees(
    request: DeepPartial<QueryTotalAckFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalAckFeesResponse> {
    return this.rpc.unary(QueryTotalAckFeesDesc, QueryTotalAckFeesRequest.fromPartial(request), metadata);
  }

  TotalTimeoutFees(
    request: DeepPartial<QueryTotalTimeoutFeesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalTimeoutFeesResponse> {
    return this.rpc.unary(QueryTotalTimeoutFeesDesc, QueryTotalTimeoutFeesRequest.fromPartial(request), metadata);
  }

  Payee(request: DeepPartial<QueryPayeeRequest>, metadata?: grpc.Metadata): Promise<QueryPayeeResponse> {
    return this.rpc.unary(QueryPayeeDesc, QueryPayeeRequest.fromPartial(request), metadata);
  }

  CounterpartyPayee(
    request: DeepPartial<QueryCounterpartyPayeeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryCounterpartyPayeeResponse> {
    return this.rpc.unary(QueryCounterpartyPayeeDesc, QueryCounterpartyPayeeRequest.fromPartial(request), metadata);
  }

  FeeEnabledChannels(
    request: DeepPartial<QueryFeeEnabledChannelsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryFeeEnabledChannelsResponse> {
    return this.rpc.unary(QueryFeeEnabledChannelsDesc, QueryFeeEnabledChannelsRequest.fromPartial(request), metadata);
  }

  FeeEnabledChannel(
    request: DeepPartial<QueryFeeEnabledChannelRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryFeeEnabledChannelResponse> {
    return this.rpc.unary(QueryFeeEnabledChannelDesc, QueryFeeEnabledChannelRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "ibc.applications.fee.v1.Query" };

export const QueryIncentivizedPacketsDesc: UnaryMethodDefinitionish = {
  methodName: "IncentivizedPackets",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryIncentivizedPacketsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryIncentivizedPacketsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryIncentivizedPacketDesc: UnaryMethodDefinitionish = {
  methodName: "IncentivizedPacket",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryIncentivizedPacketRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryIncentivizedPacketResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryIncentivizedPacketsForChannelDesc: UnaryMethodDefinitionish = {
  methodName: "IncentivizedPacketsForChannel",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryIncentivizedPacketsForChannelRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryIncentivizedPacketsForChannelResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryTotalRecvFeesDesc: UnaryMethodDefinitionish = {
  methodName: "TotalRecvFees",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryTotalRecvFeesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryTotalRecvFeesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryTotalAckFeesDesc: UnaryMethodDefinitionish = {
  methodName: "TotalAckFees",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryTotalAckFeesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryTotalAckFeesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryTotalTimeoutFeesDesc: UnaryMethodDefinitionish = {
  methodName: "TotalTimeoutFees",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryTotalTimeoutFeesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryTotalTimeoutFeesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryPayeeDesc: UnaryMethodDefinitionish = {
  methodName: "Payee",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryPayeeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryPayeeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryCounterpartyPayeeDesc: UnaryMethodDefinitionish = {
  methodName: "CounterpartyPayee",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryCounterpartyPayeeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryCounterpartyPayeeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryFeeEnabledChannelsDesc: UnaryMethodDefinitionish = {
  methodName: "FeeEnabledChannels",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryFeeEnabledChannelsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryFeeEnabledChannelsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryFeeEnabledChannelDesc: UnaryMethodDefinitionish = {
  methodName: "FeeEnabledChannel",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryFeeEnabledChannelRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryFeeEnabledChannelResponse.decode(data);
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
