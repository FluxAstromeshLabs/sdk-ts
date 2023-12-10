/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Block } from "../../../tendermint/types/block";
import { BlockID } from "../../../tendermint/types/types";
import { GasInfo, Result, TxResponse } from "../../base/abci/v1beta1/abci";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Tx } from "./tx";

/** OrderBy defines the sorting order */
export enum OrderBy {
  /**
   * ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
   * to ASC in this case.
   */
  ORDER_BY_UNSPECIFIED = 0,
  /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
  ORDER_BY_ASC = 1,
  /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
  ORDER_BY_DESC = 2,
  UNRECOGNIZED = -1,
}

export function orderByFromJSON(object: any): OrderBy {
  switch (object) {
    case 0:
    case "ORDER_BY_UNSPECIFIED":
      return OrderBy.ORDER_BY_UNSPECIFIED;
    case 1:
    case "ORDER_BY_ASC":
      return OrderBy.ORDER_BY_ASC;
    case 2:
    case "ORDER_BY_DESC":
      return OrderBy.ORDER_BY_DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderBy.UNRECOGNIZED;
  }
}

export function orderByToJSON(object: OrderBy): string {
  switch (object) {
    case OrderBy.ORDER_BY_UNSPECIFIED:
      return "ORDER_BY_UNSPECIFIED";
    case OrderBy.ORDER_BY_ASC:
      return "ORDER_BY_ASC";
    case OrderBy.ORDER_BY_DESC:
      return "ORDER_BY_DESC";
    case OrderBy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
 * method.
 */
export enum BroadcastMode {
  /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
  BROADCAST_MODE_UNSPECIFIED = 0,
  /**
   * BROADCAST_MODE_BLOCK - DEPRECATED: use BROADCAST_MODE_SYNC instead,
   * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
   *
   * @deprecated
   */
  BROADCAST_MODE_BLOCK = 1,
  /**
   * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
   * for a CheckTx execution response only.
   */
  BROADCAST_MODE_SYNC = 2,
  /**
   * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
   * returns immediately.
   */
  BROADCAST_MODE_ASYNC = 3,
  UNRECOGNIZED = -1,
}

export function broadcastModeFromJSON(object: any): BroadcastMode {
  switch (object) {
    case 0:
    case "BROADCAST_MODE_UNSPECIFIED":
      return BroadcastMode.BROADCAST_MODE_UNSPECIFIED;
    case 1:
    case "BROADCAST_MODE_BLOCK":
      return BroadcastMode.BROADCAST_MODE_BLOCK;
    case 2:
    case "BROADCAST_MODE_SYNC":
      return BroadcastMode.BROADCAST_MODE_SYNC;
    case 3:
    case "BROADCAST_MODE_ASYNC":
      return BroadcastMode.BROADCAST_MODE_ASYNC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BroadcastMode.UNRECOGNIZED;
  }
}

export function broadcastModeToJSON(object: BroadcastMode): string {
  switch (object) {
    case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
      return "BROADCAST_MODE_UNSPECIFIED";
    case BroadcastMode.BROADCAST_MODE_BLOCK:
      return "BROADCAST_MODE_BLOCK";
    case BroadcastMode.BROADCAST_MODE_SYNC:
      return "BROADCAST_MODE_SYNC";
    case BroadcastMode.BROADCAST_MODE_ASYNC:
      return "BROADCAST_MODE_ASYNC";
    case BroadcastMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * GetTxsEventRequest is the request type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventRequest {
  /**
   * events is the list of transaction event type.
   * Deprecated post v0.47.x: use query instead, which should contain a valid
   * events query.
   *
   * @deprecated
   */
  events: string[];
  /**
   * pagination defines a pagination for the request.
   * Deprecated post v0.46.x: use page and limit instead.
   *
   * @deprecated
   */
  pagination: PageRequest | undefined;
  order_by: OrderBy;
  /**
   * page is the page number to query, starts at 1. If not provided, will
   * default to first page.
   */
  page: string;
  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   */
  limit: string;
  /**
   * query defines the transaction event query that is proxied to Tendermint's
   * TxSearch RPC method. The query must be valid.
   *
   * Since cosmos-sdk 0.50
   */
  query: string;
}

/**
 * GetTxsEventResponse is the response type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventResponse {
  /** txs is the list of queried transactions. */
  txs: Tx[];
  /** tx_responses is the list of queried TxResponses. */
  tx_responses: TxResponse[];
  /**
   * pagination defines a pagination for the response.
   * Deprecated post v0.46.x: use total instead.
   *
   * @deprecated
   */
  pagination:
    | PageResponse
    | undefined;
  /** total is total number of results available */
  total: string;
}

/**
 * BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
 * RPC method.
 */
export interface BroadcastTxRequest {
  /** tx_bytes is the raw transaction. */
  tx_bytes: Uint8Array;
  mode: BroadcastMode;
}

/**
 * BroadcastTxResponse is the response type for the
 * Service.BroadcastTx method.
 */
export interface BroadcastTxResponse {
  /** tx_response is the queried TxResponses. */
  tx_response: TxResponse | undefined;
}

/**
 * SimulateRequest is the request type for the Service.Simulate
 * RPC method.
 */
export interface SimulateRequest {
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   *
   * @deprecated
   */
  tx:
    | Tx
    | undefined;
  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   */
  tx_bytes: Uint8Array;
}

/**
 * SimulateResponse is the response type for the
 * Service.SimulateRPC method.
 */
export interface SimulateResponse {
  /** gas_info is the information about gas used in the simulation. */
  gas_info:
    | GasInfo
    | undefined;
  /** result is the result of the simulation. */
  result: Result | undefined;
}

/**
 * GetTxRequest is the request type for the Service.GetTx
 * RPC method.
 */
export interface GetTxRequest {
  /** hash is the tx hash to query, encoded as a hex string. */
  hash: string;
}

/** GetTxResponse is the response type for the Service.GetTx method. */
export interface GetTxResponse {
  /** tx is the queried transaction. */
  tx:
    | Tx
    | undefined;
  /** tx_response is the queried TxResponses. */
  tx_response: TxResponse | undefined;
}

/**
 * GetBlockWithTxsRequest is the request type for the Service.GetBlockWithTxs
 * RPC method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsRequest {
  /** height is the height of the block to query. */
  height: string;
  /** pagination defines a pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs
 * method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsResponse {
  /** txs are the transactions in the block. */
  txs: Tx[];
  block_id: BlockID | undefined;
  block:
    | Block
    | undefined;
  /** pagination defines a pagination for the response. */
  pagination: PageResponse | undefined;
}

/**
 * TxDecodeRequest is the request type for the Service.TxDecode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeRequest {
  /** tx_bytes is the raw transaction. */
  tx_bytes: Uint8Array;
}

/**
 * TxDecodeResponse is the response type for the
 * Service.TxDecode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeResponse {
  /** tx is the decoded transaction. */
  tx: Tx | undefined;
}

