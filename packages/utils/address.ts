import { Address } from 'ethereumjs-util'
import { bech32 } from 'bech32'
import { PublicKey } from '@solana/web3.js'
export const PREFIX = 'lux'
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
  const addressBuffer = Address.fromString(ethAddress.toString()).toBuffer()

  return bech32.encode('lux', bech32.toWords(addressBuffer))
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
  if (!luxBech32.startsWith('lux')) {
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
export const getEthereumAddress = (luxAddress: string, prefix: string = PREFIX): string => {
  if (luxAddress.startsWith('0x')) {
    return luxAddress
  }
  if (!luxAddress.startsWith(prefix)) {
    return luxAddress
  }
  return `0x${Buffer.from(bech32.fromWords(bech32.decode(luxAddress).words)).toString('hex')}`
}

export const getFluxAddressFromHex = (hex: string): string => {
  if (hex.startsWith('lux')) {
    return hex
  }
  return bech32.encode('lux', bech32.toWords(Buffer.from(hex, 'hex')))
}

export const validateEVMAddress = (address: string): boolean => {
  if (!address.startsWith('0x') || address.length !== 42) {
    return false
  }
  try {
    Address.fromString(address.toString()).toBuffer()
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

export const toBech32Address = (hex: string, prefix: string = PREFIX): string => {
  try {
    const addressHex = hex.startsWith('0x') ? hex : `0x${hex}`
    const addressBuffer = Address.fromString(addressHex.toString()).toBuffer()
    const bech32Address = bech32.encode(prefix, bech32.toWords(addressBuffer))
    return bech32Address
  } catch (e) {
    throw new Error(e as any)
  }
}

export const toHexAddress = (bech: string, prefix: string = PREFIX): string => {
  try {
    return `0x${Buffer.from(bech32.fromWords(bech32.decode(bech).words)).toString('hex')}`
  } catch (e) {
    throw new Error(e as any)
  }
}
