import _m0 from "protobufjs/minimal";

export interface Any {
    type_url: string;
    value: Uint8Array;
}

export const Any = {
  $type: "google.protobuf.Any" as const,

  encode(message: Any, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type_url !== "") {
      writer.uint32(10).string(message.type_url);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  }
}
  
export interface Coin {
    denom: string;
    amount: string;
}

export const Coin = {
  $type: "cosmos.base.v1beta1.Coin" as const,

  encode(message: Coin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
}

export interface Fee {
  amount: Coin[];
  gas_limit: string;
  payer: string;
  granter: string;
}

export const Fee = {
  $type: "cosmos.tx.v1beta1.Fee" as const,

  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.gas_limit !== "0") {
      writer.uint32(16).uint64(message.gas_limit);
    }
    if (message.payer !== "") {
      writer.uint32(26).string(message.payer);
    }
    if (message.granter !== "") {
      writer.uint32(34).string(message.granter);
    }
    return writer;
  }
}

export enum SignMode {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected.
     */
    SIGN_MODE_UNSPECIFIED = 0,
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx.
     */
    SIGN_MODE_DIRECT = 1,
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT.
     *
     * Since: cosmos-sdk 0.50
     */
    SIGN_MODE_TEXTUAL = 2,
    /**
     * SIGN_MODE_DIRECT_AUX - SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
     * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
     * require signers signing over other signers' `signer_info`.
     *
     * Since: cosmos-sdk 0.46
     */
    SIGN_MODE_DIRECT_AUX = 3,
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future.
     */
    SIGN_MODE_LEGACY_AMINO_JSON = 127,
    /**
     * SIGN_MODE_EIP_191 - SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
     * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
     *
     * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
     * but is not implemented on the SDK by default. To enable EIP-191, you need
     * to pass a custom `TxConfig` that has an implementation of
     * `SignModeHandler` for EIP-191. The SDK may decide to fully support
     * EIP-191 in the future.
     *
     * Since: cosmos-sdk 0.45.2
     */
    SIGN_MODE_EIP_191 = 191,
    UNRECOGNIZED = -1,
}

/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
  /** single represents a single signer */
  single?:
    | ModeInfo_Single
    | undefined;
  /** multi represents a nested multisig signer */
  multi?: ModeInfo_Multi | undefined;
}

export interface ModeInfo_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}

/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray:
    | CompactBitArray
    | undefined;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos: ModeInfo[];
}

export const ModeInfo = {
  $type: "cosmos.tx.v1beta1.ModeInfo" as const,

  encode(message: ModeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.single !== undefined) {
      ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
}

export const ModeInfo_Single = {
  $type: "cosmos.tx.v1beta1.ModeInfo.Single" as const,

  encode(message: ModeInfo_Single, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  }
}

export const ModeInfo_Multi = {
  $type: "cosmos.tx.v1beta1.ModeInfo.Multi" as const,

  encode(message: ModeInfo_Multi, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.mode_infos) {
      ModeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
}

export interface CompactBitArray {
    extra_bits_stored: number;
    elems: Uint8Array;
}

export const CompactBitArray = {
  $type: "cosmos.crypto.multisig.v1beta1.CompactBitArray" as const,
  encode(message: CompactBitArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.extra_bits_stored !== 0) {
      writer.uint32(8).uint32(message.extra_bits_stored);
    }
    if (message.elems.length !== 0) {
      writer.uint32(18).bytes(message.elems);
    }
    return writer;
  }
}

export interface SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key:
    | Any
    | undefined;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  mode_info:
    | ModeInfo
    | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: string;
}

export const SignerInfo = {
  $type: "cosmos.tx.v1beta1.SignerInfo" as const,

  encode(message: SignerInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.mode_info !== undefined) {
      ModeInfo.encode(message.mode_info, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== "0") {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  }
}

export interface AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos: SignerInfo[];
  fee:
    | Fee
    | undefined;
}

export const AuthInfo = {
  $type: "cosmos.tx.v1beta1.AuthInfo" as const,

  encode(message: AuthInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signer_infos) {
      SignerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
}

export interface TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: Any[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeout_height: string;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options: Any[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options: Any[];
}

export const TxBody = {
  $type: "cosmos.tx.v1beta1.TxBody" as const,

  encode(message: TxBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.timeout_height !== "0") {
      writer.uint32(24).uint64(message.timeout_height);
    }
    for (const v of message.extension_options) {
      Any.encode(v!, writer.uint32(8186).fork()).ldelim();
    }
    for (const v of message.non_critical_extension_options) {
      Any.encode(v!, writer.uint32(16378).fork()).ldelim();
    }
    return writer;
  }
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  auth_info_bytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chain_id: string;
  /** account_number is the account number of the account in state */
  account_number: string;
}

export const SignDoc = {
  $type: "cosmos.tx.v1beta1.SignDoc" as const,

  encode(message: SignDoc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    if (message.chain_id !== "") {
      writer.uint32(26).string(message.chain_id);
    }
    if (message.account_number !== "0") {
      writer.uint32(32).uint64(message.account_number);
    }
    return writer;
  }
}

export interface TxRaw {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  auth_info_bytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

export const TxRaw = {
  $type: "cosmos.tx.v1beta1.TxRaw" as const,

  encode(message: TxRaw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  }
}

export interface MsgSend {
  from_address: string;
  to_address: string;
  amount: Coin[];
}

export const MsgSend = {
  $type: "cosmos.bank.v1beta1.MsgSend" as const,

  encode(message: MsgSend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from_address !== "") {
      writer.uint32(10).string(message.from_address);
    }
    if (message.to_address !== "") {
      writer.uint32(18).string(message.to_address);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  }
}

export enum BroadcastMode {
  /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
  BROADCAST_MODE_UNSPECIFIED = 0,
  /**
   * BROADCAST_MODE_BLOCK - DEPRECATED: use BROADCAST_MODE_SYNC instead,
   * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
   *
   * @deprecated
   */
  BROADCAST_MODE_BLOCK = 1,
  /**
   * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
   * for a CheckTx execution response only.
   */
  BROADCAST_MODE_SYNC = 2,
  /**
   * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
   * returns immediately.
   */
  BROADCAST_MODE_ASYNC = 3,
  UNRECOGNIZED = -1,
}

export interface BroadcastTxRequest {
  /** tx_bytes is the raw transaction. */
  tx_bytes: Uint8Array;
  mode: BroadcastMode;
}

export const BroadcastTxRequest = {
  $type: "cosmos.tx.v1beta1.BroadcastTxRequest" as const,

  encode(message: BroadcastTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx_bytes.length !== 0) {
      writer.uint32(10).bytes(message.tx_bytes);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  }
}

export interface PubKey {
  key: Uint8Array;
}

export const PubKey = {
  $type: "injective.crypto.v1beta1.ethsecp256k1.PubKey" as const,

  encode(message: PubKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    return writer;
  }
}
