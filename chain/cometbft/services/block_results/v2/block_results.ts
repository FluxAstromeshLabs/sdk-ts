// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: cometbft/services/block_results/v2/block_results.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Event, ExecTxResult, ValidatorUpdate } from "../../../abci/v2/types";
import { ConsensusParams } from "../../../types/v2/params";

/** GetBlockResults is a request for the BlockResults of a given height. */
export interface GetBlockResultsRequest {
  height: string;
}

/** GetBlockResultsResponse contains the block results for the given height. */
export interface GetBlockResultsResponse {
  height: string;
  tx_results: ExecTxResult[];
  finalize_block_events: Event[];
  validator_updates: ValidatorUpdate[];
  consensus_param_updates: ConsensusParams | undefined;
  app_hash: Uint8Array;
}

function createBaseGetBlockResultsRequest(): GetBlockResultsRequest {
  return { height: "0" };
}

export const GetBlockResultsRequest = {
  $type: "cometbft.services.block_results.v2.GetBlockResultsRequest" as const,

  encode(message: GetBlockResultsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockResultsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockResultsRequest();
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

  fromJSON(object: any): GetBlockResultsRequest {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: GetBlockResultsRequest): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockResultsRequest>): GetBlockResultsRequest {
    return GetBlockResultsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockResultsRequest>): GetBlockResultsRequest {
    const message = createBaseGetBlockResultsRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseGetBlockResultsResponse(): GetBlockResultsResponse {
  return {
    height: "0",
    tx_results: [],
    finalize_block_events: [],
    validator_updates: [],
    consensus_param_updates: undefined,
    app_hash: new Uint8Array(0),
  };
}

export const GetBlockResultsResponse = {
  $type: "cometbft.services.block_results.v2.GetBlockResultsResponse" as const,

  encode(message: GetBlockResultsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    for (const v of message.tx_results) {
      ExecTxResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.finalize_block_events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.validator_updates) {
      ValidatorUpdate.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.consensus_param_updates !== undefined) {
      ConsensusParams.encode(message.consensus_param_updates, writer.uint32(42).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(50).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockResultsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlockResultsResponse();
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

          message.tx_results.push(ExecTxResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.finalize_block_events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validator_updates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.consensus_param_updates = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.app_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlockResultsResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      tx_results: globalThis.Array.isArray(object?.tx_results)
        ? object.tx_results.map((e: any) => ExecTxResult.fromJSON(e))
        : [],
      finalize_block_events: globalThis.Array.isArray(object?.finalize_block_events)
        ? object.finalize_block_events.map((e: any) => Event.fromJSON(e))
        : [],
      validator_updates: globalThis.Array.isArray(object?.validator_updates)
        ? object.validator_updates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      consensus_param_updates: isSet(object.consensus_param_updates)
        ? ConsensusParams.fromJSON(object.consensus_param_updates)
        : undefined,
      app_hash: isSet(object.app_hash) ? bytesFromBase64(object.app_hash) : new Uint8Array(0),
    };
  },

  toJSON(message: GetBlockResultsResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.tx_results?.length) {
      obj.tx_results = message.tx_results.map((e) => ExecTxResult.toJSON(e));
    }
    if (message.finalize_block_events?.length) {
      obj.finalize_block_events = message.finalize_block_events.map((e) => Event.toJSON(e));
    }
    if (message.validator_updates?.length) {
      obj.validator_updates = message.validator_updates.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.consensus_param_updates !== undefined) {
      obj.consensus_param_updates = ConsensusParams.toJSON(message.consensus_param_updates);
    }
    if (message.app_hash !== undefined) {
      obj.app_hash = base64FromBytes(message.app_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<GetBlockResultsResponse>): GetBlockResultsResponse {
    return GetBlockResultsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetBlockResultsResponse>): GetBlockResultsResponse {
    const message = createBaseGetBlockResultsResponse();
    message.height = object.height ?? "0";
    message.tx_results = object.tx_results?.map((e) => ExecTxResult.fromPartial(e)) || [];
    message.finalize_block_events = object.finalize_block_events?.map((e) => Event.fromPartial(e)) || [];
    message.validator_updates = object.validator_updates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.consensus_param_updates =
      (object.consensus_param_updates !== undefined && object.consensus_param_updates !== null)
        ? ConsensusParams.fromPartial(object.consensus_param_updates)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array(0);
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
