import { BigNumber } from '@ethersproject/bignumber';

import classes from './NounBA.module.css';
import NounbaHistory from '../../components/NounbaHistory';
import Documentation from '../../components/Documentation';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { REGIONS } from '../../config';
import { useAuctionHistory } from '../../hooks/useAuctionHistory';

interface NounBAPageProps {
  initialAuctionId: string;
}

const NounBAPage: React.FC<NounBAPageProps> = props => {
  const { initialAuctionId } = props;
  const auctionId = BigNumber.from(initialAuctionId);
  const { auction } = useAuctionHistory(auctionId);

  console.log('crazy auction', auction, initialAuctionId);
  if (!auction) {
    return <></>;
  }
  return (
    <div className={classes.wrapper}>
      <NounbaHistory auction={auction} side={REGIONS.east} />
      {auction.nounId !== undefined && <ProfileActivityFeed nounId={auction.nounId.toNumber()} />}
      <Documentation />
    </div>
  );
};
export default NounBAPage;
