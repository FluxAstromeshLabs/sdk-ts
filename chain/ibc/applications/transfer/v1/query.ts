/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { DenomTrace, Params } from "./transfer";

/**
 * QueryDenomTraceRequest is the request type for the Query/DenomTrace RPC
 * method
 */
export interface QueryDenomTraceRequest {
  /** hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information. */
  hash: string;
}

/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface QueryDenomTraceResponse {
  /** denom_trace returns the requested denomination trace information. */
  denom_trace: DenomTrace | undefined;
}

/**
 * QueryConnectionsRequest is the request type for the Query/DenomTraces RPC
 * method
 */
export interface QueryDenomTracesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface QueryDenomTracesResponse {
  /** denom_traces returns all denominations trace information. */
  denom_traces: DenomTrace[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/**
 * QueryDenomHashRequest is the request type for the Query/DenomHash RPC
 * method
 */
export interface QueryDenomHashRequest {
  /** The denomination trace ([port_id]/[channel_id])+/[denom] */
  trace: string;
}

/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface QueryDenomHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash: string;
}

/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
  /** unique port identifier */
  port_id: string;
  /** unique channel identifier */
  channel_id: string;
}

/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
  /** the escrow account address */
  escrow_address: string;
}

/** QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomRequest {
  denom: string;
}

/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomResponse {
  amount: Coin | undefined;
}

function createBaseQueryDenomTraceRequest(): QueryDenomTraceRequest {
  return { hash: "" };
}

export const QueryDenomTraceRequest = {
  $type: "ibc.applications.transfer.v1.QueryDenomTraceRequest" as const,

  encode(message: QueryDenomTraceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceRequest();
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

  fromJSON(object: any): QueryDenomTraceRequest {
    return { hash: isSet(object.hash) ? globalThis.String(object.hash) : "" };
  },

  toJSON(message: QueryDenomTraceRequest): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomTraceRequest>): QueryDenomTraceRequest {
    return QueryDenomTraceRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomTraceRequest>): QueryDenomTraceRequest {
    const message = createBaseQueryDenomTraceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryDenomTraceResponse(): QueryDenomTraceResponse {
  return { denom_trace: undefined };
}

export const QueryDenomTraceResponse = {
  $type: "ibc.applications.transfer.v1.QueryDenomTraceResponse" as const,

  encode(message: QueryDenomTraceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom_trace !== undefined) {
      DenomTrace.encode(message.denom_trace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom_trace = DenomTrace.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomTraceResponse {
    return { denom_trace: isSet(object.denom_trace) ? DenomTrace.fromJSON(object.denom_trace) : undefined };
  },

  toJSON(message: QueryDenomTraceResponse): unknown {
    const obj: any = {};
    if (message.denom_trace !== undefined) {
      obj.denom_trace = DenomTrace.toJSON(message.denom_trace);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomTraceResponse>): QueryDenomTraceResponse {
    return QueryDenomTraceResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomTraceResponse>): QueryDenomTraceResponse {
    const message = createBaseQueryDenomTraceResponse();
    message.denom_trace = (object.denom_trace !== undefined && object.denom_trace !== null)
      ? DenomTrace.fromPartial(object.denom_trace)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesRequest(): QueryDenomTracesRequest {
  return { pagination: undefined };
}

export const QueryDenomTracesRequest = {
  $type: "ibc.applications.transfer.v1.QueryDenomTracesRequest" as const,

  encode(message: QueryDenomTracesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesRequest();
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

  fromJSON(object: any): QueryDenomTracesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomTracesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomTracesRequest>): QueryDenomTracesRequest {
    return QueryDenomTracesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomTracesRequest>): QueryDenomTracesRequest {
    const message = createBaseQueryDenomTracesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomTracesResponse(): QueryDenomTracesResponse {
  return { denom_traces: [], pagination: undefined };
}

export const QueryDenomTracesResponse = {
  $type: "ibc.applications.transfer.v1.QueryDenomTracesResponse" as const,

  encode(message: QueryDenomTracesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denom_traces) {
      DenomTrace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomTracesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom_traces.push(DenomTrace.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomTracesResponse {
    return {
      denom_traces: globalThis.Array.isArray(object?.denom_traces)
        ? object.denom_traces.map((e: any) => DenomTrace.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomTracesResponse): unknown {
    const obj: any = {};
    if (message.denom_traces?.length) {
      obj.denom_traces = message.denom_traces.map((e) => DenomTrace.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomTracesResponse>): QueryDenomTracesResponse {
    return QueryDenomTracesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomTracesResponse>): QueryDenomTracesResponse {
    const message = createBaseQueryDenomTracesResponse();
    message.denom_traces = object.denom_traces?.map((e) => DenomTrace.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  $type: "ibc.applications.transfer.v1.QueryParamsRequest" as const,

  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  $type: "ibc.applications.transfer.v1.QueryParamsResponse" as const,

  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomHashRequest(): QueryDenomHashRequest {
  return { trace: "" };
}

export const QueryDenomHashRequest = {
  $type: "ibc.applications.transfer.v1.QueryDenomHashRequest" as const,

  encode(message: QueryDenomHashRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trace !== "") {
      writer.uint32(10).string(message.trace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomHashRequest {
    return { trace: isSet(object.trace) ? globalThis.String(object.trace) : "" };
  },

  toJSON(message: QueryDenomHashRequest): unknown {
    const obj: any = {};
    if (message.trace !== "") {
      obj.trace = message.trace;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomHashRequest>): QueryDenomHashRequest {
    return QueryDenomHashRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomHashRequest>): QueryDenomHashRequest {
    const message = createBaseQueryDenomHashRequest();
    message.trace = object.trace ?? "";
    return message;
  },
};

function createBaseQueryDenomHashResponse(): QueryDenomHashResponse {
  return { hash: "" };
}

export const QueryDenomHashResponse = {
  $type: "ibc.applications.transfer.v1.QueryDenomHashResponse" as const,

  encode(message: QueryDenomHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomHashResponse();
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

  fromJSON(object: any): QueryDenomHashResponse {
    return { hash: isSet(object.hash) ? globalThis.String(object.hash) : "" };
  },

  toJSON(message: QueryDenomHashResponse): unknown {
    const obj: any = {};
    if (message.hash !== "") {
      obj.hash = message.hash;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomHashResponse>): QueryDenomHashResponse {
    return QueryDenomHashResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomHashResponse>): QueryDenomHashResponse {
    const message = createBaseQueryDenomHashResponse();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressRequest(): QueryEscrowAddressRequest {
  return { port_id: "", channel_id: "" };
}

export const QueryEscrowAddressRequest = {
  $type: "ibc.applications.transfer.v1.QueryEscrowAddressRequest" as const,

  encode(message: QueryEscrowAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port_id !== "") {
      writer.uint32(10).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(18).string(message.channel_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressRequest();
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

  fromJSON(object: any): QueryEscrowAddressRequest {
    return {
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
    };
  },

  toJSON(message: QueryEscrowAddressRequest): unknown {
    const obj: any = {};
    if (message.port_id !== "") {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryEscrowAddressRequest>): QueryEscrowAddressRequest {
    return QueryEscrowAddressRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryEscrowAddressRequest>): QueryEscrowAddressRequest {
    const message = createBaseQueryEscrowAddressRequest();
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressResponse(): QueryEscrowAddressResponse {
  return { escrow_address: "" };
}

export const QueryEscrowAddressResponse = {
  $type: "ibc.applications.transfer.v1.QueryEscrowAddressResponse" as const,

  encode(message: QueryEscrowAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.escrow_address !== "") {
      writer.uint32(10).string(message.escrow_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.escrow_address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressResponse {
    return { escrow_address: isSet(object.escrow_address) ? globalThis.String(object.escrow_address) : "" };
  },

  toJSON(message: QueryEscrowAddressResponse): unknown {
    const obj: any = {};
    if (message.escrow_address !== "") {
      obj.escrow_address = message.escrow_address;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryEscrowAddressResponse>): QueryEscrowAddressResponse {
    return QueryEscrowAddressResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryEscrowAddressResponse>): QueryEscrowAddressResponse {
    const message = createBaseQueryEscrowAddressResponse();
    message.escrow_address = object.escrow_address ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomRequest(): QueryTotalEscrowForDenomRequest {
  return { denom: "" };
}

export const QueryTotalEscrowForDenomRequest = {
  $type: "ibc.applications.transfer.v1.QueryTotalEscrowForDenomRequest" as const,

  encode(message: QueryTotalEscrowForDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryTotalEscrowForDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalEscrowForDenomRequest>): QueryTotalEscrowForDenomRequest {
    return QueryTotalEscrowForDenomRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalEscrowForDenomRequest>): QueryTotalEscrowForDenomRequest {
    const message = createBaseQueryTotalEscrowForDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryTotalEscrowForDenomResponse(): QueryTotalEscrowForDenomResponse {
  return { amount: undefined };
}

export const QueryTotalEscrowForDenomResponse = {
  $type: "ibc.applications.transfer.v1.QueryTotalEscrowForDenomResponse" as const,

  encode(message: QueryTotalEscrowForDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalEscrowForDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalEscrowForDenomResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: QueryTotalEscrowForDenomResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryTotalEscrowForDenomResponse>): QueryTotalEscrowForDenomResponse {
    return QueryTotalEscrowForDenomResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryTotalEscrowForDenomResponse>): QueryTotalEscrowForDenomResponse {
    const message = createBaseQueryTotalEscrowForDenomResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTraces queries all denomination traces. */
  DenomTraces(
    request: DeepPartial<QueryDenomTracesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTracesResponse>;
  /** DenomTrace queries a denomination trace information. */
  DenomTrace(request: DeepPartial<QueryDenomTraceRequest>, metadata?: grpc.Metadata): Promise<QueryDenomTraceResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  Params(request: DeepPartial<QueryParamsRequest>, metadata?: grpc.Metadata): Promise<QueryParamsResponse>;
  /** DenomHash queries a denomination hash information. */
  DenomHash(request: DeepPartial<QueryDenomHashRequest>, metadata?: grpc.Metadata): Promise<QueryDenomHashResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  EscrowAddress(
    request: DeepPartial<QueryEscrowAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryEscrowAddressResponse>;
  /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
  TotalEscrowForDenom(
    request: DeepPartial<QueryTotalEscrowForDenomRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalEscrowForDenomResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DenomTraces = this.DenomTraces.bind(this);
    this.DenomTrace = this.DenomTrace.bind(this);
    this.Params = this.Params.bind(this);
    this.DenomHash = this.DenomHash.bind(this);
    this.EscrowAddress = this.EscrowAddress.bind(this);
    this.TotalEscrowForDenom = this.TotalEscrowForDenom.bind(this);
  }

  DenomTraces(
    request: DeepPartial<QueryDenomTracesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryDenomTracesResponse> {
    return this.rpc.unary(QueryDenomTracesDesc, QueryDenomTracesRequest.fromPartial(request), metadata);
  }

  DenomTrace(request: DeepPartial<QueryDenomTraceRequest>, metadata?: grpc.Metadata): Promise<QueryDenomTraceResponse> {
    return this.rpc.unary(QueryDenomTraceDesc, QueryDenomTraceRequest.fromPartial(request), metadata);
  }

  Params(request: DeepPartial<QueryParamsRequest>, metadata?: grpc.Metadata): Promise<QueryParamsResponse> {
    return this.rpc.unary(QueryParamsDesc, QueryParamsRequest.fromPartial(request), metadata);
  }

  DenomHash(request: DeepPartial<QueryDenomHashRequest>, metadata?: grpc.Metadata): Promise<QueryDenomHashResponse> {
    return this.rpc.unary(QueryDenomHashDesc, QueryDenomHashRequest.fromPartial(request), metadata);
  }

  EscrowAddress(
    request: DeepPartial<QueryEscrowAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryEscrowAddressResponse> {
    return this.rpc.unary(QueryEscrowAddressDesc, QueryEscrowAddressRequest.fromPartial(request), metadata);
  }

  TotalEscrowForDenom(
    request: DeepPartial<QueryTotalEscrowForDenomRequest>,
    metadata?: grpc.Metadata,
  ): Promise<QueryTotalEscrowForDenomResponse> {
    return this.rpc.unary(QueryTotalEscrowForDenomDesc, QueryTotalEscrowForDenomRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "ibc.applications.transfer.v1.Query" };

export const QueryDenomTracesDesc: UnaryMethodDefinitionish = {
  methodName: "DenomTraces",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomTracesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomTracesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryDenomTraceDesc: UnaryMethodDefinitionish = {
  methodName: "DenomTrace",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomTraceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomTraceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryParamsDesc: UnaryMethodDefinitionish = {
  methodName: "Params",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryParamsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryParamsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryDenomHashDesc: UnaryMethodDefinitionish = {
  methodName: "DenomHash",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomHashRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomHashResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryEscrowAddressDesc: UnaryMethodDefinitionish = {
  methodName: "EscrowAddress",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryEscrowAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryEscrowAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryTotalEscrowForDenomDesc: UnaryMethodDefinitionish = {
  methodName: "TotalEscrowForDenom",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryTotalEscrowForDenomRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryTotalEscrowForDenomResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
