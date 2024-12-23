// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: flux/interpool/v1beta1/tx.proto

/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";
import { CommissionConfig, CommissionFees } from "./interpool";

export interface MsgCreatePool {
  sender: string;
  operator_commission_config: CommissionConfig | undefined;
}

export interface MsgCreatePoolResponse {
  pool_id: string;
  pool_svm_account: string;
}

/**
 * MsgUpdatePool updates pool funds and status.
 * operator can update pools input, cron (pool's driver)
 * cron can update input, output blob, charge fees
 */
export interface MsgUpdatePool {
  sender: string;
  pool_id: string;
  input_blob: Uint8Array;
  output_blob: Uint8Array;
  /**
   * cron set this flag to true to charge management fee, ruled in Commission
   * config
   */
  charge_management_fee: boolean;
  trading_fee: string[];
  cron_id: string;
  /**
   * drivers (nexus bots / contract) that can control the pool fund
   * TODO: Add extra index so it can quickly determined solver A cantrol pool P
   */
  solver_id: string;
}

export interface MsgUpdatePoolResponse {
}

export interface MsgDeposit {
  sender: string;
  pool_id: string;
  deposit_snapshot: string[];
}

export interface MsgDepositResponse {
}

export interface MsgWithdraw {
  sender: string;
  pool_id: string;
  percentage: string;
}

export interface MsgWithdrawResponse {
}

export interface MsgWithdrawCommissionFee {
  sender: string;
  pool_id: string;
}

export interface MsgWithdrawCommissionFeeResponse {
  operator_comission_fees: CommissionFees | undefined;
}

function createBaseMsgCreatePool(): MsgCreatePool {
  return { sender: "", operator_commission_config: undefined };
}

export const MsgCreatePool = {
  $type: "flux.interpool.v1beta1.MsgCreatePool" as const,

  encode(message: MsgCreatePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.operator_commission_config !== undefined) {
      CommissionConfig.encode(message.operator_commission_config, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePool();
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

          message.operator_commission_config = CommissionConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePool {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      operator_commission_config: isSet(object.operator_commission_config)
        ? CommissionConfig.fromJSON(object.operator_commission_config)
        : undefined,
    };
  },

  toJSON(message: MsgCreatePool): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.operator_commission_config !== undefined) {
      obj.operator_commission_config = CommissionConfig.toJSON(message.operator_commission_config);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgCreatePool>): MsgCreatePool {
    return MsgCreatePool.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgCreatePool>): MsgCreatePool {
    const message = createBaseMsgCreatePool();
    message.sender = object.sender ?? "";
    message.operator_commission_config =
      (object.operator_commission_config !== undefined && object.operator_commission_config !== null)
        ? CommissionConfig.fromPartial(object.operator_commission_config)
        : undefined;
    return message;
  },
};

function createBaseMsgCreatePoolResponse(): MsgCreatePoolResponse {
  return { pool_id: "", pool_svm_account: "" };
}

