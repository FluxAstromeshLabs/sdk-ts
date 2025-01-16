import { createAny, createAnyMessage } from './helpers'
import * as CosmosTxV1Beta1Tx from '../../chain/cosmos/tx/v1beta1/tx'
import * as CosmosBaseV1Beta1Coin from '../../chain/cosmos/base/v1beta1/coin'
import * as GoogleProtobufAny from '../../chain/google/protobuf/any'
import * as CosmosTxSigningV1Beta1Signing from '../../chain/cosmos/tx/signing/v1beta1/signing'
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { EthereumChainId, DEFAULT_STD_FEE } from '../utils'
import * as FluxTypesV1TxExt from '../../chain/flux/types/v1beta1/tx_ext'
import { DirectSignResponse } from '@cosmjs/proto-signing'
import * as txtypes from '../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../chain/cosmos/tx/v1beta1/service'
import * as anytypes from '../../chain/google/protobuf/any'
import * as signingtypes from '../../chain/cosmos/tx/signing/v1beta1/signing'
import keccak256 from 'keccak256'
import { ChainGrpcTxService } from '../client/chain/grpc/ChainGrpcTxService'
import * as ethsecp256k1 from '../../chain/cosmos/crypto/ethsecp256k1/keys'
const injectivePubKey = {
  ...ethsecp256k1,
  PubKey: {
    ...ethsecp256k1.PubKey,
    $type: 'injective.crypto.v1beta1.ethsecp256k1.PubKey'
  }
}
export const defaultSecp256k1Pubkey = (isInjective?: boolean) => {
  const eth256k1 = isInjective ? injectivePubKey : ethsecp256k1
  return eth256k1.PubKey.create({
    key: Buffer.concat([Buffer.from([2]), Buffer.alloc(32, 0)])
  })
}

export const getPublicKeyAny = (key: string, isInjective?: boolean): GoogleProtobufAny.Any => {
  const eth256k1 = isInjective ? injectivePubKey : ethsecp256k1
  return {
    type_url: '/' + eth256k1.PubKey.$type,
    value: eth256k1.PubKey.encode({ key: Buffer.from(key, 'hex') }).finish()
  }
}

export const getPublicKey = ({
  key,
  isInjective
}: {
  key: string | GoogleProtobufAny.Any
  isInjective?: boolean
}) => {
  if (typeof key !== 'string') {
    return key
  }
  const eth256k1 = isInjective ? injectivePubKey : ethsecp256k1
  let proto
  let path
  let baseProto
  proto = eth256k1.PubKey.create()
  baseProto = eth256k1.PubKey
  path = '/' + eth256k1.PubKey.$type

  proto.key = Buffer.from(key, 'base64')

  return createAny(baseProto.encode(proto).finish(), path)
}
export const createBody = ({
  message,
  memo = '',
  timeoutHeight,
  messageWrapper
}: {
  message: any
  memo?: string
  timeoutHeight?: number
  messageWrapper?: any
}) => {
  const messages = Array.isArray(message) ? message : [message]
  const messageWrappers = Array.isArray(messageWrapper)
    ? messageWrapper
    : messages.map(() => messageWrapper)
  const txBody = CosmosTxV1Beta1Tx.TxBody.create()
  txBody.messages = messages.map((msg, index) =>
    createAnyMessage({
      value: messageWrappers[index].encode(msg).finish(),
      type: messageWrappers[index].$type
    })
  )
  txBody.memo = memo

  if (timeoutHeight) {
    txBody.timeout_height = timeoutHeight.toString()
  }

  return txBody
}

export const createFee = ({
  fee,
  payer,
  granter,
  gasLimit
}: {
  fee: { amount: string; denom: string }
  payer?: string
  granter?: string
  gasLimit: number
}) => {
  const feeAmount = CosmosBaseV1Beta1Coin.Coin.create()
  feeAmount.amount = fee.amount
  feeAmount.denom = fee.denom
  const feeProto = CosmosTxV1Beta1Tx.Fee.create()
  feeProto.gas_limit = gasLimit.toString()
  feeProto.amount = [feeAmount]

  if (payer) {
    feeProto.payer = payer
  }

  if (granter) {
    feeProto.granter = granter
  }

  return feeProto
}

