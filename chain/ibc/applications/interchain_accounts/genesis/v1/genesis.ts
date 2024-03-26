/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Params } from "../../controller/v1/controller";
import { Params as Params1 } from "../../host/v1/host";

/** GenesisState defines the interchain accounts genesis state */
export interface GenesisState {
  controller_genesis_state: ControllerGenesisState | undefined;
  host_genesis_state: HostGenesisState | undefined;
}

/** ControllerGenesisState defines the interchain accounts controller genesis state */
export interface ControllerGenesisState {
  active_channels: ActiveChannel[];
  interchain_accounts: RegisteredInterchainAccount[];
  ports: string[];
  params: Params | undefined;
}

/** HostGenesisState defines the interchain accounts host genesis state */
export interface HostGenesisState {
  active_channels: ActiveChannel[];
  interchain_accounts: RegisteredInterchainAccount[];
  port: string;
  params: Params1 | undefined;
}

/**
 * ActiveChannel contains a connection ID, port ID and associated active channel ID, as well as a boolean flag to
 * indicate if the channel is middleware enabled
 */
export interface ActiveChannel {
  connection_id: string;
  port_id: string;
  channel_id: string;
  is_middleware_enabled: boolean;
}

/** RegisteredInterchainAccount contains a connection ID, port ID and associated interchain account address */
export interface RegisteredInterchainAccount {
  connection_id: string;
  port_id: string;
  account_address: string;
}

function createBaseGenesisState(): GenesisState {
  return { controller_genesis_state: undefined, host_genesis_state: undefined };
}

export const GenesisState = {
  $type: "ibc.applications.interchain_accounts.genesis.v1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.controller_genesis_state !== undefined) {
      ControllerGenesisState.encode(message.controller_genesis_state, writer.uint32(10).fork()).ldelim();
    }
    if (message.host_genesis_state !== undefined) {
      HostGenesisState.encode(message.host_genesis_state, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.controller_genesis_state = ControllerGenesisState.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.host_genesis_state = HostGenesisState.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      controller_genesis_state: isSet(object.controller_genesis_state)
        ? ControllerGenesisState.fromJSON(object.controller_genesis_state)
        : undefined,
      host_genesis_state: isSet(object.host_genesis_state)
        ? HostGenesisState.fromJSON(object.host_genesis_state)
        : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.controller_genesis_state !== undefined) {
      obj.controller_genesis_state = ControllerGenesisState.toJSON(message.controller_genesis_state);
    }
    if (message.host_genesis_state !== undefined) {
      obj.host_genesis_state = HostGenesisState.toJSON(message.host_genesis_state);
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.controller_genesis_state =
      (object.controller_genesis_state !== undefined && object.controller_genesis_state !== null)
        ? ControllerGenesisState.fromPartial(object.controller_genesis_state)
        : undefined;
    message.host_genesis_state = (object.host_genesis_state !== undefined && object.host_genesis_state !== null)
      ? HostGenesisState.fromPartial(object.host_genesis_state)
      : undefined;
    return message;
  },
};

function createBaseControllerGenesisState(): ControllerGenesisState {
  return { active_channels: [], interchain_accounts: [], ports: [], params: undefined };
}

