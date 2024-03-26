/* eslint-disable */
import _m0 from "protobufjs/minimal";

/**
 * Permissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface Permissions {
  /** level is the level of permissions granted to this account. */
  level: Permissions_Level;
  /**
   * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
   * URLs that the account can trip. It is an error to use limit_type_urls with
   * a level other than LEVEL_SOME_MSGS.
   */
  limit_type_urls: string[];
}

/** Level is the permission level. */
export enum Permissions_Level {
  /**
   * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
   * breaker permissions.
   */
  LEVEL_NONE_UNSPECIFIED = 0,
  /**
   * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
   * trip or reset the circuit breaker for some Msg type URLs. If this level
   * is chosen, a non-empty list of Msg type URLs must be provided in
   * limit_type_urls.
   */
  LEVEL_SOME_MSGS = 1,
  /**
   * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
   * breaker for Msg's of all type URLs.
   */
  LEVEL_ALL_MSGS = 2,
  /**
   * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
   * actions and can grant permissions to other accounts.
   */
  LEVEL_SUPER_ADMIN = 3,
  UNRECOGNIZED = -1,
}

export function permissions_LevelFromJSON(object: any): Permissions_Level {
  switch (object) {
    case 0:
    case "LEVEL_NONE_UNSPECIFIED":
      return Permissions_Level.LEVEL_NONE_UNSPECIFIED;
    case 1:
    case "LEVEL_SOME_MSGS":
      return Permissions_Level.LEVEL_SOME_MSGS;
    case 2:
    case "LEVEL_ALL_MSGS":
      return Permissions_Level.LEVEL_ALL_MSGS;
    case 3:
    case "LEVEL_SUPER_ADMIN":
      return Permissions_Level.LEVEL_SUPER_ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Permissions_Level.UNRECOGNIZED;
  }
}

export function permissions_LevelToJSON(object: Permissions_Level): string {
  switch (object) {
    case Permissions_Level.LEVEL_NONE_UNSPECIFIED:
      return "LEVEL_NONE_UNSPECIFIED";
    case Permissions_Level.LEVEL_SOME_MSGS:
      return "LEVEL_SOME_MSGS";
    case Permissions_Level.LEVEL_ALL_MSGS:
      return "LEVEL_ALL_MSGS";
    case Permissions_Level.LEVEL_SUPER_ADMIN:
      return "LEVEL_SUPER_ADMIN";
    case Permissions_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** GenesisAccountPermissions is the account permissions for the circuit breaker in genesis */
export interface GenesisAccountPermissions {
  address: string;
  permissions: Permissions | undefined;
}

/** GenesisState is the state that must be provided at genesis. */
export interface GenesisState {
  account_permissions: GenesisAccountPermissions[];
  disabled_type_urls: string[];
}

function createBasePermissions(): Permissions {
  return { level: 0, limit_type_urls: [] };
}

export const Permissions = {
  $type: "cosmos.circuit.v1.Permissions" as const,

  encode(message: Permissions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    for (const v of message.limit_type_urls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Permissions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.level = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limit_type_urls.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Permissions {
    return {
      level: isSet(object.level) ? permissions_LevelFromJSON(object.level) : 0,
      limit_type_urls: globalThis.Array.isArray(object?.limit_type_urls)
        ? object.limit_type_urls.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Permissions): unknown {
    const obj: any = {};
    if (message.level !== undefined) {
      obj.level = permissions_LevelToJSON(message.level);
    }
    if (message.limit_type_urls?.length) {
      obj.limit_type_urls = message.limit_type_urls;
    }
    return obj;
  },

  create(base?: DeepPartial<Permissions>): Permissions {
    return Permissions.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Permissions>): Permissions {
    const message = createBasePermissions();
    message.level = object.level ?? 0;
    message.limit_type_urls = object.limit_type_urls?.map((e) => e) || [];
    return message;
  },
};

function createBaseGenesisAccountPermissions(): GenesisAccountPermissions {
  return { address: "", permissions: undefined };
}

export const GenesisAccountPermissions = {
  $type: "cosmos.circuit.v1.GenesisAccountPermissions" as const,

  encode(message: GenesisAccountPermissions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.permissions !== undefined) {
      Permissions.encode(message.permissions, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAccountPermissions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccountPermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.permissions = Permissions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisAccountPermissions {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      permissions: isSet(object.permissions) ? Permissions.fromJSON(object.permissions) : undefined,
    };
  },

  toJSON(message: GenesisAccountPermissions): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.permissions !== undefined) {
      obj.permissions = Permissions.toJSON(message.permissions);
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisAccountPermissions>): GenesisAccountPermissions {
    return GenesisAccountPermissions.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisAccountPermissions>): GenesisAccountPermissions {
    const message = createBaseGenesisAccountPermissions();
    message.address = object.address ?? "";
    message.permissions = (object.permissions !== undefined && object.permissions !== null)
      ? Permissions.fromPartial(object.permissions)
      : undefined;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { account_permissions: [], disabled_type_urls: [] };
}

export const GenesisState = {
  $type: "cosmos.circuit.v1.GenesisState" as const,

  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.account_permissions) {
      GenesisAccountPermissions.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.disabled_type_urls) {
      writer.uint32(18).string(v!);
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

          message.account_permissions.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.disabled_type_urls.push(reader.string());
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
      account_permissions: globalThis.Array.isArray(object?.account_permissions)
        ? object.account_permissions.map((e: any) => GenesisAccountPermissions.fromJSON(e))
        : [],
      disabled_type_urls: globalThis.Array.isArray(object?.disabled_type_urls)
        ? object.disabled_type_urls.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.account_permissions?.length) {
      obj.account_permissions = message.account_permissions.map((e) => GenesisAccountPermissions.toJSON(e));
    }
    if (message.disabled_type_urls?.length) {
      obj.disabled_type_urls = message.disabled_type_urls;
    }
    return obj;
  },

  create(base?: DeepPartial<GenesisState>): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.account_permissions = object.account_permissions?.map((e) => GenesisAccountPermissions.fromPartial(e)) ||
      [];
    message.disabled_type_urls = object.disabled_type_urls?.map((e) => e) || [];
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
