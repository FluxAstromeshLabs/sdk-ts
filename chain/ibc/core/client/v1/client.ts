/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";

/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IdentifiedClientState {
  /** client identifier */
  client_id: string;
  /** client state */
  client_state: Any | undefined;
}

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface ConsensusStateWithHeight {
  /** consensus state height */
  height:
    | Height
    | undefined;
  /** consensus state */
  consensus_state: Any | undefined;
}

/**
 * ClientConsensusStates defines all the stored consensus states for a given
 * client.
 */
export interface ClientConsensusStates {
  /** client identifier */
  client_id: string;
  /** consensus states and their heights associated with the client */
  consensus_states: ConsensusStateWithHeight[];
}

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export interface Height {
  /** the revision that the client is currently on */
  revision_number: string;
  /** the height within the given revision */
  revision_height: string;
}

/** Params defines the set of IBC light client parameters. */
export interface Params {
  /**
   * allowed_clients defines the list of allowed client state types which can be created
   * and interacted with. If a client type is removed from the allowed clients list, usage
   * of this client will be disabled until it is added again to the list.
   */
  allowed_clients: string[];
}

/**
 * ClientUpdateProposal is a legacy governance proposal. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client. The proposal
 * handler may fail if the subject and the substitute do not match in client and
 * chain parameters (with exception to latest height, frozen height, and chain-id).
 *
 * Deprecated: Please use MsgRecoverClient in favour of this message type.
 *
 * @deprecated
 */
export interface ClientUpdateProposal {
  /** the title of the update proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the client identifier for the client to be updated if the proposal passes */
  subject_client_id: string;
  /**
   * the substitute client identifier for the client standing in for the subject
   * client
   */
  substitute_client_id: string;
}

/**
 * UpgradeProposal is a gov Content type for initiating an IBC breaking
 * upgrade.
 *
 * Deprecated: Please use MsgIBCSoftwareUpgrade in favour of this message type.
 *
 * @deprecated
 */
export interface UpgradeProposal {
  title: string;
  description: string;
  plan:
    | Plan
    | undefined;
  /**
   * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
   * This will make the chain commit to the correct upgraded (self) client state
   * before the upgrade occurs, so that connecting chains can verify that the
   * new upgraded client is valid by verifying a proof on the previous version
   * of the chain. This will allow IBC connections to persist smoothly across
   * planned chain upgrades
   */
  upgraded_client_state: Any | undefined;
}

function createBaseIdentifiedClientState(): IdentifiedClientState {
  return { client_id: "", client_state: undefined };
}

export const IdentifiedClientState = {
  $type: "ibc.core.client.v1.IdentifiedClientState" as const,

  encode(message: IdentifiedClientState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    if (message.client_state !== undefined) {
      Any.encode(message.client_state, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedClientState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifiedClientState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.client_state = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentifiedClientState {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      client_state: isSet(object.client_state) ? Any.fromJSON(object.client_state) : undefined,
    };
  },

  toJSON(message: IdentifiedClientState): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.client_state !== undefined) {
      obj.client_state = Any.toJSON(message.client_state);
    }
    return obj;
  },

  create(base?: DeepPartial<IdentifiedClientState>): IdentifiedClientState {
    return IdentifiedClientState.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<IdentifiedClientState>): IdentifiedClientState {
    const message = createBaseIdentifiedClientState();
    message.client_id = object.client_id ?? "";
    message.client_state = (object.client_state !== undefined && object.client_state !== null)
      ? Any.fromPartial(object.client_state)
      : undefined;
    return message;
  },
};

function createBaseConsensusStateWithHeight(): ConsensusStateWithHeight {
  return { height: undefined, consensus_state: undefined };
}

