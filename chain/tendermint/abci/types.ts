/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { PublicKey } from "../crypto/keys";
import { ProofOps } from "../crypto/proof";
import { ConsensusParams } from "../types/params";
import { BlockIDFlag, blockIDFlagFromJSON, blockIDFlagToJSON } from "../types/validator";

export enum CheckTxType {
  NEW = 0,
  RECHECK = 1,
  UNRECOGNIZED = -1,
}

export function checkTxTypeFromJSON(object: any): CheckTxType {
  switch (object) {
    case 0:
    case "NEW":
      return CheckTxType.NEW;
    case 1:
    case "RECHECK":
      return CheckTxType.RECHECK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckTxType.UNRECOGNIZED;
  }
}

export function checkTxTypeToJSON(object: CheckTxType): string {
  switch (object) {
    case CheckTxType.NEW:
      return "NEW";
    case CheckTxType.RECHECK:
      return "RECHECK";
    case CheckTxType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum MisbehaviorType {
  UNKNOWN = 0,
  DUPLICATE_VOTE = 1,
  LIGHT_CLIENT_ATTACK = 2,
  UNRECOGNIZED = -1,
}

export function misbehaviorTypeFromJSON(object: any): MisbehaviorType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return MisbehaviorType.UNKNOWN;
    case 1:
    case "DUPLICATE_VOTE":
      return MisbehaviorType.DUPLICATE_VOTE;
    case 2:
    case "LIGHT_CLIENT_ATTACK":
      return MisbehaviorType.LIGHT_CLIENT_ATTACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MisbehaviorType.UNRECOGNIZED;
  }
}

export function misbehaviorTypeToJSON(object: MisbehaviorType): string {
  switch (object) {
    case MisbehaviorType.UNKNOWN:
      return "UNKNOWN";
    case MisbehaviorType.DUPLICATE_VOTE:
      return "DUPLICATE_VOTE";
    case MisbehaviorType.LIGHT_CLIENT_ATTACK:
      return "LIGHT_CLIENT_ATTACK";
    case MisbehaviorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Request {
  echo?: RequestEcho | undefined;
  flush?: RequestFlush | undefined;
  info?: RequestInfo | undefined;
  init_chain?: RequestInitChain | undefined;
  query?: RequestQuery | undefined;
  check_tx?: RequestCheckTx | undefined;
  commit?: RequestCommit | undefined;
  list_snapshots?: RequestListSnapshots | undefined;
  offer_snapshot?: RequestOfferSnapshot | undefined;
  load_snapshot_chunk?: RequestLoadSnapshotChunk | undefined;
  apply_snapshot_chunk?: RequestApplySnapshotChunk | undefined;
  prepare_proposal?: RequestPrepareProposal | undefined;
  process_proposal?: RequestProcessProposal | undefined;
  extend_vote?: RequestExtendVote | undefined;
  verify_vote_extension?: RequestVerifyVoteExtension | undefined;
  finalize_block?: RequestFinalizeBlock | undefined;
}

export interface RequestEcho {
  message: string;
}

export interface RequestFlush {
}

export interface RequestInfo {
  version: string;
  block_version: string;
  p2p_version: string;
  abci_version: string;
}

export interface RequestInitChain {
  time: Date | undefined;
  chain_id: string;
  consensus_params: ConsensusParams | undefined;
  validators: ValidatorUpdate[];
  app_state_bytes: Uint8Array;
  initial_height: string;
}

export interface RequestQuery {
  data: Uint8Array;
  path: string;
  height: string;
  prove: boolean;
}

export interface RequestCheckTx {
  tx: Uint8Array;
  type: CheckTxType;
}

export interface RequestCommit {
}

/** lists available snapshots */
export interface RequestListSnapshots {
}

/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
  /** snapshot offered by peers */
  snapshot:
    | Snapshot
    | undefined;
  /** light client-verified app hash for snapshot height */
  app_hash: Uint8Array;
}

/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
  height: string;
  format: number;
  chunk: number;
}

/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
  index: number;
  chunk: Uint8Array;
  sender: string;
}

export interface RequestPrepareProposal {
  /** the modified transactions cannot exceed this size. */
  max_tx_bytes: string;
  /**
   * txs is an array of transactions that will be included in a block,
   * sent to the app for possible modifications.
   */
  txs: Uint8Array[];
  local_last_commit: ExtendedCommitInfo | undefined;
  misbehavior: Misbehavior[];
  height: string;
  time: Date | undefined;
  next_validators_hash: Uint8Array;
  /** address of the public key of the validator proposing the block. */
  proposer_address: Uint8Array;
}

export interface RequestProcessProposal {
  txs: Uint8Array[];
  proposed_last_commit: CommitInfo | undefined;
  misbehavior: Misbehavior[];
  /** hash is the merkle root hash of the fields of the proposed block. */
  hash: Uint8Array;
  height: string;
  time: Date | undefined;
  next_validators_hash: Uint8Array;
  /** address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

/** Extends a vote with application-injected data */
export interface RequestExtendVote {
  /** the hash of the block that this vote may be referring to */
  hash: Uint8Array;
  /** the height of the extended vote */
  height: string;
  /** info of the block that this vote may be referring to */
  time: Date | undefined;
  txs: Uint8Array[];
  proposed_last_commit: CommitInfo | undefined;
  misbehavior: Misbehavior[];
  next_validators_hash: Uint8Array;
  /** address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

/** Verify the vote extension */
export interface RequestVerifyVoteExtension {
  /** the hash of the block that this received vote corresponds to */
  hash: Uint8Array;
  /** the validator that signed the vote extension */
  validator_address: Uint8Array;
  height: string;
  vote_extension: Uint8Array;
}

export interface RequestFinalizeBlock {
  txs: Uint8Array[];
  decided_last_commit: CommitInfo | undefined;
  misbehavior: Misbehavior[];
  /** hash is the merkle root hash of the fields of the decided block. */
  hash: Uint8Array;
  height: string;
  time: Date | undefined;
  next_validators_hash: Uint8Array;
  /** proposer_address is the address of the public key of the original proposer of the block. */
  proposer_address: Uint8Array;
}

export interface Response {
  exception?: ResponseException | undefined;
  echo?: ResponseEcho | undefined;
  flush?: ResponseFlush | undefined;
  info?: ResponseInfo | undefined;
  init_chain?: ResponseInitChain | undefined;
  query?: ResponseQuery | undefined;
  check_tx?: ResponseCheckTx | undefined;
  commit?: ResponseCommit | undefined;
  list_snapshots?: ResponseListSnapshots | undefined;
  offer_snapshot?: ResponseOfferSnapshot | undefined;
  load_snapshot_chunk?: ResponseLoadSnapshotChunk | undefined;
  apply_snapshot_chunk?: ResponseApplySnapshotChunk | undefined;
  prepare_proposal?: ResponsePrepareProposal | undefined;
  process_proposal?: ResponseProcessProposal | undefined;
  extend_vote?: ResponseExtendVote | undefined;
  verify_vote_extension?: ResponseVerifyVoteExtension | undefined;
  finalize_block?: ResponseFinalizeBlock | undefined;
}

/** nondeterministic */
export interface ResponseException {
  error: string;
}

export interface ResponseEcho {
  message: string;
}

export interface ResponseFlush {
}

export interface ResponseInfo {
  data: string;
  version: string;
  app_version: string;
  last_block_height: string;
  last_block_app_hash: Uint8Array;
}

export interface ResponseInitChain {
  consensus_params: ConsensusParams | undefined;
  validators: ValidatorUpdate[];
  app_hash: Uint8Array;
}

export interface ResponseQuery {
  code: number;
  /** bytes data = 2; // use "value" instead. */
  log: string;
  /** nondeterministic */
  info: string;
  index: string;
  key: Uint8Array;
  value: Uint8Array;
  proof_ops: ProofOps | undefined;
  height: string;
  codespace: string;
}

export interface ResponseCheckTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: Event[];
  codespace: string;
}

export interface ResponseCommit {
  retain_height: string;
}

export interface ResponseListSnapshots {
  snapshots: Snapshot[];
}

export interface ResponseOfferSnapshot {
  result: ResponseOfferSnapshot_Result;
}

export enum ResponseOfferSnapshot_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Snapshot accepted, apply chunks */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** REJECT - Reject this specific snapshot, try others */
  REJECT = 3,
  /** REJECT_FORMAT - Reject all snapshots of this format, try others */
  REJECT_FORMAT = 4,
  /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
  REJECT_SENDER = 5,
  UNRECOGNIZED = -1,
}

export function responseOfferSnapshot_ResultFromJSON(object: any): ResponseOfferSnapshot_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseOfferSnapshot_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseOfferSnapshot_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseOfferSnapshot_Result.ABORT;
    case 3:
    case "REJECT":
      return ResponseOfferSnapshot_Result.REJECT;
    case 4:
    case "REJECT_FORMAT":
      return ResponseOfferSnapshot_Result.REJECT_FORMAT;
    case 5:
    case "REJECT_SENDER":
      return ResponseOfferSnapshot_Result.REJECT_SENDER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseOfferSnapshot_Result.UNRECOGNIZED;
  }
}

export function responseOfferSnapshot_ResultToJSON(object: ResponseOfferSnapshot_Result): string {
  switch (object) {
    case ResponseOfferSnapshot_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseOfferSnapshot_Result.ACCEPT:
      return "ACCEPT";
    case ResponseOfferSnapshot_Result.ABORT:
      return "ABORT";
    case ResponseOfferSnapshot_Result.REJECT:
      return "REJECT";
    case ResponseOfferSnapshot_Result.REJECT_FORMAT:
      return "REJECT_FORMAT";
    case ResponseOfferSnapshot_Result.REJECT_SENDER:
      return "REJECT_SENDER";
    case ResponseOfferSnapshot_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponseLoadSnapshotChunk {
  chunk: Uint8Array;
}

export interface ResponseApplySnapshotChunk {
  result: ResponseApplySnapshotChunk_Result;
  /** Chunks to refetch and reapply */
  refetch_chunks: number[];
  /** Chunk senders to reject and ban */
  reject_senders: string[];
}

export enum ResponseApplySnapshotChunk_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Chunk successfully accepted */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** RETRY - Retry chunk (combine with refetch and reject) */
  RETRY = 3,
  /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
  RETRY_SNAPSHOT = 4,
  /** REJECT_SNAPSHOT - Reject this snapshot, try others */
  REJECT_SNAPSHOT = 5,
  UNRECOGNIZED = -1,
}

export function responseApplySnapshotChunk_ResultFromJSON(object: any): ResponseApplySnapshotChunk_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseApplySnapshotChunk_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseApplySnapshotChunk_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseApplySnapshotChunk_Result.ABORT;
    case 3:
    case "RETRY":
      return ResponseApplySnapshotChunk_Result.RETRY;
    case 4:
    case "RETRY_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
    case 5:
    case "REJECT_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
  }
}

export function responseApplySnapshotChunk_ResultToJSON(object: ResponseApplySnapshotChunk_Result): string {
  switch (object) {
    case ResponseApplySnapshotChunk_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseApplySnapshotChunk_Result.ACCEPT:
      return "ACCEPT";
    case ResponseApplySnapshotChunk_Result.ABORT:
      return "ABORT";
    case ResponseApplySnapshotChunk_Result.RETRY:
      return "RETRY";
    case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
      return "RETRY_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
      return "REJECT_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponsePrepareProposal {
  txs: Uint8Array[];
}

export interface ResponseProcessProposal {
  status: ResponseProcessProposal_ProposalStatus;
}

export enum ResponseProcessProposal_ProposalStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseProcessProposal_ProposalStatusFromJSON(object: any): ResponseProcessProposal_ProposalStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseProcessProposal_ProposalStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseProcessProposal_ProposalStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseProcessProposal_ProposalStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseProcessProposal_ProposalStatus.UNRECOGNIZED;
  }
}

