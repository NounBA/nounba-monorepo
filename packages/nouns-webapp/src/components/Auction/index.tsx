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

interface AuctionProps {
  auction?: IAuction;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  const lastNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);

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

  return (
    <div style={{ backgroundColor: 'black' }} className={classes.wrapper}>
      {currentAuction &&
        (isNounderNoun(currentAuction.nounId) ? nounderNounContent : currentAuctionActivityContent)}
    </div>
  );
};

export default Auction;