export const MsgCreatePoolResponse = {
  $type: "flux.interpool.v1beta1.MsgCreatePoolResponse" as const,

  encode(message: MsgCreatePoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool_id !== "") {
      writer.uint32(10).string(message.pool_id);
    }
    if (message.pool_svm_account !== "") {
      writer.uint32(18).string(message.pool_svm_account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pool_svm_account = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePoolResponse {
    return {
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      pool_svm_account: isSet(object.pool_svm_account) ? globalThis.String(object.pool_svm_account) : "",
    };
  },

  toJSON(message: MsgCreatePoolResponse): unknown {
    const obj: any = {};
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.pool_svm_account !== undefined) {
      obj.pool_svm_account = message.pool_svm_account;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgCreatePoolResponse>): MsgCreatePoolResponse {
    return MsgCreatePoolResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgCreatePoolResponse>): MsgCreatePoolResponse {
    const message = createBaseMsgCreatePoolResponse();
    message.pool_id = object.pool_id ?? "";
    message.pool_svm_account = object.pool_svm_account ?? "";
    return message;
  },
};

function createBaseMsgUpdatePool(): MsgUpdatePool {
  return {
    sender: "",
    pool_id: "",
    input_blob: new Uint8Array(0),
    output_blob: new Uint8Array(0),
    charge_management_fee: false,
    trading_fee: [],
    cron_id: "",
    solver_id: "",
  };
}

export const MsgUpdatePool = {
  $type: "flux.interpool.v1beta1.MsgUpdatePool" as const,

  encode(message: MsgUpdatePool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pool_id !== "") {
      writer.uint32(18).string(message.pool_id);
    }
    if (message.input_blob.length !== 0) {
      writer.uint32(26).bytes(message.input_blob);
    }
    if (message.output_blob.length !== 0) {
      writer.uint32(34).bytes(message.output_blob);
    }
    if (message.charge_management_fee !== false) {
      writer.uint32(40).bool(message.charge_management_fee);
    }
    for (const v of message.trading_fee) {
      writer.uint32(50).string(v!);
    }
    if (message.cron_id !== "") {
      writer.uint32(58).string(message.cron_id);
    }
    if (message.solver_id !== "") {
      writer.uint32(66).string(message.solver_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePool();
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

          message.pool_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.input_blob = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.output_blob = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.charge_management_fee = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.trading_fee.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.cron_id = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.solver_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePool {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      input_blob: isSet(object.input_blob) ? bytesFromBase64(object.input_blob) : new Uint8Array(0),
      output_blob: isSet(object.output_blob) ? bytesFromBase64(object.output_blob) : new Uint8Array(0),
      charge_management_fee: isSet(object.charge_management_fee)
        ? globalThis.Boolean(object.charge_management_fee)
        : false,
      trading_fee: globalThis.Array.isArray(object?.trading_fee)
        ? object.trading_fee.map((e: any) => globalThis.String(e))
        : [],
      cron_id: isSet(object.cron_id) ? globalThis.String(object.cron_id) : "",
      solver_id: isSet(object.solver_id) ? globalThis.String(object.solver_id) : "",
    };
  },

  toJSON(message: MsgUpdatePool): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.input_blob !== undefined) {
      obj.input_blob = base64FromBytes(message.input_blob);
    }
    if (message.output_blob !== undefined) {
      obj.output_blob = base64FromBytes(message.output_blob);
    }
    if (message.charge_management_fee !== undefined) {
      obj.charge_management_fee = message.charge_management_fee;
    }
    if (message.trading_fee?.length) {
      obj.trading_fee = message.trading_fee;
    }
    if (message.cron_id !== undefined) {
      obj.cron_id = message.cron_id;
    }
    if (message.solver_id !== undefined) {
      obj.solver_id = message.solver_id;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgUpdatePool>): MsgUpdatePool {
    return MsgUpdatePool.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgUpdatePool>): MsgUpdatePool {
    const message = createBaseMsgUpdatePool();
    message.sender = object.sender ?? "";
    message.pool_id = object.pool_id ?? "";
    message.input_blob = object.input_blob ?? new Uint8Array(0);
    message.output_blob = object.output_blob ?? new Uint8Array(0);
    message.charge_management_fee = object.charge_management_fee ?? false;
    message.trading_fee = object.trading_fee?.map((e) => e) || [];
    message.cron_id = object.cron_id ?? "";
    message.solver_id = object.solver_id ?? "";
    return message;
  },
};

function createBaseMsgUpdatePoolResponse(): MsgUpdatePoolResponse {
  return {};
}

export const MsgUpdatePoolResponse = {
  $type: "flux.interpool.v1beta1.MsgUpdatePoolResponse" as const,

  encode(_: MsgUpdatePoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePoolResponse();
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

  fromJSON(_: any): MsgUpdatePoolResponse {
    return {};
  },

  toJSON(_: MsgUpdatePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgUpdatePoolResponse>): MsgUpdatePoolResponse {
    return MsgUpdatePoolResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgUpdatePoolResponse>): MsgUpdatePoolResponse {
    const message = createBaseMsgUpdatePoolResponse();
    return message;
  },
};

function createBaseMsgDeposit(): MsgDeposit {
  return { sender: "", pool_id: "", deposit_snapshot: [] };
}

export const MsgDeposit = {
  $type: "flux.interpool.v1beta1.MsgDeposit" as const,

  encode(message: MsgDeposit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pool_id !== "") {
      writer.uint32(18).string(message.pool_id);
    }
    for (const v of message.deposit_snapshot) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
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

          message.pool_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deposit_snapshot.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      deposit_snapshot: globalThis.Array.isArray(object?.deposit_snapshot)
        ? object.deposit_snapshot.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.deposit_snapshot?.length) {
      obj.deposit_snapshot = message.deposit_snapshot;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDeposit>): MsgDeposit {
    return MsgDeposit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDeposit>): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.sender = object.sender ?? "";
    message.pool_id = object.pool_id ?? "";
    message.deposit_snapshot = object.deposit_snapshot?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  $type: "flux.interpool.v1beta1.MsgDepositResponse" as const,

  encode(_: MsgDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
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

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgDepositResponse>): MsgDepositResponse {
    return MsgDepositResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgDepositResponse>): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

function createBaseMsgWithdraw(): MsgWithdraw {
  return { sender: "", pool_id: "", percentage: "" };
}

export const MsgWithdraw = {
  $type: "flux.interpool.v1beta1.MsgWithdraw" as const,

  encode(message: MsgWithdraw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pool_id !== "") {
      writer.uint32(18).string(message.pool_id);
    }
    if (message.percentage !== "") {
      writer.uint32(26).string(message.percentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdraw {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
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

          message.pool_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.percentage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdraw {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
      percentage: isSet(object.percentage) ? globalThis.String(object.percentage) : "",
    };
  },

  toJSON(message: MsgWithdraw): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    if (message.percentage !== undefined) {
      obj.percentage = message.percentage;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgWithdraw>): MsgWithdraw {
    return MsgWithdraw.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgWithdraw>): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.sender = object.sender ?? "";
    message.pool_id = object.pool_id ?? "";
    message.percentage = object.percentage ?? "";
    return message;
  },
};

function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {};
}

export const MsgWithdrawResponse = {
  $type: "flux.interpool.v1beta1.MsgWithdrawResponse" as const,

  encode(_: MsgWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
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

  fromJSON(_: any): MsgWithdrawResponse {
    return {};
  },

  toJSON(_: MsgWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawResponse>): MsgWithdrawResponse {
    return MsgWithdrawResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<MsgWithdrawResponse>): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    return message;
  },
};

function createBaseMsgWithdrawCommissionFee(): MsgWithdrawCommissionFee {
  return { sender: "", pool_id: "" };
}

export const MsgWithdrawCommissionFee = {
  $type: "flux.interpool.v1beta1.MsgWithdrawCommissionFee" as const,

  encode(message: MsgWithdrawCommissionFee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pool_id !== "") {
      writer.uint32(18).string(message.pool_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawCommissionFee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawCommissionFee();
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

          message.pool_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawCommissionFee {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      pool_id: isSet(object.pool_id) ? globalThis.String(object.pool_id) : "",
    };
  },

  toJSON(message: MsgWithdrawCommissionFee): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = message.sender;
    }
    if (message.pool_id !== undefined) {
      obj.pool_id = message.pool_id;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawCommissionFee>): MsgWithdrawCommissionFee {
    return MsgWithdrawCommissionFee.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgWithdrawCommissionFee>): MsgWithdrawCommissionFee {
    const message = createBaseMsgWithdrawCommissionFee();
    message.sender = object.sender ?? "";
    message.pool_id = object.pool_id ?? "";
    return message;
  },
};

function createBaseMsgWithdrawCommissionFeeResponse(): MsgWithdrawCommissionFeeResponse {
  return { operator_comission_fees: undefined };
}

export const MsgWithdrawCommissionFeeResponse = {
  $type: "flux.interpool.v1beta1.MsgWithdrawCommissionFeeResponse" as const,

  encode(message: MsgWithdrawCommissionFeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator_comission_fees !== undefined) {
      CommissionFees.encode(message.operator_comission_fees, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawCommissionFeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawCommissionFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operator_comission_fees = CommissionFees.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawCommissionFeeResponse {
    return {
      operator_comission_fees: isSet(object.operator_comission_fees)
        ? CommissionFees.fromJSON(object.operator_comission_fees)
        : undefined,
    };
  },

  toJSON(message: MsgWithdrawCommissionFeeResponse): unknown {
    const obj: any = {};
    if (message.operator_comission_fees !== undefined) {
      obj.operator_comission_fees = CommissionFees.toJSON(message.operator_comission_fees);
    }
    return obj;
  },

  create(base?: DeepPartial<MsgWithdrawCommissionFeeResponse>): MsgWithdrawCommissionFeeResponse {
    return MsgWithdrawCommissionFeeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgWithdrawCommissionFeeResponse>): MsgWithdrawCommissionFeeResponse {
    const message = createBaseMsgWithdrawCommissionFeeResponse();
    message.operator_comission_fees =
      (object.operator_comission_fees !== undefined && object.operator_comission_fees !== null)
        ? CommissionFees.fromPartial(object.operator_comission_fees)
        : undefined;
    return message;
  },
};

export interface Msg {
  CreatePool(request: DeepPartial<MsgCreatePool>, metadata?: grpc.Metadata): Promise<MsgCreatePoolResponse>;
  UpdatePool(request: DeepPartial<MsgUpdatePool>, metadata?: grpc.Metadata): Promise<MsgUpdatePoolResponse>;
  Deposit(request: DeepPartial<MsgDeposit>, metadata?: grpc.Metadata): Promise<MsgDepositResponse>;
  Withdraw(request: DeepPartial<MsgWithdraw>, metadata?: grpc.Metadata): Promise<MsgWithdrawResponse>;
  WithdrawCommissionFees(
    request: DeepPartial<MsgWithdrawCommissionFee>,
    metadata?: grpc.Metadata,
  ): Promise<MsgWithdrawCommissionFeeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePool = this.CreatePool.bind(this);
    this.UpdatePool = this.UpdatePool.bind(this);
    this.Deposit = this.Deposit.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.WithdrawCommissionFees = this.WithdrawCommissionFees.bind(this);
  }

  CreatePool(request: DeepPartial<MsgCreatePool>, metadata?: grpc.Metadata): Promise<MsgCreatePoolResponse> {
    return this.rpc.unary(MsgCreatePoolDesc, MsgCreatePool.fromPartial(request), metadata);
  }

  UpdatePool(request: DeepPartial<MsgUpdatePool>, metadata?: grpc.Metadata): Promise<MsgUpdatePoolResponse> {
    return this.rpc.unary(MsgUpdatePoolDesc, MsgUpdatePool.fromPartial(request), metadata);
  }

  Deposit(request: DeepPartial<MsgDeposit>, metadata?: grpc.Metadata): Promise<MsgDepositResponse> {
    return this.rpc.unary(MsgDepositDesc, MsgDeposit.fromPartial(request), metadata);
  }

  Withdraw(request: DeepPartial<MsgWithdraw>, metadata?: grpc.Metadata): Promise<MsgWithdrawResponse> {
    return this.rpc.unary(MsgWithdrawDesc, MsgWithdraw.fromPartial(request), metadata);
  }

  WithdrawCommissionFees(
    request: DeepPartial<MsgWithdrawCommissionFee>,
    metadata?: grpc.Metadata,
  ): Promise<MsgWithdrawCommissionFeeResponse> {
    return this.rpc.unary(MsgWithdrawCommissionFeesDesc, MsgWithdrawCommissionFee.fromPartial(request), metadata);
  }
}

export const MsgDesc = { serviceName: "flux.interpool.v1beta1.Msg" };

export const MsgCreatePoolDesc: UnaryMethodDefinitionish = {
  methodName: "CreatePool",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgCreatePool.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgCreatePoolResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgUpdatePoolDesc: UnaryMethodDefinitionish = {
  methodName: "UpdatePool",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgUpdatePool.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgUpdatePoolResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgDepositDesc: UnaryMethodDefinitionish = {
  methodName: "Deposit",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgDeposit.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgDepositResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgWithdrawDesc: UnaryMethodDefinitionish = {
  methodName: "Withdraw",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgWithdraw.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgWithdrawResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const MsgWithdrawCommissionFeesDesc: UnaryMethodDefinitionish = {
  methodName: "WithdrawCommissionFees",
  service: MsgDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MsgWithdrawCommissionFee.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MsgWithdrawCommissionFeeResponse.decode(data);
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
