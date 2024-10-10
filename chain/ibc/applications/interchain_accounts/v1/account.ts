// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               unknown
// source: ibc/applications/interchain_accounts/v1/account.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { BaseAccount } from "../../../../cosmos/auth/v1beta1/auth";

/** An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain */
export interface InterchainAccount {
  base_account: BaseAccount | undefined;
  account_owner: string;
}

function createBaseInterchainAccount(): InterchainAccount {
  return { base_account: undefined, account_owner: "" };
}

export const InterchainAccount: MessageFns<
  InterchainAccount,
  "ibc.applications.interchain_accounts.v1.InterchainAccount"
> = {
  $type: "ibc.applications.interchain_accounts.v1.InterchainAccount" as const,

  encode(message: InterchainAccount, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.base_account !== undefined) {
      BaseAccount.encode(message.base_account, writer.uint32(10).fork()).join();
    }
    if (message.account_owner !== "") {
      writer.uint32(18).string(message.account_owner);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): InterchainAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.base_account = BaseAccount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account_owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterchainAccount {
    return {
      base_account: isSet(object.base_account) ? BaseAccount.fromJSON(object.base_account) : undefined,
      account_owner: isSet(object.account_owner) ? globalThis.String(object.account_owner) : "",
    };
  },

  toJSON(message: InterchainAccount): unknown {
    const obj: any = {};
    if (message.base_account !== undefined) {
      obj.base_account = BaseAccount.toJSON(message.base_account);
    }
    if (message.account_owner !== undefined) {
      obj.account_owner = message.account_owner;
    }
    return obj;
  },

  create(base?: DeepPartial<InterchainAccount>): InterchainAccount {
    return InterchainAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InterchainAccount>): InterchainAccount {
    const message = createBaseInterchainAccount();
    message.base_account = (object.base_account !== undefined && object.base_account !== null)
      ? BaseAccount.fromPartial(object.base_account)
      : undefined;
    message.account_owner = object.account_owner ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

interface MessageFns<T, V extends string> {
  readonly $type: V;
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
