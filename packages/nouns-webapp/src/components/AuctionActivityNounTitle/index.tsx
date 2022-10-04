import { BigNumber } from 'ethers';
import classes from './AuctionActivityNounTitle.module.css';
import { allCities } from '../../utils/cities';

const AuctionActivityNounTitle: React.FC<{ nounId: BigNumber; isCool?: boolean }> = props => {
  const { nounId } = props;
  return (
    <div className={classes.wrapper}>
      <h2>NounBA #{nounId.toString()}</h2>
      <h1 style={{ color: 'var(--brand-white)' }}>{allCities[nounId.toNumber()].displayName}</h1>
    </div>
  );
};
export default AuctionActivityNounTitle;
