export const DEFAULT_GAS_LIMIT = 1000000
export const DEFAULT_GAS_PRICE = 100000000000000
export const DEFAULT_BLOCK_TIMEOUT_HEIGHT = 30
export const DEFAULT_STD_FEE = {
  amount: [
    {
      amount: DEFAULT_GAS_PRICE.toFixed(),
      denom: 'lux'
    }
  ],
  gas: DEFAULT_GAS_LIMIT.toString()
}

export const BECH32_ADDR_ACC_PREFIX = 'lux'
export const BECH32_ADDR_VAL_PREFIX = 'luxvaloper'