export function responseProcessProposal_ProposalStatusToJSON(object: ResponseProcessProposal_ProposalStatus): string {
  switch (object) {
    case ResponseProcessProposal_ProposalStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseProcessProposal_ProposalStatus.ACCEPT:
      return "ACCEPT";
    case ResponseProcessProposal_ProposalStatus.REJECT:
      return "REJECT";
    case ResponseProcessProposal_ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponseExtendVote {
  vote_extension: Uint8Array;
}

export interface ResponseVerifyVoteExtension {
  status: ResponseVerifyVoteExtension_VerifyStatus;
}

export enum ResponseVerifyVoteExtension_VerifyStatus {
  UNKNOWN = 0,
  ACCEPT = 1,
  /**
   * REJECT - Rejecting the vote extension will reject the entire precommit by the sender.
   * Incorrectly implementing this thus has liveness implications as it may affect
   * CometBFT's ability to receive 2/3+ valid votes to finalize the block.
   * Honest nodes should never be rejected.
   */
  REJECT = 2,
  UNRECOGNIZED = -1,
}

export function responseVerifyVoteExtension_VerifyStatusFromJSON(
  object: any,
): ResponseVerifyVoteExtension_VerifyStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseVerifyVoteExtension_VerifyStatus.ACCEPT;
    case 2:
    case "REJECT":
      return ResponseVerifyVoteExtension_VerifyStatus.REJECT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED;
  }
}

export function responseVerifyVoteExtension_VerifyStatusToJSON(
  object: ResponseVerifyVoteExtension_VerifyStatus,
): string {
  switch (object) {
    case ResponseVerifyVoteExtension_VerifyStatus.UNKNOWN:
      return "UNKNOWN";
    case ResponseVerifyVoteExtension_VerifyStatus.ACCEPT:
      return "ACCEPT";
    case ResponseVerifyVoteExtension_VerifyStatus.REJECT:
      return "REJECT";
    case ResponseVerifyVoteExtension_VerifyStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ResponseFinalizeBlock {
  /** set of block events emmitted as part of executing the block */
  events: Event[];
  /**
   * the result of executing each transaction including the events
   * the particular transction emitted. This should match the order
   * of the transactions delivered in the block itself
   */
  tx_results: ExecTxResult[];
  /** a list of updates to the validator set. These will reflect the validator set at current height + 2. */
  validator_updates: ValidatorUpdate[];
  /** updates to the consensus params, if any. */
  consensus_param_updates:
    | ConsensusParams
    | undefined;
  /**
   * app_hash is the hash of the applications' state which is used to confirm that execution of the transactions was
   * deterministic. It is up to the application to decide which algorithm to use.
   */
  app_hash: Uint8Array;
}

export interface CommitInfo {
  round: number;
  votes: VoteInfo[];
}

/**
 * ExtendedCommitInfo is similar to CommitInfo except that it is only used in
 * the PrepareProposal request such that CometBFT can provide vote extensions
 * to the application.
 */
export interface ExtendedCommitInfo {
  /** The round at which the block proposer decided in the previous height. */
  round: number;
  /**
   * List of validators' addresses in the last validator set with their voting
   * information, including vote extensions.
   */
  votes: ExtendedVoteInfo[];
}

/**
 * Event allows application developers to attach additional information to
 * ResponseFinalizeBlock and ResponseCheckTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
  type: string;
  attributes: EventAttribute[];
}

/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
  key: string;
  value: string;
  /** nondeterministic */
  index: boolean;
}

/**
 * ExecTxResult contains results of executing one individual transaction.
 *
 * * Its structure is equivalent to #ResponseDeliverTx which will be deprecated/deleted
 */
export interface ExecTxResult {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: string;
  gas_used: string;
  /** nondeterministic */
  events: Event[];
  codespace: string;
}

/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
  height: string;
  index: number;
  tx: Uint8Array;
  result: ExecTxResult | undefined;
}

export interface Validator {
  /** The first 20 bytes of SHA256(public key) */
  address: Uint8Array;
  /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
  power: string;
}

export interface ValidatorUpdate {
  pub_key: PublicKey | undefined;
  power: string;
}

export interface VoteInfo {
  validator: Validator | undefined;
  block_id_flag: BlockIDFlag;
}

export interface ExtendedVoteInfo {
  /** The validator that sent the vote. */
  validator:
    | Validator
    | undefined;
  /** Non-deterministic extension provided by the sending validator's application. */
  vote_extension: Uint8Array;
  /** Vote extension signature created by CometBFT */
  extension_signature: Uint8Array;
  /** block_id_flag indicates whether the validator voted for a block, nil, or did not vote at all */
  block_id_flag: BlockIDFlag;
}

export interface Misbehavior {
  type: MisbehaviorType;
  /** The offending validator */
  validator:
    | Validator
    | undefined;
  /** The height when the offense occurred */
  height: string;
  /** The corresponding time where the offense occurred */
  time:
    | Date
    | undefined;
  /**
   * Total voting power of the validator set in case the ABCI application does
   * not store historical validators.
   * https://github.com/tendermint/tendermint/issues/4581
   */
  total_voting_power: string;
}

export interface Snapshot {
  /** The height at which the snapshot was taken */
  height: string;
  /** The application-specific snapshot format */
  format: number;
  /** Number of chunks in the snapshot */
  chunks: number;
  /** Arbitrary snapshot hash, equal only if identical */
  hash: Uint8Array;
  /** Arbitrary application metadata */
  metadata: Uint8Array;
}

function createBaseRequest(): Request {
  return {
    echo: undefined,
    flush: undefined,
    info: undefined,
    init_chain: undefined,
    query: undefined,
    check_tx: undefined,
    commit: undefined,
    list_snapshots: undefined,
    offer_snapshot: undefined,
    load_snapshot_chunk: undefined,
    apply_snapshot_chunk: undefined,
    prepare_proposal: undefined,
    process_proposal: undefined,
    extend_vote: undefined,
    verify_vote_extension: undefined,
    finalize_block: undefined,
  };
}

export const Request = {
  $type: "tendermint.abci.Request" as const,

  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.echo !== undefined) {
      RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
    }
    if (message.info !== undefined) {
      RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    if (message.init_chain !== undefined) {
      RequestInitChain.encode(message.init_chain, writer.uint32(42).fork()).ldelim();
    }
    if (message.query !== undefined) {
      RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
    }
    if (message.check_tx !== undefined) {
      RequestCheckTx.encode(message.check_tx, writer.uint32(66).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      RequestListSnapshots.encode(message.list_snapshots, writer.uint32(98).fork()).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      RequestOfferSnapshot.encode(message.offer_snapshot, writer.uint32(106).fork()).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      RequestLoadSnapshotChunk.encode(message.load_snapshot_chunk, writer.uint32(114).fork()).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      RequestApplySnapshotChunk.encode(message.apply_snapshot_chunk, writer.uint32(122).fork()).ldelim();
    }
    if (message.prepare_proposal !== undefined) {
      RequestPrepareProposal.encode(message.prepare_proposal, writer.uint32(130).fork()).ldelim();
    }
    if (message.process_proposal !== undefined) {
      RequestProcessProposal.encode(message.process_proposal, writer.uint32(138).fork()).ldelim();
    }
    if (message.extend_vote !== undefined) {
      RequestExtendVote.encode(message.extend_vote, writer.uint32(146).fork()).ldelim();
    }
    if (message.verify_vote_extension !== undefined) {
      RequestVerifyVoteExtension.encode(message.verify_vote_extension, writer.uint32(154).fork()).ldelim();
    }
    if (message.finalize_block !== undefined) {
      RequestFinalizeBlock.encode(message.finalize_block, writer.uint32(162).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.echo = RequestEcho.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.flush = RequestFlush.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = RequestInfo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.init_chain = RequestInitChain.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.query = RequestQuery.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.check_tx = RequestCheckTx.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.commit = RequestCommit.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.list_snapshots = RequestListSnapshots.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.offer_snapshot = RequestOfferSnapshot.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.load_snapshot_chunk = RequestLoadSnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.apply_snapshot_chunk = RequestApplySnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.prepare_proposal = RequestPrepareProposal.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.process_proposal = RequestProcessProposal.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.extend_vote = RequestExtendVote.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.verify_vote_extension = RequestVerifyVoteExtension.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.finalize_block = RequestFinalizeBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      echo: isSet(object.echo) ? RequestEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush) ? RequestFlush.fromJSON(object.flush) : undefined,
      info: isSet(object.info) ? RequestInfo.fromJSON(object.info) : undefined,
      init_chain: isSet(object.init_chain) ? RequestInitChain.fromJSON(object.init_chain) : undefined,
      query: isSet(object.query) ? RequestQuery.fromJSON(object.query) : undefined,
      check_tx: isSet(object.check_tx) ? RequestCheckTx.fromJSON(object.check_tx) : undefined,
      commit: isSet(object.commit) ? RequestCommit.fromJSON(object.commit) : undefined,
      list_snapshots: isSet(object.list_snapshots) ? RequestListSnapshots.fromJSON(object.list_snapshots) : undefined,
      offer_snapshot: isSet(object.offer_snapshot) ? RequestOfferSnapshot.fromJSON(object.offer_snapshot) : undefined,
      load_snapshot_chunk: isSet(object.load_snapshot_chunk)
        ? RequestLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined,
      apply_snapshot_chunk: isSet(object.apply_snapshot_chunk)
        ? RequestApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined,
      prepare_proposal: isSet(object.prepare_proposal)
        ? RequestPrepareProposal.fromJSON(object.prepare_proposal)
        : undefined,
      process_proposal: isSet(object.process_proposal)
        ? RequestProcessProposal.fromJSON(object.process_proposal)
        : undefined,
      extend_vote: isSet(object.extend_vote) ? RequestExtendVote.fromJSON(object.extend_vote) : undefined,
      verify_vote_extension: isSet(object.verify_vote_extension)
        ? RequestVerifyVoteExtension.fromJSON(object.verify_vote_extension)
        : undefined,
      finalize_block: isSet(object.finalize_block) ? RequestFinalizeBlock.fromJSON(object.finalize_block) : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    if (message.echo !== undefined) {
      obj.echo = RequestEcho.toJSON(message.echo);
    }
    if (message.flush !== undefined) {
      obj.flush = RequestFlush.toJSON(message.flush);
    }
    if (message.info !== undefined) {
      obj.info = RequestInfo.toJSON(message.info);
    }
    if (message.init_chain !== undefined) {
      obj.init_chain = RequestInitChain.toJSON(message.init_chain);
    }
    if (message.query !== undefined) {
      obj.query = RequestQuery.toJSON(message.query);
    }
    if (message.check_tx !== undefined) {
      obj.check_tx = RequestCheckTx.toJSON(message.check_tx);
    }
    if (message.commit !== undefined) {
      obj.commit = RequestCommit.toJSON(message.commit);
    }
    if (message.list_snapshots !== undefined) {
      obj.list_snapshots = RequestListSnapshots.toJSON(message.list_snapshots);
    }
    if (message.offer_snapshot !== undefined) {
      obj.offer_snapshot = RequestOfferSnapshot.toJSON(message.offer_snapshot);
    }
    if (message.load_snapshot_chunk !== undefined) {
      obj.load_snapshot_chunk = RequestLoadSnapshotChunk.toJSON(message.load_snapshot_chunk);
    }
    if (message.apply_snapshot_chunk !== undefined) {
      obj.apply_snapshot_chunk = RequestApplySnapshotChunk.toJSON(message.apply_snapshot_chunk);
    }
    if (message.prepare_proposal !== undefined) {
      obj.prepare_proposal = RequestPrepareProposal.toJSON(message.prepare_proposal);
    }
    if (message.process_proposal !== undefined) {
      obj.process_proposal = RequestProcessProposal.toJSON(message.process_proposal);
    }
    if (message.extend_vote !== undefined) {
      obj.extend_vote = RequestExtendVote.toJSON(message.extend_vote);
    }
    if (message.verify_vote_extension !== undefined) {
      obj.verify_vote_extension = RequestVerifyVoteExtension.toJSON(message.verify_vote_extension);
    }
    if (message.finalize_block !== undefined) {
      obj.finalize_block = RequestFinalizeBlock.toJSON(message.finalize_block);
    }
    return obj;
  },

  create(base?: DeepPartial<Request>): Request {
    return Request.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Request>): Request {
    const message = createBaseRequest();
    message.echo = (object.echo !== undefined && object.echo !== null)
      ? RequestEcho.fromPartial(object.echo)
      : undefined;
    message.flush = (object.flush !== undefined && object.flush !== null)
      ? RequestFlush.fromPartial(object.flush)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? RequestInfo.fromPartial(object.info)
      : undefined;
    message.init_chain = (object.init_chain !== undefined && object.init_chain !== null)
      ? RequestInitChain.fromPartial(object.init_chain)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null)
      ? RequestQuery.fromPartial(object.query)
      : undefined;
    message.check_tx = (object.check_tx !== undefined && object.check_tx !== null)
      ? RequestCheckTx.fromPartial(object.check_tx)
      : undefined;
    message.commit = (object.commit !== undefined && object.commit !== null)
      ? RequestCommit.fromPartial(object.commit)
      : undefined;
    message.list_snapshots = (object.list_snapshots !== undefined && object.list_snapshots !== null)
      ? RequestListSnapshots.fromPartial(object.list_snapshots)
      : undefined;
    message.offer_snapshot = (object.offer_snapshot !== undefined && object.offer_snapshot !== null)
      ? RequestOfferSnapshot.fromPartial(object.offer_snapshot)
      : undefined;
    message.load_snapshot_chunk = (object.load_snapshot_chunk !== undefined && object.load_snapshot_chunk !== null)
      ? RequestLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
      : undefined;
    message.apply_snapshot_chunk = (object.apply_snapshot_chunk !== undefined && object.apply_snapshot_chunk !== null)
      ? RequestApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
      : undefined;
    message.prepare_proposal = (object.prepare_proposal !== undefined && object.prepare_proposal !== null)
      ? RequestPrepareProposal.fromPartial(object.prepare_proposal)
      : undefined;
    message.process_proposal = (object.process_proposal !== undefined && object.process_proposal !== null)
      ? RequestProcessProposal.fromPartial(object.process_proposal)
      : undefined;
    message.extend_vote = (object.extend_vote !== undefined && object.extend_vote !== null)
      ? RequestExtendVote.fromPartial(object.extend_vote)
      : undefined;
    message.verify_vote_extension =
      (object.verify_vote_extension !== undefined && object.verify_vote_extension !== null)
        ? RequestVerifyVoteExtension.fromPartial(object.verify_vote_extension)
        : undefined;
    message.finalize_block = (object.finalize_block !== undefined && object.finalize_block !== null)
      ? RequestFinalizeBlock.fromPartial(object.finalize_block)
      : undefined;
    return message;
  },
};

