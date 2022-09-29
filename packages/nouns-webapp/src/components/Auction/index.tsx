import AuctionActivity from '../AuctionActivity';
import { Auction as IAuction } from '../../wrappers/nounsAuction';
import classes from './Auction.module.css';
import NounderNounContent from '../NounderNounContent';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isNounderNoun } from '../../utils/nounderNoun';
import {
  setNextOnDisplayAuctionNounId,
  setPrevOnDisplayAuctionNounId,
} from '../../state/slices/onDisplayAuction';
import { StandaloneNounWithSeed } from '../StandaloneNoun';
import { LoadingNoun } from '../Noun';
import { setStateBackgroundColor } from '../../state/slices/application';
import { grey, beige } from '../../utils/nounBgColors';
import { INounSeed } from '../../wrappers/nounToken';

import { auctionName as firstAuctionName } from '../../state/slices/auction/firstAuction';
import { auctionName as secondAuctionName } from '../../state/slices/auction/secondAuction';
import { REGIONS } from '../../config';

type auctionNames = typeof firstAuctionName | typeof secondAuctionName;

interface AuctionProps {
  auction?: IAuction;
  auctionName: auctionNames;
  side: REGIONS;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction, auctionName, side } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const lastNounId = useAppSelector(state => state[auctionName].lastAuctionNounId);
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  const loadedNounHandler = (seed: INounSeed) => {
    dispatch(setStateBackgroundColor(seed.background === 0 ? grey : beige));
  };

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionNounId());
    currentAuction && history.push(`/noun/${currentAuction.nounId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionNounId());
    currentAuction && history.push(`/noun/${currentAuction.nounId.toNumber() + 1}`);
  };

  const currentAuctionActivityContent = currentAuction && lastNounId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.nounId.eq(0)}
      isLastAuction={currentAuction.nounId.eq(lastNounId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
      side={side}
    />
  );
  const nounderNounContent = currentAuction && lastNounId && (
    <NounderNounContent
      mintTimestamp={currentAuction.startTime}
      nounId={currentAuction.nounId}
      isFirstAuction={currentAuction.nounId.eq(0)}
      isLastAuction={currentAuction.nounId.eq(lastNounId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
    />
  );

  const nounContent = currentAuction && (
    <div className={classes.nounWrapper}>
      <StandaloneNounWithSeed
        nounId={currentAuction.nounId}
        onLoadSeed={loadedNounHandler}
        shouldLinkToProfile={false}
      />
    </div>
  );

  const loadingNoun = (
    <div className={classes.nounWrapper}>
      <LoadingNoun />
    </div>
  );

  return (
    <div style={{ backgroundColor: stateBgColor }} className={classes.wrapper}>
      {currentAuction ? nounContent : loadingNoun}
      <div className={classes.conferenceTitleWrapper}>
        <div
          className={`${classes.conferenceTitle} ${
            side === REGIONS.east ? classes.eastSide : classes.westSide
          }`}
        >
          {side === REGIONS.east ? 'Eastern' : 'Western'} Conference
        </div>
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.auctionInfo}>
          {currentAuction &&
            (isNounderNoun(currentAuction.nounId)
              ? nounderNounContent
              : currentAuctionActivityContent)}
        </div>
      </div>
    </div>
  );
};

export default Auction;
