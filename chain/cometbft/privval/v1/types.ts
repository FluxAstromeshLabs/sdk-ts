// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: cometbft/privval/v1/types.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Proposal, Vote } from "../../types/v1/types";

/** remotesignererror is returned when the remote signer fails. */
export interface RemoteSignerError {
  code: number;
  description: string;
}

/** PubKeyRequest requests the consensus public key from the remote signer. */
export interface PubKeyRequest {
  chain_id: string;
}

/** PubKeyResponse is a response message containing the public key. */
export interface PubKeyResponse {
  error: RemoteSignerError | undefined;
  pub_key_bytes: Uint8Array;
  pub_key_type: string;
}

/** SignVoteRequest is a request to sign a vote */
export interface SignVoteRequest {
  vote: Vote | undefined;
  chain_id: string;
  /** if true, the signer may skip signing the extension bytes. */
  skip_extension_signing: boolean;
}

/** SignedVoteResponse is a response containing a signed vote or an error */
export interface SignedVoteResponse {
  vote: Vote | undefined;
  error: RemoteSignerError | undefined;
}

/** SignProposalRequest is a request to sign a proposal */
export interface SignProposalRequest {
  proposal: Proposal | undefined;
  chain_id: string;
}

/** SignedProposalResponse is response containing a signed proposal or an error */
export interface SignedProposalResponse {
  proposal: Proposal | undefined;
  error: RemoteSignerError | undefined;
}

/** SignBytesRequest is a request to sign arbitrary bytes */
export interface SignBytesRequest {
  value: Uint8Array;
}

/** SignBytesResponse is a response containing a signature or an error */
export interface SignBytesResponse {
  signature: Uint8Array;
  error: RemoteSignerError | undefined;
}

/** PingRequest is a request to confirm that the connection is alive. */
export interface PingRequest {
}

/** PingResponse is a response to confirm that the connection is alive. */
export interface PingResponse {
}

/** Message is an abstract message to/from the remote signer. */
export interface Message {
  pub_key_request?: PubKeyRequest | undefined;
  pub_key_response?: PubKeyResponse | undefined;
  sign_vote_request?: SignVoteRequest | undefined;
  signed_vote_response?: SignedVoteResponse | undefined;
  sign_proposal_request?: SignProposalRequest | undefined;
  signed_proposal_response?: SignedProposalResponse | undefined;
  ping_request?: PingRequest | undefined;
  ping_response?: PingResponse | undefined;
  sign_bytes_request?: SignBytesRequest | undefined;
  sign_bytes_response?: SignBytesResponse | undefined;
}

function createBaseRemoteSignerError(): RemoteSignerError {
  return { code: 0, description: "" };
}