export const ConsensusStateWithHeight = {
  $type: "ibc.core.client.v1.ConsensusStateWithHeight" as const,

  encode(message: ConsensusStateWithHeight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensus_state !== undefined) {
      Any.encode(message.consensus_state, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusStateWithHeight {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusStateWithHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.height = Height.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consensus_state = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsensusStateWithHeight {
    return {
      height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
      consensus_state: isSet(object.consensus_state) ? Any.fromJSON(object.consensus_state) : undefined,
    };
  },

  toJSON(message: ConsensusStateWithHeight): unknown {
    const obj: any = {};
    if (message.height !== undefined) {
      obj.height = Height.toJSON(message.height);
    }
    if (message.consensus_state !== undefined) {
      obj.consensus_state = Any.toJSON(message.consensus_state);
    }
    return obj;
  },

  create(base?: DeepPartial<ConsensusStateWithHeight>): ConsensusStateWithHeight {
    return ConsensusStateWithHeight.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConsensusStateWithHeight>): ConsensusStateWithHeight {
    const message = createBaseConsensusStateWithHeight();
    message.height = (object.height !== undefined && object.height !== null)
      ? Height.fromPartial(object.height)
      : undefined;
    message.consensus_state = (object.consensus_state !== undefined && object.consensus_state !== null)
      ? Any.fromPartial(object.consensus_state)
      : undefined;
    return message;
  },
};

function createBaseClientConsensusStates(): ClientConsensusStates {
  return { client_id: "", consensus_states: [] };
}

export const ClientConsensusStates = {
  $type: "ibc.core.client.v1.ClientConsensusStates" as const,

  encode(message: ClientConsensusStates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.client_id !== "") {
      writer.uint32(10).string(message.client_id);
    }
    for (const v of message.consensus_states) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientConsensusStates {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientConsensusStates();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.client_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.consensus_states.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientConsensusStates {
    return {
      client_id: isSet(object.client_id) ? globalThis.String(object.client_id) : "",
      consensus_states: globalThis.Array.isArray(object?.consensus_states)
        ? object.consensus_states.map((e: any) => ConsensusStateWithHeight.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClientConsensusStates): unknown {
    const obj: any = {};
    if (message.client_id !== undefined) {
      obj.client_id = message.client_id;
    }
    if (message.consensus_states?.length) {
      obj.consensus_states = message.consensus_states.map((e) => ConsensusStateWithHeight.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ClientConsensusStates>): ClientConsensusStates {
    return ClientConsensusStates.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ClientConsensusStates>): ClientConsensusStates {
    const message = createBaseClientConsensusStates();
    message.client_id = object.client_id ?? "";
    message.consensus_states = object.consensus_states?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHeight(): Height {
  return { revision_number: "0", revision_height: "0" };
}

export const Height = {
  $type: "ibc.core.client.v1.Height" as const,

  encode(message: Height, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revision_number !== "0") {
      writer.uint32(8).uint64(message.revision_number);
    }
    if (message.revision_height !== "0") {
      writer.uint32(16).uint64(message.revision_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Height {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.revision_number = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.revision_height = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Height {
    return {
      revision_number: isSet(object.revision_number) ? globalThis.String(object.revision_number) : "0",
      revision_height: isSet(object.revision_height) ? globalThis.String(object.revision_height) : "0",
    };
  },

  toJSON(message: Height): unknown {
    const obj: any = {};
    if (message.revision_number !== undefined) {
      obj.revision_number = message.revision_number;
    }
    if (message.revision_height !== undefined) {
      obj.revision_height = message.revision_height;
    }
    return obj;
  },

  create(base?: DeepPartial<Height>): Height {
    return Height.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Height>): Height {
    const message = createBaseHeight();
    message.revision_number = object.revision_number ?? "0";
    message.revision_height = object.revision_height ?? "0";
    return message;
  },
};

function createBaseParams(): Params {
  return { allowed_clients: [] };
}

export const Params = {
  $type: "ibc.core.client.v1.Params" as const,

  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.allowed_clients) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.allowed_clients.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      allowed_clients: globalThis.Array.isArray(object?.allowed_clients)
        ? object.allowed_clients.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.allowed_clients?.length) {
      obj.allowed_clients = message.allowed_clients;
    }
    return obj;
  },

  create(base?: DeepPartial<Params>): Params {
    return Params.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Params>): Params {
    const message = createBaseParams();
    message.allowed_clients = object.allowed_clients?.map((e) => e) || [];
    return message;
  },
};

function createBaseClientUpdateProposal(): ClientUpdateProposal {
  return { title: "", description: "", subject_client_id: "", substitute_client_id: "" };
}

export const ClientUpdateProposal = {
  $type: "ibc.core.client.v1.ClientUpdateProposal" as const,

  encode(message: ClientUpdateProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.subject_client_id !== "") {
      writer.uint32(26).string(message.subject_client_id);
    }
    if (message.substitute_client_id !== "") {
      writer.uint32(34).string(message.substitute_client_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientUpdateProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientUpdateProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.subject_client_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.substitute_client_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientUpdateProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      subject_client_id: isSet(object.subject_client_id) ? globalThis.String(object.subject_client_id) : "",
      substitute_client_id: isSet(object.substitute_client_id) ? globalThis.String(object.substitute_client_id) : "",
    };
  },

  toJSON(message: ClientUpdateProposal): unknown {
    const obj: any = {};
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.subject_client_id !== undefined) {
      obj.subject_client_id = message.subject_client_id;
    }
    if (message.substitute_client_id !== undefined) {
      obj.substitute_client_id = message.substitute_client_id;
    }
    return obj;
  },

  create(base?: DeepPartial<ClientUpdateProposal>): ClientUpdateProposal {
    return ClientUpdateProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ClientUpdateProposal>): ClientUpdateProposal {
    const message = createBaseClientUpdateProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.subject_client_id = object.subject_client_id ?? "";
    message.substitute_client_id = object.substitute_client_id ?? "";
    return message;
  },
};

function createBaseUpgradeProposal(): UpgradeProposal {
  return { title: "", description: "", plan: undefined, upgraded_client_state: undefined };
}

export const UpgradeProposal = {
  $type: "ibc.core.client.v1.UpgradeProposal" as const,

  encode(message: UpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
    }
    if (message.upgraded_client_state !== undefined) {
      Any.encode(message.upgraded_client_state, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.plan = Plan.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.upgraded_client_state = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpgradeProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
      upgraded_client_state: isSet(object.upgraded_client_state)
        ? Any.fromJSON(object.upgraded_client_state)
        : undefined,
    };
  },

  toJSON(message: UpgradeProposal): unknown {
    const obj: any = {};
    if (message.title !== undefined) {
      obj.title = message.title;
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    if (message.plan !== undefined) {
      obj.plan = Plan.toJSON(message.plan);
    }
    if (message.upgraded_client_state !== undefined) {
      obj.upgraded_client_state = Any.toJSON(message.upgraded_client_state);
    }
    return obj;
  },

  create(base?: DeepPartial<UpgradeProposal>): UpgradeProposal {
    return UpgradeProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UpgradeProposal>): UpgradeProposal {
    const message = createBaseUpgradeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
    message.upgraded_client_state =
      (object.upgraded_client_state !== undefined && object.upgraded_client_state !== null)
        ? Any.fromPartial(object.upgraded_client_state)
        : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