export const createSigners = ({
  chainId,
  mode,
  signers,
  isInjective
}: {
  chainId: string
  signers: { pubKey: string | GoogleProtobufAny.Any; sequence: string }[]
  mode: CosmosTxSigningV1Beta1Signing.SignMode
  isInjective?: boolean
}) => {
  return signers.map((s) =>
    createSignerInfo({
      mode,
      chainId,
      publicKey: s.pubKey,
      sequence: s.sequence,
      isInjective
    })
  )
}

export const createSignerInfo = ({
  chainId,
  publicKey,
  sequence,
  mode,
  isInjective
}: {
  chainId: string
  publicKey?: string | GoogleProtobufAny.Any
  sequence: string
  mode: CosmosTxSigningV1Beta1Signing.SignMode
  isInjective?: boolean
}) => {
  const pubKey = getPublicKey({ key: publicKey ?? 'invalid pubkey', isInjective })
  const single = CosmosTxV1Beta1Tx.ModeInfo_Single.create()
  single.mode = mode

  const modeInfo = CosmosTxV1Beta1Tx.ModeInfo.create()
  modeInfo.single = single

  const signerInfo = CosmosTxV1Beta1Tx.SignerInfo.create()
  signerInfo.public_key = pubKey
  signerInfo.sequence = sequence
  signerInfo.mode_info = modeInfo

  return signerInfo
}

export const createAuthInfo = ({
  signerInfo,
  fee
}: {
  signerInfo: CosmosTxV1Beta1Tx.SignerInfo[]
  fee: CosmosTxV1Beta1Tx.Fee
}) => {
  const authInfo = CosmosTxV1Beta1Tx.AuthInfo.create()
  authInfo.signer_infos = signerInfo
  authInfo.fee = fee

  return authInfo
}

export const createSignDoc = ({
  bodyBytes,
  authInfoBytes,
  chainId,
  accountNumber
}: {
  bodyBytes: Uint8Array
  authInfoBytes: Uint8Array
  chainId: string
  accountNumber: string
}) => {
  const signDoc = CosmosTxV1Beta1Tx.SignDoc.create()

  signDoc.account_number = accountNumber
  signDoc.chain_id = chainId
  signDoc.body_bytes = bodyBytes
  signDoc.auth_info_bytes = authInfoBytes

  return signDoc
}

export const createSignDocFromTransaction = (args: {
  txRaw: CosmosTxV1Beta1Tx.TxRaw
  chainId: string
  accountNumber: number
}) => {
  return CosmosTxV1Beta1Tx.SignDoc.fromPartial({
    body_bytes: args.txRaw.body_bytes,
    auth_info_bytes: args.txRaw.auth_info_bytes,
    account_number: args.accountNumber.toString(),
    chain_id: args.chainId
  })
}

export const createCosmosSignDocFromSignDoc = (signDoc: CosmosTxV1Beta1Tx.SignDoc): SignDoc => {
  return SignDoc.fromPartial({
    bodyBytes: signDoc.body_bytes,
    authInfoBytes: signDoc.auth_info_bytes,
    accountNumber: signDoc.account_number,
    chainId: signDoc.chain_id
  })
}

export const getTransactionPartsFromTxRaw = (
  txRaw: CosmosTxV1Beta1Tx.TxRaw
): {
  authInfo: CosmosTxV1Beta1Tx.AuthInfo
  body: CosmosTxV1Beta1Tx.TxBody
  signatures: Uint8Array[]
} => {
  const authInfo = CosmosTxV1Beta1Tx.AuthInfo.decode(txRaw.auth_info_bytes)
  const body = CosmosTxV1Beta1Tx.TxBody.decode(txRaw.body_bytes)

  return {
    body,
    authInfo,
    signatures: txRaw.signatures
  }
}