/**
 * TxEncodeRequest is the request type for the Service.TxEncode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeRequest {
  /** tx is the transaction to encode. */
  tx: Tx | undefined;
}

/**
 * TxEncodeResponse is the response type for the
 * Service.TxEncode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeResponse {
  /** tx_bytes is the encoded transaction bytes. */
  tx_bytes: Uint8Array;
}

/**
 * TxEncodeAminoRequest is the request type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeAminoRequest {
  amino_json: string;
}

/**
 * TxEncodeAminoResponse is the response type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeAminoResponse {
  amino_binary: Uint8Array;
}

/**
 * TxDecodeAminoRequest is the request type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeAminoRequest {
  amino_binary: Uint8Array;
}

/**
 * TxDecodeAminoResponse is the response type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeAminoResponse {
  amino_json: string;
}

function createBaseGetTxsEventRequest(): GetTxsEventRequest {
  return { events: [], pagination: undefined, order_by: 0, page: "0", limit: "0", query: "" };
}

export const GetTxsEventRequest = {
  $type: "cosmos.tx.v1beta1.GetTxsEventRequest" as const,

  encode(message: GetTxsEventRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.order_by !== 0) {
      writer.uint32(24).int32(message.order_by);
    }
    if (message.page !== "0") {
      writer.uint32(32).uint64(message.page);
    }
    if (message.limit !== "0") {
      writer.uint32(40).uint64(message.limit);
    }
    if (message.query !== "") {
      writer.uint32(50).string(message.query);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxsEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.order_by = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.page = longToString(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.limit = longToString(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.query = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTxsEventRequest {
    return {
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => globalThis.String(e)) : [],
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      order_by: isSet(object.order_by) ? orderByFromJSON(object.order_by) : 0,
      page: isSet(object.page) ? globalThis.String(object.page) : "0",
      limit: isSet(object.limit) ? globalThis.String(object.limit) : "0",
      query: isSet(object.query) ? globalThis.String(object.query) : "",
    };
  },

  toJSON(message: GetTxsEventRequest): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.order_by !== 0) {
      obj.order_by = orderByToJSON(message.order_by);
    }
    if (message.page !== "0") {
      obj.page = message.page;
    }
    if (message.limit !== "0") {
      obj.limit = message.limit;
    }
    if (message.query !== "") {
      obj.query = message.query;
    }
    return obj;
  },

  create(base?: DeepPartial<GetTxsEventRequest>): GetTxsEventRequest {
    return GetTxsEventRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetTxsEventRequest>): GetTxsEventRequest {
    const message = createBaseGetTxsEventRequest();
    message.events = object.events?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.order_by = object.order_by ?? 0;
    message.page = object.page ?? "0";
    message.limit = object.limit ?? "0";
    message.query = object.query ?? "";
    return message;
  },
};

function createBaseGetTxsEventResponse(): GetTxsEventResponse {
  return { txs: [], tx_responses: [], pagination: undefined, total: "0" };
}

export const GetTxsEventResponse = {
  $type: "cosmos.tx.v1beta1.GetTxsEventResponse" as const,

  encode(message: GetTxsEventResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      Tx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tx_responses) {
      TxResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    if (message.total !== "0") {
      writer.uint32(32).uint64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxsEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(Tx.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tx_responses.push(TxResponse.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.total = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTxsEventResponse {
    return {
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => Tx.fromJSON(e)) : [],
      tx_responses: globalThis.Array.isArray(object?.tx_responses)
        ? object.tx_responses.map((e: any) => TxResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
      total: isSet(object.total) ? globalThis.String(object.total) : "0",
    };
  },

  toJSON(message: GetTxsEventResponse): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => Tx.toJSON(e));
    }
    if (message.tx_responses?.length) {
      obj.tx_responses = message.tx_responses.map((e) => TxResponse.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    if (message.total !== "0") {
      obj.total = message.total;
    }
    return obj;
  },

  create(base?: DeepPartial<GetTxsEventResponse>): GetTxsEventResponse {
    return GetTxsEventResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetTxsEventResponse>): GetTxsEventResponse {
    const message = createBaseGetTxsEventResponse();
    message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
    message.tx_responses = object.tx_responses?.map((e) => TxResponse.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    message.total = object.total ?? "0";
    return message;
  },
};

function createBaseBroadcastTxRequest(): BroadcastTxRequest {
  return { tx_bytes: new Uint8Array(0), mode: 0 };
}

export const BroadcastTxRequest = {
  $type: "cosmos.tx.v1beta1.BroadcastTxRequest" as const,

  encode(message: BroadcastTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx_bytes.length !== 0) {
      writer.uint32(10).bytes(message.tx_bytes);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx_bytes = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastTxRequest {
    return {
      tx_bytes: isSet(object.tx_bytes) ? bytesFromBase64(object.tx_bytes) : new Uint8Array(0),
      mode: isSet(object.mode) ? broadcastModeFromJSON(object.mode) : 0,
    };
  },

  toJSON(message: BroadcastTxRequest): unknown {
    const obj: any = {};
    if (message.tx_bytes.length !== 0) {
      obj.tx_bytes = base64FromBytes(message.tx_bytes);
    }
    if (message.mode !== 0) {
      obj.mode = broadcastModeToJSON(message.mode);
    }
    return obj;
  },

  create(base?: DeepPartial<BroadcastTxRequest>): BroadcastTxRequest {
    return BroadcastTxRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BroadcastTxRequest>): BroadcastTxRequest {
    const message = createBaseBroadcastTxRequest();
    message.tx_bytes = object.tx_bytes ?? new Uint8Array(0);
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseBroadcastTxResponse(): BroadcastTxResponse {
  return { tx_response: undefined };
}

export const BroadcastTxResponse = {
  $type: "cosmos.tx.v1beta1.BroadcastTxResponse" as const,

  encode(message: BroadcastTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx_response !== undefined) {
      TxResponse.encode(message.tx_response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBroadcastTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx_response = TxResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BroadcastTxResponse {
    return { tx_response: isSet(object.tx_response) ? TxResponse.fromJSON(object.tx_response) : undefined };
  },

  toJSON(message: BroadcastTxResponse): unknown {
    const obj: any = {};
    if (message.tx_response !== undefined) {
      obj.tx_response = TxResponse.toJSON(message.tx_response);
    }
    return obj;
  },

  create(base?: DeepPartial<BroadcastTxResponse>): BroadcastTxResponse {
    return BroadcastTxResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BroadcastTxResponse>): BroadcastTxResponse {
    const message = createBaseBroadcastTxResponse();
    message.tx_response = (object.tx_response !== undefined && object.tx_response !== null)
      ? TxResponse.fromPartial(object.tx_response)
      : undefined;
    return message;
  },
};

function createBaseSimulateRequest(): SimulateRequest {
  return { tx: undefined, tx_bytes: new Uint8Array(0) };
}

export const SimulateRequest = {
  $type: "cosmos.tx.v1beta1.SimulateRequest" as const,

  encode(message: SimulateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.tx_bytes.length !== 0) {
      writer.uint32(18).bytes(message.tx_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = Tx.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tx_bytes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateRequest {
    return {
      tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
      tx_bytes: isSet(object.tx_bytes) ? bytesFromBase64(object.tx_bytes) : new Uint8Array(0),
    };
  },

  toJSON(message: SimulateRequest): unknown {
    const obj: any = {};
    if (message.tx !== undefined) {
      obj.tx = Tx.toJSON(message.tx);
    }
    if (message.tx_bytes.length !== 0) {
      obj.tx_bytes = base64FromBytes(message.tx_bytes);
    }
    return obj;
  },

  create(base?: DeepPartial<SimulateRequest>): SimulateRequest {
    return SimulateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SimulateRequest>): SimulateRequest {
    const message = createBaseSimulateRequest();
    message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
    message.tx_bytes = object.tx_bytes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSimulateResponse(): SimulateResponse {
  return { gas_info: undefined, result: undefined };
}

export const SimulateResponse = {
  $type: "cosmos.tx.v1beta1.SimulateResponse" as const,

  encode(message: SimulateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gas_info !== undefined) {
      GasInfo.encode(message.gas_info, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Result.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimulateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gas_info = GasInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.result = Result.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimulateResponse {
    return {
      gas_info: isSet(object.gas_info) ? GasInfo.fromJSON(object.gas_info) : undefined,
      result: isSet(object.result) ? Result.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: SimulateResponse): unknown {
    const obj: any = {};
    if (message.gas_info !== undefined) {
      obj.gas_info = GasInfo.toJSON(message.gas_info);
    }
    if (message.result !== undefined) {
      obj.result = Result.toJSON(message.result);
    }
    return obj;
  },

  create(base?: DeepPartial<SimulateResponse>): SimulateResponse {
    return SimulateResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SimulateResponse>): SimulateResponse {
    const message = createBaseSimulateResponse();
    message.gas_info = (object.gas_info !== undefined && object.gas_info !== null)
      ? GasInfo.fromPartial(object.gas_info)
      : undefined;
    message.result = (object.result !== undefined && object.result !== null)
      ? Result.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseGetTxRequest(): GetTxRequest {
  return { hash: "" };
}

export const GetTxRequest = {
  $type: "cosmos.tx.v1beta1.GetTxRequest" as const,

  encode(message: GetTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTxRequest {
    return { hash: isSet(object.hash) ? globalThis.String(object.hash) : "" };
  },

  toJSON(message: GetTxRequest): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create(base?: DeepPartial<GetTxRequest>): GetTxRequest {
    return GetTxRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetTxRequest>): GetTxRequest {
    const message = createBaseGetTxRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseGetTxResponse(): GetTxResponse {
  return { tx: undefined, tx_response: undefined };
}

export const GetTxResponse = {
  $type: "cosmos.tx.v1beta1.GetTxResponse" as const,

  encode(message: GetTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.tx_response !== undefined) {
      TxResponse.encode(message.tx_response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = Tx.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tx_response = TxResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTxResponse {
    return {
      tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
      tx_response: isSet(object.tx_response) ? TxResponse.fromJSON(object.tx_response) : undefined,
    };
  },

  toJSON(message: GetTxResponse): unknown {
    const obj: any = {};
    if (message.tx !== undefined) {
      obj.tx = Tx.toJSON(message.tx);
    }
    if (message.tx_response !== undefined) {
      obj.tx_response = TxResponse.toJSON(message.tx_response);
    }
    return obj;
  },

  create(base?: DeepPartial<GetTxResponse>): GetTxResponse {
    return GetTxResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetTxResponse>): GetTxResponse {
    const message = createBaseGetTxResponse();
    message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
    message.tx_response = (object.tx_response !== undefined && object.tx_response !== null)
      ? TxResponse.fromPartial(object.tx_response)
      : undefined;
    return message;
  },
};

function createBaseGetBlockWithTxsRequest(): GetBlockWithTxsRequest {
  return { height: "0", pagination: undefined };
}

export const GetBlockWithTxsRequest = {
  $type: "cosmos.tx.v1beta1.GetBlockWithTxsRequest" as const,

  encode(message: GetBlockWithTxsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockWithTxsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockWithTxsRequest();
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

  fromJSON(object: any): GetBlockWithTxsRequest {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GetBlockWithTxsRequest): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockWithTxsRequest>): GetBlockWithTxsRequest {
    return GetBlockWithTxsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockWithTxsRequest>): GetBlockWithTxsRequest {
    const message = createBaseGetBlockWithTxsRequest();
    message.height = object.height ?? "0";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGetBlockWithTxsResponse(): GetBlockWithTxsResponse {
  return { txs: [], block_id: undefined, block: undefined, pagination: undefined };
}

export const GetBlockWithTxsResponse = {
  $type: "cosmos.tx.v1beta1.GetBlockWithTxsResponse" as const,

  encode(message: GetBlockWithTxsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      Tx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(18).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(26).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockWithTxsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockWithTxsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(Tx.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.block_id = BlockID.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.block = Block.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): GetBlockWithTxsResponse {
    return {
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => Tx.fromJSON(e)) : [],
      block_id: isSet(object.block_id) ? BlockID.fromJSON(object.block_id) : undefined,
      block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GetBlockWithTxsResponse): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => Tx.toJSON(e));
    }
    if (message.block_id !== undefined) {
      obj.block_id = BlockID.toJSON(message.block_id);
    }
    if (message.block !== undefined) {
      obj.block = Block.toJSON(message.block);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockWithTxsResponse>): GetBlockWithTxsResponse {
    return GetBlockWithTxsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockWithTxsResponse>): GetBlockWithTxsResponse {
    const message = createBaseGetBlockWithTxsResponse();
    message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
    message.block_id = (object.block_id !== undefined && object.block_id !== null)
      ? BlockID.fromPartial(object.block_id)
      : undefined;
    message.block = (object.block !== undefined && object.block !== null) ? Block.fromPartial(object.block) : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseTxDecodeRequest(): TxDecodeRequest {
  return { tx_bytes: new Uint8Array(0) };
}

export const TxDecodeRequest = {
  $type: "cosmos.tx.v1beta1.TxDecodeRequest" as const,

  encode(message: TxDecodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx_bytes.length !== 0) {
      writer.uint32(10).bytes(message.tx_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxDecodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx_bytes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxDecodeRequest {
    return { tx_bytes: isSet(object.tx_bytes) ? bytesFromBase64(object.tx_bytes) : new Uint8Array(0) };
  },

  toJSON(message: TxDecodeRequest): unknown {
    const obj: any = {};
    if (message.tx_bytes.length !== 0) {
      obj.tx_bytes = base64FromBytes(message.tx_bytes);
    }
    return obj;
  },

  create(base?: DeepPartial<TxDecodeRequest>): TxDecodeRequest {
    return TxDecodeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxDecodeRequest>): TxDecodeRequest {
    const message = createBaseTxDecodeRequest();
    message.tx_bytes = object.tx_bytes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTxDecodeResponse(): TxDecodeResponse {
  return { tx: undefined };
}

export const TxDecodeResponse = {
  $type: "cosmos.tx.v1beta1.TxDecodeResponse" as const,

  encode(message: TxDecodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxDecodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = Tx.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxDecodeResponse {
    return { tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined };
  },

  toJSON(message: TxDecodeResponse): unknown {
    const obj: any = {};
    if (message.tx !== undefined) {
      obj.tx = Tx.toJSON(message.tx);
    }
    return obj;
  },

  create(base?: DeepPartial<TxDecodeResponse>): TxDecodeResponse {
    return TxDecodeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxDecodeResponse>): TxDecodeResponse {
    const message = createBaseTxDecodeResponse();
    message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
    return message;
  },
};

function createBaseTxEncodeRequest(): TxEncodeRequest {
  return { tx: undefined };
}

export const TxEncodeRequest = {
  $type: "cosmos.tx.v1beta1.TxEncodeRequest" as const,

  encode(message: TxEncodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxEncodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = Tx.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxEncodeRequest {
    return { tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined };
  },

  toJSON(message: TxEncodeRequest): unknown {
    const obj: any = {};
    if (message.tx !== undefined) {
      obj.tx = Tx.toJSON(message.tx);
    }
    return obj;
  },

  create(base?: DeepPartial<TxEncodeRequest>): TxEncodeRequest {
    return TxEncodeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxEncodeRequest>): TxEncodeRequest {
    const message = createBaseTxEncodeRequest();
    message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
    return message;
  },
};

function createBaseTxEncodeResponse(): TxEncodeResponse {
  return { tx_bytes: new Uint8Array(0) };
}

export const TxEncodeResponse = {
  $type: "cosmos.tx.v1beta1.TxEncodeResponse" as const,

  encode(message: TxEncodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx_bytes.length !== 0) {
      writer.uint32(10).bytes(message.tx_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxEncodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx_bytes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxEncodeResponse {
    return { tx_bytes: isSet(object.tx_bytes) ? bytesFromBase64(object.tx_bytes) : new Uint8Array(0) };
  },

  toJSON(message: TxEncodeResponse): unknown {
    const obj: any = {};
    if (message.tx_bytes.length !== 0) {
      obj.tx_bytes = base64FromBytes(message.tx_bytes);
    }
    return obj;
  },

  create(base?: DeepPartial<TxEncodeResponse>): TxEncodeResponse {
    return TxEncodeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxEncodeResponse>): TxEncodeResponse {
    const message = createBaseTxEncodeResponse();
    message.tx_bytes = object.tx_bytes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTxEncodeAminoRequest(): TxEncodeAminoRequest {
  return { amino_json: "" };
}

export const TxEncodeAminoRequest = {
  $type: "cosmos.tx.v1beta1.TxEncodeAminoRequest" as const,

  encode(message: TxEncodeAminoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amino_json !== "") {
      writer.uint32(10).string(message.amino_json);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeAminoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxEncodeAminoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amino_json = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxEncodeAminoRequest {
    return { amino_json: isSet(object.amino_json) ? globalThis.String(object.amino_json) : "" };
  },

  toJSON(message: TxEncodeAminoRequest): unknown {
    const obj: any = {};
    if (message.amino_json !== "") {
      obj.amino_json = message.amino_json;
    }
    return obj;
  },

  create(base?: DeepPartial<TxEncodeAminoRequest>): TxEncodeAminoRequest {
    return TxEncodeAminoRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxEncodeAminoRequest>): TxEncodeAminoRequest {
    const message = createBaseTxEncodeAminoRequest();
    message.amino_json = object.amino_json ?? "";
    return message;
  },
};

function createBaseTxEncodeAminoResponse(): TxEncodeAminoResponse {
  return { amino_binary: new Uint8Array(0) };
}

export const TxEncodeAminoResponse = {
  $type: "cosmos.tx.v1beta1.TxEncodeAminoResponse" as const,

  encode(message: TxEncodeAminoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amino_binary.length !== 0) {
      writer.uint32(10).bytes(message.amino_binary);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeAminoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxEncodeAminoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amino_binary = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxEncodeAminoResponse {
    return { amino_binary: isSet(object.amino_binary) ? bytesFromBase64(object.amino_binary) : new Uint8Array(0) };
  },

  toJSON(message: TxEncodeAminoResponse): unknown {
    const obj: any = {};
    if (message.amino_binary.length !== 0) {
      obj.amino_binary = base64FromBytes(message.amino_binary);
    }
    return obj;
  },

  create(base?: DeepPartial<TxEncodeAminoResponse>): TxEncodeAminoResponse {
    return TxEncodeAminoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxEncodeAminoResponse>): TxEncodeAminoResponse {
    const message = createBaseTxEncodeAminoResponse();
    message.amino_binary = object.amino_binary ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTxDecodeAminoRequest(): TxDecodeAminoRequest {
  return { amino_binary: new Uint8Array(0) };
}

export const TxDecodeAminoRequest = {
  $type: "cosmos.tx.v1beta1.TxDecodeAminoRequest" as const,

  encode(message: TxDecodeAminoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amino_binary.length !== 0) {
      writer.uint32(10).bytes(message.amino_binary);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeAminoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxDecodeAminoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amino_binary = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxDecodeAminoRequest {
    return { amino_binary: isSet(object.amino_binary) ? bytesFromBase64(object.amino_binary) : new Uint8Array(0) };
  },

  toJSON(message: TxDecodeAminoRequest): unknown {
    const obj: any = {};
    if (message.amino_binary.length !== 0) {
      obj.amino_binary = base64FromBytes(message.amino_binary);
    }
    return obj;
  },

  create(base?: DeepPartial<TxDecodeAminoRequest>): TxDecodeAminoRequest {
    return TxDecodeAminoRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxDecodeAminoRequest>): TxDecodeAminoRequest {
    const message = createBaseTxDecodeAminoRequest();
    message.amino_binary = object.amino_binary ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTxDecodeAminoResponse(): TxDecodeAminoResponse {
  return { amino_json: "" };
}

export const TxDecodeAminoResponse = {
  $type: "cosmos.tx.v1beta1.TxDecodeAminoResponse" as const,

  encode(message: TxDecodeAminoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amino_json !== "") {
      writer.uint32(10).string(message.amino_json);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeAminoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxDecodeAminoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amino_json = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxDecodeAminoResponse {
    return { amino_json: isSet(object.amino_json) ? globalThis.String(object.amino_json) : "" };
  },

  toJSON(message: TxDecodeAminoResponse): unknown {
    const obj: any = {};
    if (message.amino_json !== "") {
      obj.amino_json = message.amino_json;
    }
    return obj;
  },

  create(base?: DeepPartial<TxDecodeAminoResponse>): TxDecodeAminoResponse {
    return TxDecodeAminoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxDecodeAminoResponse>): TxDecodeAminoResponse {
    const message = createBaseTxDecodeAminoResponse();
    message.amino_json = object.amino_json ?? "";
    return message;
  },
};

/** Service defines a gRPC service for interacting with transactions. */
export interface Service {
  /** Simulate simulates executing a transaction for estimating gas usage. */
  Simulate(request: DeepPartial<SimulateRequest>, metadata?: grpc.Metadata): Promise<SimulateResponse>;
  /** GetTx fetches a tx by hash. */
  GetTx(request: DeepPartial<GetTxRequest>, metadata?: grpc.Metadata): Promise<GetTxResponse>;
  /** BroadcastTx broadcast transaction. */
  BroadcastTx(request: DeepPartial<BroadcastTxRequest>, metadata?: grpc.Metadata): Promise<BroadcastTxResponse>;
  /** GetTxsEvent fetches txs by event. */
  GetTxsEvent(request: DeepPartial<GetTxsEventRequest>, metadata?: grpc.Metadata): Promise<GetTxsEventResponse>;
  /**
   * GetBlockWithTxs fetches a block with decoded txs.
   *
   * Since: cosmos-sdk 0.45.2
   */
  GetBlockWithTxs(
    request: DeepPartial<GetBlockWithTxsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockWithTxsResponse>;
  /**
   * TxDecode decodes the transaction.
   *
   * Since: cosmos-sdk 0.47
   */
  TxDecode(request: DeepPartial<TxDecodeRequest>, metadata?: grpc.Metadata): Promise<TxDecodeResponse>;
  /**
   * TxEncode encodes the transaction.
   *
   * Since: cosmos-sdk 0.47
   */
  TxEncode(request: DeepPartial<TxEncodeRequest>, metadata?: grpc.Metadata): Promise<TxEncodeResponse>;
  /**
   * TxEncodeAmino encodes an Amino transaction from JSON to encoded bytes.
   *
   * Since: cosmos-sdk 0.47
   */
  TxEncodeAmino(request: DeepPartial<TxEncodeAminoRequest>, metadata?: grpc.Metadata): Promise<TxEncodeAminoResponse>;
  /**
   * TxDecodeAmino decodes an Amino transaction from encoded bytes to JSON.
   *
   * Since: cosmos-sdk 0.47
   */
  TxDecodeAmino(request: DeepPartial<TxDecodeAminoRequest>, metadata?: grpc.Metadata): Promise<TxDecodeAminoResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Simulate = this.Simulate.bind(this);
    this.GetTx = this.GetTx.bind(this);
    this.BroadcastTx = this.BroadcastTx.bind(this);
    this.GetTxsEvent = this.GetTxsEvent.bind(this);
    this.GetBlockWithTxs = this.GetBlockWithTxs.bind(this);
    this.TxDecode = this.TxDecode.bind(this);
    this.TxEncode = this.TxEncode.bind(this);
    this.TxEncodeAmino = this.TxEncodeAmino.bind(this);
    this.TxDecodeAmino = this.TxDecodeAmino.bind(this);
  }

