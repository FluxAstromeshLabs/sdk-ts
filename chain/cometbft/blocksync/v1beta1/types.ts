// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: cometbft/blocksync/v1beta1/types.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Block } from "../../types/v1beta1/block";

/** BlockRequest requests a block for a specific height */
export interface BlockRequest {
  height: string;
}

/** NoBlockResponse informs the node that the peer does not have block at the requested height */
export interface NoBlockResponse {
  height: string;
}

/** BlockResponse returns block to the requested */
export interface BlockResponse {
  block: Block | undefined;
}

/** StatusRequest requests the status of a peer. */
export interface StatusRequest {
}

/** StatusResponse is a peer response to inform their status. */
export interface StatusResponse {
  height: string;
  base: string;
}

/** Message is an abstract blocksync message. */
export interface Message {
  block_request?: BlockRequest | undefined;
  no_block_response?: NoBlockResponse | undefined;
  block_response?: BlockResponse | undefined;
  status_request?: StatusRequest | undefined;
  status_response?: StatusResponse | undefined;
}

function createBaseBlockRequest(): BlockRequest {
  return { height: "0" };
}

export const BlockRequest = {
  $type: "cometbft.blocksync.v1beta1.BlockRequest" as const,

  encode(message: BlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockRequest();
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

  fromJSON(object: any): BlockRequest {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: BlockRequest): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<BlockRequest>): BlockRequest {
    return BlockRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BlockRequest>): BlockRequest {
    const message = createBaseBlockRequest();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseNoBlockResponse(): NoBlockResponse {
  return { height: "0" };
}

export const NoBlockResponse = {
  $type: "cometbft.blocksync.v1beta1.NoBlockResponse" as const,

  encode(message: NoBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NoBlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNoBlockResponse();
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

  fromJSON(object: any): NoBlockResponse {
    return { height: isSet(object.height) ? globalThis.String(object.height) : "0" };
  },

  toJSON(message: NoBlockResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    return obj;
  },

  create(base?: DeepPartial<NoBlockResponse>): NoBlockResponse {
    return NoBlockResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NoBlockResponse>): NoBlockResponse {
    const message = createBaseNoBlockResponse();
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseBlockResponse(): BlockResponse {
  return { block: undefined };
}

export const BlockResponse = {
  $type: "cometbft.blocksync.v1beta1.BlockResponse" as const,

  encode(message: BlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.block = Block.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockResponse {
    return { block: isSet(object.block) ? Block.fromJSON(object.block) : undefined };
  },

  toJSON(message: BlockResponse): unknown {
    const obj: any = {};
    if (message.block !== undefined) {
      obj.block = Block.toJSON(message.block);
    }
    return obj;
  },

  create(base?: DeepPartial<BlockResponse>): BlockResponse {
    return BlockResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BlockResponse>): BlockResponse {
    const message = createBaseBlockResponse();
    message.block = (object.block !== undefined && object.block !== null) ? Block.fromPartial(object.block) : undefined;
    return message;
  },
};

function createBaseStatusRequest(): StatusRequest {
  return {};
}

export const StatusRequest = {
  $type: "cometbft.blocksync.v1beta1.StatusRequest" as const,

  encode(_: StatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusRequest();
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

  fromJSON(_: any): StatusRequest {
    return {};
  },

  toJSON(_: StatusRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<StatusRequest>): StatusRequest {
    return StatusRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<StatusRequest>): StatusRequest {
    const message = createBaseStatusRequest();
    return message;
  },
};

function createBaseStatusResponse(): StatusResponse {
  return { height: "0", base: "0" };
}

export const StatusResponse = {
  $type: "cometbft.blocksync.v1beta1.StatusResponse" as const,

  encode(message: StatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.base !== "0") {
      writer.uint32(16).int64(message.base);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusResponse();
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
          if (tag !== 16) {
            break;
          }

          message.base = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StatusResponse {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      base: isSet(object.base) ? globalThis.String(object.base) : "0",
    };
  },

  toJSON(message: StatusResponse): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = message.height;
    }
    if (message.base !== undefined) {
      obj.base = message.base;
    }
    return obj;
  },

  create(base?: DeepPartial<StatusResponse>): StatusResponse {
    return StatusResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StatusResponse>): StatusResponse {
    const message = createBaseStatusResponse();
    message.height = object.height ?? "0";
    message.base = object.base ?? "0";
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    block_request: undefined,
    no_block_response: undefined,
    block_response: undefined,
    status_request: undefined,
    status_response: undefined,
  };
}

export const Message = {
  $type: "cometbft.blocksync.v1beta1.Message" as const,

  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.block_request !== undefined) {
      BlockRequest.encode(message.block_request, writer.uint32(10).fork()).ldelim();
    }
    if (message.no_block_response !== undefined) {
      NoBlockResponse.encode(message.no_block_response, writer.uint32(18).fork()).ldelim();
    }
    if (message.block_response !== undefined) {
      BlockResponse.encode(message.block_response, writer.uint32(26).fork()).ldelim();
    }
    if (message.status_request !== undefined) {
      StatusRequest.encode(message.status_request, writer.uint32(34).fork()).ldelim();
    }
    if (message.status_response !== undefined) {
      StatusResponse.encode(message.status_response, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.block_request = BlockRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.no_block_response = NoBlockResponse.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.block_response = BlockResponse.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status_request = StatusRequest.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.status_response = StatusResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      block_request: isSet(object.block_request) ? BlockRequest.fromJSON(object.block_request) : undefined,
      no_block_response: isSet(object.no_block_response)
        ? NoBlockResponse.fromJSON(object.no_block_response)
        : undefined,
      block_response: isSet(object.block_response) ? BlockResponse.fromJSON(object.block_response) : undefined,
      status_request: isSet(object.status_request) ? StatusRequest.fromJSON(object.status_request) : undefined,
      status_response: isSet(object.status_response) ? StatusResponse.fromJSON(object.status_response) : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.block_request !== undefined) {
      obj.block_request = BlockRequest.toJSON(message.block_request);
    }
    if (message.no_block_response !== undefined) {
      obj.no_block_response = NoBlockResponse.toJSON(message.no_block_response);
    }
    if (message.block_response !== undefined) {
      obj.block_response = BlockResponse.toJSON(message.block_response);
    }
    if (message.status_request !== undefined) {
      obj.status_request = StatusRequest.toJSON(message.status_request);
    }
    if (message.status_response !== undefined) {
      obj.status_response = StatusResponse.toJSON(message.status_response);
    }
    return obj;
  },

  create(base?: DeepPartial<Message>): Message {
    return Message.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Message>): Message {
    const message = createBaseMessage();
    message.block_request = (object.block_request !== undefined && object.block_request !== null)
      ? BlockRequest.fromPartial(object.block_request)
      : undefined;
    message.no_block_response = (object.no_block_response !== undefined && object.no_block_response !== null)
      ? NoBlockResponse.fromPartial(object.no_block_response)
      : undefined;
    message.block_response = (object.block_response !== undefined && object.block_response !== null)
      ? BlockResponse.fromPartial(object.block_response)
      : undefined;
    message.status_request = (object.status_request !== undefined && object.status_request !== null)
      ? StatusRequest.fromPartial(object.status_request)
      : undefined;
    message.status_response = (object.status_response !== undefined && object.status_response !== null)
      ? StatusResponse.fromPartial(object.status_response)
      : undefined;
    return message;
  },
};

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