export const ControllerGenesisState = {
  $type: "ibc.applications.interchain_accounts.genesis.v1.ControllerGenesisState" as const,

  encode(message: ControllerGenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.active_channels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchain_accounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.ports) {
      writer.uint32(26).string(v!);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.active_channels.push(ActiveChannel.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.interchain_accounts.push(RegisteredInterchainAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ports.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ControllerGenesisState {
    return {
      active_channels: globalThis.Array.isArray(object?.active_channels)
        ? object.active_channels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchain_accounts: globalThis.Array.isArray(object?.interchain_accounts)
        ? object.interchain_accounts.map((e: any) => RegisteredInterchainAccount.fromJSON(e))
        : [],
      ports: globalThis.Array.isArray(object?.ports) ? object.ports.map((e: any) => globalThis.String(e)) : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ControllerGenesisState): unknown {
    const obj: any = {};
    if (message.active_channels?.length) {
      obj.active_channels = message.active_channels.map((e) => ActiveChannel.toJSON(e));
    }
    if (message.interchain_accounts?.length) {
      obj.interchain_accounts = message.interchain_accounts.map((e) => RegisteredInterchainAccount.toJSON(e));
    }
    if (message.ports?.length) {
      obj.ports = message.ports;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<ControllerGenesisState>): ControllerGenesisState {
    return ControllerGenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ControllerGenesisState>): ControllerGenesisState {
    const message = createBaseControllerGenesisState();
    message.active_channels = object.active_channels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchain_accounts = object.interchain_accounts?.map((e) => RegisteredInterchainAccount.fromPartial(e)) ||
      [];
    message.ports = object.ports?.map((e) => e) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseHostGenesisState(): HostGenesisState {
  return { active_channels: [], interchain_accounts: [], port: "", params: undefined };
}

export const HostGenesisState = {
  $type: "ibc.applications.interchain_accounts.genesis.v1.HostGenesisState" as const,

  encode(message: HostGenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.active_channels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchain_accounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.port !== "") {
      writer.uint32(26).string(message.port);
    }
    if (message.params !== undefined) {
      Params1.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostGenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.active_channels.push(ActiveChannel.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.interchain_accounts.push(RegisteredInterchainAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.port = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params1.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HostGenesisState {
    return {
      active_channels: globalThis.Array.isArray(object?.active_channels)
        ? object.active_channels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchain_accounts: globalThis.Array.isArray(object?.interchain_accounts)
        ? object.interchain_accounts.map((e: any) => RegisteredInterchainAccount.fromJSON(e))
        : [],
      port: isSet(object.port) ? globalThis.String(object.port) : "",
      params: isSet(object.params) ? Params1.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: HostGenesisState): unknown {
    const obj: any = {};
    if (message.active_channels?.length) {
      obj.active_channels = message.active_channels.map((e) => ActiveChannel.toJSON(e));
    }
    if (message.interchain_accounts?.length) {
      obj.interchain_accounts = message.interchain_accounts.map((e) => RegisteredInterchainAccount.toJSON(e));
    }
    if (message.port !== "") {
      obj.port = message.port;
    }
    if (message.params !== undefined) {
      obj.params = Params1.toJSON(message.params);
    }
    return obj;
  },

  create(base?: DeepPartial<HostGenesisState>): HostGenesisState {
    return HostGenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HostGenesisState>): HostGenesisState {
    const message = createBaseHostGenesisState();
    message.active_channels = object.active_channels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchain_accounts = object.interchain_accounts?.map((e) => RegisteredInterchainAccount.fromPartial(e)) ||
      [];
    message.port = object.port ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params1.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseActiveChannel(): ActiveChannel {
  return { connection_id: "", port_id: "", channel_id: "", is_middleware_enabled: false };
}

export const ActiveChannel = {
  $type: "ibc.applications.interchain_accounts.genesis.v1.ActiveChannel" as const,

  encode(message: ActiveChannel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    if (message.channel_id !== "") {
      writer.uint32(26).string(message.channel_id);
    }
    if (message.is_middleware_enabled === true) {
      writer.uint32(32).bool(message.is_middleware_enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveChannel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel_id = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.is_middleware_enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActiveChannel {
    return {
      connection_id: isSet(object.connection_id) ? globalThis.String(object.connection_id) : "",
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      channel_id: isSet(object.channel_id) ? globalThis.String(object.channel_id) : "",
      is_middleware_enabled: isSet(object.is_middleware_enabled)
        ? globalThis.Boolean(object.is_middleware_enabled)
        : false,
    };
  },

  toJSON(message: ActiveChannel): unknown {
    const obj: any = {};
    if (message.connection_id !== "") {
      obj.connection_id = message.connection_id;
    }
    if (message.port_id !== "") {
      obj.port_id = message.port_id;
    }
    if (message.channel_id !== "") {
      obj.channel_id = message.channel_id;
    }
    if (message.is_middleware_enabled === true) {
      obj.is_middleware_enabled = message.is_middleware_enabled;
    }
    return obj;
  },

  create(base?: DeepPartial<ActiveChannel>): ActiveChannel {
    return ActiveChannel.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ActiveChannel>): ActiveChannel {
    const message = createBaseActiveChannel();
    message.connection_id = object.connection_id ?? "";
    message.port_id = object.port_id ?? "";
    message.channel_id = object.channel_id ?? "";
    message.is_middleware_enabled = object.is_middleware_enabled ?? false;
    return message;
  },
};

function createBaseRegisteredInterchainAccount(): RegisteredInterchainAccount {
  return { connection_id: "", port_id: "", account_address: "" };
}

export const RegisteredInterchainAccount = {
  $type: "ibc.applications.interchain_accounts.genesis.v1.RegisteredInterchainAccount" as const,

  encode(message: RegisteredInterchainAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connection_id !== "") {
      writer.uint32(10).string(message.connection_id);
    }
    if (message.port_id !== "") {
      writer.uint32(18).string(message.port_id);
    }
    if (message.account_address !== "") {
      writer.uint32(26).string(message.account_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredInterchainAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connection_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.port_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.account_address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisteredInterchainAccount {
    return {
      connection_id: isSet(object.connection_id) ? globalThis.String(object.connection_id) : "",
      port_id: isSet(object.port_id) ? globalThis.String(object.port_id) : "",
      account_address: isSet(object.account_address) ? globalThis.String(object.account_address) : "",
    };
  },

  toJSON(message: RegisteredInterchainAccount): unknown {
    const obj: any = {};
    if (message.connection_id !== "") {
      obj.connection_id = message.connection_id;
    }
    if (message.port_id !== "") {
      obj.port_id = message.port_id;
    }
    if (message.account_address !== "") {
      obj.account_address = message.account_address;
    }
    return obj;
  },

  create(base?: DeepPartial<RegisteredInterchainAccount>): RegisteredInterchainAccount {
    return RegisteredInterchainAccount.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RegisteredInterchainAccount>): RegisteredInterchainAccount {
    const message = createBaseRegisteredInterchainAccount();
    message.connection_id = object.connection_id ?? "";
    message.port_id = object.port_id ?? "";
    message.account_address = object.account_address ?? "";
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
