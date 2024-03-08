/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

export interface MsgDeployContract {
  /** sender is the address of the owner of nft */
  sender: string;
  bytecode: Uint8Array;
  calldata: Uint8Array;
  input_amount: Uint8Array;
}

export interface MsgDeployContractResponse {
  contract_address: Uint8Array;
}

export interface MsgExecuteContract {
  /** sender is the address of the owner of nft */
  sender: string;
  contract_address: Uint8Array;
  calldata: Uint8Array;
  input_amount: Uint8Array;
}

export interface MsgExecuteContractResponse {
  output: Uint8Array;
  status_code: string;
}

function createBaseMsgDeployContract(): MsgDeployContract {
  return { sender: "", bytecode: new Uint8Array(0), calldata: new Uint8Array(0), input_amount: new Uint8Array(0) };
}

export const MsgDeployContract = {
  $type: "flux.evm.v1beta1.MsgDeployContract" as const,

  encode(message: MsgDeployContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.bytecode.length !== 0) {
      writer.uint32(18).bytes(message.bytecode);
    }
    if (message.calldata.length !== 0) {
      writer.uint32(26).bytes(message.calldata);
    }
    if (message.input_amount.length !== 0) {
      writer.uint32(34).bytes(message.input_amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeployContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeployContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bytecode = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.calldata = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.input_amount = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeployContract {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      bytecode: isSet(object.bytecode) ? bytesFromBase64(object.bytecode) : new Uint8Array(0),
      calldata: isSet(object.calldata) ? bytesFromBase64(object.calldata) : new Uint8Array(0),
      input_amount: isSet(object.input_amount) ? bytesFromBase64(object.input_amount) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgDeployContract): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.bytecode.length !== 0) {
      obj.bytecode = base64FromBytes(message.bytecode);
    }
    if (message.calldata.length !== 0) {
      obj.calldata = base64FromBytes(message.calldata);
    }
    if (message.input_amount.length !== 0) {
      obj.input_amount = base64FromBytes(message.input_amount);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDeployContract>): MsgDeployContract {
    return MsgDeployContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDeployContract>): MsgDeployContract {
    const message = createBaseMsgDeployContract();
    message.sender = object.sender ?? "";
    message.bytecode = object.bytecode ?? new Uint8Array(0);
    message.calldata = object.calldata ?? new Uint8Array(0);
    message.input_amount = object.input_amount ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgDeployContractResponse(): MsgDeployContractResponse {
  return { contract_address: new Uint8Array(0) };
}

export const MsgDeployContractResponse = {
  $type: "flux.evm.v1beta1.MsgDeployContractResponse" as const,

  encode(message: MsgDeployContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contract_address.length !== 0) {
      writer.uint32(10).bytes(message.contract_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeployContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeployContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contract_address = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeployContractResponse {
    return {
      contract_address: isSet(object.contract_address) ? bytesFromBase64(object.contract_address) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgDeployContractResponse): unknown {
    const obj: any = {};
    if (message.contract_address.length !== 0) {
      obj.contract_address = base64FromBytes(message.contract_address);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDeployContractResponse>): MsgDeployContractResponse {
    return MsgDeployContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDeployContractResponse>): MsgDeployContractResponse {
    const message = createBaseMsgDeployContractResponse();
    message.contract_address = object.contract_address ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgExecuteContract(): MsgExecuteContract {
  return {
    sender: "",
    contract_address: new Uint8Array(0),
    calldata: new Uint8Array(0),
    input_amount: new Uint8Array(0),
  };
}

export const MsgExecuteContract = {
  $type: "flux.evm.v1beta1.MsgExecuteContract" as const,

  encode(message: MsgExecuteContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract_address.length !== 0) {
      writer.uint32(18).bytes(message.contract_address);
    }
    if (message.calldata.length !== 0) {
      writer.uint32(26).bytes(message.calldata);
    }
    if (message.input_amount.length !== 0) {
      writer.uint32(34).bytes(message.input_amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contract_address = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.calldata = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.input_amount = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteContract {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      contract_address: isSet(object.contract_address) ? bytesFromBase64(object.contract_address) : new Uint8Array(0),
      calldata: isSet(object.calldata) ? bytesFromBase64(object.calldata) : new Uint8Array(0),
      input_amount: isSet(object.input_amount) ? bytesFromBase64(object.input_amount) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgExecuteContract): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.contract_address.length !== 0) {
      obj.contract_address = base64FromBytes(message.contract_address);
    }
    if (message.calldata.length !== 0) {
      obj.calldata = base64FromBytes(message.calldata);
    }
    if (message.input_amount.length !== 0) {
      obj.input_amount = base64FromBytes(message.input_amount);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExecuteContract>): MsgExecuteContract {
    return MsgExecuteContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExecuteContract>): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    message.sender = object.sender ?? "";
    message.contract_address = object.contract_address ?? new Uint8Array(0);
    message.calldata = object.calldata ?? new Uint8Array(0);
    message.input_amount = object.input_amount ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgExecuteContractResponse(): MsgExecuteContractResponse {
  return { output: new Uint8Array(0), status_code: "" };
}

export const MsgExecuteContractResponse = {
  $type: "flux.evm.v1beta1.MsgExecuteContractResponse" as const,

  encode(message: MsgExecuteContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.output.length !== 0) {
      writer.uint32(10).bytes(message.output);
    }
    if (message.status_code !== "") {
      writer.uint32(18).string(message.status_code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.output = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status_code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteContractResponse {
    return {
      output: isSet(object.output) ? bytesFromBase64(object.output) : new Uint8Array(0),
      status_code: isSet(object.status_code) ? globalThis.String(object.status_code) : "",
    };
  },

  toJSON(message: MsgExecuteContractResponse): unknown {
    const obj: any = {};
    if (message.output.length !== 0) {
      obj.output = base64FromBytes(message.output);
    }
    if (message.status_code !== "") {
      obj.status_code = message.status_code;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgExecuteContractResponse>): MsgExecuteContractResponse {
    return MsgExecuteContractResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgExecuteContractResponse>): MsgExecuteContractResponse {
    const message = createBaseMsgExecuteContractResponse();
    message.output = object.output ?? new Uint8Array(0);
    message.status_code = object.status_code ?? "";
    return message;
  },
};

export interface Msg {
  DeployContract(request: DeepPartial<MsgDeployContract>, metadata?: grpc.Metadata): Promise<MsgDeployContractResponse>;
  ExecuteContract(
    request: DeepPartial<MsgExecuteContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecuteContractResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DeployContract = this.DeployContract.bind(this);
    this.ExecuteContract = this.ExecuteContract.bind(this);
  }

  DeployContract(
    request: DeepPartial<MsgDeployContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgDeployContractResponse> {
    return this.rpc.unary(MsgDeployContractDesc, MsgDeployContract.fromPartial(request), metadata);
  }

  ExecuteContract(
    request: DeepPartial<MsgExecuteContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgExecuteContractResponse> {
    return this.rpc.unary(MsgExecuteContractDesc, MsgExecuteContract.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "flux.evm.v1beta1.Msg" };

export const MsgDeployContractDesc: UnaryMethodDefinitionish = {
  methodName: "DeployContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgDeployContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgDeployContractResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgExecuteContractDesc: UnaryMethodDefinitionish = {
  methodName: "ExecuteContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgExecuteContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgExecuteContractResponse.decode(data);
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
