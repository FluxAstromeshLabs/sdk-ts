/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { Plane, planeFromJSON, planeToJSON } from "./tx";

export enum QueryAction {
  VM_QUERY = 0,
  COSMOS_BANK_BALANCE = 1,
  UNRECOGNIZED = -1,
}

export function queryActionFromJSON(object: any): QueryAction {
  switch (object) {
    case 0:
    case "VM_QUERY":
      return QueryAction.VM_QUERY;
    case 1:
    case "COSMOS_BANK_BALANCE":
      return QueryAction.COSMOS_BANK_BALANCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return QueryAction.UNRECOGNIZED;
  }
}

export function queryActionToJSON(object: QueryAction): string {
  switch (object) {
    case QueryAction.VM_QUERY:
      return "VM_QUERY";
    case QueryAction.COSMOS_BANK_BALANCE:
      return "COSMOS_BANK_BALANCE";
    case QueryAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface QueryDenomLinkRequest {
  src_plane: Plane;
  dst_plane: Plane;
  src_addr: string;
}

export interface QueryDenomLinkResponse {
  dst_addr: string;
  src_decimals: number;
  dst_decimals: number;
}

export interface BalanceRequest {
  plane: string;
  denom: string;
  address: string;
}

export interface BalanceResponse {
  balance: string;
}

export interface FISQueryInstruction {
  plane: Plane;
  action: QueryAction;
  address: Uint8Array;
  input: Uint8Array[];
}

export interface FISQueryInstructionResponse {
  plane: Plane;
  output: Uint8Array;
}

export interface FISQueryRequest {
  instructions: FISQueryInstruction[];
}

export interface FISQueryResponse {
  instruction_responses: FISQueryInstructionResponse[];
}

function createBaseQueryDenomLinkRequest(): QueryDenomLinkRequest {
  return { src_plane: 0, dst_plane: 0, src_addr: "" };
}

export const QueryDenomLinkRequest = {
  $type: "flux.astromesh.v1beta1.QueryDenomLinkRequest" as const,

  encode(message: QueryDenomLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.src_plane !== 0) {
      writer.uint32(8).int32(message.src_plane);
    }
    if (message.dst_plane !== 0) {
      writer.uint32(16).int32(message.dst_plane);
    }
    if (message.src_addr !== "") {
      writer.uint32(26).string(message.src_addr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.src_plane = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.dst_plane = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.src_addr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomLinkRequest {
    return {
      src_plane: isSet(object.src_plane) ? planeFromJSON(object.src_plane) : 0,
      dst_plane: isSet(object.dst_plane) ? planeFromJSON(object.dst_plane) : 0,
      src_addr: isSet(object.src_addr) ? globalThis.String(object.src_addr) : "",
    };
  },

  toJSON(message: QueryDenomLinkRequest): unknown {
    const obj: any = {};
    if (message.src_plane !== undefined) {
      obj.src_plane = planeToJSON(message.src_plane);
    }
    if (message.dst_plane !== undefined) {
      obj.dst_plane = planeToJSON(message.dst_plane);
    }
    if (message.src_addr !== undefined) {
      obj.src_addr = message.src_addr;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomLinkRequest>): QueryDenomLinkRequest {
    return QueryDenomLinkRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomLinkRequest>): QueryDenomLinkRequest {
    const message = createBaseQueryDenomLinkRequest();
    message.src_plane = object.src_plane ?? 0;
    message.dst_plane = object.dst_plane ?? 0;
    message.src_addr = object.src_addr ?? "";
    return message;
  },
};

function createBaseQueryDenomLinkResponse(): QueryDenomLinkResponse {
  return { dst_addr: "", src_decimals: 0, dst_decimals: 0 };
}

export const QueryDenomLinkResponse = {
  $type: "flux.astromesh.v1beta1.QueryDenomLinkResponse" as const,

  encode(message: QueryDenomLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dst_addr !== "") {
      writer.uint32(10).string(message.dst_addr);
    }
    if (message.src_decimals !== 0) {
      writer.uint32(16).int32(message.src_decimals);
    }
    if (message.dst_decimals !== 0) {
      writer.uint32(24).int32(message.dst_decimals);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomLinkResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dst_addr = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.src_decimals = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dst_decimals = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomLinkResponse {
    return {
      dst_addr: isSet(object.dst_addr) ? globalThis.String(object.dst_addr) : "",
      src_decimals: isSet(object.src_decimals) ? globalThis.Number(object.src_decimals) : 0,
      dst_decimals: isSet(object.dst_decimals) ? globalThis.Number(object.dst_decimals) : 0,
    };
  },

  toJSON(message: QueryDenomLinkResponse): unknown {
    const obj: any = {};
    if (message.dst_addr !== undefined) {
      obj.dst_addr = message.dst_addr;
    }
    if (message.src_decimals !== undefined) {
      obj.src_decimals = Math.round(message.src_decimals);
    }
    if (message.dst_decimals !== undefined) {
      obj.dst_decimals = Math.round(message.dst_decimals);
    }
    return obj;
  },

  create(base?: DeepPartial<QueryDenomLinkResponse>): QueryDenomLinkResponse {
    return QueryDenomLinkResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryDenomLinkResponse>): QueryDenomLinkResponse {
    const message = createBaseQueryDenomLinkResponse();
    message.dst_addr = object.dst_addr ?? "";
    message.src_decimals = object.src_decimals ?? 0;
    message.dst_decimals = object.dst_decimals ?? 0;
    return message;
  },
};

function createBaseBalanceRequest(): BalanceRequest {
  return { plane: "", denom: "", address: "" };
}

export const BalanceRequest = {
  $type: "flux.astromesh.v1beta1.BalanceRequest" as const,

  encode(message: BalanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plane !== "") {
      writer.uint32(10).string(message.plane);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plane = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalanceRequest {
    return {
      plane: isSet(object.plane) ? globalThis.String(object.plane) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
    };
  },

  toJSON(message: BalanceRequest): unknown {
    const obj: any = {};
    if (message.plane !== undefined) {
      obj.plane = message.plane;
    }
    if (message.denom !== undefined) {
      obj.denom = message.denom;
    }
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    return obj;
  },

  create(base?: DeepPartial<BalanceRequest>): BalanceRequest {
    return BalanceRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BalanceRequest>): BalanceRequest {
    const message = createBaseBalanceRequest();
    message.plane = object.plane ?? "";
    message.denom = object.denom ?? "";
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseBalanceResponse(): BalanceResponse {
  return { balance: "" };
}

export const BalanceResponse = {
  $type: "flux.astromesh.v1beta1.BalanceResponse" as const,

  encode(message: BalanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balance = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalanceResponse {
    return { balance: isSet(object.balance) ? globalThis.String(object.balance) : "" };
  },

  toJSON(message: BalanceResponse): unknown {
    const obj: any = {};
    if (message.balance !== undefined) {
      obj.balance = message.balance;
    }
    return obj;
  },

  create(base?: DeepPartial<BalanceResponse>): BalanceResponse {
    return BalanceResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BalanceResponse>): BalanceResponse {
    const message = createBaseBalanceResponse();
    message.balance = object.balance ?? "";
    return message;
  },
};

function createBaseFISQueryInstruction(): FISQueryInstruction {
  return { plane: 0, action: 0, address: new Uint8Array(0), input: [] };
}

export const FISQueryInstruction = {
  $type: "flux.astromesh.v1beta1.FISQueryInstruction" as const,

  encode(message: FISQueryInstruction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plane !== 0) {
      writer.uint32(8).int32(message.plane);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    if (message.address.length !== 0) {
      writer.uint32(26).bytes(message.address);
    }
    for (const v of message.input) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FISQueryInstruction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFISQueryInstruction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.plane = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.action = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.address = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.input.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FISQueryInstruction {
    return {
      plane: isSet(object.plane) ? planeFromJSON(object.plane) : 0,
      action: isSet(object.action) ? queryActionFromJSON(object.action) : 0,
      address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(0),
      input: globalThis.Array.isArray(object?.input) ? object.input.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: FISQueryInstruction): unknown {
    const obj: any = {};
    if (message.plane !== undefined) {
      obj.plane = planeToJSON(message.plane);
    }
    if (message.action !== undefined) {
      obj.action = queryActionToJSON(message.action);
    }
    if (message.address !== undefined) {
      obj.address = base64FromBytes(message.address);
    }
    if (message.input?.length) {
      obj.input = message.input.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create(base?: DeepPartial<FISQueryInstruction>): FISQueryInstruction {
    return FISQueryInstruction.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FISQueryInstruction>): FISQueryInstruction {
    const message = createBaseFISQueryInstruction();
    message.plane = object.plane ?? 0;
    message.action = object.action ?? 0;
    message.address = object.address ?? new Uint8Array(0);
    message.input = object.input?.map((e) => e) || [];
    return message;
  },
};

function createBaseFISQueryInstructionResponse(): FISQueryInstructionResponse {
  return { plane: 0, output: new Uint8Array(0) };
}

export const FISQueryInstructionResponse = {
  $type: "flux.astromesh.v1beta1.FISQueryInstructionResponse" as const,

  encode(message: FISQueryInstructionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plane !== 0) {
      writer.uint32(8).int32(message.plane);
    }
    if (message.output.length !== 0) {
      writer.uint32(18).bytes(message.output);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FISQueryInstructionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFISQueryInstructionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.plane = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.output = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FISQueryInstructionResponse {
    return {
      plane: isSet(object.plane) ? planeFromJSON(object.plane) : 0,
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(0),
    };
  },

  toJSON(message: FISQueryInstructionResponse): unknown {
    const obj: any = {};
    if (message.plane !== undefined) {
      obj.plane = planeToJSON(message.plane);
    }
    if (message.output !== undefined) {
      obj.output = base64FromBytes(message.output);
    }
    return obj;
  },

  create(base?: DeepPartial<FISQueryInstructionResponse>): FISQueryInstructionResponse {
    return FISQueryInstructionResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FISQueryInstructionResponse>): FISQueryInstructionResponse {
    const message = createBaseFISQueryInstructionResponse();
    message.plane = object.plane ?? 0;
    message.output = object.output ?? new Uint8Array(0);
    return message;
  },
};

function createBaseFISQueryRequest(): FISQueryRequest {
  return { instructions: [] };
}

export const FISQueryRequest = {
  $type: "flux.astromesh.v1beta1.FISQueryRequest" as const,

  encode(message: FISQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.instructions) {
      FISQueryInstruction.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FISQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFISQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.instructions.push(FISQueryInstruction.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FISQueryRequest {
    return {
      instructions: globalThis.Array.isArray(object?.instructions)
        ? object.instructions.map((e: any) => FISQueryInstruction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FISQueryRequest): unknown {
    const obj: any = {};
    if (message.instructions?.length) {
      obj.instructions = message.instructions.map((e) => FISQueryInstruction.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<FISQueryRequest>): FISQueryRequest {
    return FISQueryRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FISQueryRequest>): FISQueryRequest {
    const message = createBaseFISQueryRequest();
    message.instructions = object.instructions?.map((e) => FISQueryInstruction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFISQueryResponse(): FISQueryResponse {
  return { instruction_responses: [] };
}

export const FISQueryResponse = {
  $type: "flux.astromesh.v1beta1.FISQueryResponse" as const,

  encode(message: FISQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.instruction_responses) {
      FISQueryInstructionResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FISQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFISQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.instruction_responses.push(FISQueryInstructionResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FISQueryResponse {
    return {
      instruction_responses: globalThis.Array.isArray(object?.instruction_responses)
        ? object.instruction_responses.map((e: any) => FISQueryInstructionResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FISQueryResponse): unknown {
    const obj: any = {};
    if (message.instruction_responses?.length) {
      obj.instruction_responses = message.instruction_responses.map((e) => FISQueryInstructionResponse.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<FISQueryResponse>): FISQueryResponse {
    return FISQueryResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FISQueryResponse>): FISQueryResponse {
    const message = createBaseFISQueryResponse();
    message.instruction_responses =
      object.instruction_responses?.map((e) => FISQueryInstructionResponse.fromPartial(e)) || [];
    return message;
  },
};

export interface Query {
  DenomLink(request: DeepPartial<QueryDenomLinkRequest>, metadata?: grpc.Metadata): Promise<QueryDenomLinkResponse>;
  Balance(request: DeepPartial<BalanceRequest>, metadata?: grpc.Metadata): Promise<BalanceResponse>;
  FISQuery(request: DeepPartial<FISQueryRequest>, metadata?: grpc.Metadata): Promise<FISQueryResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DenomLink = this.DenomLink.bind(this);
    this.Balance = this.Balance.bind(this);
    this.FISQuery = this.FISQuery.bind(this);
  }

  DenomLink(request: DeepPartial<QueryDenomLinkRequest>, metadata?: grpc.Metadata): Promise<QueryDenomLinkResponse> {
    return this.rpc.unary(QueryDenomLinkDesc, QueryDenomLinkRequest.fromPartial(request), metadata);
  }

  Balance(request: DeepPartial<BalanceRequest>, metadata?: grpc.Metadata): Promise<BalanceResponse> {
    return this.rpc.unary(QueryBalanceDesc, BalanceRequest.fromPartial(request), metadata);
  }

  FISQuery(request: DeepPartial<FISQueryRequest>, metadata?: grpc.Metadata): Promise<FISQueryResponse> {
    return this.rpc.unary(QueryFISQueryDesc, FISQueryRequest.fromPartial(request), metadata);
  }
}

export const QueryDesc = { serviceName: "flux.astromesh.v1beta1.Query" };

export const QueryDenomLinkDesc: UnaryMethodDefinitionish = {
  methodName: "DenomLink",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return QueryDenomLinkRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = QueryDenomLinkResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryBalanceDesc: UnaryMethodDefinitionish = {
  methodName: "Balance",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return BalanceRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = BalanceResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const QueryFISQueryDesc: UnaryMethodDefinitionish = {
  methodName: "FISQuery",
  service: QueryDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return FISQueryRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FISQueryResponse.decode(data);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
