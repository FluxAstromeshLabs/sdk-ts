import type BigNumberInWei from './BigNumberInWei';
import BigNumber from './BigNumber';
import { bigNumberBaseToWei } from './utils';

export default class BigNumberInBase extends BigNumber {
  // Other methods and properties
  static make(number: BigNumber.Value): BigNumberInBase {
    return new BigNumberInBase(number);
  }

  override minus(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.minus(n, base));
  }

  override plus(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.plus(n, base));
  }

  override dividedBy(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.dividedBy(n, base));
  }

  override div(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.div(n, base));
  }

  override multipliedBy(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.multipliedBy(n, base));
  }

  override times(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.times(n, base));
  }

  override pow(n: BigNumber.Value, base?: number): BigNumberInBase {
    return new BigNumberInBase(super.pow(n, base));
  }

  toWei(decimals = 18): BigNumberInWei {
    return bigNumberBaseToWei(this, decimals);
  }
}
