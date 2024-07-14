import * as svmtypes from '../../chain/flux/svm/v1beta1/svm'
import * as BufferLayout from '@solana/buffer-layout'
import * as svmtx from '../../chain/flux/svm/v1beta1/tx'
import * as web3 from '@solana/web3.js'

interface IInstructionInputData {
  readonly instruction: number
}

type InstructionType<TInputData extends IInstructionInputData> = {
  index: number
  layout: BufferLayout.Layout<TInputData>
}

function getAlloc(type: any, fields: any): number {
  const getItemAlloc = (item: any): number => {
    if (item.span >= 0) {
      return item.span
    } else if (typeof item.alloc === 'function') {
      return item.alloc(fields[item.property])
    } else if ('count' in item && 'elementLayout' in item) {
      const field = fields[item.property]
      if (Array.isArray(field)) {
        return field.length * getItemAlloc(item.elementLayout)
      }
    } else if ('fields' in item) {
      // This is a `Structure` whose size needs to be recursively measured.
      return getAlloc({ layout: item }, fields[item.property])
    }
    // Couldn't determine allocated size of layout
    return 0
  }

  let alloc = 0
  type.layout.fields.forEach((item: any) => {
    alloc += getItemAlloc(item)
  })

  return alloc
}

export function encodeData<TInputData extends IInstructionInputData>(
  type: InstructionType<TInputData>,
  fields?: any
): Buffer {
  const allocLength = type.layout.span >= 0 ? type.layout.span : getAlloc(type, fields)
  const data = Buffer.alloc(allocLength)
  const layoutFields = Object.assign({ instruction: type.index }, fields)
  type.layout.encode(layoutFields, data)
  return data
}

/*
export function decodeData<TInputData extends IInstructionInputData>(
    type: InstructionType<TInputData>,
    buffer: Buffer,
): TInputData {
    let data: TInputData;
    try {
      data = type.layout.decode(buffer);
    } catch (err) {
      throw new Error('invalid instruction; ' + err);
    }
  
    if (data.instruction !== type.index) {
      throw new Error(
        `invalid instruction; instruction index mismatch ${data.instruction} != ${type.index}`,
      );
    }
  
    return data;
  }
  */
export const uint8Array = (fieldName: string): BufferLayout.Layout<Uint8Array> => {
  const bs = BufferLayout.struct<Readonly<Uint8Array>>(
    [
      BufferLayout.u32('length'),
      BufferLayout.blob(BufferLayout.offset(BufferLayout.u8(), 0), 'data') // clarify usage of this
    ],
    fieldName
  )

  bs.decode = (b: Uint8Array, offset: number) => {
    let arrayLen = b.buffer.slice(offset, offset + 8)
    let lenView = new DataView(arrayLen)
    let len = lenView.getUint32(0, true)
    let arr = new Uint8Array(len)
    arr.set(b, offset + 8)
    return arr
  }

  bs.encode = (arr: Uint8Array, b: Uint8Array, offset: number) => {
    let lenBuffer = new ArrayBuffer(8)
    let lenView = new DataView(lenBuffer)
    lenView.setBigUint64(0, BigInt(arr.length), true)
    b.set(new Uint8Array(lenBuffer), offset)
    b.set(arr, offset + 8)
    return offset + 8 + arr.length
  }
  ;(bs as any).alloc = (a: Uint8Array) => {
    return 8 + a.length
  }

  return bs
}

export type UpgradableLoaderInstructionData = {
  InitializeBuffer: IInstructionInputData
  Write: IInstructionInputData & {
    offset: number
    data: Uint8Array
  }
  DeployWithMaxDataLen: IInstructionInputData & {
    maxLen: number
  }
}

// UPGRADABLE_LOADER: native program
export const UPGRADABLE_LOADER_LAYOUTS = {
  InitializeBuffer: {
    index: 0,
    layout: BufferLayout.struct<UpgradableLoaderInstructionData['InitializeBuffer']>([
      BufferLayout.u32('instruction')
    ])
  },

  Write: {
    index: 1,
    layout: BufferLayout.struct<UpgradableLoaderInstructionData['Write']>([
      BufferLayout.u32('instruction'),
      BufferLayout.u32('offset'),
      uint8Array('data')
    ])
  },

  DeployWithMaxDataLen: {
    index: 2,
    layout: BufferLayout.struct<UpgradableLoaderInstructionData['Write']>([
      BufferLayout.u32('instruction'),
      BufferLayout.nu64('maxLen') // usize in RUST = u64
    ])
  }
}

export function toFluxSvmTransaction(
  senderAddr: string,
  solTx: web3.Transaction,
  budget: Number
): svmtx.MsgTransaction {
  // we don't use recent blockhash in flux so just let it be zero
  solTx.recentBlockhash = '0x0'
  let message = solTx.compileMessage()
  let accounts = message.accountKeys.map((x) => x.toString())

  return svmtx.MsgTransaction.create({
    signers: [senderAddr],
    accounts: accounts,
    instructions: solTx.instructions.map((ix) => {
      let ixKeys: Array<string> = []
      ix.keys.forEach((k) => {
        const key = k.pubkey.toString()
        if (!ixKeys.includes(key)) {
          ixKeys.push(key)
        }
      })
      let svmIx: svmtypes.Instruction = {
        program_index: [accounts.indexOf(ix.programId.toString())],
        accounts: ix.keys.map((k) =>
          svmtypes.InstructionAccount.create({
            id_index: accounts.indexOf(k.pubkey.toString()),
            caller_index: accounts.indexOf(k.pubkey.toString()), // index in transaction
            callee_index: ixKeys.indexOf(k.pubkey.toString()), // index in instructions
            is_signer: k.isSigner,
            is_writable: k.isWritable
          })
        ),
        data: ix.data
      }
      return svmIx
    }),
    compute_budget: budget.toString() // budget for executing solana bytecode
  })
}
