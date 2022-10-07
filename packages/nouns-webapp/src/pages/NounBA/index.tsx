import { BigNumber } from '@ethersproject/bignumber';

import classes from './NounBA.module.css';
import NounbaHistory from '../../components/NounbaHistory';
import Documentation from '../../components/Documentation';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { useAuctionHistory } from '../../hooks/useAuctionHistory';
import { getSide } from '../../utils/cities';

interface NounBAPageProps {
  initialAuctionId: string;
}

const NounBAPage: React.FC<NounBAPageProps> = props => {
  const { initialAuctionId } = props;
  const { auction, side } = useAuctionHistory(initialAuctionId);
  if (!auction) {
    return <></>;
  }
  return (
    <div className={classes.wrapper}>
      <NounbaHistory auction={auction} side={side} />
      {/* <ProfileActivityFeed nounId={auction.nounId.toNumber()} /> */}
      <Documentation />
    </div>
  );
};
export default NounBAPage;
