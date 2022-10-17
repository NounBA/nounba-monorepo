import AuctionActivity from '../AuctionActivity';
import { Auction as IAuction } from '../../wrappers/nounsAuction';
import classes from './Auction.module.css';
import { useAppSelector } from '../../hooks';
import { StandaloneNounWithSeed } from '../StandaloneNoun';
import { LoadingNoun } from '../Noun';

import { REGIONS, AUCTION_NAMES } from '../../config';
import CityBoard from '../CityBoard';

interface AuctionProps {
  auction?: IAuction;
  auctionName: AUCTION_NAMES;
  side: REGIONS;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction, auctionName, side } = props;

  const lastNounId = useAppSelector(state => state[auctionName].lastAuctionNounId);

  const currentAuctionActivityContent = currentAuction && lastNounId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.nounId.eq(0)}
      isLastAuction={currentAuction.nounId.eq(lastNounId)}
      displayGraphDepComps={true}
      side={side}
    />
  );
  const nounContent = currentAuction && (
    <div className={classes.nounWrapper}>
      <StandaloneNounWithSeed nounId={currentAuction.nounId} shouldLinkToProfile={false} />
    </div>
  );

  const loadingNoun = (
    <div className={classes.nounWrapper}>
      <LoadingNoun />
    </div>
  );

  return (
    <>
      <div className={classes.wrapper}>
        {currentAuction ? nounContent : loadingNoun}
        <div className={classes.conferenceTitleWrapper}>
          <div
            className={`${classes.conferenceTitle} ${
              side === REGIONS.east ? classes.eastSide : classes.westSide
            }`}
          >
            {side === REGIONS.east ? 'East' : 'West'}
          </div>
        </div>
        <div className={classes.infoWrapper}>
          <div className={classes.auctionInfo}>
            {currentAuction && currentAuctionActivityContent}
          </div>
        </div>
      </div>
      <CityBoard side={side} auctionID={currentAuction?.nounId.toNumber() ?? 0} />
    </>
  );
};

export default Auction;