export const createMessageJSON = (message: any, messageWrapper: any) => {
  const msgs = Array.isArray(message) ? message : [message]
  const messageWrappers = Array.isArray(messageWrapper)
    ? messageWrapper
    : msgs.map(() => messageWrapper)
  return msgs.map((msg, index) => ({
    type: `/${messageWrappers[index].$type}`,
    value: messageWrappers[index].toJSON(msg)
  }))
}
export const createWeb3Extension = ({
  ethereumChainId,
  feePayer,
  feePayerSig
}: {
  ethereumChainId: EthereumChainId
  feePayer?: string
  feePayerSig?: Uint8Array
}) => {
  const web3Extension = FluxTypesV1TxExt.ExtensionOptionsWeb3Tx.create()
  web3Extension.typedDataChainID = ethereumChainId.toString()

  if (feePayer) {
    web3Extension.feePayer = feePayer
  }

  if (feePayerSig) {
    web3Extension.feePayerSig = feePayerSig
  }

  const extOptsAny: GoogleProtobufAny.Any = {
    type_url: '/' + FluxTypesV1TxExt.ExtensionOptionsWeb3Tx.$type,
    value: FluxTypesV1TxExt.ExtensionOptionsWeb3Tx.encode(web3Extension).finish()
  }
  return extOptsAny
}

interface CreateTransactionArgs {
  message: any
  sequence: string
  chainId: string
  timeoutHeight?: number
  memo?: string
  signMode?: CosmosTxSigningV1Beta1Signing.SignMode
  pubKey: string | any
  accountNumber: string
  messageWrapper: any
  txClient: ChainGrpcTxService
  fee?: {
    amount: { amount: string; denom: string }[]
    gas: string
  }
  isInjective?: boolean
}
interface CreateTransactionResult {
  txRaw: CosmosTxV1Beta1Tx.TxRaw
  signDoc: CosmosTxV1Beta1Tx.SignDoc
  signers: any
  signer: Object
  signBytes: Uint8Array
  signHashedBytes: Uint8Array
  bodyBytes: Uint8Array
  authInfoBytes: Uint8Array
  authInfo: CosmosTxV1Beta1Tx.AuthInfo
  txBody: CosmosTxV1Beta1Tx.TxBody
}
export const createTransaction = (
  args: CreateTransactionArgs
): Promise<CreateTransactionResult> => {
  return createTransactionWithSigners({
    ...args,
    signers: {
      pubKey: args.pubKey,
      accountNumber: args.accountNumber,
      sequence: args.sequence
    }
  })
}

interface CreateTransactionWithSignersArgs {
  signers: any
  chainId: string
  message: any
  timeoutHeight?: number
  memo?: string
  signMode?: CosmosTxSigningV1Beta1Signing.SignMode
  messageWrapper: any
  txClient: ChainGrpcTxService
  fee?: {
    amount: { amount: string; denom: string }[]
    gas: string
  }
  isInjective?: boolean
}