export const RemoteSignerError = {
  $type: "cometbft.privval.v1.RemoteSignerError" as const,

  encode(message: RemoteSignerError, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoteSignerError {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteSignerError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoteSignerError {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: RemoteSignerError): unknown {
    const obj: any = {};
    if (message.code !== undefined) {
      obj.code = Math.round(message.code);
    }
    if (message.description !== undefined) {
      obj.description = message.description;
    }
    return obj;
  },

  create(base?: DeepPartial<RemoteSignerError>): RemoteSignerError {
    return RemoteSignerError.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RemoteSignerError>): RemoteSignerError {
    const message = createBaseRemoteSignerError();
    message.code = object.code ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

function createBasePubKeyRequest(): PubKeyRequest {
  return { chain_id: "" };
}

export const PubKeyRequest = {
  $type: "cometbft.privval.v1.PubKeyRequest" as const,

  encode(message: PubKeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chain_id !== "") {
      writer.uint32(10).string(message.chain_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PubKeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePubKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chain_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PubKeyRequest {
    return { chain_id: isSet(object.chain_id) ? globalThis.String(object.chain_id) : "" };
  },

  toJSON(message: PubKeyRequest): unknown {
    const obj: any = {};
    if (message.chain_id !== undefined) {
      obj.chain_id = message.chain_id;
    }
    return obj;
  },

  create(base?: DeepPartial<PubKeyRequest>): PubKeyRequest {
    return PubKeyRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PubKeyRequest>): PubKeyRequest {
    const message = createBasePubKeyRequest();
    message.chain_id = object.chain_id ?? "";
    return message;
  },
};

function createBasePubKeyResponse(): PubKeyResponse {
  return { error: undefined, pub_key_bytes: new Uint8Array(0), pub_key_type: "" };
}

export const PubKeyResponse = {
  $type: "cometbft.privval.v1.PubKeyResponse" as const,

  encode(message: PubKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== undefined) {
      RemoteSignerError.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.pub_key_bytes.length !== 0) {
      writer.uint32(26).bytes(message.pub_key_bytes);
    }
    if (message.pub_key_type !== "") {
      writer.uint32(34).string(message.pub_key_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PubKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePubKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = RemoteSignerError.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pub_key_bytes = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pub_key_type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PubKeyResponse {
    return {
      error: isSet(object.error) ? RemoteSignerError.fromJSON(object.error) : undefined,
      pub_key_bytes: isSet(object.pub_key_bytes) ? bytesFromBase64(object.pub_key_bytes) : new Uint8Array(0),
      pub_key_type: isSet(object.pub_key_type) ? globalThis.String(object.pub_key_type) : "",
    };
  },

  toJSON(message: PubKeyResponse): unknown {
    const obj: any = {};
    if (message.error !== undefined) {
      obj.error = RemoteSignerError.toJSON(message.error);
    }
    if (message.pub_key_bytes !== undefined) {
      obj.pub_key_bytes = base64FromBytes(message.pub_key_bytes);
    }
    if (message.pub_key_type !== undefined) {
      obj.pub_key_type = message.pub_key_type;
    }
    return obj;
  },

  create(base?: DeepPartial<PubKeyResponse>): PubKeyResponse {
    return PubKeyResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PubKeyResponse>): PubKeyResponse {
    const message = createBasePubKeyResponse();
    message.error = (object.error !== undefined && object.error !== null)
      ? RemoteSignerError.fromPartial(object.error)
      : undefined;
    message.pub_key_bytes = object.pub_key_bytes ?? new Uint8Array(0);
    message.pub_key_type = object.pub_key_type ?? "";
    return message;
  },
};

function createBaseSignVoteRequest(): SignVoteRequest {
  return { vote: undefined, chain_id: "", skip_extension_signing: false };
}

export const SignVoteRequest = {
  $type: "cometbft.privval.v1.SignVoteRequest" as const,

  encode(message: SignVoteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.skip_extension_signing !== false) {
      writer.uint32(24).bool(message.skip_extension_signing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignVoteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignVoteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vote = Vote.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chain_id = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.skip_extension_signing = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignVoteRequest {
    return {
      vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined,
      chain_id: isSet(object.chain_id) ? globalThis.String(object.chain_id) : "",
      skip_extension_signing: isSet(object.skip_extension_signing)
        ? globalThis.Boolean(object.skip_extension_signing)
        : false,
    };
  },

  toJSON(message: SignVoteRequest): unknown {
    const obj: any = {};
    if (message.vote !== undefined) {
      obj.vote = Vote.toJSON(message.vote);
    }
    if (message.chain_id !== undefined) {
      obj.chain_id = message.chain_id;
    }
    if (message.skip_extension_signing !== undefined) {
      obj.skip_extension_signing = message.skip_extension_signing;
    }
    return obj;
  },

  create(base?: DeepPartial<SignVoteRequest>): SignVoteRequest {
    return SignVoteRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignVoteRequest>): SignVoteRequest {
    const message = createBaseSignVoteRequest();
    message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
    message.chain_id = object.chain_id ?? "";
    message.skip_extension_signing = object.skip_extension_signing ?? false;
    return message;
  },
};

function createBaseSignedVoteResponse(): SignedVoteResponse {
  return { vote: undefined, error: undefined };
}

export const SignedVoteResponse = {
  $type: "cometbft.privval.v1.SignedVoteResponse" as const,

  encode(message: SignedVoteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      RemoteSignerError.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedVoteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vote = Vote.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = RemoteSignerError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignedVoteResponse {
    return {
      vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined,
      error: isSet(object.error) ? RemoteSignerError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignedVoteResponse): unknown {
    const obj: any = {};
    if (message.vote !== undefined) {
      obj.vote = Vote.toJSON(message.vote);
    }
    if (message.error !== undefined) {
      obj.error = RemoteSignerError.toJSON(message.error);
    }
    return obj;
  },

  create(base?: DeepPartial<SignedVoteResponse>): SignedVoteResponse {
    return SignedVoteResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignedVoteResponse>): SignedVoteResponse {
    const message = createBaseSignedVoteResponse();
    message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? RemoteSignerError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseSignProposalRequest(): SignProposalRequest {
  return { proposal: undefined, chain_id: "" };
}

export const SignProposalRequest = {
  $type: "cometbft.privval.v1.SignProposalRequest" as const,

  encode(message: SignProposalRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignProposalRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignProposalRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proposal = Proposal.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chain_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignProposalRequest {
    return {
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      chain_id: isSet(object.chain_id) ? globalThis.String(object.chain_id) : "",
    };
  },

  toJSON(message: SignProposalRequest): unknown {
    const obj: any = {};
    if (message.proposal !== undefined) {
      obj.proposal = Proposal.toJSON(message.proposal);
    }
    if (message.chain_id !== undefined) {
      obj.chain_id = message.chain_id;
    }
    return obj;
  },

  create(base?: DeepPartial<SignProposalRequest>): SignProposalRequest {
    return SignProposalRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignProposalRequest>): SignProposalRequest {
    const message = createBaseSignProposalRequest();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.chain_id = object.chain_id ?? "";
    return message;
  },
};

function createBaseSignedProposalResponse(): SignedProposalResponse {
  return { proposal: undefined, error: undefined };
}

export const SignedProposalResponse = {
  $type: "cometbft.privval.v1.SignedProposalResponse" as const,

  encode(message: SignedProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      RemoteSignerError.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proposal = Proposal.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = RemoteSignerError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignedProposalResponse {
    return {
      proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined,
      error: isSet(object.error) ? RemoteSignerError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignedProposalResponse): unknown {
    const obj: any = {};
    if (message.proposal !== undefined) {
      obj.proposal = Proposal.toJSON(message.proposal);
    }
    if (message.error !== undefined) {
      obj.error = RemoteSignerError.toJSON(message.error);
    }
    return obj;
  },

  create(base?: DeepPartial<SignedProposalResponse>): SignedProposalResponse {
    return SignedProposalResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignedProposalResponse>): SignedProposalResponse {
    const message = createBaseSignedProposalResponse();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? RemoteSignerError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseSignBytesRequest(): SignBytesRequest {
  return { value: new Uint8Array(0) };
}

export const SignBytesRequest = {
  $type: "cometbft.privval.v1.SignBytesRequest" as const,

  encode(message: SignBytesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignBytesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignBytesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignBytesRequest {
    return { value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0) };
  },

  toJSON(message: SignBytesRequest): unknown {
    const obj: any = {};
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<SignBytesRequest>): SignBytesRequest {
    return SignBytesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignBytesRequest>): SignBytesRequest {
    const message = createBaseSignBytesRequest();
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSignBytesResponse(): SignBytesResponse {
  return { signature: new Uint8Array(0), error: undefined };
}

export const SignBytesResponse = {
  $type: "cometbft.privval.v1.SignBytesResponse" as const,

  encode(message: SignBytesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature.length !== 0) {
      writer.uint32(10).bytes(message.signature);
    }
    if (message.error !== undefined) {
      RemoteSignerError.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignBytesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignBytesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = RemoteSignerError.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SignBytesResponse {
    return {
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      error: isSet(object.error) ? RemoteSignerError.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SignBytesResponse): unknown {
    const obj: any = {};
    if (message.signature !== undefined) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.error !== undefined) {
      obj.error = RemoteSignerError.toJSON(message.error);
    }
    return obj;
  },

  create(base?: DeepPartial<SignBytesResponse>): SignBytesResponse {
    return SignBytesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SignBytesResponse>): SignBytesResponse {
    const message = createBaseSignBytesResponse();
    message.signature = object.signature ?? new Uint8Array(0);
    message.error = (object.error !== undefined && object.error !== null)
      ? RemoteSignerError.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBasePingRequest(): PingRequest {
  return {};
}

export const PingRequest = {
  $type: "cometbft.privval.v1.PingRequest" as const,

  encode(_: PingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
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

  fromJSON(_: any): PingRequest {
    return {};
  },

  toJSON(_: PingRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<PingRequest>): PingRequest {
    return PingRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<PingRequest>): PingRequest {
    const message = createBasePingRequest();
    return message;
  },
};

function createBasePingResponse(): PingResponse {
  return {};
}

export const PingResponse = {
  $type: "cometbft.privval.v1.PingResponse" as const,

  encode(_: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
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

  fromJSON(_: any): PingResponse {
    return {};
  },

  toJSON(_: PingResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<PingResponse>): PingResponse {
    return PingResponse.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<PingResponse>): PingResponse {
    const message = createBasePingResponse();
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    pub_key_request: undefined,
    pub_key_response: undefined,
    sign_vote_request: undefined,
    signed_vote_response: undefined,
    sign_proposal_request: undefined,
    signed_proposal_response: undefined,
    ping_request: undefined,
    ping_response: undefined,
    sign_bytes_request: undefined,
    sign_bytes_response: undefined,
  };
}

export const Message = {
  $type: "cometbft.privval.v1.Message" as const,

  encode(message: Message, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pub_key_request !== undefined) {
      PubKeyRequest.encode(message.pub_key_request, writer.uint32(10).fork()).ldelim();
    }
    if (message.pub_key_response !== undefined) {
      PubKeyResponse.encode(message.pub_key_response, writer.uint32(18).fork()).ldelim();
    }
    if (message.sign_vote_request !== undefined) {
      SignVoteRequest.encode(message.sign_vote_request, writer.uint32(26).fork()).ldelim();
    }
    if (message.signed_vote_response !== undefined) {
      SignedVoteResponse.encode(message.signed_vote_response, writer.uint32(34).fork()).ldelim();
    }
    if (message.sign_proposal_request !== undefined) {
      SignProposalRequest.encode(message.sign_proposal_request, writer.uint32(42).fork()).ldelim();
    }
    if (message.signed_proposal_response !== undefined) {
      SignedProposalResponse.encode(message.signed_proposal_response, writer.uint32(50).fork()).ldelim();
    }
    if (message.ping_request !== undefined) {
      PingRequest.encode(message.ping_request, writer.uint32(58).fork()).ldelim();
    }
    if (message.ping_response !== undefined) {
      PingResponse.encode(message.ping_response, writer.uint32(66).fork()).ldelim();
    }
    if (message.sign_bytes_request !== undefined) {
      SignBytesRequest.encode(message.sign_bytes_request, writer.uint32(74).fork()).ldelim();
    }
    if (message.sign_bytes_response !== undefined) {
      SignBytesResponse.encode(message.sign_bytes_response, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pub_key_request = PubKeyRequest.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pub_key_response = PubKeyResponse.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sign_vote_request = SignVoteRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signed_vote_response = SignedVoteResponse.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sign_proposal_request = SignProposalRequest.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.signed_proposal_response = SignedProposalResponse.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ping_request = PingRequest.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.ping_response = PingResponse.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.sign_bytes_request = SignBytesRequest.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.sign_bytes_response = SignBytesResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      pub_key_request: isSet(object.pub_key_request) ? PubKeyRequest.fromJSON(object.pub_key_request) : undefined,
      pub_key_response: isSet(object.pub_key_response) ? PubKeyResponse.fromJSON(object.pub_key_response) : undefined,
      sign_vote_request: isSet(object.sign_vote_request)
        ? SignVoteRequest.fromJSON(object.sign_vote_request)
        : undefined,
      signed_vote_response: isSet(object.signed_vote_response)
        ? SignedVoteResponse.fromJSON(object.signed_vote_response)
        : undefined,
      sign_proposal_request: isSet(object.sign_proposal_request)
        ? SignProposalRequest.fromJSON(object.sign_proposal_request)
        : undefined,
      signed_proposal_response: isSet(object.signed_proposal_response)
        ? SignedProposalResponse.fromJSON(object.signed_proposal_response)
        : undefined,
      ping_request: isSet(object.ping_request) ? PingRequest.fromJSON(object.ping_request) : undefined,
      ping_response: isSet(object.ping_response) ? PingResponse.fromJSON(object.ping_response) : undefined,
      sign_bytes_request: isSet(object.sign_bytes_request)
        ? SignBytesRequest.fromJSON(object.sign_bytes_request)
        : undefined,
      sign_bytes_response: isSet(object.sign_bytes_response)
        ? SignBytesResponse.fromJSON(object.sign_bytes_response)
        : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.pub_key_request !== undefined) {
      obj.pub_key_request = PubKeyRequest.toJSON(message.pub_key_request);
    }
    if (message.pub_key_response !== undefined) {
      obj.pub_key_response = PubKeyResponse.toJSON(message.pub_key_response);
    }
    if (message.sign_vote_request !== undefined) {
      obj.sign_vote_request = SignVoteRequest.toJSON(message.sign_vote_request);
    }
    if (message.signed_vote_response !== undefined) {
      obj.signed_vote_response = SignedVoteResponse.toJSON(message.signed_vote_response);
    }
    if (message.sign_proposal_request !== undefined) {
      obj.sign_proposal_request = SignProposalRequest.toJSON(message.sign_proposal_request);
    }
    if (message.signed_proposal_response !== undefined) {
      obj.signed_proposal_response = SignedProposalResponse.toJSON(message.signed_proposal_response);
    }
    if (message.ping_request !== undefined) {
      obj.ping_request = PingRequest.toJSON(message.ping_request);
    }
    if (message.ping_response !== undefined) {
      obj.ping_response = PingResponse.toJSON(message.ping_response);
    }
    if (message.sign_bytes_request !== undefined) {
      obj.sign_bytes_request = SignBytesRequest.toJSON(message.sign_bytes_request);
    }
    if (message.sign_bytes_response !== undefined) {
      obj.sign_bytes_response = SignBytesResponse.toJSON(message.sign_bytes_response);
    }
    return obj;
  },

  create(base?: DeepPartial<Message>): Message {
    return Message.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Message>): Message {
    const message = createBaseMessage();
    message.pub_key_request = (object.pub_key_request !== undefined && object.pub_key_request !== null)
      ? PubKeyRequest.fromPartial(object.pub_key_request)
      : undefined;
    message.pub_key_response = (object.pub_key_response !== undefined && object.pub_key_response !== null)
      ? PubKeyResponse.fromPartial(object.pub_key_response)
      : undefined;
    message.sign_vote_request = (object.sign_vote_request !== undefined && object.sign_vote_request !== null)
      ? SignVoteRequest.fromPartial(object.sign_vote_request)
      : undefined;
    message.signed_vote_response = (object.signed_vote_response !== undefined && object.signed_vote_response !== null)
      ? SignedVoteResponse.fromPartial(object.signed_vote_response)
      : undefined;
    message.sign_proposal_request =
      (object.sign_proposal_request !== undefined && object.sign_proposal_request !== null)
        ? SignProposalRequest.fromPartial(object.sign_proposal_request)
        : undefined;
    message.signed_proposal_response =
      (object.signed_proposal_response !== undefined && object.signed_proposal_response !== null)
        ? SignedProposalResponse.fromPartial(object.signed_proposal_response)
        : undefined;
    message.ping_request = (object.ping_request !== undefined && object.ping_request !== null)
      ? PingRequest.fromPartial(object.ping_request)
      : undefined;
    message.ping_response = (object.ping_response !== undefined && object.ping_response !== null)
      ? PingResponse.fromPartial(object.ping_response)
      : undefined;
    message.sign_bytes_request = (object.sign_bytes_request !== undefined && object.sign_bytes_request !== null)
      ? SignBytesRequest.fromPartial(object.sign_bytes_request)
      : undefined;
    message.sign_bytes_response = (object.sign_bytes_response !== undefined && object.sign_bytes_response !== null)
      ? SignBytesResponse.fromPartial(object.sign_bytes_response)
      : undefined;
    return message;
  },
};

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
