/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import _m0 from "protobufjs/minimal";

/** Since: cosmos-sdk 0.43 */

/** AppDescriptor describes a cosmos-sdk based application */
export interface AppDescriptor {
  /**
   * AuthnDescriptor provides information on how to authenticate transactions on the application
   * NOTE: experimental and subject to change in future releases.
   */
  authn:
    | AuthnDescriptor
    | undefined;
  /** chain provides the chain descriptor */
  chain:
    | ChainDescriptor
    | undefined;
  /** codec provides metadata information regarding codec related types */
  codec:
    | CodecDescriptor
    | undefined;
  /** configuration provides metadata information regarding the sdk.Config type */
  configuration:
    | ConfigurationDescriptor
    | undefined;
  /** query_services provides metadata information regarding the available queriable endpoints */
  query_services:
    | QueryServicesDescriptor
    | undefined;
  /** tx provides metadata information regarding how to send transactions to the given application */
  tx: TxDescriptor | undefined;
}

/** TxDescriptor describes the accepted transaction type */
export interface TxDescriptor {
  /**
   * fullname is the protobuf fullname of the raw transaction type (for instance the tx.Tx type)
   * it is not meant to support polymorphism of transaction types, it is supposed to be used by
   * reflection clients to understand if they can handle a specific transaction type in an application.
   */
  fullname: string;
  /** msgs lists the accepted application messages (sdk.Msg) */
  msgs: MsgDescriptor[];
}

/**
 * AuthnDescriptor provides information on how to sign transactions without relying
 * on the online RPCs GetTxMetadata and CombineUnsignedTxAndSignatures
 */
export interface AuthnDescriptor {
  /** sign_modes defines the supported signature algorithm */
  sign_modes: SigningModeDescriptor[];
}

/**
 * SigningModeDescriptor provides information on a signing flow of the application
 * NOTE(fdymylja): here we could go as far as providing an entire flow on how
 * to sign a message given a SigningModeDescriptor, but it's better to think about
 * this another time
 */
export interface SigningModeDescriptor {
  /** name defines the unique name of the signing mode */
  name: string;
  /** number is the unique int32 identifier for the sign_mode enum */
  number: number;
  /**
   * authn_info_provider_method_fullname defines the fullname of the method to call to get
   * the metadata required to authenticate using the provided sign_modes
   */
  authn_info_provider_method_fullname: string;
}

/** ChainDescriptor describes chain information of the application */
export interface ChainDescriptor {
  /** id is the chain id */
  id: string;
}

/** CodecDescriptor describes the registered interfaces and provides metadata information on the types */
export interface CodecDescriptor {
  /** interfaces is a list of the registerted interfaces descriptors */
  interfaces: InterfaceDescriptor[];
}

/** InterfaceDescriptor describes the implementation of an interface */
export interface InterfaceDescriptor {
  /** fullname is the name of the interface */
  fullname: string;
  /**
   * interface_accepting_messages contains information regarding the proto messages which contain the interface as
   * google.protobuf.Any field
   */
  interface_accepting_messages: InterfaceAcceptingMessageDescriptor[];
  /** interface_implementers is a list of the descriptors of the interface implementers */
  interface_implementers: InterfaceImplementerDescriptor[];
}

/** InterfaceImplementerDescriptor describes an interface implementer */
export interface InterfaceImplementerDescriptor {
  /** fullname is the protobuf queryable name of the interface implementer */
  fullname: string;
  /**
   * type_url defines the type URL used when marshalling the type as any
   * this is required so we can provide type safe google.protobuf.Any marshalling and
   * unmarshalling, making sure that we don't accept just 'any' type
   * in our interface fields
   */
  type_url: string;
}

/**
 * InterfaceAcceptingMessageDescriptor describes a protobuf message which contains
 * an interface represented as a google.protobuf.Any
 */
export interface InterfaceAcceptingMessageDescriptor {
  /** fullname is the protobuf fullname of the type containing the interface */
  fullname: string;
  /**
   * field_descriptor_names is a list of the protobuf name (not fullname) of the field
   * which contains the interface as google.protobuf.Any (the interface is the same, but
   * it can be in multiple fields of the same proto message)
   */
  field_descriptor_names: string[];
}

/** ConfigurationDescriptor contains metadata information on the sdk.Config */
export interface ConfigurationDescriptor {
  /** bech32_account_address_prefix is the account address prefix */
  bech32_account_address_prefix: string;
}

/** MsgDescriptor describes a cosmos-sdk message that can be delivered with a transaction */
export interface MsgDescriptor {
  /** msg_type_url contains the TypeURL of a sdk.Msg. */
  msg_type_url: string;
}

/** GetAuthnDescriptorRequest is the request used for the GetAuthnDescriptor RPC */
export interface GetAuthnDescriptorRequest {
}

/** GetAuthnDescriptorResponse is the response returned by the GetAuthnDescriptor RPC */
export interface GetAuthnDescriptorResponse {
  /** authn describes how to authenticate to the application when sending transactions */
  authn: AuthnDescriptor | undefined;
}

/** GetChainDescriptorRequest is the request used for the GetChainDescriptor RPC */
export interface GetChainDescriptorRequest {
}

/** GetChainDescriptorResponse is the response returned by the GetChainDescriptor RPC */
export interface GetChainDescriptorResponse {
  /** chain describes application chain information */
  chain: ChainDescriptor | undefined;
}

