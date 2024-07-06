import type BigNumberInBase from './BigNumberInBase';
import BigNumber from './BigNumber';
import { bigNumberWeiToBase } from './utils';

export default class BigNumberInWei extends BigNumber {
  static make(number: BigNumber.Value): BigNumberInWei {
    return new BigNumberInWei(number);
  }

  override minus(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.minus(n, base));
  }

  override plus(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.plus(n, base));
  }

  override dividedBy(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.dividedBy(n, base));
  }

  override div(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.div(n, base));
  }

  override multipliedBy(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.multipliedBy(n, base));
  }

  override times(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.times(n, base));
  }

  override pow(n: BigNumber.Value, base?: number): BigNumberInWei {
    return new BigNumberInWei(super.pow(n, base));
  }

  toBase(decimals = 18): BigNumberInBase {
    return bigNumberWeiToBase(this, decimals);
  }
}
