import { Address as EthereumUtilsAddress } from 'ethereumjs-util'
import { bech32 } from 'bech32'
import { PublicKey } from '@solana/web3.js'
import { BECH32_ADDR_ACC_PREFIX, BECH32_ADDR_VAL_PREFIX } from '../utils/constants'
/**
 * Get flux address from Ethereum hex address
 *
 * @param ethAddress string
 * @returns string
 */
export const getFluxAddress = (ethAddress: string): string => {
  if (!ethAddress.startsWith('0x')) {
    return ethAddress
  }
  const addressBuffer = EthereumUtilsAddress.fromString(ethAddress.toString()).toBuffer()

  return bech32.encode(BECH32_ADDR_ACC_PREFIX, bech32.toWords(addressBuffer))
}

/**
 * Get flux svm address from buffer byte array
 *
 * @param cosmosAddressBuffer string
 * @returns string
 */
export const getSvmAddress = (cosmosAddressBuffer: Buffer | Uint8Array | string): PublicKey => {
  return new PublicKey(cosmosAddressBuffer)
}

/**
 * Get flux svm address from lux cosmos address
 *
 * @param luxBech32 string
 * @returns string
 */
export const getSvmAddressFromLux = (luxBech32: string): PublicKey => {
  if (!luxBech32.startsWith(BECH32_ADDR_ACC_PREFIX)) {
    throw `${luxBech32} is not a valid lux addresss`
  }

  return new PublicKey(getSvmAddress(Buffer.from(bech32.fromWords(bech32.decode(luxBech32).words))))
}

/**
 * Get ethereum address from flux bech32 address
 *
 * @param luxAddress string
 * @returns string
 */
export const getEthereumAddress = (luxAddress: string): string => {
  if (luxAddress.startsWith('0x')) {
    return luxAddress
  }
  if (!luxAddress.startsWith(BECH32_ADDR_ACC_PREFIX)) {
    return luxAddress
  }
  return `0x${Buffer.from(bech32.fromWords(bech32.decode(luxAddress).words)).toString('hex')}`
}

export const getFluxAddressFromHex = (hex: string): string => {
  if (hex.startsWith(BECH32_ADDR_ACC_PREFIX)) {
    return hex
  }
  return toBech32(hex, BECH32_ADDR_ACC_PREFIX)
}

export const validateEVMAddress = (address: string): boolean => {
  if (!address.startsWith('0x') || address.length !== 42) {
    return false
  }
  try {
    EthereumUtilsAddress.fromString(address.toString()).toBuffer()
    return true
  } catch {
    return false
  }
}
export const validateSVMAddress = (address: string): boolean => {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}
export const validateWASMAddress = (address: string): boolean => {
  try {
    bech32.fromWords(bech32.decode(address).words)
    return true
  } catch {
    return false
  }
}
export const getFluxValidatorAddress = (address: string): string => {
  return toBech32(address, BECH32_ADDR_VAL_PREFIX)
}

export const toBech32 = (address: string, prefix: string = BECH32_ADDR_ACC_PREFIX): string => {
  const addressHex = address.startsWith('0x') ? address : `0x${address}`
  const addressBuffer = EthereumUtilsAddress.fromString(addressHex).toBuffer()
  return bech32.encode(prefix, bech32.toWords(addressBuffer))
}

/**
 * @category Utility Classes
 */
export class Address {
  public bech32Address: string

  constructor(bech32Address: string) {
    this.bech32Address = bech32Address
  }

  compare(address: Address): boolean {
    return this.bech32Address === address.bech32Address
  }

  get address(): string {
    return this.bech32Address
  }

  /**
   * Create an address instance from a bech32-encoded address and a prefix
   * @param {string} bech32 bech32-encoded address
   * @param {string} prefix
   * @return {Address}
   * @throws {Error} if bech is not a valid bech32-encoded address
   */
  static fromBech32(bech: string, prefix: string = BECH32_ADDR_ACC_PREFIX): Address {
    try {
      const address = Buffer.from(bech32.fromWords(bech32.decode(bech).words)).toString('hex')
      const addressInHex = address.startsWith('0x') ? address : `0x${address}`
      const addressBuffer = EthereumUtilsAddress.fromString(addressInHex.toString()).toBuffer()
      const bech32Address = bech32.encode(prefix, bech32.toWords(addressBuffer))

      return new Address(bech32Address)
    } catch (e) {
      throw new Error(`${bech} is not a valid bech32-encoded address`)
    }
  }

  /**
   * Create an address instance from an ethereum address
   * @param {string} hex Ethereum address
   * @param {string} prefix
   * @return {Address}
   * @throws {Error} if bech is not a valid bech32-encoded address
   */
  static fromHex(hex: string, prefix: string = BECH32_ADDR_ACC_PREFIX): Address {
    const addressHex = hex.startsWith('0x') ? hex : `0x${hex}`
    const addressBuffer = EthereumUtilsAddress.fromString(addressHex.toString()).toBuffer()
    const bech32Address = bech32.encode(prefix, bech32.toWords(addressBuffer))

    return new Address(bech32Address)
  }

  /**
   * Convert an address instance to a bech32-encoded account address
   * @param {string} prefix
   * @returns {string}
   */
  toBech32(prefix: string = BECH32_ADDR_ACC_PREFIX): string {
    const address = this.toHex()
    const addressHex = address.startsWith('0x') ? address : `0x${address}`
    const addressBuffer = EthereumUtilsAddress.fromString(addressHex).toBuffer()

    return bech32.encode(prefix, bech32.toWords(addressBuffer))
  }

  /**
   * Return a bech32-encoded account address
   * @return {string}
   * @throws {Error} if this address is not a valid account address
   * */
  toAccountAddress(): string {
    return this.toBech32(BECH32_ADDR_ACC_PREFIX)
  }

  /**
   * Return a bech32-encoded validator address
   * @return {string}
   * @throws {Error} if this address is not a valid validator address
   * */
  toValidatorAddress(): string {
    return this.toBech32(BECH32_ADDR_VAL_PREFIX)
  }

  /**
   * Return a hex representation of address
   * @return {string}
   * @throws {Error} if this address is not a valid account address
   * */
  toHex(): string {
    const { bech32Address } = this
    const address = Buffer.from(bech32.fromWords(bech32.decode(bech32Address).words)).toString(
      'hex'
    )
    return address.startsWith('0x') ? address : `0x${address}`
  }

  /**
   * Return a ethereum address from the given bech32 encoded address
   * @return {string}
   * @throws {Error} if this address is not a valid account address
   * */
  getEthereumAddress(): string {
    return this.toHex()
  }
}