/** GetCodecDescriptorRequest is the request used for the GetCodecDescriptor RPC */
export interface GetCodecDescriptorRequest {
}

/** GetCodecDescriptorResponse is the response returned by the GetCodecDescriptor RPC */
export interface GetCodecDescriptorResponse {
  /** codec describes the application codec such as registered interfaces and implementations */
  codec: CodecDescriptor | undefined;
}

/** GetConfigurationDescriptorRequest is the request used for the GetConfigurationDescriptor RPC */
export interface GetConfigurationDescriptorRequest {
}

/** GetConfigurationDescriptorResponse is the response returned by the GetConfigurationDescriptor RPC */
export interface GetConfigurationDescriptorResponse {
  /** config describes the application's sdk.Config */
  config: ConfigurationDescriptor | undefined;
}

/** GetQueryServicesDescriptorRequest is the request used for the GetQueryServicesDescriptor RPC */
export interface GetQueryServicesDescriptorRequest {
}

/** GetQueryServicesDescriptorResponse is the response returned by the GetQueryServicesDescriptor RPC */
export interface GetQueryServicesDescriptorResponse {
  /** queries provides information on the available queryable services */
  queries: QueryServicesDescriptor | undefined;
}

/** GetTxDescriptorRequest is the request used for the GetTxDescriptor RPC */
export interface GetTxDescriptorRequest {
}

/** GetTxDescriptorResponse is the response returned by the GetTxDescriptor RPC */
export interface GetTxDescriptorResponse {
  /**
   * tx provides information on msgs that can be forwarded to the application
   * alongside the accepted transaction protobuf type
   */
  tx: TxDescriptor | undefined;
}

/** QueryServicesDescriptor contains the list of cosmos-sdk queriable services */
export interface QueryServicesDescriptor {
  /** query_services is a list of cosmos-sdk QueryServiceDescriptor */
  query_services: QueryServiceDescriptor[];
}

/** QueryServiceDescriptor describes a cosmos-sdk queryable service */
export interface QueryServiceDescriptor {
  /** fullname is the protobuf fullname of the service descriptor */
  fullname: string;
  /** is_module describes if this service is actually exposed by an application's module */
  is_module: boolean;
  /** methods provides a list of query service methods */
  methods: QueryMethodDescriptor[];
}

/**
 * QueryMethodDescriptor describes a queryable method of a query service
 * no other info is provided beside method name and tendermint queryable path
 * because it would be redundant with the grpc reflection service
 */
export interface QueryMethodDescriptor {
  /** name is the protobuf name (not fullname) of the method */
  name: string;
  /**
   * full_query_path is the path that can be used to query
   * this method via tendermint abci.Query
   */
  full_query_path: string;
}

function createBaseAppDescriptor(): AppDescriptor {
  return {
    authn: undefined,
    chain: undefined,
    codec: undefined,
    configuration: undefined,
    query_services: undefined,
    tx: undefined,
  };
}