function createBaseRequestEcho(): RequestEcho {
  return { message: "" };
}

export const RequestEcho = {
  $type: "tendermint.abci.RequestEcho" as const,

  encode(message: RequestEcho, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestEcho {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: RequestEcho): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create(base?: DeepPartial<RequestEcho>): RequestEcho {
    return RequestEcho.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestEcho>): RequestEcho {
    const message = createBaseRequestEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseRequestFlush(): RequestFlush {
  return {};
}

export const RequestFlush = {
  $type: "tendermint.abci.RequestFlush" as const,

  encode(_: RequestFlush, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFlush();
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

  fromJSON(_: any): RequestFlush {
    return {};
  },

  toJSON(_: RequestFlush): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<RequestFlush>): RequestFlush {
    return RequestFlush.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<RequestFlush>): RequestFlush {
    const message = createBaseRequestFlush();
    return message;
  },
};

function createBaseRequestInfo(): RequestInfo {
  return { version: "", block_version: "0", p2p_version: "0", abci_version: "" };
}

export const RequestInfo = {
  $type: "tendermint.abci.RequestInfo" as const,

  encode(message: RequestInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.block_version !== "0") {
      writer.uint32(16).uint64(message.block_version);
    }
    if (message.p2p_version !== "0") {
      writer.uint32(24).uint64(message.p2p_version);
    }
    if (message.abci_version !== "") {
      writer.uint32(34).string(message.abci_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.block_version = longToString(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.p2p_version = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.abci_version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestInfo {
    return {
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      block_version: isSet(object.block_version) ? globalThis.String(object.block_version) : "0",
      p2p_version: isSet(object.p2p_version) ? globalThis.String(object.p2p_version) : "0",
      abci_version: isSet(object.abci_version) ? globalThis.String(object.abci_version) : "",
    };
  },

  toJSON(message: RequestInfo): unknown {
    const obj: any = {};
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.block_version !== "0") {
      obj.block_version = message.block_version;
    }
    if (message.p2p_version !== "0") {
      obj.p2p_version = message.p2p_version;
    }
    if (message.abci_version !== "") {
      obj.abci_version = message.abci_version;
    }
    return obj;
  },

  create(base?: DeepPartial<RequestInfo>): RequestInfo {
    return RequestInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestInfo>): RequestInfo {
    const message = createBaseRequestInfo();
    message.version = object.version ?? "";
    message.block_version = object.block_version ?? "0";
    message.p2p_version = object.p2p_version ?? "0";
    message.abci_version = object.abci_version ?? "";
    return message;
  },
};

function createBaseRequestInitChain(): RequestInitChain {
  return {
    time: undefined,
    chain_id: "",
    consensus_params: undefined,
    validators: [],
    app_state_bytes: new Uint8Array(0),
    initial_height: "0",
  };
}

export const RequestInitChain = {
  $type: "tendermint.abci.RequestInitChain" as const,

  encode(message: RequestInitChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(message.consensus_params, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.app_state_bytes.length !== 0) {
      writer.uint32(42).bytes(message.app_state_bytes);
    }
    if (message.initial_height !== "0") {
      writer.uint32(48).int64(message.initial_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chain_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.consensus_params = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validators.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.app_state_bytes = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.initial_height = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestInitChain {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      chain_id: isSet(object.chain_id) ? globalThis.String(object.chain_id) : "",
      consensus_params: isSet(object.consensus_params) ? ConsensusParams.fromJSON(object.consensus_params) : undefined,
      validators: globalThis.Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      app_state_bytes: isSet(object.app_state_bytes) ? bytesFromBase64(object.app_state_bytes) : new Uint8Array(0),
      initial_height: isSet(object.initial_height) ? globalThis.String(object.initial_height) : "0",
    };
  },

  toJSON(message: RequestInitChain): unknown {
    const obj: any = {};
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.chain_id !== "") {
      obj.chain_id = message.chain_id;
    }
    if (message.consensus_params !== undefined) {
      obj.consensus_params = ConsensusParams.toJSON(message.consensus_params);
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.app_state_bytes.length !== 0) {
      obj.app_state_bytes = base64FromBytes(message.app_state_bytes);
    }
    if (message.initial_height !== "0") {
      obj.initial_height = message.initial_height;
    }
    return obj;
  },

  create(base?: DeepPartial<RequestInitChain>): RequestInitChain {
    return RequestInitChain.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestInitChain>): RequestInitChain {
    const message = createBaseRequestInitChain();
    message.time = object.time ?? undefined;
    message.chain_id = object.chain_id ?? "";
    message.consensus_params = (object.consensus_params !== undefined && object.consensus_params !== null)
      ? ConsensusParams.fromPartial(object.consensus_params)
      : undefined;
    message.validators = object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_state_bytes = object.app_state_bytes ?? new Uint8Array(0);
    message.initial_height = object.initial_height ?? "0";
    return message;
  },
};

function createBaseRequestQuery(): RequestQuery {
  return { data: new Uint8Array(0), path: "", height: "0", prove: false };
}

export const RequestQuery = {
  $type: "tendermint.abci.RequestQuery" as const,

  encode(message: RequestQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.prove = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestQuery {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      path: isSet(object.path) ? globalThis.String(object.path) : "",
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      prove: isSet(object.prove) ? globalThis.Boolean(object.prove) : false,
    };
  },

  toJSON(message: RequestQuery): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.prove === true) {
      obj.prove = message.prove;
    }
    return obj;
  },

  create(base?: DeepPartial<RequestQuery>): RequestQuery {
    return RequestQuery.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestQuery>): RequestQuery {
    const message = createBaseRequestQuery();
    message.data = object.data ?? new Uint8Array(0);
    message.path = object.path ?? "";
    message.height = object.height ?? "0";
    message.prove = object.prove ?? false;
    return message;
  },
};

function createBaseRequestCheckTx(): RequestCheckTx {
  return { tx: new Uint8Array(0), type: 0 };
}

export const RequestCheckTx = {
  $type: "tendermint.abci.RequestCheckTx" as const,

  encode(message: RequestCheckTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestCheckTx {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
      type: isSet(object.type) ? checkTxTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: RequestCheckTx): unknown {
    const obj: any = {};
    if (message.tx.length !== 0) {
      obj.tx = base64FromBytes(message.tx);
    }
    if (message.type !== 0) {
      obj.type = checkTxTypeToJSON(message.type);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestCheckTx>): RequestCheckTx {
    return RequestCheckTx.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestCheckTx>): RequestCheckTx {
    const message = createBaseRequestCheckTx();
    message.tx = object.tx ?? new Uint8Array(0);
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseRequestCommit(): RequestCommit {
  return {};
}

export const RequestCommit = {
  $type: "tendermint.abci.RequestCommit" as const,

  encode(_: RequestCommit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCommit();
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

  fromJSON(_: any): RequestCommit {
    return {};
  },

  toJSON(_: RequestCommit): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<RequestCommit>): RequestCommit {
    return RequestCommit.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<RequestCommit>): RequestCommit {
    const message = createBaseRequestCommit();
    return message;
  },
};

function createBaseRequestListSnapshots(): RequestListSnapshots {
  return {};
}

export const RequestListSnapshots = {
  $type: "tendermint.abci.RequestListSnapshots" as const,

  encode(_: RequestListSnapshots, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestListSnapshots {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestListSnapshots();
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

  fromJSON(_: any): RequestListSnapshots {
    return {};
  },

  toJSON(_: RequestListSnapshots): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<RequestListSnapshots>): RequestListSnapshots {
    return RequestListSnapshots.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<RequestListSnapshots>): RequestListSnapshots {
    const message = createBaseRequestListSnapshots();
    return message;
  },
};

function createBaseRequestOfferSnapshot(): RequestOfferSnapshot {
  return { snapshot: undefined, app_hash: new Uint8Array(0) };
}

export const RequestOfferSnapshot = {
  $type: "tendermint.abci.RequestOfferSnapshot" as const,

  encode(message: RequestOfferSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(18).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshot = Snapshot.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.app_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestOfferSnapshot {
    return {
      snapshot: isSet(object.snapshot) ? Snapshot.fromJSON(object.snapshot) : undefined,
      app_hash: isSet(object.app_hash) ? bytesFromBase64(object.app_hash) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestOfferSnapshot): unknown {
    const obj: any = {};
    if (message.snapshot !== undefined) {
      obj.snapshot = Snapshot.toJSON(message.snapshot);
    }
    if (message.app_hash.length !== 0) {
      obj.app_hash = base64FromBytes(message.app_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestOfferSnapshot>): RequestOfferSnapshot {
    return RequestOfferSnapshot.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestOfferSnapshot>): RequestOfferSnapshot {
    const message = createBaseRequestOfferSnapshot();
    message.snapshot = (object.snapshot !== undefined && object.snapshot !== null)
      ? Snapshot.fromPartial(object.snapshot)
      : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestLoadSnapshotChunk(): RequestLoadSnapshotChunk {
  return { height: "0", format: 0, chunk: 0 };
}

export const RequestLoadSnapshotChunk = {
  $type: "tendermint.abci.RequestLoadSnapshotChunk" as const,

  encode(message: RequestLoadSnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunk !== 0) {
      writer.uint32(24).uint32(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.chunk = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestLoadSnapshotChunk {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      format: isSet(object.format) ? globalThis.Number(object.format) : 0,
      chunk: isSet(object.chunk) ? globalThis.Number(object.chunk) : 0,
    };
  },

  toJSON(message: RequestLoadSnapshotChunk): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    if (message.chunk !== 0) {
      obj.chunk = Math.round(message.chunk);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestLoadSnapshotChunk>): RequestLoadSnapshotChunk {
    return RequestLoadSnapshotChunk.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestLoadSnapshotChunk>): RequestLoadSnapshotChunk {
    const message = createBaseRequestLoadSnapshotChunk();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.chunk = object.chunk ?? 0;
    return message;
  },
};

function createBaseRequestApplySnapshotChunk(): RequestApplySnapshotChunk {
  return { index: 0, chunk: new Uint8Array(0), sender: "" };
}

export const RequestApplySnapshotChunk = {
  $type: "tendermint.abci.RequestApplySnapshotChunk" as const,

  encode(message: RequestApplySnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(18).bytes(message.chunk);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.chunk = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestApplySnapshotChunk {
    return {
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0),
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
    };
  },

  toJSON(message: RequestApplySnapshotChunk): unknown {
    const obj: any = {};
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create(base?: DeepPartial<RequestApplySnapshotChunk>): RequestApplySnapshotChunk {
    return RequestApplySnapshotChunk.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestApplySnapshotChunk>): RequestApplySnapshotChunk {
    const message = createBaseRequestApplySnapshotChunk();
    message.index = object.index ?? 0;
    message.chunk = object.chunk ?? new Uint8Array(0);
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseRequestPrepareProposal(): RequestPrepareProposal {
  return {
    max_tx_bytes: "0",
    txs: [],
    local_last_commit: undefined,
    misbehavior: [],
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(0),
    proposer_address: new Uint8Array(0),
  };
}

export const RequestPrepareProposal = {
  $type: "tendermint.abci.RequestPrepareProposal" as const,

  encode(message: RequestPrepareProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.max_tx_bytes !== "0") {
      writer.uint32(8).int64(message.max_tx_bytes);
    }
    for (const v of message.txs) {
      writer.uint32(18).bytes(v!);
    }
    if (message.local_last_commit !== undefined) {
      ExtendedCommitInfo.encode(message.local_last_commit, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestPrepareProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestPrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.max_tx_bytes = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.local_last_commit = ExtendedCommitInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.next_validators_hash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposer_address = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestPrepareProposal {
    return {
      max_tx_bytes: isSet(object.max_tx_bytes) ? globalThis.String(object.max_tx_bytes) : "0",
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      local_last_commit: isSet(object.local_last_commit)
        ? ExtendedCommitInfo.fromJSON(object.local_last_commit)
        : undefined,
      misbehavior: globalThis.Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(0),
      proposer_address: isSet(object.proposer_address) ? bytesFromBase64(object.proposer_address) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestPrepareProposal): unknown {
    const obj: any = {};
    if (message.max_tx_bytes !== "0") {
      obj.max_tx_bytes = message.max_tx_bytes;
    }
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.local_last_commit !== undefined) {
      obj.local_last_commit = ExtendedCommitInfo.toJSON(message.local_last_commit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.next_validators_hash.length !== 0) {
      obj.next_validators_hash = base64FromBytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      obj.proposer_address = base64FromBytes(message.proposer_address);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestPrepareProposal>): RequestPrepareProposal {
    return RequestPrepareProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestPrepareProposal>): RequestPrepareProposal {
    const message = createBaseRequestPrepareProposal();
    message.max_tx_bytes = object.max_tx_bytes ?? "0";
    message.txs = object.txs?.map((e) => e) || [];
    message.local_last_commit = (object.local_last_commit !== undefined && object.local_last_commit !== null)
      ? ExtendedCommitInfo.fromPartial(object.local_last_commit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.height = object.height ?? "0";
    message.time = object.time ?? undefined;
    message.next_validators_hash = object.next_validators_hash ?? new Uint8Array(0);
    message.proposer_address = object.proposer_address ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestProcessProposal(): RequestProcessProposal {
  return {
    txs: [],
    proposed_last_commit: undefined,
    misbehavior: [],
    hash: new Uint8Array(0),
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(0),
    proposer_address: new Uint8Array(0),
  };
}

export const RequestProcessProposal = {
  $type: "tendermint.abci.RequestProcessProposal" as const,

  encode(message: RequestProcessProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.proposed_last_commit !== undefined) {
      CommitInfo.encode(message.proposed_last_commit, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestProcessProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proposed_last_commit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.next_validators_hash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposer_address = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestProcessProposal {
    return {
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      proposed_last_commit: isSet(object.proposed_last_commit)
        ? CommitInfo.fromJSON(object.proposed_last_commit)
        : undefined,
      misbehavior: globalThis.Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(0),
      proposer_address: isSet(object.proposer_address) ? bytesFromBase64(object.proposer_address) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestProcessProposal): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.proposed_last_commit !== undefined) {
      obj.proposed_last_commit = CommitInfo.toJSON(message.proposed_last_commit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.next_validators_hash.length !== 0) {
      obj.next_validators_hash = base64FromBytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      obj.proposer_address = base64FromBytes(message.proposer_address);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestProcessProposal>): RequestProcessProposal {
    return RequestProcessProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestProcessProposal>): RequestProcessProposal {
    const message = createBaseRequestProcessProposal();
    message.txs = object.txs?.map((e) => e) || [];
    message.proposed_last_commit = (object.proposed_last_commit !== undefined && object.proposed_last_commit !== null)
      ? CommitInfo.fromPartial(object.proposed_last_commit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? "0";
    message.time = object.time ?? undefined;
    message.next_validators_hash = object.next_validators_hash ?? new Uint8Array(0);
    message.proposer_address = object.proposer_address ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestExtendVote(): RequestExtendVote {
  return {
    hash: new Uint8Array(0),
    height: "0",
    time: undefined,
    txs: [],
    proposed_last_commit: undefined,
    misbehavior: [],
    next_validators_hash: new Uint8Array(0),
    proposer_address: new Uint8Array(0),
  };
}

export const RequestExtendVote = {
  $type: "tendermint.abci.RequestExtendVote" as const,

  encode(message: RequestExtendVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(16).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.txs) {
      writer.uint32(34).bytes(v!);
    }
    if (message.proposed_last_commit !== undefined) {
      CommitInfo.encode(message.proposed_last_commit, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestExtendVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proposed_last_commit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.next_validators_hash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposer_address = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestExtendVote {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      proposed_last_commit: isSet(object.proposed_last_commit)
        ? CommitInfo.fromJSON(object.proposed_last_commit)
        : undefined,
      misbehavior: globalThis.Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(0),
      proposer_address: isSet(object.proposer_address) ? bytesFromBase64(object.proposer_address) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestExtendVote): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.proposed_last_commit !== undefined) {
      obj.proposed_last_commit = CommitInfo.toJSON(message.proposed_last_commit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.next_validators_hash.length !== 0) {
      obj.next_validators_hash = base64FromBytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      obj.proposer_address = base64FromBytes(message.proposer_address);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestExtendVote>): RequestExtendVote {
    return RequestExtendVote.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestExtendVote>): RequestExtendVote {
    const message = createBaseRequestExtendVote();
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? "0";
    message.time = object.time ?? undefined;
    message.txs = object.txs?.map((e) => e) || [];
    message.proposed_last_commit = (object.proposed_last_commit !== undefined && object.proposed_last_commit !== null)
      ? CommitInfo.fromPartial(object.proposed_last_commit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.next_validators_hash = object.next_validators_hash ?? new Uint8Array(0);
    message.proposer_address = object.proposer_address ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestVerifyVoteExtension(): RequestVerifyVoteExtension {
  return {
    hash: new Uint8Array(0),
    validator_address: new Uint8Array(0),
    height: "0",
    vote_extension: new Uint8Array(0),
  };
}

export const RequestVerifyVoteExtension = {
  $type: "tendermint.abci.RequestVerifyVoteExtension" as const,

  encode(message: RequestVerifyVoteExtension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.validator_address.length !== 0) {
      writer.uint32(18).bytes(message.validator_address);
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.vote_extension.length !== 0) {
      writer.uint32(34).bytes(message.vote_extension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validator_address = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.vote_extension = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestVerifyVoteExtension {
    return {
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      validator_address: isSet(object.validator_address)
        ? bytesFromBase64(object.validator_address)
        : new Uint8Array(0),
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      vote_extension: isSet(object.vote_extension) ? bytesFromBase64(object.vote_extension) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestVerifyVoteExtension): unknown {
    const obj: any = {};
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.validator_address.length !== 0) {
      obj.validator_address = base64FromBytes(message.validator_address);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.vote_extension.length !== 0) {
      obj.vote_extension = base64FromBytes(message.vote_extension);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestVerifyVoteExtension>): RequestVerifyVoteExtension {
    return RequestVerifyVoteExtension.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestVerifyVoteExtension>): RequestVerifyVoteExtension {
    const message = createBaseRequestVerifyVoteExtension();
    message.hash = object.hash ?? new Uint8Array(0);
    message.validator_address = object.validator_address ?? new Uint8Array(0);
    message.height = object.height ?? "0";
    message.vote_extension = object.vote_extension ?? new Uint8Array(0);
    return message;
  },
};

function createBaseRequestFinalizeBlock(): RequestFinalizeBlock {
  return {
    txs: [],
    decided_last_commit: undefined,
    misbehavior: [],
    hash: new Uint8Array(0),
    height: "0",
    time: undefined,
    next_validators_hash: new Uint8Array(0),
    proposer_address: new Uint8Array(0),
  };
}

export const RequestFinalizeBlock = {
  $type: "tendermint.abci.RequestFinalizeBlock" as const,

  encode(message: RequestFinalizeBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    if (message.decided_last_commit !== undefined) {
      CommitInfo.encode(message.decided_last_commit, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.misbehavior) {
      Misbehavior.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.height !== "0") {
      writer.uint32(40).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    if (message.next_validators_hash.length !== 0) {
      writer.uint32(58).bytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      writer.uint32(66).bytes(message.proposer_address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.decided_last_commit = CommitInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.misbehavior.push(Misbehavior.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.next_validators_hash = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposer_address = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestFinalizeBlock {
    return {
      txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [],
      decided_last_commit: isSet(object.decided_last_commit)
        ? CommitInfo.fromJSON(object.decided_last_commit)
        : undefined,
      misbehavior: globalThis.Array.isArray(object?.misbehavior)
        ? object.misbehavior.map((e: any) => Misbehavior.fromJSON(e))
        : [],
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      next_validators_hash: isSet(object.next_validators_hash)
        ? bytesFromBase64(object.next_validators_hash)
        : new Uint8Array(0),
      proposer_address: isSet(object.proposer_address) ? bytesFromBase64(object.proposer_address) : new Uint8Array(0),
    };
  },

  toJSON(message: RequestFinalizeBlock): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    if (message.decided_last_commit !== undefined) {
      obj.decided_last_commit = CommitInfo.toJSON(message.decided_last_commit);
    }
    if (message.misbehavior?.length) {
      obj.misbehavior = message.misbehavior.map((e) => Misbehavior.toJSON(e));
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.next_validators_hash.length !== 0) {
      obj.next_validators_hash = base64FromBytes(message.next_validators_hash);
    }
    if (message.proposer_address.length !== 0) {
      obj.proposer_address = base64FromBytes(message.proposer_address);
    }
    return obj;
  },

  create(base?: DeepPartial<RequestFinalizeBlock>): RequestFinalizeBlock {
    return RequestFinalizeBlock.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RequestFinalizeBlock>): RequestFinalizeBlock {
    const message = createBaseRequestFinalizeBlock();
    message.txs = object.txs?.map((e) => e) || [];
    message.decided_last_commit = (object.decided_last_commit !== undefined && object.decided_last_commit !== null)
      ? CommitInfo.fromPartial(object.decided_last_commit)
      : undefined;
    message.misbehavior = object.misbehavior?.map((e) => Misbehavior.fromPartial(e)) || [];
    message.hash = object.hash ?? new Uint8Array(0);
    message.height = object.height ?? "0";
    message.time = object.time ?? undefined;
    message.next_validators_hash = object.next_validators_hash ?? new Uint8Array(0);
    message.proposer_address = object.proposer_address ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponse(): Response {
  return {
    exception: undefined,
    echo: undefined,
    flush: undefined,
    info: undefined,
    init_chain: undefined,
    query: undefined,
    check_tx: undefined,
    commit: undefined,
    list_snapshots: undefined,
    offer_snapshot: undefined,
    load_snapshot_chunk: undefined,
    apply_snapshot_chunk: undefined,
    prepare_proposal: undefined,
    process_proposal: undefined,
    extend_vote: undefined,
    verify_vote_extension: undefined,
    finalize_block: undefined,
  };
}

export const Response = {
  $type: "tendermint.abci.Response" as const,

  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exception !== undefined) {
      ResponseException.encode(message.exception, writer.uint32(10).fork()).ldelim();
    }
    if (message.echo !== undefined) {
      ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
    }
    if (message.info !== undefined) {
      ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    if (message.init_chain !== undefined) {
      ResponseInitChain.encode(message.init_chain, writer.uint32(50).fork()).ldelim();
    }
    if (message.query !== undefined) {
      ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
    }
    if (message.check_tx !== undefined) {
      ResponseCheckTx.encode(message.check_tx, writer.uint32(74).fork()).ldelim();
    }
    if (message.commit !== undefined) {
      ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      ResponseListSnapshots.encode(message.list_snapshots, writer.uint32(106).fork()).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      ResponseOfferSnapshot.encode(message.offer_snapshot, writer.uint32(114).fork()).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      ResponseLoadSnapshotChunk.encode(message.load_snapshot_chunk, writer.uint32(122).fork()).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      ResponseApplySnapshotChunk.encode(message.apply_snapshot_chunk, writer.uint32(130).fork()).ldelim();
    }
    if (message.prepare_proposal !== undefined) {
      ResponsePrepareProposal.encode(message.prepare_proposal, writer.uint32(138).fork()).ldelim();
    }
    if (message.process_proposal !== undefined) {
      ResponseProcessProposal.encode(message.process_proposal, writer.uint32(146).fork()).ldelim();
    }
    if (message.extend_vote !== undefined) {
      ResponseExtendVote.encode(message.extend_vote, writer.uint32(154).fork()).ldelim();
    }
    if (message.verify_vote_extension !== undefined) {
      ResponseVerifyVoteExtension.encode(message.verify_vote_extension, writer.uint32(162).fork()).ldelim();
    }
    if (message.finalize_block !== undefined) {
      ResponseFinalizeBlock.encode(message.finalize_block, writer.uint32(170).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exception = ResponseException.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.echo = ResponseEcho.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.flush = ResponseFlush.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = ResponseInfo.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.init_chain = ResponseInitChain.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.query = ResponseQuery.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.check_tx = ResponseCheckTx.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.commit = ResponseCommit.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.list_snapshots = ResponseListSnapshots.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.offer_snapshot = ResponseOfferSnapshot.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.load_snapshot_chunk = ResponseLoadSnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.apply_snapshot_chunk = ResponseApplySnapshotChunk.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.prepare_proposal = ResponsePrepareProposal.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.process_proposal = ResponseProcessProposal.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.extend_vote = ResponseExtendVote.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.verify_vote_extension = ResponseVerifyVoteExtension.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.finalize_block = ResponseFinalizeBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      exception: isSet(object.exception) ? ResponseException.fromJSON(object.exception) : undefined,
      echo: isSet(object.echo) ? ResponseEcho.fromJSON(object.echo) : undefined,
      flush: isSet(object.flush) ? ResponseFlush.fromJSON(object.flush) : undefined,
      info: isSet(object.info) ? ResponseInfo.fromJSON(object.info) : undefined,
      init_chain: isSet(object.init_chain) ? ResponseInitChain.fromJSON(object.init_chain) : undefined,
      query: isSet(object.query) ? ResponseQuery.fromJSON(object.query) : undefined,
      check_tx: isSet(object.check_tx) ? ResponseCheckTx.fromJSON(object.check_tx) : undefined,
      commit: isSet(object.commit) ? ResponseCommit.fromJSON(object.commit) : undefined,
      list_snapshots: isSet(object.list_snapshots) ? ResponseListSnapshots.fromJSON(object.list_snapshots) : undefined,
      offer_snapshot: isSet(object.offer_snapshot) ? ResponseOfferSnapshot.fromJSON(object.offer_snapshot) : undefined,
      load_snapshot_chunk: isSet(object.load_snapshot_chunk)
        ? ResponseLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined,
      apply_snapshot_chunk: isSet(object.apply_snapshot_chunk)
        ? ResponseApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined,
      prepare_proposal: isSet(object.prepare_proposal)
        ? ResponsePrepareProposal.fromJSON(object.prepare_proposal)
        : undefined,
      process_proposal: isSet(object.process_proposal)
        ? ResponseProcessProposal.fromJSON(object.process_proposal)
        : undefined,
      extend_vote: isSet(object.extend_vote) ? ResponseExtendVote.fromJSON(object.extend_vote) : undefined,
      verify_vote_extension: isSet(object.verify_vote_extension)
        ? ResponseVerifyVoteExtension.fromJSON(object.verify_vote_extension)
        : undefined,
      finalize_block: isSet(object.finalize_block) ? ResponseFinalizeBlock.fromJSON(object.finalize_block) : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    if (message.exception !== undefined) {
      obj.exception = ResponseException.toJSON(message.exception);
    }
    if (message.echo !== undefined) {
      obj.echo = ResponseEcho.toJSON(message.echo);
    }
    if (message.flush !== undefined) {
      obj.flush = ResponseFlush.toJSON(message.flush);
    }
    if (message.info !== undefined) {
      obj.info = ResponseInfo.toJSON(message.info);
    }
    if (message.init_chain !== undefined) {
      obj.init_chain = ResponseInitChain.toJSON(message.init_chain);
    }
    if (message.query !== undefined) {
      obj.query = ResponseQuery.toJSON(message.query);
    }
    if (message.check_tx !== undefined) {
      obj.check_tx = ResponseCheckTx.toJSON(message.check_tx);
    }
    if (message.commit !== undefined) {
      obj.commit = ResponseCommit.toJSON(message.commit);
    }
    if (message.list_snapshots !== undefined) {
      obj.list_snapshots = ResponseListSnapshots.toJSON(message.list_snapshots);
    }
    if (message.offer_snapshot !== undefined) {
      obj.offer_snapshot = ResponseOfferSnapshot.toJSON(message.offer_snapshot);
    }
    if (message.load_snapshot_chunk !== undefined) {
      obj.load_snapshot_chunk = ResponseLoadSnapshotChunk.toJSON(message.load_snapshot_chunk);
    }
    if (message.apply_snapshot_chunk !== undefined) {
      obj.apply_snapshot_chunk = ResponseApplySnapshotChunk.toJSON(message.apply_snapshot_chunk);
    }
    if (message.prepare_proposal !== undefined) {
      obj.prepare_proposal = ResponsePrepareProposal.toJSON(message.prepare_proposal);
    }
    if (message.process_proposal !== undefined) {
      obj.process_proposal = ResponseProcessProposal.toJSON(message.process_proposal);
    }
    if (message.extend_vote !== undefined) {
      obj.extend_vote = ResponseExtendVote.toJSON(message.extend_vote);
    }
    if (message.verify_vote_extension !== undefined) {
      obj.verify_vote_extension = ResponseVerifyVoteExtension.toJSON(message.verify_vote_extension);
    }
    if (message.finalize_block !== undefined) {
      obj.finalize_block = ResponseFinalizeBlock.toJSON(message.finalize_block);
    }
    return obj;
  },

  create(base?: DeepPartial<Response>): Response {
    return Response.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Response>): Response {
    const message = createBaseResponse();
    message.exception = (object.exception !== undefined && object.exception !== null)
      ? ResponseException.fromPartial(object.exception)
      : undefined;
    message.echo = (object.echo !== undefined && object.echo !== null)
      ? ResponseEcho.fromPartial(object.echo)
      : undefined;
    message.flush = (object.flush !== undefined && object.flush !== null)
      ? ResponseFlush.fromPartial(object.flush)
      : undefined;
    message.info = (object.info !== undefined && object.info !== null)
      ? ResponseInfo.fromPartial(object.info)
      : undefined;
    message.init_chain = (object.init_chain !== undefined && object.init_chain !== null)
      ? ResponseInitChain.fromPartial(object.init_chain)
      : undefined;
    message.query = (object.query !== undefined && object.query !== null)
      ? ResponseQuery.fromPartial(object.query)
      : undefined;
    message.check_tx = (object.check_tx !== undefined && object.check_tx !== null)
      ? ResponseCheckTx.fromPartial(object.check_tx)
      : undefined;
    message.commit = (object.commit !== undefined && object.commit !== null)
      ? ResponseCommit.fromPartial(object.commit)
      : undefined;
    message.list_snapshots = (object.list_snapshots !== undefined && object.list_snapshots !== null)
      ? ResponseListSnapshots.fromPartial(object.list_snapshots)
      : undefined;
    message.offer_snapshot = (object.offer_snapshot !== undefined && object.offer_snapshot !== null)
      ? ResponseOfferSnapshot.fromPartial(object.offer_snapshot)
      : undefined;
    message.load_snapshot_chunk = (object.load_snapshot_chunk !== undefined && object.load_snapshot_chunk !== null)
      ? ResponseLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
      : undefined;
    message.apply_snapshot_chunk = (object.apply_snapshot_chunk !== undefined && object.apply_snapshot_chunk !== null)
      ? ResponseApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
      : undefined;
    message.prepare_proposal = (object.prepare_proposal !== undefined && object.prepare_proposal !== null)
      ? ResponsePrepareProposal.fromPartial(object.prepare_proposal)
      : undefined;
    message.process_proposal = (object.process_proposal !== undefined && object.process_proposal !== null)
      ? ResponseProcessProposal.fromPartial(object.process_proposal)
      : undefined;
    message.extend_vote = (object.extend_vote !== undefined && object.extend_vote !== null)
      ? ResponseExtendVote.fromPartial(object.extend_vote)
      : undefined;
    message.verify_vote_extension =
      (object.verify_vote_extension !== undefined && object.verify_vote_extension !== null)
        ? ResponseVerifyVoteExtension.fromPartial(object.verify_vote_extension)
        : undefined;
    message.finalize_block = (object.finalize_block !== undefined && object.finalize_block !== null)
      ? ResponseFinalizeBlock.fromPartial(object.finalize_block)
      : undefined;
    return message;
  },
};

function createBaseResponseException(): ResponseException {
  return { error: "" };
}

export const ResponseException = {
  $type: "tendermint.abci.ResponseException" as const,

  encode(message: ResponseException, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseException();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseException {
    return { error: isSet(object.error) ? globalThis.String(object.error) : "" };
  },

  toJSON(message: ResponseException): unknown {
    const obj: any = {};
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseException>): ResponseException {
    return ResponseException.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseException>): ResponseException {
    const message = createBaseResponseException();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseResponseEcho(): ResponseEcho {
  return { message: "" };
}

export const ResponseEcho = {
  $type: "tendermint.abci.ResponseEcho" as const,

  encode(message: ResponseEcho, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseEcho();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseEcho {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: ResponseEcho): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseEcho>): ResponseEcho {
    return ResponseEcho.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseEcho>): ResponseEcho {
    const message = createBaseResponseEcho();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponseFlush(): ResponseFlush {
  return {};
}

export const ResponseFlush = {
  $type: "tendermint.abci.ResponseFlush" as const,

  encode(_: ResponseFlush, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFlush();
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

  fromJSON(_: any): ResponseFlush {
    return {};
  },

  toJSON(_: ResponseFlush): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<ResponseFlush>): ResponseFlush {
    return ResponseFlush.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<ResponseFlush>): ResponseFlush {
    const message = createBaseResponseFlush();
    return message;
  },
};

function createBaseResponseInfo(): ResponseInfo {
  return { data: "", version: "", app_version: "0", last_block_height: "0", last_block_app_hash: new Uint8Array(0) };
}

export const ResponseInfo = {
  $type: "tendermint.abci.ResponseInfo" as const,

  encode(message: ResponseInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.app_version !== "0") {
      writer.uint32(24).uint64(message.app_version);
    }
    if (message.last_block_height !== "0") {
      writer.uint32(32).int64(message.last_block_height);
    }
    if (message.last_block_app_hash.length !== 0) {
      writer.uint32(42).bytes(message.last_block_app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.app_version = longToString(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.last_block_height = longToString(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.last_block_app_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseInfo {
    return {
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      version: isSet(object.version) ? globalThis.String(object.version) : "",
      app_version: isSet(object.app_version) ? globalThis.String(object.app_version) : "0",
      last_block_height: isSet(object.last_block_height) ? globalThis.String(object.last_block_height) : "0",
      last_block_app_hash: isSet(object.last_block_app_hash)
        ? bytesFromBase64(object.last_block_app_hash)
        : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseInfo): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.app_version !== "0") {
      obj.app_version = message.app_version;
    }
    if (message.last_block_height !== "0") {
      obj.last_block_height = message.last_block_height;
    }
    if (message.last_block_app_hash.length !== 0) {
      obj.last_block_app_hash = base64FromBytes(message.last_block_app_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseInfo>): ResponseInfo {
    return ResponseInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseInfo>): ResponseInfo {
    const message = createBaseResponseInfo();
    message.data = object.data ?? "";
    message.version = object.version ?? "";
    message.app_version = object.app_version ?? "0";
    message.last_block_height = object.last_block_height ?? "0";
    message.last_block_app_hash = object.last_block_app_hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseInitChain(): ResponseInitChain {
  return { consensus_params: undefined, validators: [], app_hash: new Uint8Array(0) };
}

export const ResponseInitChain = {
  $type: "tendermint.abci.ResponseInitChain" as const,

  encode(message: ResponseInitChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(message.consensus_params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(26).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseInitChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensus_params = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validators.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.app_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseInitChain {
    return {
      consensus_params: isSet(object.consensus_params) ? ConsensusParams.fromJSON(object.consensus_params) : undefined,
      validators: globalThis.Array.isArray(object?.validators)
        ? object.validators.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      app_hash: isSet(object.app_hash) ? bytesFromBase64(object.app_hash) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseInitChain): unknown {
    const obj: any = {};
    if (message.consensus_params !== undefined) {
      obj.consensus_params = ConsensusParams.toJSON(message.consensus_params);
    }
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.app_hash.length !== 0) {
      obj.app_hash = base64FromBytes(message.app_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseInitChain>): ResponseInitChain {
    return ResponseInitChain.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseInitChain>): ResponseInitChain {
    const message = createBaseResponseInitChain();
    message.consensus_params = (object.consensus_params !== undefined && object.consensus_params !== null)
      ? ConsensusParams.fromPartial(object.consensus_params)
      : undefined;
    message.validators = object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_hash = object.app_hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseQuery(): ResponseQuery {
  return {
    code: 0,
    log: "",
    info: "",
    index: "0",
    key: new Uint8Array(0),
    value: new Uint8Array(0),
    proof_ops: undefined,
    height: "0",
    codespace: "",
  };
}

export const ResponseQuery = {
  $type: "tendermint.abci.ResponseQuery" as const,

  encode(message: ResponseQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== "0") {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      ProofOps.encode(message.proof_ops, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.index = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proof_ops = ProofOps.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseQuery {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      log: isSet(object.log) ? globalThis.String(object.log) : "",
      info: isSet(object.info) ? globalThis.String(object.info) : "",
      index: isSet(object.index) ? globalThis.String(object.index) : "0",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      proof_ops: isSet(object.proof_ops) ? ProofOps.fromJSON(object.proof_ops) : undefined,
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      codespace: isSet(object.codespace) ? globalThis.String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseQuery): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.index !== "0") {
      obj.index = message.index;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      obj.proof_ops = ProofOps.toJSON(message.proof_ops);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseQuery>): ResponseQuery {
    return ResponseQuery.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseQuery>): ResponseQuery {
    const message = createBaseResponseQuery();
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? "0";
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.proof_ops = (object.proof_ops !== undefined && object.proof_ops !== null)
      ? ProofOps.fromPartial(object.proof_ops)
      : undefined;
    message.height = object.height ?? "0";
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCheckTx(): ResponseCheckTx {
  return {
    code: 0,
    data: new Uint8Array(0),
    log: "",
    info: "",
    gas_wanted: "0",
    gas_used: "0",
    events: [],
    codespace: "",
  };
}

export const ResponseCheckTx = {
  $type: "tendermint.abci.ResponseCheckTx" as const,

  encode(message: ResponseCheckTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== "0") {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== "0") {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCheckTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gas_wanted = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gas_used = longToString(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseCheckTx {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      log: isSet(object.log) ? globalThis.String(object.log) : "",
      info: isSet(object.info) ? globalThis.String(object.info) : "",
      gas_wanted: isSet(object.gas_wanted) ? globalThis.String(object.gas_wanted) : "0",
      gas_used: isSet(object.gas_used) ? globalThis.String(object.gas_used) : "0",
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      codespace: isSet(object.codespace) ? globalThis.String(object.codespace) : "",
    };
  },

  toJSON(message: ResponseCheckTx): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.gas_wanted !== "0") {
      obj.gas_wanted = message.gas_wanted;
    }
    if (message.gas_used !== "0") {
      obj.gas_used = message.gas_used;
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseCheckTx>): ResponseCheckTx {
    return ResponseCheckTx.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseCheckTx>): ResponseCheckTx {
    const message = createBaseResponseCheckTx();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? "0";
    message.gas_used = object.gas_used ?? "0";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseResponseCommit(): ResponseCommit {
  return { retain_height: "0" };
}

export const ResponseCommit = {
  $type: "tendermint.abci.ResponseCommit" as const,

  encode(message: ResponseCommit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.retain_height !== "0") {
      writer.uint32(24).int64(message.retain_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseCommit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          if (tag !== 24) {
            break;
          }

          message.retain_height = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseCommit {
    return { retain_height: isSet(object.retain_height) ? globalThis.String(object.retain_height) : "0" };
  },

  toJSON(message: ResponseCommit): unknown {
    const obj: any = {};
    if (message.retain_height !== "0") {
      obj.retain_height = message.retain_height;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseCommit>): ResponseCommit {
    return ResponseCommit.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseCommit>): ResponseCommit {
    const message = createBaseResponseCommit();
    message.retain_height = object.retain_height ?? "0";
    return message;
  },
};

function createBaseResponseListSnapshots(): ResponseListSnapshots {
  return { snapshots: [] };
}

export const ResponseListSnapshots = {
  $type: "tendermint.abci.ResponseListSnapshots" as const,

  encode(message: ResponseListSnapshots, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.snapshots) {
      Snapshot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseListSnapshots {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseListSnapshots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshots.push(Snapshot.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseListSnapshots {
    return {
      snapshots: globalThis.Array.isArray(object?.snapshots)
        ? object.snapshots.map((e: any) => Snapshot.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ResponseListSnapshots): unknown {
    const obj: any = {};
    if (message.snapshots?.length) {
      obj.snapshots = message.snapshots.map((e) => Snapshot.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseListSnapshots>): ResponseListSnapshots {
    return ResponseListSnapshots.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseListSnapshots>): ResponseListSnapshots {
    const message = createBaseResponseListSnapshots();
    message.snapshots = object.snapshots?.map((e) => Snapshot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResponseOfferSnapshot(): ResponseOfferSnapshot {
  return { result: 0 };
}

export const ResponseOfferSnapshot = {
  $type: "tendermint.abci.ResponseOfferSnapshot" as const,

  encode(message: ResponseOfferSnapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseOfferSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseOfferSnapshot {
    return { result: isSet(object.result) ? responseOfferSnapshot_ResultFromJSON(object.result) : 0 };
  },

  toJSON(message: ResponseOfferSnapshot): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseOfferSnapshot_ResultToJSON(message.result);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseOfferSnapshot>): ResponseOfferSnapshot {
    return ResponseOfferSnapshot.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseOfferSnapshot>): ResponseOfferSnapshot {
    const message = createBaseResponseOfferSnapshot();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseResponseLoadSnapshotChunk(): ResponseLoadSnapshotChunk {
  return { chunk: new Uint8Array(0) };
}

export const ResponseLoadSnapshotChunk = {
  $type: "tendermint.abci.ResponseLoadSnapshotChunk" as const,

  encode(message: ResponseLoadSnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseLoadSnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunk = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseLoadSnapshotChunk {
    return { chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0) };
  },

  toJSON(message: ResponseLoadSnapshotChunk): unknown {
    const obj: any = {};
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseLoadSnapshotChunk>): ResponseLoadSnapshotChunk {
    return ResponseLoadSnapshotChunk.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseLoadSnapshotChunk>): ResponseLoadSnapshotChunk {
    const message = createBaseResponseLoadSnapshotChunk();
    message.chunk = object.chunk ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseApplySnapshotChunk(): ResponseApplySnapshotChunk {
  return { result: 0, refetch_chunks: [], reject_senders: [] };
}

export const ResponseApplySnapshotChunk = {
  $type: "tendermint.abci.ResponseApplySnapshotChunk" as const,

  encode(message: ResponseApplySnapshotChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    writer.uint32(18).fork();
    for (const v of message.refetch_chunks) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.reject_senders) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseApplySnapshotChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
        case 2:
          if (tag === 16) {
            message.refetch_chunks.push(reader.uint32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.refetch_chunks.push(reader.uint32());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reject_senders.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseApplySnapshotChunk {
    return {
      result: isSet(object.result) ? responseApplySnapshotChunk_ResultFromJSON(object.result) : 0,
      refetch_chunks: globalThis.Array.isArray(object?.refetch_chunks)
        ? object.refetch_chunks.map((e: any) => globalThis.Number(e))
        : [],
      reject_senders: globalThis.Array.isArray(object?.reject_senders)
        ? object.reject_senders.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ResponseApplySnapshotChunk): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseApplySnapshotChunk_ResultToJSON(message.result);
    }
    if (message.refetch_chunks?.length) {
      obj.refetch_chunks = message.refetch_chunks.map((e) => Math.round(e));
    }
    if (message.reject_senders?.length) {
      obj.reject_senders = message.reject_senders;
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseApplySnapshotChunk>): ResponseApplySnapshotChunk {
    return ResponseApplySnapshotChunk.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseApplySnapshotChunk>): ResponseApplySnapshotChunk {
    const message = createBaseResponseApplySnapshotChunk();
    message.result = object.result ?? 0;
    message.refetch_chunks = object.refetch_chunks?.map((e) => e) || [];
    message.reject_senders = object.reject_senders?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponsePrepareProposal(): ResponsePrepareProposal {
  return { txs: [] };
}

export const ResponsePrepareProposal = {
  $type: "tendermint.abci.ResponsePrepareProposal" as const,

  encode(message: ResponsePrepareProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.txs) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponsePrepareProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponsePrepareProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.txs.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponsePrepareProposal {
    return { txs: globalThis.Array.isArray(object?.txs) ? object.txs.map((e: any) => bytesFromBase64(e)) : [] };
  },

  toJSON(message: ResponsePrepareProposal): unknown {
    const obj: any = {};
    if (message.txs?.length) {
      obj.txs = message.txs.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ResponsePrepareProposal>): ResponsePrepareProposal {
    return ResponsePrepareProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponsePrepareProposal>): ResponsePrepareProposal {
    const message = createBaseResponsePrepareProposal();
    message.txs = object.txs?.map((e) => e) || [];
    return message;
  },
};

function createBaseResponseProcessProposal(): ResponseProcessProposal {
  return { status: 0 };
}

export const ResponseProcessProposal = {
  $type: "tendermint.abci.ResponseProcessProposal" as const,

  encode(message: ResponseProcessProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseProcessProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseProcessProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseProcessProposal {
    return { status: isSet(object.status) ? responseProcessProposal_ProposalStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: ResponseProcessProposal): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = responseProcessProposal_ProposalStatusToJSON(message.status);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseProcessProposal>): ResponseProcessProposal {
    return ResponseProcessProposal.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseProcessProposal>): ResponseProcessProposal {
    const message = createBaseResponseProcessProposal();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseExtendVote(): ResponseExtendVote {
  return { vote_extension: new Uint8Array(0) };
}

export const ResponseExtendVote = {
  $type: "tendermint.abci.ResponseExtendVote" as const,

  encode(message: ResponseExtendVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote_extension.length !== 0) {
      writer.uint32(10).bytes(message.vote_extension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseExtendVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseExtendVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vote_extension = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseExtendVote {
    return {
      vote_extension: isSet(object.vote_extension) ? bytesFromBase64(object.vote_extension) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseExtendVote): unknown {
    const obj: any = {};
    if (message.vote_extension.length !== 0) {
      obj.vote_extension = base64FromBytes(message.vote_extension);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseExtendVote>): ResponseExtendVote {
    return ResponseExtendVote.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseExtendVote>): ResponseExtendVote {
    const message = createBaseResponseExtendVote();
    message.vote_extension = object.vote_extension ?? new Uint8Array(0);
    return message;
  },
};

function createBaseResponseVerifyVoteExtension(): ResponseVerifyVoteExtension {
  return { status: 0 };
}

export const ResponseVerifyVoteExtension = {
  $type: "tendermint.abci.ResponseVerifyVoteExtension" as const,

  encode(message: ResponseVerifyVoteExtension, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseVerifyVoteExtension {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseVerifyVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseVerifyVoteExtension {
    return { status: isSet(object.status) ? responseVerifyVoteExtension_VerifyStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: ResponseVerifyVoteExtension): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = responseVerifyVoteExtension_VerifyStatusToJSON(message.status);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseVerifyVoteExtension>): ResponseVerifyVoteExtension {
    return ResponseVerifyVoteExtension.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseVerifyVoteExtension>): ResponseVerifyVoteExtension {
    const message = createBaseResponseVerifyVoteExtension();
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseResponseFinalizeBlock(): ResponseFinalizeBlock {
  return {
    events: [],
    tx_results: [],
    validator_updates: [],
    consensus_param_updates: undefined,
    app_hash: new Uint8Array(0),
  };
}

export const ResponseFinalizeBlock = {
  $type: "tendermint.abci.ResponseFinalizeBlock" as const,

  encode(message: ResponseFinalizeBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tx_results) {
      ExecTxResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validator_updates) {
      ValidatorUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.consensus_param_updates !== undefined) {
      ConsensusParams.encode(message.consensus_param_updates, writer.uint32(34).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(42).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFinalizeBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseFinalizeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tx_results.push(ExecTxResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.validator_updates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.consensus_param_updates = ConsensusParams.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.app_hash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseFinalizeBlock {
    return {
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      tx_results: globalThis.Array.isArray(object?.tx_results)
        ? object.tx_results.map((e: any) => ExecTxResult.fromJSON(e))
        : [],
      validator_updates: globalThis.Array.isArray(object?.validator_updates)
        ? object.validator_updates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      consensus_param_updates: isSet(object.consensus_param_updates)
        ? ConsensusParams.fromJSON(object.consensus_param_updates)
        : undefined,
      app_hash: isSet(object.app_hash) ? bytesFromBase64(object.app_hash) : new Uint8Array(0),
    };
  },

  toJSON(message: ResponseFinalizeBlock): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.tx_results?.length) {
      obj.tx_results = message.tx_results.map((e) => ExecTxResult.toJSON(e));
    }
    if (message.validator_updates?.length) {
      obj.validator_updates = message.validator_updates.map((e) => ValidatorUpdate.toJSON(e));
    }
    if (message.consensus_param_updates !== undefined) {
      obj.consensus_param_updates = ConsensusParams.toJSON(message.consensus_param_updates);
    }
    if (message.app_hash.length !== 0) {
      obj.app_hash = base64FromBytes(message.app_hash);
    }
    return obj;
  },

  create(base?: DeepPartial<ResponseFinalizeBlock>): ResponseFinalizeBlock {
    return ResponseFinalizeBlock.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ResponseFinalizeBlock>): ResponseFinalizeBlock {
    const message = createBaseResponseFinalizeBlock();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.tx_results = object.tx_results?.map((e) => ExecTxResult.fromPartial(e)) || [];
    message.validator_updates = object.validator_updates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.consensus_param_updates =
      (object.consensus_param_updates !== undefined && object.consensus_param_updates !== null)
        ? ConsensusParams.fromPartial(object.consensus_param_updates)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCommitInfo(): CommitInfo {
  return { round: 0, votes: [] };
}

export const CommitInfo = {
  $type: "tendermint.abci.CommitInfo" as const,

  encode(message: CommitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      VoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommitInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.votes.push(VoteInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommitInfo {
    return {
      round: isSet(object.round) ? globalThis.Number(object.round) : 0,
      votes: globalThis.Array.isArray(object?.votes) ? object.votes.map((e: any) => VoteInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: CommitInfo): unknown {
    const obj: any = {};
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => VoteInfo.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<CommitInfo>): CommitInfo {
    return CommitInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommitInfo>): CommitInfo {
    const message = createBaseCommitInfo();
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => VoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseExtendedCommitInfo(): ExtendedCommitInfo {
  return { round: 0, votes: [] };
}

export const ExtendedCommitInfo = {
  $type: "tendermint.abci.ExtendedCommitInfo" as const,

  encode(message: ExtendedCommitInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      ExtendedVoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedCommitInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedCommitInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.votes.push(ExtendedVoteInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedCommitInfo {
    return {
      round: isSet(object.round) ? globalThis.Number(object.round) : 0,
      votes: globalThis.Array.isArray(object?.votes) ? object.votes.map((e: any) => ExtendedVoteInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: ExtendedCommitInfo): unknown {
    const obj: any = {};
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => ExtendedVoteInfo.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ExtendedCommitInfo>): ExtendedCommitInfo {
    return ExtendedCommitInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ExtendedCommitInfo>): ExtendedCommitInfo {
    const message = createBaseExtendedCommitInfo();
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => ExtendedVoteInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEvent(): Event {
  return { type: "", attributes: [] };
}

export const Event = {
  $type: "tendermint.abci.Event" as const,

  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      EventAttribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.attributes.push(EventAttribute.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      attributes: globalThis.Array.isArray(object?.attributes)
        ? object.attributes.map((e: any) => EventAttribute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.attributes?.length) {
      obj.attributes = message.attributes.map((e) => EventAttribute.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Event>): Event {
    return Event.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Event>): Event {
    const message = createBaseEvent();
    message.type = object.type ?? "";
    message.attributes = object.attributes?.map((e) => EventAttribute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventAttribute(): EventAttribute {
  return { key: "", value: "", index: false };
}

export const EventAttribute = {
  $type: "tendermint.abci.EventAttribute" as const,

  encode(message: EventAttribute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    if (message.index === true) {
      writer.uint32(24).bool(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAttribute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.index = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventAttribute {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
      index: isSet(object.index) ? globalThis.Boolean(object.index) : false,
    };
  },

  toJSON(message: EventAttribute): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    if (message.index === true) {
      obj.index = message.index;
    }
    return obj;
  },

  create(base?: DeepPartial<EventAttribute>): EventAttribute {
    return EventAttribute.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EventAttribute>): EventAttribute {
    const message = createBaseEventAttribute();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    message.index = object.index ?? false;
    return message;
  },
};

function createBaseExecTxResult(): ExecTxResult {
  return {
    code: 0,
    data: new Uint8Array(0),
    log: "",
    info: "",
    gas_wanted: "0",
    gas_used: "0",
    events: [],
    codespace: "",
  };
}

export const ExecTxResult = {
  $type: "tendermint.abci.ExecTxResult" as const,

  encode(message: ExecTxResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== "0") {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== "0") {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecTxResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.log = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.info = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.gas_wanted = longToString(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.gas_used = longToString(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.codespace = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecTxResult {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      log: isSet(object.log) ? globalThis.String(object.log) : "",
      info: isSet(object.info) ? globalThis.String(object.info) : "",
      gas_wanted: isSet(object.gas_wanted) ? globalThis.String(object.gas_wanted) : "0",
      gas_used: isSet(object.gas_used) ? globalThis.String(object.gas_used) : "0",
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      codespace: isSet(object.codespace) ? globalThis.String(object.codespace) : "",
    };
  },

  toJSON(message: ExecTxResult): unknown {
    const obj: any = {};
    if (message.code !== 0) {
      obj.code = Math.round(message.code);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.log !== "") {
      obj.log = message.log;
    }
    if (message.info !== "") {
      obj.info = message.info;
    }
    if (message.gas_wanted !== "0") {
      obj.gas_wanted = message.gas_wanted;
    }
    if (message.gas_used !== "0") {
      obj.gas_used = message.gas_used;
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.codespace !== "") {
      obj.codespace = message.codespace;
    }
    return obj;
  },

  create(base?: DeepPartial<ExecTxResult>): ExecTxResult {
    return ExecTxResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ExecTxResult>): ExecTxResult {
    const message = createBaseExecTxResult();
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? "0";
    message.gas_used = object.gas_used ?? "0";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

function createBaseTxResult(): TxResult {
  return { height: "0", index: 0, tx: new Uint8Array(0), result: undefined };
}

export const TxResult = {
  $type: "tendermint.abci.TxResult" as const,

  encode(message: TxResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).int64(message.height);
    }
    if (message.index !== 0) {
      writer.uint32(16).uint32(message.index);
    }
    if (message.tx.length !== 0) {
      writer.uint32(26).bytes(message.tx);
    }
    if (message.result !== undefined) {
      ExecTxResult.encode(message.result, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tx = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.result = ExecTxResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TxResult {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
      result: isSet(object.result) ? ExecTxResult.fromJSON(object.result) : undefined,
    };
  },

  toJSON(message: TxResult): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.tx.length !== 0) {
      obj.tx = base64FromBytes(message.tx);
    }
    if (message.result !== undefined) {
      obj.result = ExecTxResult.toJSON(message.result);
    }
    return obj;
  },

  create(base?: DeepPartial<TxResult>): TxResult {
    return TxResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TxResult>): TxResult {
    const message = createBaseTxResult();
    message.height = object.height ?? "0";
    message.index = object.index ?? 0;
    message.tx = object.tx ?? new Uint8Array(0);
    message.result = (object.result !== undefined && object.result !== null)
      ? ExecTxResult.fromPartial(object.result)
      : undefined;
    return message;
  },
};

function createBaseValidator(): Validator {
  return { address: new Uint8Array(0), power: "0" };
}

export const Validator = {
  $type: "tendermint.abci.Validator" as const,

  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== "0") {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.power = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(0),
      power: isSet(object.power) ? globalThis.String(object.power) : "0",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (message.address.length !== 0) {
      obj.address = base64FromBytes(message.address);
    }
    if (message.power !== "0") {
      obj.power = message.power;
    }
    return obj;
  },

  create(base?: DeepPartial<Validator>): Validator {
    return Validator.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Validator>): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? new Uint8Array(0);
    message.power = object.power ?? "0";
    return message;
  },
};

function createBaseValidatorUpdate(): ValidatorUpdate {
  return { pub_key: undefined, power: "0" };
}

export const ValidatorUpdate = {
  $type: "tendermint.abci.ValidatorUpdate" as const,

  encode(message: ValidatorUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pub_key !== undefined) {
      PublicKey.encode(message.pub_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.power !== "0") {
      writer.uint32(16).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pub_key = PublicKey.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.power = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorUpdate {
    return {
      pub_key: isSet(object.pub_key) ? PublicKey.fromJSON(object.pub_key) : undefined,
      power: isSet(object.power) ? globalThis.String(object.power) : "0",
    };
  },

  toJSON(message: ValidatorUpdate): unknown {
    const obj: any = {};
    if (message.pub_key !== undefined) {
      obj.pub_key = PublicKey.toJSON(message.pub_key);
    }
    if (message.power !== "0") {
      obj.power = message.power;
    }
    return obj;
  },

  create(base?: DeepPartial<ValidatorUpdate>): ValidatorUpdate {
    return ValidatorUpdate.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ValidatorUpdate>): ValidatorUpdate {
    const message = createBaseValidatorUpdate();
    message.pub_key = (object.pub_key !== undefined && object.pub_key !== null)
      ? PublicKey.fromPartial(object.pub_key)
      : undefined;
    message.power = object.power ?? "0";
    return message;
  },
};

function createBaseVoteInfo(): VoteInfo {
  return { validator: undefined, block_id_flag: 0 };
}

export const VoteInfo = {
  $type: "tendermint.abci.VoteInfo" as const,

  encode(message: VoteInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.block_id_flag !== 0) {
      writer.uint32(24).int32(message.block_id_flag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.block_id_flag = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VoteInfo {
    return {
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      block_id_flag: isSet(object.block_id_flag) ? blockIDFlagFromJSON(object.block_id_flag) : 0,
    };
  },

  toJSON(message: VoteInfo): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.block_id_flag !== 0) {
      obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag);
    }
    return obj;
  },

  create(base?: DeepPartial<VoteInfo>): VoteInfo {
    return VoteInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<VoteInfo>): VoteInfo {
    const message = createBaseVoteInfo();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.block_id_flag = object.block_id_flag ?? 0;
    return message;
  },
};

function createBaseExtendedVoteInfo(): ExtendedVoteInfo {
  return {
    validator: undefined,
    vote_extension: new Uint8Array(0),
    extension_signature: new Uint8Array(0),
    block_id_flag: 0,
  };
}

export const ExtendedVoteInfo = {
  $type: "tendermint.abci.ExtendedVoteInfo" as const,

  encode(message: ExtendedVoteInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.vote_extension.length !== 0) {
      writer.uint32(26).bytes(message.vote_extension);
    }
    if (message.extension_signature.length !== 0) {
      writer.uint32(34).bytes(message.extension_signature);
    }
    if (message.block_id_flag !== 0) {
      writer.uint32(40).int32(message.block_id_flag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtendedVoteInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendedVoteInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vote_extension = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.extension_signature = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.block_id_flag = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExtendedVoteInfo {
    return {
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      vote_extension: isSet(object.vote_extension) ? bytesFromBase64(object.vote_extension) : new Uint8Array(0),
      extension_signature: isSet(object.extension_signature)
        ? bytesFromBase64(object.extension_signature)
        : new Uint8Array(0),
      block_id_flag: isSet(object.block_id_flag) ? blockIDFlagFromJSON(object.block_id_flag) : 0,
    };
  },

  toJSON(message: ExtendedVoteInfo): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.vote_extension.length !== 0) {
      obj.vote_extension = base64FromBytes(message.vote_extension);
    }
    if (message.extension_signature.length !== 0) {
      obj.extension_signature = base64FromBytes(message.extension_signature);
    }
    if (message.block_id_flag !== 0) {
      obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag);
    }
    return obj;
  },

  create(base?: DeepPartial<ExtendedVoteInfo>): ExtendedVoteInfo {
    return ExtendedVoteInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ExtendedVoteInfo>): ExtendedVoteInfo {
    const message = createBaseExtendedVoteInfo();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.vote_extension = object.vote_extension ?? new Uint8Array(0);
    message.extension_signature = object.extension_signature ?? new Uint8Array(0);
    message.block_id_flag = object.block_id_flag ?? 0;
    return message;
  },
};

function createBaseMisbehavior(): Misbehavior {
  return { type: 0, validator: undefined, height: "0", time: undefined, total_voting_power: "0" };
}

export const Misbehavior = {
  $type: "tendermint.abci.Misbehavior" as const,

  encode(message: Misbehavior, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== "0") {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    if (message.total_voting_power !== "0") {
      writer.uint32(40).int64(message.total_voting_power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehavior {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehavior();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToString(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.total_voting_power = longToString(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Misbehavior {
    return {
      type: isSet(object.type) ? misbehaviorTypeFromJSON(object.type) : 0,
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      total_voting_power: isSet(object.total_voting_power) ? globalThis.String(object.total_voting_power) : "0",
    };
  },

  toJSON(message: Misbehavior): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = misbehaviorTypeToJSON(message.type);
    }
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    if (message.total_voting_power !== "0") {
      obj.total_voting_power = message.total_voting_power;
    }
    return obj;
  },

  create(base?: DeepPartial<Misbehavior>): Misbehavior {
    return Misbehavior.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Misbehavior>): Misbehavior {
    const message = createBaseMisbehavior();
    message.type = object.type ?? 0;
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.height = object.height ?? "0";
    message.time = object.time ?? undefined;
    message.total_voting_power = object.total_voting_power ?? "0";
    return message;
  },
};

function createBaseSnapshot(): Snapshot {
  return { height: "0", format: 0, chunks: 0, hash: new Uint8Array(0), metadata: new Uint8Array(0) };
}

export const Snapshot = {
  $type: "tendermint.abci.Snapshot" as const,

  encode(message: Snapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== "0") {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToString(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.chunks = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.metadata = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Snapshot {
    return {
      height: isSet(object.height) ? globalThis.String(object.height) : "0",
      format: isSet(object.format) ? globalThis.Number(object.format) : 0,
      chunks: isSet(object.chunks) ? globalThis.Number(object.chunks) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      metadata: isSet(object.metadata) ? bytesFromBase64(object.metadata) : new Uint8Array(0),
    };
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    if (message.height !== "0") {
      obj.height = message.height;
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    if (message.chunks !== 0) {
      obj.chunks = Math.round(message.chunks);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.metadata.length !== 0) {
      obj.metadata = base64FromBytes(message.metadata);
    }
    return obj;
  },

  create(base?: DeepPartial<Snapshot>): Snapshot {
    return Snapshot.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Snapshot>): Snapshot {
    const message = createBaseSnapshot();
    message.height = object.height ?? "0";
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    message.metadata = object.metadata ?? new Uint8Array(0);
    return message;
  },
};

export interface ABCI {
  Echo(request: DeepPartial<RequestEcho>, metadata?: grpc.Metadata): Promise<ResponseEcho>;
  Flush(request: DeepPartial<RequestFlush>, metadata?: grpc.Metadata): Promise<ResponseFlush>;
  Info(request: DeepPartial<RequestInfo>, metadata?: grpc.Metadata): Promise<ResponseInfo>;
  CheckTx(request: DeepPartial<RequestCheckTx>, metadata?: grpc.Metadata): Promise<ResponseCheckTx>;
  Query(request: DeepPartial<RequestQuery>, metadata?: grpc.Metadata): Promise<ResponseQuery>;
  Commit(request: DeepPartial<RequestCommit>, metadata?: grpc.Metadata): Promise<ResponseCommit>;
  InitChain(request: DeepPartial<RequestInitChain>, metadata?: grpc.Metadata): Promise<ResponseInitChain>;
  ListSnapshots(request: DeepPartial<RequestListSnapshots>, metadata?: grpc.Metadata): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: DeepPartial<RequestOfferSnapshot>, metadata?: grpc.Metadata): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(
    request: DeepPartial<RequestLoadSnapshotChunk>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(
    request: DeepPartial<RequestApplySnapshotChunk>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseApplySnapshotChunk>;
  PrepareProposal(
    request: DeepPartial<RequestPrepareProposal>,
    metadata?: grpc.Metadata,
  ): Promise<ResponsePrepareProposal>;
  ProcessProposal(
    request: DeepPartial<RequestProcessProposal>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseProcessProposal>;
  ExtendVote(request: DeepPartial<RequestExtendVote>, metadata?: grpc.Metadata): Promise<ResponseExtendVote>;
  VerifyVoteExtension(
    request: DeepPartial<RequestVerifyVoteExtension>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseVerifyVoteExtension>;
  FinalizeBlock(request: DeepPartial<RequestFinalizeBlock>, metadata?: grpc.Metadata): Promise<ResponseFinalizeBlock>;
}

export class ABCIClientImpl implements ABCI {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Echo = this.Echo.bind(this);
    this.Flush = this.Flush.bind(this);
    this.Info = this.Info.bind(this);
    this.CheckTx = this.CheckTx.bind(this);
    this.Query = this.Query.bind(this);
    this.Commit = this.Commit.bind(this);
    this.InitChain = this.InitChain.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.OfferSnapshot = this.OfferSnapshot.bind(this);
    this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
    this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
    this.PrepareProposal = this.PrepareProposal.bind(this);
    this.ProcessProposal = this.ProcessProposal.bind(this);
    this.ExtendVote = this.ExtendVote.bind(this);
    this.VerifyVoteExtension = this.VerifyVoteExtension.bind(this);
    this.FinalizeBlock = this.FinalizeBlock.bind(this);
  }

  Echo(request: DeepPartial<RequestEcho>, metadata?: grpc.Metadata): Promise<ResponseEcho> {
    return this.rpc.unary(ABCIEchoDesc, RequestEcho.fromPartial(request), metadata);
  }

  Flush(request: DeepPartial<RequestFlush>, metadata?: grpc.Metadata): Promise<ResponseFlush> {
    return this.rpc.unary(ABCIFlushDesc, RequestFlush.fromPartial(request), metadata);
  }

  Info(request: DeepPartial<RequestInfo>, metadata?: grpc.Metadata): Promise<ResponseInfo> {
    return this.rpc.unary(ABCIInfoDesc, RequestInfo.fromPartial(request), metadata);
  }

  CheckTx(request: DeepPartial<RequestCheckTx>, metadata?: grpc.Metadata): Promise<ResponseCheckTx> {
    return this.rpc.unary(ABCICheckTxDesc, RequestCheckTx.fromPartial(request), metadata);
  }

  Query(request: DeepPartial<RequestQuery>, metadata?: grpc.Metadata): Promise<ResponseQuery> {
    return this.rpc.unary(ABCIQueryDesc, RequestQuery.fromPartial(request), metadata);
  }

  Commit(request: DeepPartial<RequestCommit>, metadata?: grpc.Metadata): Promise<ResponseCommit> {
    return this.rpc.unary(ABCICommitDesc, RequestCommit.fromPartial(request), metadata);
  }

  InitChain(request: DeepPartial<RequestInitChain>, metadata?: grpc.Metadata): Promise<ResponseInitChain> {
    return this.rpc.unary(ABCIInitChainDesc, RequestInitChain.fromPartial(request), metadata);
  }

  ListSnapshots(request: DeepPartial<RequestListSnapshots>, metadata?: grpc.Metadata): Promise<ResponseListSnapshots> {
    return this.rpc.unary(ABCIListSnapshotsDesc, RequestListSnapshots.fromPartial(request), metadata);
  }

  OfferSnapshot(request: DeepPartial<RequestOfferSnapshot>, metadata?: grpc.Metadata): Promise<ResponseOfferSnapshot> {
    return this.rpc.unary(ABCIOfferSnapshotDesc, RequestOfferSnapshot.fromPartial(request), metadata);
  }

  LoadSnapshotChunk(
    request: DeepPartial<RequestLoadSnapshotChunk>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseLoadSnapshotChunk> {
    return this.rpc.unary(ABCILoadSnapshotChunkDesc, RequestLoadSnapshotChunk.fromPartial(request), metadata);
  }

  ApplySnapshotChunk(
    request: DeepPartial<RequestApplySnapshotChunk>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseApplySnapshotChunk> {
    return this.rpc.unary(ABCIApplySnapshotChunkDesc, RequestApplySnapshotChunk.fromPartial(request), metadata);
  }

  PrepareProposal(
    request: DeepPartial<RequestPrepareProposal>,
    metadata?: grpc.Metadata,
  ): Promise<ResponsePrepareProposal> {
    return this.rpc.unary(ABCIPrepareProposalDesc, RequestPrepareProposal.fromPartial(request), metadata);
  }

  ProcessProposal(
    request: DeepPartial<RequestProcessProposal>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseProcessProposal> {
    return this.rpc.unary(ABCIProcessProposalDesc, RequestProcessProposal.fromPartial(request), metadata);
  }

  ExtendVote(request: DeepPartial<RequestExtendVote>, metadata?: grpc.Metadata): Promise<ResponseExtendVote> {
    return this.rpc.unary(ABCIExtendVoteDesc, RequestExtendVote.fromPartial(request), metadata);
  }

  VerifyVoteExtension(
    request: DeepPartial<RequestVerifyVoteExtension>,
    metadata?: grpc.Metadata,
  ): Promise<ResponseVerifyVoteExtension> {
    return this.rpc.unary(ABCIVerifyVoteExtensionDesc, RequestVerifyVoteExtension.fromPartial(request), metadata);
  }

  FinalizeBlock(request: DeepPartial<RequestFinalizeBlock>, metadata?: grpc.Metadata): Promise<ResponseFinalizeBlock> {
    return this.rpc.unary(ABCIFinalizeBlockDesc, RequestFinalizeBlock.fromPartial(request), metadata);
  }
}

export const ABCIDesc = { serviceName: "tendermint.abci.ABCI" };

export const ABCIEchoDesc: UnaryMethodDefinitionish = {
  methodName: "Echo",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestEcho.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseEcho.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIFlushDesc: UnaryMethodDefinitionish = {
  methodName: "Flush",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestFlush.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseFlush.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIInfoDesc: UnaryMethodDefinitionish = {
  methodName: "Info",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestInfo.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseInfo.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCICheckTxDesc: UnaryMethodDefinitionish = {
  methodName: "CheckTx",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestCheckTx.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseCheckTx.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIQueryDesc: UnaryMethodDefinitionish = {
  methodName: "Query",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestQuery.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseQuery.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCICommitDesc: UnaryMethodDefinitionish = {
  methodName: "Commit",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestCommit.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseCommit.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIInitChainDesc: UnaryMethodDefinitionish = {
  methodName: "InitChain",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestInitChain.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseInitChain.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIListSnapshotsDesc: UnaryMethodDefinitionish = {
  methodName: "ListSnapshots",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestListSnapshots.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseListSnapshots.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIOfferSnapshotDesc: UnaryMethodDefinitionish = {
  methodName: "OfferSnapshot",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestOfferSnapshot.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseOfferSnapshot.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCILoadSnapshotChunkDesc: UnaryMethodDefinitionish = {
  methodName: "LoadSnapshotChunk",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestLoadSnapshotChunk.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseLoadSnapshotChunk.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIApplySnapshotChunkDesc: UnaryMethodDefinitionish = {
  methodName: "ApplySnapshotChunk",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestApplySnapshotChunk.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseApplySnapshotChunk.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIPrepareProposalDesc: UnaryMethodDefinitionish = {
  methodName: "PrepareProposal",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestPrepareProposal.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponsePrepareProposal.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIProcessProposalDesc: UnaryMethodDefinitionish = {
  methodName: "ProcessProposal",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestProcessProposal.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseProcessProposal.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIExtendVoteDesc: UnaryMethodDefinitionish = {
  methodName: "ExtendVote",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestExtendVote.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseExtendVote.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIVerifyVoteExtensionDesc: UnaryMethodDefinitionish = {
  methodName: "VerifyVoteExtension",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestVerifyVoteExtension.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseVerifyVoteExtension.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const ABCIFinalizeBlockDesc: UnaryMethodDefinitionish = {
  methodName: "FinalizeBlock",
  service: ABCIDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RequestFinalizeBlock.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ResponseFinalizeBlock.decode(data);
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000).toString();
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (globalThis.Number(t.seconds) || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