export const createTransactionWithSigners = async ({
  signers,
  chainId,
  message,
  timeoutHeight,
  memo = '',
  signMode = CosmosTxSigningV1Beta1Signing.SignMode.SIGN_MODE_DIRECT,
  messageWrapper,
  txClient,
  fee = DEFAULT_STD_FEE,
  isInjective = false
}: CreateTransactionWithSignersArgs): Promise<CreateTransactionResult> => {
  const actualSigners = Array.isArray(signers) ? signers : [signers]
  const [signer] = actualSigners
  const body = createBody({ message, memo, timeoutHeight, messageWrapper })

  let simulateRes = await simulate(txClient, body, [signer.sequence], fee, isInjective)

  const gasMultiplier = 4
  let gasLimit = simulateRes
    ? Math.ceil(Number(simulateRes?.gas_info?.gas_used) * gasMultiplier)
    : fee.gas
  const feeMessage = createFee({
    fee: fee.amount[0],
    payer: '',
    granter: '',
    gasLimit: Number(gasLimit)
  })

  const signInfo = createSigners({
    chainId,
    mode: signMode,
    signers: actualSigners,
    isInjective
  })

  const authInfo = createAuthInfo({
    signerInfo: signInfo,
    fee: feeMessage
  })

  const bodyBytes = CosmosTxV1Beta1Tx.TxBody.encode(body).finish()
  const authInfoBytes = CosmosTxV1Beta1Tx.AuthInfo.encode(authInfo).finish()

  const signDoc = createSignDoc({
    chainId,
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    accountNumber: signer.accountNumber
  })

  const signDocBytes = CosmosTxV1Beta1Tx.SignDoc.encode(signDoc).finish()

  const toSignBytes = Buffer.from(signDocBytes)
  const toSignHash = keccak256(Buffer.from(signDocBytes))

  const txRaw = CosmosTxV1Beta1Tx.TxRaw.create()
  txRaw.auth_info_bytes = authInfoBytes
  txRaw.body_bytes = bodyBytes

  return {
    txRaw,
    signDoc,
    signers,
    signer,
    signBytes: toSignBytes,
    signHashedBytes: toSignHash,
    bodyBytes: bodyBytes,
    authInfoBytes: authInfoBytes,
    authInfo,
    txBody: body
  }
}

/**
 * Used when we get a DirectSignResponse from
 * Cosmos native wallets like Keplr, Leap, etc after
 * the TxRaw has been signed.
 *
 * The reason why we need to create a new TxRaw and
 * not use the one that we passed to signing is that the users
 * can change the gas fees and that will alter the original
 * TxRaw which will cause signature miss match if we broadcast
 * that transaction on chain
 * @returns TxRaw
 */
export const createTxRawFromSigResponse = (
  response: CosmosTxV1Beta1Tx.TxRaw | DirectSignResponse
) => {
  if ((response as DirectSignResponse).signed === undefined) {
    return response as CosmosTxV1Beta1Tx.TxRaw
  }

  const directSignResponse = response as DirectSignResponse

  const txRaw = CosmosTxV1Beta1Tx.TxRaw.create()
  txRaw.auth_info_bytes = directSignResponse.signed.authInfoBytes
  txRaw.body_bytes = directSignResponse.signed.bodyBytes
  txRaw.signatures = [Buffer.from(directSignResponse.signature.signature, 'base64')]

  return txRaw
}

/**
 * simulate the transaction
 * often used to get back estimated gas limit (as reference) to apply into real tx broadcasting
 * NOTE: simulate doesn't need signers' signature
 * @returns Promise<txservice.SimulateResponse>
 */
export const simulate = async (
  txClient: ChainGrpcTxService,
  txBody: txtypes.TxBody,
  signerAccSeqs: string[],
  fee?: {
    amount: { amount: string; denom: string }[]
    gas: string
  },
  isInjective?: boolean
): Promise<txservice.SimulateResponse> => {
  let signerInfos: txtypes.SignerInfo[] = []
  let simSignatures = []
  // simulate doesn't check pubkey, just need to add a placeholder for it

  for (let i = 0; i < signerAccSeqs.length; i++) {
    const eth256k1 = isInjective ? injectivePubKey : ethsecp256k1
    const defaultPubKey = defaultSecp256k1Pubkey(isInjective)
    signerInfos.push({
      public_key: anytypes.Any.create({
        type_url: '/' + eth256k1.PubKey.$type,
        value: eth256k1.PubKey.encode(defaultPubKey).finish()
      }),
      mode_info: {
        single: {
          mode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON
        }
      },
      sequence: signerAccSeqs[i]
    })
    simSignatures.push(Buffer.alloc(65))
  }

  const authInfo = txtypes.AuthInfo.create({
    signer_infos: signerInfos,
    fee: {
      amount: fee.amount,
      gas_limit: fee.gas,
      payer: '',
      granter: ''
    }
  })
  const txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: simSignatures
  }

  return await txClient.simulate(txtypes.TxRaw.encode(txRaw).finish())
}
