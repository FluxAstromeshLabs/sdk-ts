/* eslint-disable */
import _m0 from 'protobufjs/minimal'
import { ContractInfo } from './evm'

export interface EventDeploy {
  contract: ContractInfo | undefined
}

export interface EventExecute {
  address: string
}

export interface EventEmitLog {
  address: string
  topics: Uint8Array[]
  data: Uint8Array
}

function createBaseEventDeploy(): EventDeploy {
  return { contract: undefined }
}

export const EventDeploy = {
  $type: 'flux.evm.v1beta1.EventDeploy' as const,

  encode(message: EventDeploy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contract !== undefined) {
      ContractInfo.encode(message.contract, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDeploy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseEventDeploy()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.contract = ContractInfo.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): EventDeploy {
    return { contract: isSet(object.contract) ? ContractInfo.fromJSON(object.contract) : undefined }
  },

  toJSON(message: EventDeploy): unknown {
    const obj: any = {}
    if (message.contract !== undefined) {
      obj.contract = ContractInfo.toJSON(message.contract)
    }
    return obj
  },

  create(base?: DeepPartial<EventDeploy>): EventDeploy {
    return EventDeploy.fromPartial(base ?? {})
  },
  fromPartial(object: DeepPartial<EventDeploy>): EventDeploy {
    const message = createBaseEventDeploy()
    message.contract =
      object.contract !== undefined && object.contract !== null
        ? ContractInfo.fromPartial(object.contract)
        : undefined
    return message
  }
}

function createBaseEventExecute(): EventExecute {
  return { address: '' }
}

export const EventExecute = {
  $type: 'flux.evm.v1beta1.EventExecute' as const,

  encode(message: EventExecute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventExecute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseEventExecute()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.address = reader.string()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): EventExecute {
    return { address: isSet(object.address) ? globalThis.String(object.address) : '' }
  },

  toJSON(message: EventExecute): unknown {
    const obj: any = {}
    if (message.address !== '') {
      obj.address = message.address
    }
    return obj
  },

  create(base?: DeepPartial<EventExecute>): EventExecute {
    return EventExecute.fromPartial(base ?? {})
  },
  fromPartial(object: DeepPartial<EventExecute>): EventExecute {
    const message = createBaseEventExecute()
    message.address = object.address ?? ''
    return message
  }
}

function createBaseEventEmitLog(): EventEmitLog {
  return { address: '', topics: [], data: new Uint8Array(0) }
}

export const EventEmitLog = {
  $type: 'flux.evm.v1beta1.EventEmitLog' as const,

  encode(message: EventEmitLog, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== '') {
      writer.uint32(10).string(message.address)
    }
    for (const v of message.topics) {
      writer.uint32(18).bytes(v!)
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventEmitLog {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseEventEmitLog()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.address = reader.string()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.topics.push(reader.bytes())
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.data = reader.bytes()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): EventEmitLog {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : '',
      topics: globalThis.Array.isArray(object?.topics)
        ? object.topics.map((e: any) => bytesFromBase64(e))
        : [],
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0)
    }
  },

  toJSON(message: EventEmitLog): unknown {
    const obj: any = {}
    if (message.address !== '') {
      obj.address = message.address
    }
    if (message.topics?.length) {
      obj.topics = message.topics.map((e) => base64FromBytes(e))
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data)
    }
    return obj
  },

  create(base?: DeepPartial<EventEmitLog>): EventEmitLog {
    return EventEmitLog.fromPartial(base ?? {})
  },
  fromPartial(object: DeepPartial<EventEmitLog>): EventEmitLog {
    const message = createBaseEventEmitLog()
    message.address = object.address ?? ''
    message.topics = object.topics?.map((e) => e) || []
    message.data = object.data ?? new Uint8Array(0)
    return message
  }
}

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'))
  } else {
    const bin = globalThis.atob(b64)
    const arr = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i)
    }
    return arr
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString('base64')
  } else {
    const bin: string[] = []
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte))
    })
    return globalThis.btoa(bin.join(''))
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
