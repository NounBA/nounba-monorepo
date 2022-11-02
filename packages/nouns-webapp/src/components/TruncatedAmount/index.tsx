import React from 'react';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import classes from './TruncatedAmount.module.css';

const TruncatedAmount: React.FC<{ amount: BigNumber }> = props => {
  const { amount } = props;

  const eth = new BigNumber(utils.formatEther(amount.toString())).toFixed(2);
  return (
    <>
      <span className={classes.etherSymbol}>Ξ</span> {`${eth}`}
    </>
  );
};
export default TruncatedAmount;