  Simulate(request: DeepPartial<SimulateRequest>, metadata?: grpc.Metadata): Promise<SimulateResponse> {
    return this.rpc.unary(ServiceSimulateDesc, SimulateRequest.fromPartial(request), metadata);
  }

  GetTx(request: DeepPartial<GetTxRequest>, metadata?: grpc.Metadata): Promise<GetTxResponse> {
    return this.rpc.unary(ServiceGetTxDesc, GetTxRequest.fromPartial(request), metadata);
  }

  BroadcastTx(request: DeepPartial<BroadcastTxRequest>, metadata?: grpc.Metadata): Promise<BroadcastTxResponse> {
    return this.rpc.unary(ServiceBroadcastTxDesc, BroadcastTxRequest.fromPartial(request), metadata);
  }

  GetTxsEvent(request: DeepPartial<GetTxsEventRequest>, metadata?: grpc.Metadata): Promise<GetTxsEventResponse> {
    return this.rpc.unary(ServiceGetTxsEventDesc, GetTxsEventRequest.fromPartial(request), metadata);
  }

  GetBlockWithTxs(
    request: DeepPartial<GetBlockWithTxsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBlockWithTxsResponse> {
    return this.rpc.unary(ServiceGetBlockWithTxsDesc, GetBlockWithTxsRequest.fromPartial(request), metadata);
  }

  TxDecode(request: DeepPartial<TxDecodeRequest>, metadata?: grpc.Metadata): Promise<TxDecodeResponse> {
    return this.rpc.unary(ServiceTxDecodeDesc, TxDecodeRequest.fromPartial(request), metadata);
  }

  TxEncode(request: DeepPartial<TxEncodeRequest>, metadata?: grpc.Metadata): Promise<TxEncodeResponse> {
    return this.rpc.unary(ServiceTxEncodeDesc, TxEncodeRequest.fromPartial(request), metadata);
  }

  TxEncodeAmino(request: DeepPartial<TxEncodeAminoRequest>, metadata?: grpc.Metadata): Promise<TxEncodeAminoResponse> {
    return this.rpc.unary(ServiceTxEncodeAminoDesc, TxEncodeAminoRequest.fromPartial(request), metadata);
  }

  TxDecodeAmino(request: DeepPartial<TxDecodeAminoRequest>, metadata?: grpc.Metadata): Promise<TxDecodeAminoResponse> {
    return this.rpc.unary(ServiceTxDecodeAminoDesc, TxDecodeAminoRequest.fromPartial(request), metadata);
  }
}

export const ServiceDesc = { serviceName: "cosmos.tx.v1beta1.Service" };

export const ServiceSimulateDesc: UnaryMethodDefinitionish = {
  methodName: "Simulate",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SimulateRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SimulateResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetTxDesc: UnaryMethodDefinitionish = {
  methodName: "GetTx",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetTxRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetTxResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceBroadcastTxDesc: UnaryMethodDefinitionish = {
  methodName: "BroadcastTx",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BroadcastTxRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = BroadcastTxResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetTxsEventDesc: UnaryMethodDefinitionish = {
  methodName: "GetTxsEvent",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetTxsEventRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetTxsEventResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceGetBlockWithTxsDesc: UnaryMethodDefinitionish = {
  methodName: "GetBlockWithTxs",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBlockWithTxsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBlockWithTxsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceTxDecodeDesc: UnaryMethodDefinitionish = {
  methodName: "TxDecode",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TxDecodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TxDecodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceTxEncodeDesc: UnaryMethodDefinitionish = {
  methodName: "TxEncode",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TxEncodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TxEncodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceTxEncodeAminoDesc: UnaryMethodDefinitionish = {
  methodName: "TxEncodeAmino",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TxEncodeAminoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TxEncodeAminoResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ServiceTxDecodeAminoDesc: UnaryMethodDefinitionish = {
  methodName: "TxDecodeAmino",
  service: ServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return TxDecodeAminoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TxDecodeAminoResponse.decode(data);
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
  if (globalThis.Buffer) {
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
  if (globalThis.Buffer) {
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
