/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

/** MsgStoreCode defines the request type for the StoreCode rpc. */
export interface MsgStoreCode {
  /** signer address */
  signer: string;
  /** wasm byte code of light client contract. It can be raw or gzip compressed */
  wasm_byte_code: Uint8Array;
}

/** MsgStoreCodeResponse defines the response type for the StoreCode rpc */
export interface MsgStoreCodeResponse {
  /** checksum is the sha256 hash of the stored code */
  checksum: Uint8Array;
}

/** MsgRemoveChecksum defines the request type for the MsgRemoveChecksum rpc. */
export interface MsgRemoveChecksum {
  /** signer address */
  signer: string;
  /** checksum is the sha256 hash to be removed from the store */
  checksum: Uint8Array;
}

/** MsgStoreChecksumResponse defines the response type for the StoreCode rpc */
export interface MsgRemoveChecksumResponse {
}

/** MsgMigrateContract defines the request type for the MigrateContract rpc. */
export interface MsgMigrateContract {
  /** signer address */
  signer: string;
  /** the client id of the contract */
  client_id: string;
  /** checksum is the sha256 hash of the new wasm byte code for the contract */
  checksum: Uint8Array;
  /** the json encoded message to be passed to the contract on migration */
  msg: Uint8Array;
}

/** MsgMigrateContractResponse defines the response type for the MigrateContract rpc */
export interface MsgMigrateContractResponse {
}

function createBaseMsgStoreCode(): MsgStoreCode {
  return { signer: "", wasm_byte_code: new Uint8Array(0) };
}

