import { BigNumber } from 'ethers';
import classes from './AuctionActivityNounTitle.module.css';
import { allCities } from '../../utils/cities';
import { useNounSeed } from '../../wrappers/nounToken';

const AuctionActivityNounTitle: React.FC<{ nounId: BigNumber; isCool?: boolean }> = props => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);

  if (!seed?.oneOfOneIndex || !allCities[seed.oneOfOneIndex]) return <></>;
  return (
    <div className={classes.wrapper}>
      <h2>NounBA #{nounId.toString()}</h2>
      <h1 style={{ color: 'var(--brand-white)' }}>{allCities[seed.oneOfOneIndex].displayName}</h1>
    </div>
  );
};
export default AuctionActivityNounTitle;