export const AppDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.AppDescriptor" as const,

  encode(message: AppDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authn !== undefined) {
      AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain !== undefined) {
      ChainDescriptor.encode(message.chain, writer.uint32(18).fork()).ldelim();
    }
    if (message.codec !== undefined) {
      CodecDescriptor.encode(message.codec, writer.uint32(26).fork()).ldelim();
    }
    if (message.configuration !== undefined) {
      ConfigurationDescriptor.encode(message.configuration, writer.uint32(34).fork()).ldelim();
    }
    if (message.query_services !== undefined) {
      QueryServicesDescriptor.encode(message.query_services, writer.uint32(42).fork()).ldelim();
    }
    if (message.tx !== undefined) {
      TxDescriptor.encode(message.tx, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AppDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authn = AuthnDescriptor.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chain = ChainDescriptor.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.codec = CodecDescriptor.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.configuration = ConfigurationDescriptor.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.query_services = QueryServicesDescriptor.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tx = TxDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AppDescriptor {
    return {
      authn: isSet(object.authn) ? AuthnDescriptor.fromJSON(object.authn) : undefined,
      chain: isSet(object.chain) ? ChainDescriptor.fromJSON(object.chain) : undefined,
      codec: isSet(object.codec) ? CodecDescriptor.fromJSON(object.codec) : undefined,
      configuration: isSet(object.configuration) ? ConfigurationDescriptor.fromJSON(object.configuration) : undefined,
      query_services: isSet(object.query_services)
        ? QueryServicesDescriptor.fromJSON(object.query_services)
        : undefined,
      tx: isSet(object.tx) ? TxDescriptor.fromJSON(object.tx) : undefined,
    };
  },

  toJSON(message: AppDescriptor): unknown {
    const obj: any = {};
    if (message.authn !== undefined) {
      obj.authn = AuthnDescriptor.toJSON(message.authn);
    }
    if (message.chain !== undefined) {
      obj.chain = ChainDescriptor.toJSON(message.chain);
    }
    if (message.codec !== undefined) {
      obj.codec = CodecDescriptor.toJSON(message.codec);
    }
    if (message.configuration !== undefined) {
      obj.configuration = ConfigurationDescriptor.toJSON(message.configuration);
    }
    if (message.query_services !== undefined) {
      obj.query_services = QueryServicesDescriptor.toJSON(message.query_services);
    }
    if (message.tx !== undefined) {
      obj.tx = TxDescriptor.toJSON(message.tx);
    }
    return obj;
  },

  create(base?: DeepPartial<AppDescriptor>): AppDescriptor {
    return AppDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AppDescriptor>): AppDescriptor {
    const message = createBaseAppDescriptor();
    message.authn = (object.authn !== undefined && object.authn !== null)
      ? AuthnDescriptor.fromPartial(object.authn)
      : undefined;
    message.chain = (object.chain !== undefined && object.chain !== null)
      ? ChainDescriptor.fromPartial(object.chain)
      : undefined;
    message.codec = (object.codec !== undefined && object.codec !== null)
      ? CodecDescriptor.fromPartial(object.codec)
      : undefined;
    message.configuration = (object.configuration !== undefined && object.configuration !== null)
      ? ConfigurationDescriptor.fromPartial(object.configuration)
      : undefined;
    message.query_services = (object.query_services !== undefined && object.query_services !== null)
      ? QueryServicesDescriptor.fromPartial(object.query_services)
      : undefined;
    message.tx = (object.tx !== undefined && object.tx !== null) ? TxDescriptor.fromPartial(object.tx) : undefined;
    return message;
  },
};

function createBaseTxDescriptor(): TxDescriptor {
  return { fullname: "", msgs: [] };
}

export const TxDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.TxDescriptor" as const,

  encode(message: TxDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.msgs) {
      MsgDescriptor.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fullname = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.msgs.push(MsgDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxDescriptor {
    return {
      fullname: isSet(object.fullname) ? globalThis.String(object.fullname) : "",
      msgs: globalThis.Array.isArray(object?.msgs) ? object.msgs.map((e: any) => MsgDescriptor.fromJSON(e)) : [],
    };
  },

  toJSON(message: TxDescriptor): unknown {
    const obj: any = {};
    if (message.fullname !== undefined) {
      obj.fullname = message.fullname;
    }
    if (message.msgs?.length) {
      obj.msgs = message.msgs.map((e) => MsgDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<TxDescriptor>): TxDescriptor {
    return TxDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxDescriptor>): TxDescriptor {
    const message = createBaseTxDescriptor();
    message.fullname = object.fullname ?? "";
    message.msgs = object.msgs?.map((e) => MsgDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAuthnDescriptor(): AuthnDescriptor {
  return { sign_modes: [] };
}

export const AuthnDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.AuthnDescriptor" as const,

  encode(message: AuthnDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sign_modes) {
      SigningModeDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthnDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthnDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sign_modes.push(SigningModeDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AuthnDescriptor {
    return {
      sign_modes: globalThis.Array.isArray(object?.sign_modes)
        ? object.sign_modes.map((e: any) => SigningModeDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AuthnDescriptor): unknown {
    const obj: any = {};
    if (message.sign_modes?.length) {
      obj.sign_modes = message.sign_modes.map((e) => SigningModeDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<AuthnDescriptor>): AuthnDescriptor {
    return AuthnDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AuthnDescriptor>): AuthnDescriptor {
    const message = createBaseAuthnDescriptor();
    message.sign_modes = object.sign_modes?.map((e) => SigningModeDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSigningModeDescriptor(): SigningModeDescriptor {
  return { name: "", number: 0, authn_info_provider_method_fullname: "" };
}

export const SigningModeDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.SigningModeDescriptor" as const,

  encode(message: SigningModeDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.authn_info_provider_method_fullname !== "") {
      writer.uint32(26).string(message.authn_info_provider_method_fullname);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SigningModeDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSigningModeDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.number = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.authn_info_provider_method_fullname = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SigningModeDescriptor {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      number: isSet(object.number) ? globalThis.Number(object.number) : 0,
      authn_info_provider_method_fullname: isSet(object.authn_info_provider_method_fullname)
        ? globalThis.String(object.authn_info_provider_method_fullname)
        : "",
    };
  },

  toJSON(message: SigningModeDescriptor): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.number !== undefined) {
      obj.number = Math.round(message.number);
    }
    if (message.authn_info_provider_method_fullname !== undefined) {
      obj.authn_info_provider_method_fullname = message.authn_info_provider_method_fullname;
    }
    return obj;
  },

  create(base?: DeepPartial<SigningModeDescriptor>): SigningModeDescriptor {
    return SigningModeDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SigningModeDescriptor>): SigningModeDescriptor {
    const message = createBaseSigningModeDescriptor();
    message.name = object.name ?? "";
    message.number = object.number ?? 0;
    message.authn_info_provider_method_fullname = object.authn_info_provider_method_fullname ?? "";
    return message;
  },
};

function createBaseChainDescriptor(): ChainDescriptor {
  return { id: "" };
}

export const ChainDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.ChainDescriptor" as const,

  encode(message: ChainDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChainDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChainDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChainDescriptor {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ChainDescriptor): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<ChainDescriptor>): ChainDescriptor {
    return ChainDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ChainDescriptor>): ChainDescriptor {
    const message = createBaseChainDescriptor();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCodecDescriptor(): CodecDescriptor {
  return { interfaces: [] };
}

export const CodecDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.CodecDescriptor" as const,

  encode(message: CodecDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.interfaces) {
      InterfaceDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodecDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodecDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.interfaces.push(InterfaceDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CodecDescriptor {
    return {
      interfaces: globalThis.Array.isArray(object?.interfaces)
        ? object.interfaces.map((e: any) => InterfaceDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CodecDescriptor): unknown {
    const obj: any = {};
    if (message.interfaces?.length) {
      obj.interfaces = message.interfaces.map((e) => InterfaceDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<CodecDescriptor>): CodecDescriptor {
    return CodecDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CodecDescriptor>): CodecDescriptor {
    const message = createBaseCodecDescriptor();
    message.interfaces = object.interfaces?.map((e) => InterfaceDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInterfaceDescriptor(): InterfaceDescriptor {
  return { fullname: "", interface_accepting_messages: [], interface_implementers: [] };
}

export const InterfaceDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.InterfaceDescriptor" as const,

  encode(message: InterfaceDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.interface_accepting_messages) {
      InterfaceAcceptingMessageDescriptor.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.interface_implementers) {
      InterfaceImplementerDescriptor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterfaceDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterfaceDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fullname = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.interface_accepting_messages.push(
            InterfaceAcceptingMessageDescriptor.decode(reader, reader.uint32()),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.interface_implementers.push(InterfaceImplementerDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterfaceDescriptor {
    return {
      fullname: isSet(object.fullname) ? globalThis.String(object.fullname) : "",
      interface_accepting_messages: globalThis.Array.isArray(object?.interface_accepting_messages)
        ? object.interface_accepting_messages.map((e: any) => InterfaceAcceptingMessageDescriptor.fromJSON(e))
        : [],
      interface_implementers: globalThis.Array.isArray(object?.interface_implementers)
        ? object.interface_implementers.map((e: any) => InterfaceImplementerDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InterfaceDescriptor): unknown {
    const obj: any = {};
    if (message.fullname !== undefined) {
      obj.fullname = message.fullname;
    }
    if (message.interface_accepting_messages?.length) {
      obj.interface_accepting_messages = message.interface_accepting_messages.map((e) =>
        InterfaceAcceptingMessageDescriptor.toJSON(e)
      );
    }
    if (message.interface_implementers?.length) {
      obj.interface_implementers = message.interface_implementers.map((e) => InterfaceImplementerDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<InterfaceDescriptor>): InterfaceDescriptor {
    return InterfaceDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InterfaceDescriptor>): InterfaceDescriptor {
    const message = createBaseInterfaceDescriptor();
    message.fullname = object.fullname ?? "";
    message.interface_accepting_messages =
      object.interface_accepting_messages?.map((e) => InterfaceAcceptingMessageDescriptor.fromPartial(e)) || [];
    message.interface_implementers =
      object.interface_implementers?.map((e) => InterfaceImplementerDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInterfaceImplementerDescriptor(): InterfaceImplementerDescriptor {
  return { fullname: "", type_url: "" };
}

export const InterfaceImplementerDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.InterfaceImplementerDescriptor" as const,

  encode(message: InterfaceImplementerDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    if (message.type_url !== "") {
      writer.uint32(18).string(message.type_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterfaceImplementerDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterfaceImplementerDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fullname = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterfaceImplementerDescriptor {
    return {
      fullname: isSet(object.fullname) ? globalThis.String(object.fullname) : "",
      type_url: isSet(object.type_url) ? globalThis.String(object.type_url) : "",
    };
  },

  toJSON(message: InterfaceImplementerDescriptor): unknown {
    const obj: any = {};
    if (message.fullname !== undefined) {
      obj.fullname = message.fullname;
    }
    if (message.type_url !== undefined) {
      obj.type_url = message.type_url;
    }
    return obj;
  },

  create(base?: DeepPartial<InterfaceImplementerDescriptor>): InterfaceImplementerDescriptor {
    return InterfaceImplementerDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InterfaceImplementerDescriptor>): InterfaceImplementerDescriptor {
    const message = createBaseInterfaceImplementerDescriptor();
    message.fullname = object.fullname ?? "";
    message.type_url = object.type_url ?? "";
    return message;
  },
};

function createBaseInterfaceAcceptingMessageDescriptor(): InterfaceAcceptingMessageDescriptor {
  return { fullname: "", field_descriptor_names: [] };
}

export const InterfaceAcceptingMessageDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.InterfaceAcceptingMessageDescriptor" as const,

  encode(message: InterfaceAcceptingMessageDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.field_descriptor_names) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterfaceAcceptingMessageDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterfaceAcceptingMessageDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fullname = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field_descriptor_names.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InterfaceAcceptingMessageDescriptor {
    return {
      fullname: isSet(object.fullname) ? globalThis.String(object.fullname) : "",
      field_descriptor_names: globalThis.Array.isArray(object?.field_descriptor_names)
        ? object.field_descriptor_names.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: InterfaceAcceptingMessageDescriptor): unknown {
    const obj: any = {};
    if (message.fullname !== undefined) {
      obj.fullname = message.fullname;
    }
    if (message.field_descriptor_names?.length) {
      obj.field_descriptor_names = message.field_descriptor_names;
    }
    return obj;
  },

  create(base?: DeepPartial<InterfaceAcceptingMessageDescriptor>): InterfaceAcceptingMessageDescriptor {
    return InterfaceAcceptingMessageDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InterfaceAcceptingMessageDescriptor>): InterfaceAcceptingMessageDescriptor {
    const message = createBaseInterfaceAcceptingMessageDescriptor();
    message.fullname = object.fullname ?? "";
    message.field_descriptor_names = object.field_descriptor_names?.map((e) => e) || [];
    return message;
  },
};

function createBaseConfigurationDescriptor(): ConfigurationDescriptor {
  return { bech32_account_address_prefix: "" };
}

export const ConfigurationDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.ConfigurationDescriptor" as const,

  encode(message: ConfigurationDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bech32_account_address_prefix !== "") {
      writer.uint32(10).string(message.bech32_account_address_prefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigurationDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigurationDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bech32_account_address_prefix = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigurationDescriptor {
    return {
      bech32_account_address_prefix: isSet(object.bech32_account_address_prefix)
        ? globalThis.String(object.bech32_account_address_prefix)
        : "",
    };
  },

  toJSON(message: ConfigurationDescriptor): unknown {
    const obj: any = {};
    if (message.bech32_account_address_prefix !== undefined) {
      obj.bech32_account_address_prefix = message.bech32_account_address_prefix;
    }
    return obj;
  },

  create(base?: DeepPartial<ConfigurationDescriptor>): ConfigurationDescriptor {
    return ConfigurationDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConfigurationDescriptor>): ConfigurationDescriptor {
    const message = createBaseConfigurationDescriptor();
    message.bech32_account_address_prefix = object.bech32_account_address_prefix ?? "";
    return message;
  },
};

function createBaseMsgDescriptor(): MsgDescriptor {
  return { msg_type_url: "" };
}

export const MsgDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.MsgDescriptor" as const,

  encode(message: MsgDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg_type_url !== "") {
      writer.uint32(10).string(message.msg_type_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.msg_type_url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDescriptor {
    return { msg_type_url: isSet(object.msg_type_url) ? globalThis.String(object.msg_type_url) : "" };
  },

  toJSON(message: MsgDescriptor): unknown {
    const obj: any = {};
    if (message.msg_type_url !== undefined) {
      obj.msg_type_url = message.msg_type_url;
    }
    return obj;
  },

  create(base?: DeepPartial<MsgDescriptor>): MsgDescriptor {
    return MsgDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MsgDescriptor>): MsgDescriptor {
    const message = createBaseMsgDescriptor();
    message.msg_type_url = object.msg_type_url ?? "";
    return message;
  },
};

function createBaseGetAuthnDescriptorRequest(): GetAuthnDescriptorRequest {
  return {};
}

export const GetAuthnDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetAuthnDescriptorRequest" as const,

  encode(_: GetAuthnDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthnDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthnDescriptorRequest();
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

  fromJSON(_: any): GetAuthnDescriptorRequest {
    return {};
  },

  toJSON(_: GetAuthnDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetAuthnDescriptorRequest>): GetAuthnDescriptorRequest {
    return GetAuthnDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetAuthnDescriptorRequest>): GetAuthnDescriptorRequest {
    const message = createBaseGetAuthnDescriptorRequest();
    return message;
  },
};

function createBaseGetAuthnDescriptorResponse(): GetAuthnDescriptorResponse {
  return { authn: undefined };
}

export const GetAuthnDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetAuthnDescriptorResponse" as const,

  encode(message: GetAuthnDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authn !== undefined) {
      AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAuthnDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthnDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authn = AuthnDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAuthnDescriptorResponse {
    return { authn: isSet(object.authn) ? AuthnDescriptor.fromJSON(object.authn) : undefined };
  },

  toJSON(message: GetAuthnDescriptorResponse): unknown {
    const obj: any = {};
    if (message.authn !== undefined) {
      obj.authn = AuthnDescriptor.toJSON(message.authn);
    }
    return obj;
  },

  create(base?: DeepPartial<GetAuthnDescriptorResponse>): GetAuthnDescriptorResponse {
    return GetAuthnDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetAuthnDescriptorResponse>): GetAuthnDescriptorResponse {
    const message = createBaseGetAuthnDescriptorResponse();
    message.authn = (object.authn !== undefined && object.authn !== null)
      ? AuthnDescriptor.fromPartial(object.authn)
      : undefined;
    return message;
  },
};

function createBaseGetChainDescriptorRequest(): GetChainDescriptorRequest {
  return {};
}

export const GetChainDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetChainDescriptorRequest" as const,

  encode(_: GetChainDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetChainDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChainDescriptorRequest();
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

  fromJSON(_: any): GetChainDescriptorRequest {
    return {};
  },

  toJSON(_: GetChainDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetChainDescriptorRequest>): GetChainDescriptorRequest {
    return GetChainDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetChainDescriptorRequest>): GetChainDescriptorRequest {
    const message = createBaseGetChainDescriptorRequest();
    return message;
  },
};

function createBaseGetChainDescriptorResponse(): GetChainDescriptorResponse {
  return { chain: undefined };
}

export const GetChainDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetChainDescriptorResponse" as const,

  encode(message: GetChainDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chain !== undefined) {
      ChainDescriptor.encode(message.chain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetChainDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChainDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chain = ChainDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetChainDescriptorResponse {
    return { chain: isSet(object.chain) ? ChainDescriptor.fromJSON(object.chain) : undefined };
  },

  toJSON(message: GetChainDescriptorResponse): unknown {
    const obj: any = {};
    if (message.chain !== undefined) {
      obj.chain = ChainDescriptor.toJSON(message.chain);
    }
    return obj;
  },

  create(base?: DeepPartial<GetChainDescriptorResponse>): GetChainDescriptorResponse {
    return GetChainDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetChainDescriptorResponse>): GetChainDescriptorResponse {
    const message = createBaseGetChainDescriptorResponse();
    message.chain = (object.chain !== undefined && object.chain !== null)
      ? ChainDescriptor.fromPartial(object.chain)
      : undefined;
    return message;
  },
};

function createBaseGetCodecDescriptorRequest(): GetCodecDescriptorRequest {
  return {};
}

export const GetCodecDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetCodecDescriptorRequest" as const,

  encode(_: GetCodecDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCodecDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCodecDescriptorRequest();
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

  fromJSON(_: any): GetCodecDescriptorRequest {
    return {};
  },

  toJSON(_: GetCodecDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetCodecDescriptorRequest>): GetCodecDescriptorRequest {
    return GetCodecDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetCodecDescriptorRequest>): GetCodecDescriptorRequest {
    const message = createBaseGetCodecDescriptorRequest();
    return message;
  },
};

function createBaseGetCodecDescriptorResponse(): GetCodecDescriptorResponse {
  return { codec: undefined };
}

export const GetCodecDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetCodecDescriptorResponse" as const,

  encode(message: GetCodecDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.codec !== undefined) {
      CodecDescriptor.encode(message.codec, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCodecDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCodecDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.codec = CodecDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCodecDescriptorResponse {
    return { codec: isSet(object.codec) ? CodecDescriptor.fromJSON(object.codec) : undefined };
  },

  toJSON(message: GetCodecDescriptorResponse): unknown {
    const obj: any = {};
    if (message.codec !== undefined) {
      obj.codec = CodecDescriptor.toJSON(message.codec);
    }
    return obj;
  },

  create(base?: DeepPartial<GetCodecDescriptorResponse>): GetCodecDescriptorResponse {
    return GetCodecDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetCodecDescriptorResponse>): GetCodecDescriptorResponse {
    const message = createBaseGetCodecDescriptorResponse();
    message.codec = (object.codec !== undefined && object.codec !== null)
      ? CodecDescriptor.fromPartial(object.codec)
      : undefined;
    return message;
  },
};

function createBaseGetConfigurationDescriptorRequest(): GetConfigurationDescriptorRequest {
  return {};
}

export const GetConfigurationDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorRequest" as const,

  encode(_: GetConfigurationDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetConfigurationDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConfigurationDescriptorRequest();
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

  fromJSON(_: any): GetConfigurationDescriptorRequest {
    return {};
  },

  toJSON(_: GetConfigurationDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetConfigurationDescriptorRequest>): GetConfigurationDescriptorRequest {
    return GetConfigurationDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetConfigurationDescriptorRequest>): GetConfigurationDescriptorRequest {
    const message = createBaseGetConfigurationDescriptorRequest();
    return message;
  },
};

function createBaseGetConfigurationDescriptorResponse(): GetConfigurationDescriptorResponse {
  return { config: undefined };
}

export const GetConfigurationDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetConfigurationDescriptorResponse" as const,

  encode(message: GetConfigurationDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.config !== undefined) {
      ConfigurationDescriptor.encode(message.config, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetConfigurationDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetConfigurationDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.config = ConfigurationDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetConfigurationDescriptorResponse {
    return { config: isSet(object.config) ? ConfigurationDescriptor.fromJSON(object.config) : undefined };
  },

  toJSON(message: GetConfigurationDescriptorResponse): unknown {
    const obj: any = {};
    if (message.config !== undefined) {
      obj.config = ConfigurationDescriptor.toJSON(message.config);
    }
    return obj;
  },

  create(base?: DeepPartial<GetConfigurationDescriptorResponse>): GetConfigurationDescriptorResponse {
    return GetConfigurationDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetConfigurationDescriptorResponse>): GetConfigurationDescriptorResponse {
    const message = createBaseGetConfigurationDescriptorResponse();
    message.config = (object.config !== undefined && object.config !== null)
      ? ConfigurationDescriptor.fromPartial(object.config)
      : undefined;
    return message;
  },
};

function createBaseGetQueryServicesDescriptorRequest(): GetQueryServicesDescriptorRequest {
  return {};
}

export const GetQueryServicesDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorRequest" as const,

  encode(_: GetQueryServicesDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetQueryServicesDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetQueryServicesDescriptorRequest();
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

  fromJSON(_: any): GetQueryServicesDescriptorRequest {
    return {};
  },

  toJSON(_: GetQueryServicesDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetQueryServicesDescriptorRequest>): GetQueryServicesDescriptorRequest {
    return GetQueryServicesDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetQueryServicesDescriptorRequest>): GetQueryServicesDescriptorRequest {
    const message = createBaseGetQueryServicesDescriptorRequest();
    return message;
  },
};

function createBaseGetQueryServicesDescriptorResponse(): GetQueryServicesDescriptorResponse {
  return { queries: undefined };
}

export const GetQueryServicesDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetQueryServicesDescriptorResponse" as const,

  encode(message: GetQueryServicesDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.queries !== undefined) {
      QueryServicesDescriptor.encode(message.queries, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetQueryServicesDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetQueryServicesDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.queries = QueryServicesDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetQueryServicesDescriptorResponse {
    return { queries: isSet(object.queries) ? QueryServicesDescriptor.fromJSON(object.queries) : undefined };
  },

  toJSON(message: GetQueryServicesDescriptorResponse): unknown {
    const obj: any = {};
    if (message.queries !== undefined) {
      obj.queries = QueryServicesDescriptor.toJSON(message.queries);
    }
    return obj;
  },

  create(base?: DeepPartial<GetQueryServicesDescriptorResponse>): GetQueryServicesDescriptorResponse {
    return GetQueryServicesDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetQueryServicesDescriptorResponse>): GetQueryServicesDescriptorResponse {
    const message = createBaseGetQueryServicesDescriptorResponse();
    message.queries = (object.queries !== undefined && object.queries !== null)
      ? QueryServicesDescriptor.fromPartial(object.queries)
      : undefined;
    return message;
  },
};

function createBaseGetTxDescriptorRequest(): GetTxDescriptorRequest {
  return {};
}

export const GetTxDescriptorRequest = {
  $type: "cosmos.base.reflection.v2alpha1.GetTxDescriptorRequest" as const,

  encode(_: GetTxDescriptorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxDescriptorRequest();
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

  fromJSON(_: any): GetTxDescriptorRequest {
    return {};
  },

  toJSON(_: GetTxDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<GetTxDescriptorRequest>): GetTxDescriptorRequest {
    return GetTxDescriptorRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetTxDescriptorRequest>): GetTxDescriptorRequest {
    const message = createBaseGetTxDescriptorRequest();
    return message;
  },
};

function createBaseGetTxDescriptorResponse(): GetTxDescriptorResponse {
  return { tx: undefined };
}

export const GetTxDescriptorResponse = {
  $type: "cosmos.base.reflection.v2alpha1.GetTxDescriptorResponse" as const,

  encode(message: GetTxDescriptorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx !== undefined) {
      TxDescriptor.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTxDescriptorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = TxDescriptor.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTxDescriptorResponse {
    return { tx: isSet(object.tx) ? TxDescriptor.fromJSON(object.tx) : undefined };
  },

  toJSON(message: GetTxDescriptorResponse): unknown {
    const obj: any = {};
    if (message.tx !== undefined) {
      obj.tx = TxDescriptor.toJSON(message.tx);
    }
    return obj;
  },

  create(base?: DeepPartial<GetTxDescriptorResponse>): GetTxDescriptorResponse {
    return GetTxDescriptorResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetTxDescriptorResponse>): GetTxDescriptorResponse {
    const message = createBaseGetTxDescriptorResponse();
    message.tx = (object.tx !== undefined && object.tx !== null) ? TxDescriptor.fromPartial(object.tx) : undefined;
    return message;
  },
};

function createBaseQueryServicesDescriptor(): QueryServicesDescriptor {
  return { query_services: [] };
}

export const QueryServicesDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.QueryServicesDescriptor" as const,

  encode(message: QueryServicesDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.query_services) {
      QueryServiceDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryServicesDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryServicesDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query_services.push(QueryServiceDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryServicesDescriptor {
    return {
      query_services: globalThis.Array.isArray(object?.query_services)
        ? object.query_services.map((e: any) => QueryServiceDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryServicesDescriptor): unknown {
    const obj: any = {};
    if (message.query_services?.length) {
      obj.query_services = message.query_services.map((e) => QueryServiceDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryServicesDescriptor>): QueryServicesDescriptor {
    return QueryServicesDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryServicesDescriptor>): QueryServicesDescriptor {
    const message = createBaseQueryServicesDescriptor();
    message.query_services = object.query_services?.map((e) => QueryServiceDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryServiceDescriptor(): QueryServiceDescriptor {
  return { fullname: "", is_module: false, methods: [] };
}

export const QueryServiceDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.QueryServiceDescriptor" as const,

  encode(message: QueryServiceDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    if (message.is_module === true) {
      writer.uint32(16).bool(message.is_module);
    }
    for (const v of message.methods) {
      QueryMethodDescriptor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryServiceDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryServiceDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fullname = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.is_module = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.methods.push(QueryMethodDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryServiceDescriptor {
    return {
      fullname: isSet(object.fullname) ? globalThis.String(object.fullname) : "",
      is_module: isSet(object.is_module) ? globalThis.Boolean(object.is_module) : false,
      methods: globalThis.Array.isArray(object?.methods)
        ? object.methods.map((e: any) => QueryMethodDescriptor.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryServiceDescriptor): unknown {
    const obj: any = {};
    if (message.fullname !== undefined) {
      obj.fullname = message.fullname;
    }
    if (message.is_module !== undefined) {
      obj.is_module = message.is_module;
    }
    if (message.methods?.length) {
      obj.methods = message.methods.map((e) => QueryMethodDescriptor.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<QueryServiceDescriptor>): QueryServiceDescriptor {
    return QueryServiceDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryServiceDescriptor>): QueryServiceDescriptor {
    const message = createBaseQueryServiceDescriptor();
    message.fullname = object.fullname ?? "";
    message.is_module = object.is_module ?? false;
    message.methods = object.methods?.map((e) => QueryMethodDescriptor.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryMethodDescriptor(): QueryMethodDescriptor {
  return { name: "", full_query_path: "" };
}

export const QueryMethodDescriptor = {
  $type: "cosmos.base.reflection.v2alpha1.QueryMethodDescriptor" as const,

  encode(message: QueryMethodDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.full_query_path !== "") {
      writer.uint32(18).string(message.full_query_path);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryMethodDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMethodDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.full_query_path = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryMethodDescriptor {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      full_query_path: isSet(object.full_query_path) ? globalThis.String(object.full_query_path) : "",
    };
  },

  toJSON(message: QueryMethodDescriptor): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.full_query_path !== undefined) {
      obj.full_query_path = message.full_query_path;
    }
    return obj;
  },

  create(base?: DeepPartial<QueryMethodDescriptor>): QueryMethodDescriptor {
    return QueryMethodDescriptor.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<QueryMethodDescriptor>): QueryMethodDescriptor {
    const message = createBaseQueryMethodDescriptor();
    message.name = object.name ?? "";
    message.full_query_path = object.full_query_path ?? "";
    return message;
  },
};

/** ReflectionService defines a service for application reflection. */
export interface ReflectionService {
  /**
   * GetAuthnDescriptor returns information on how to authenticate transactions in the application
   * NOTE: this RPC is still experimental and might be subject to breaking changes or removal in
   * future releases of the cosmos-sdk.
   */
  GetAuthnDescriptor(
    request: DeepPartial<GetAuthnDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthnDescriptorResponse>;
  /** GetChainDescriptor returns the description of the chain */
  GetChainDescriptor(
    request: DeepPartial<GetChainDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetChainDescriptorResponse>;
  /** GetCodecDescriptor returns the descriptor of the codec of the application */
  GetCodecDescriptor(
    request: DeepPartial<GetCodecDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCodecDescriptorResponse>;
  /** GetConfigurationDescriptor returns the descriptor for the sdk.Config of the application */
  GetConfigurationDescriptor(
    request: DeepPartial<GetConfigurationDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetConfigurationDescriptorResponse>;
  /** GetQueryServicesDescriptor returns the available gRPC queryable services of the application */
  GetQueryServicesDescriptor(
    request: DeepPartial<GetQueryServicesDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetQueryServicesDescriptorResponse>;
  /** GetTxDescriptor returns information on the used transaction object and available msgs that can be used */
  GetTxDescriptor(
    request: DeepPartial<GetTxDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetTxDescriptorResponse>;
}

export class ReflectionServiceClientImpl implements ReflectionService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAuthnDescriptor = this.GetAuthnDescriptor.bind(this);
    this.GetChainDescriptor = this.GetChainDescriptor.bind(this);
    this.GetCodecDescriptor = this.GetCodecDescriptor.bind(this);
    this.GetConfigurationDescriptor = this.GetConfigurationDescriptor.bind(this);
    this.GetQueryServicesDescriptor = this.GetQueryServicesDescriptor.bind(this);
    this.GetTxDescriptor = this.GetTxDescriptor.bind(this);
  }

  GetAuthnDescriptor(
    request: DeepPartial<GetAuthnDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthnDescriptorResponse> {
    return this.rpc.unary(
      ReflectionServiceGetAuthnDescriptorDesc,
      GetAuthnDescriptorRequest.fromPartial(request),
      metadata,
    );
  }

  GetChainDescriptor(
    request: DeepPartial<GetChainDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetChainDescriptorResponse> {
    return this.rpc.unary(
      ReflectionServiceGetChainDescriptorDesc,
      GetChainDescriptorRequest.fromPartial(request),
      metadata,
    );
  }

  GetCodecDescriptor(
    request: DeepPartial<GetCodecDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCodecDescriptorResponse> {
    return this.rpc.unary(
      ReflectionServiceGetCodecDescriptorDesc,
      GetCodecDescriptorRequest.fromPartial(request),
      metadata,
    );
  }

  GetConfigurationDescriptor(
    request: DeepPartial<GetConfigurationDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetConfigurationDescriptorResponse> {
    return this.rpc.unary(
      ReflectionServiceGetConfigurationDescriptorDesc,
      GetConfigurationDescriptorRequest.fromPartial(request),
      metadata,
    );
  }

  GetQueryServicesDescriptor(
    request: DeepPartial<GetQueryServicesDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetQueryServicesDescriptorResponse> {
    return this.rpc.unary(
      ReflectionServiceGetQueryServicesDescriptorDesc,
      GetQueryServicesDescriptorRequest.fromPartial(request),
      metadata,
    );
  }

  GetTxDescriptor(
    request: DeepPartial<GetTxDescriptorRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetTxDescriptorResponse> {
    return this.rpc.unary(ReflectionServiceGetTxDescriptorDesc, GetTxDescriptorRequest.fromPartial(request), metadata);
  }
}

export const ReflectionServiceDesc = { serviceName: "cosmos.base.reflection.v2alpha1.ReflectionService" };

export const ReflectionServiceGetAuthnDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthnDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthnDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAuthnDescriptorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceGetChainDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetChainDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetChainDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetChainDescriptorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceGetCodecDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetCodecDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCodecDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCodecDescriptorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceGetConfigurationDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetConfigurationDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetConfigurationDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetConfigurationDescriptorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceGetQueryServicesDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetQueryServicesDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetQueryServicesDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetQueryServicesDescriptorResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ReflectionServiceGetTxDescriptorDesc: UnaryMethodDefinitionish = {
  methodName: "GetTxDescriptor",
  service: ReflectionServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetTxDescriptorRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetTxDescriptorResponse.decode(data);
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