export const MsgStoreCode = {
  $type: "ibc.lightclients.wasm.v1.MsgStoreCode" as const,

  encode(message: MsgStoreCode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.wasm_byte_code.length !== 0) {
      writer.uint32(18).bytes(message.wasm_byte_code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCode {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.wasm_byte_code = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCode {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      wasm_byte_code: isSet(object.wasm_byte_code) ? bytesFromBase64(object.wasm_byte_code) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgStoreCode): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.wasm_byte_code.length !== 0) {
      obj.wasm_byte_code = base64FromBytes(message.wasm_byte_code);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreCode>): MsgStoreCode {
    return MsgStoreCode.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreCode>): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    message.signer = object.signer ?? "";
    message.wasm_byte_code = object.wasm_byte_code ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgStoreCodeResponse(): MsgStoreCodeResponse {
  return { checksum: new Uint8Array(0) };
}

export const MsgStoreCodeResponse = {
  $type: "ibc.lightclients.wasm.v1.MsgStoreCodeResponse" as const,

  encode(message: MsgStoreCodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.checksum.length !== 0) {
      writer.uint32(10).bytes(message.checksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.checksum = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgStoreCodeResponse {
    return { checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0) };
  },

  toJSON(message: MsgStoreCodeResponse): unknown {
    const obj: any = {};
    if (message.checksum.length !== 0) {
      obj.checksum = base64FromBytes(message.checksum);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    return MsgStoreCodeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    message.checksum = object.checksum ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgRemoveChecksum(): MsgRemoveChecksum {
  return { signer: "", checksum: new Uint8Array(0) };
}

export const MsgRemoveChecksum = {
  $type: "ibc.lightclients.wasm.v1.MsgRemoveChecksum" as const,

  encode(message: MsgRemoveChecksum, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(18).bytes(message.checksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveChecksum {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveChecksum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.checksum = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveChecksum {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgRemoveChecksum): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.checksum.length !== 0) {
      obj.checksum = base64FromBytes(message.checksum);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgRemoveChecksum>): MsgRemoveChecksum {
    return MsgRemoveChecksum.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgRemoveChecksum>): MsgRemoveChecksum {
    const message = createBaseMsgRemoveChecksum();
    message.signer = object.signer ?? "";
    message.checksum = object.checksum ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgRemoveChecksumResponse(): MsgRemoveChecksumResponse {
  return {};
}

export const MsgRemoveChecksumResponse = {
  $type: "ibc.lightclients.wasm.v1.MsgRemoveChecksumResponse" as const,

  encode(_: MsgRemoveChecksumResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveChecksumResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveChecksumResponse();
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

  fromJSON(_: any): MsgRemoveChecksumResponse {
    return {};
  },

  toJSON(_: MsgRemoveChecksumResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgRemoveChecksumResponse>): MsgRemoveChecksumResponse {
    return MsgRemoveChecksumResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgRemoveChecksumResponse>): MsgRemoveChecksumResponse {
    const message = createBaseMsgRemoveChecksumResponse();
    return message;
  },
};

function createBaseMsgMigrateContract(): MsgMigrateContract {
  return { signer: "", client_id: "", checksum: new Uint8Array(0), msg: new Uint8Array(0) };
}

export const MsgMigrateContract = {
  $type: "ibc.lightclients.wasm.v1.MsgMigrateContract" as const,

  encode(message: MsgMigrateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (message.client_id !== "") {
      writer.uint32(18).string(message.client_id);
    }
    if (message.checksum.length !== 0) {
      writer.uint32(26).bytes(message.checksum);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContract {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
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

          message.checksum = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.msg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMigrateContract {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
      msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgMigrateContract): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.client_id !== "") {
      obj.client_id = message.client_id;
    }
    if (message.checksum.length !== 0) {
      obj.checksum = base64FromBytes(message.checksum);
    }
    if (message.msg.length !== 0) {
      obj.msg = base64FromBytes(message.msg);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgMigrateContract>): MsgMigrateContract {
    return MsgMigrateContract.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgMigrateContract>): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    message.signer = object.signer ?? "";
    message.client_id = object.client_id ?? "";
    message.checksum = object.checksum ?? new Uint8Array(0);
    message.msg = object.msg ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgMigrateContractResponse(): MsgMigrateContractResponse {
  return {};
}

export const MsgMigrateContractResponse = {
  $type: "ibc.lightclients.wasm.v1.MsgMigrateContractResponse" as const,

  encode(_: MsgMigrateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContractResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContractResponse();
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

  fromJSON(_: any): MsgMigrateContractResponse {
    return {};
  },

  toJSON(_: MsgMigrateContractResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgMigrateContractResponse>): MsgMigrateContractResponse {
    return MsgMigrateContractResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgMigrateContractResponse>): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    return message;
  },
};

/** Msg defines the ibc/08-wasm Msg service. */
export interface Msg {
  /** StoreCode defines a rpc handler method for MsgStoreCode. */
  StoreCode(request: DeepPartial<MsgStoreCode>, metadata?: grpc.Metadata): Promise<MsgStoreCodeResponse>;
  /** RemoveChecksum defines a rpc handler method for MsgRemoveChecksum. */
  RemoveChecksum(request: DeepPartial<MsgRemoveChecksum>, metadata?: grpc.Metadata): Promise<MsgRemoveChecksumResponse>;
  /** MigrateContract defines a rpc handler method for MsgMigrateContract. */
  MigrateContract(
    request: DeepPartial<MsgMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgMigrateContractResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StoreCode = this.StoreCode.bind(this);
    this.RemoveChecksum = this.RemoveChecksum.bind(this);
    this.MigrateContract = this.MigrateContract.bind(this);
  }

  StoreCode(request: DeepPartial<MsgStoreCode>, metadata?: grpc.Metadata): Promise<MsgStoreCodeResponse> {
    return this.rpc.unary(MsgStoreCodeDesc, MsgStoreCode.fromPartial(request), metadata);
  }

  RemoveChecksum(
    request: DeepPartial<MsgRemoveChecksum>,
    metadata?: grpc.Metadata,
  ): Promise<MsgRemoveChecksumResponse> {
    return this.rpc.unary(MsgRemoveChecksumDesc, MsgRemoveChecksum.fromPartial(request), metadata);
  }

  MigrateContract(
    request: DeepPartial<MsgMigrateContract>,
    metadata?: grpc.Metadata,
  ): Promise<MsgMigrateContractResponse> {
    return this.rpc.unary(MsgMigrateContractDesc, MsgMigrateContract.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "ibc.lightclients.wasm.v1.Msg" };

export const MsgStoreCodeDesc: UnaryMethodDefinitionish = {
  methodName: "StoreCode",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgStoreCode.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgStoreCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgRemoveChecksumDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveChecksum",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgRemoveChecksum.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgRemoveChecksumResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgMigrateContractDesc: UnaryMethodDefinitionish = {
  methodName: "MigrateContract",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgMigrateContract.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgMigrateContractResponse.decode(data);
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
