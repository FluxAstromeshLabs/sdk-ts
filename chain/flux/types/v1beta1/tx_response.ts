/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * base header ak message type, we can cast the bytes into corresponding message
 * response type
 */
export interface TxResponseGenericMessage {
  header: string;
  data: Uint8Array;
}

/** improvised message to unpack length prefixed messages in tx response data */
export interface TxResponseData {
  messages: TxResponseGenericMessage[];
}

function createBaseTxResponseGenericMessage(): TxResponseGenericMessage {
  return { header: "", data: new Uint8Array(0) };
}

export const TxResponseGenericMessage = {
  encode(message: TxResponseGenericMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== "") {
      writer.uint32(10).string(message.header);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResponseGenericMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResponseGenericMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.header = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxResponseGenericMessage {
    return {
      header: isSet(object.header) ? String(object.header) : "",
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: TxResponseGenericMessage): unknown {
    const obj: any = {};
    if (message.header !== "") {
      obj.header = message.header;
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<TxResponseGenericMessage>): TxResponseGenericMessage {
    return TxResponseGenericMessage.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<TxResponseGenericMessage>): TxResponseGenericMessage {
    const message = createBaseTxResponseGenericMessage();
    message.header = object.header ?? "";
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTxResponseData(): TxResponseData {
  return { messages: [] };
}

export const TxResponseData = {
  encode(message: TxResponseData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      TxResponseGenericMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResponseData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResponseData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messages.push(TxResponseGenericMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxResponseData {
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => TxResponseGenericMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TxResponseData): unknown {
    const obj: any = {};
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => TxResponseGenericMessage.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<TxResponseData>): TxResponseData {
    return TxResponseData.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<TxResponseData>): TxResponseData {
    const message = createBaseTxResponseData();
    message.messages = object.messages?.map((e) => TxResponseGenericMessage.fromPartial(e)) || [];
    return message;
  },
};

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
