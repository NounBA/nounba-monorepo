import classes from './BidHistoryModal.module.css';
import ReactDOM from 'react-dom';
import React, { useContext } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Auction } from '../../wrappers/nounsAuction';
import { StandaloneNounRoundedCorners } from '../StandaloneNoun';
import { useAuctionBids } from '../../wrappers/onDisplayAuction';
import { Bid } from '../../utils/types';
import BidHistoryModalRow from '../BidHistoryModalRow';
import { Trans } from '@lingui/macro';
import { REGIONS } from '../../config';
import PastAuctionContext from '../../contexts/PastAuctionContext';
import { getSide } from '../../utils/cities';

export const Backdrop: React.FC<{ onDismiss: () => void }> = props => {
  return <div className={classes.backdrop} onClick={props.onDismiss} />;
};

const BidHistoryModalOverlay: React.FC<{
  auction: Auction;
  onDismiss: () => void;
  isPastAuction?: boolean;
}> = props => {
  const { onDismiss, auction, isPastAuction } = props;
  const { bids: contextBids } = useContext(PastAuctionContext);
  const auctionBids = useAuctionBids(auction.nounId, auction.auctionName);

  const bids = isPastAuction ? contextBids : auctionBids;

  const conferenceAuctionClass =
    getSide(auction.nounId.toNumber()) === REGIONS.west ? classes.westAuction : classes.eastAuction;

  return (
    <>
      <div className={`${classes.modal} ${conferenceAuctionClass}`}>
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.nounWrapper}>
              <StandaloneNounRoundedCorners
                nounId={auction && auction.nounId}
                className={classes.nounImage}
              />
            </div>

            <div className={classes.title}>
              <h2>
                <Trans>Bids for</Trans>
              </h2>
              <h1>NounBA {auction && auction.nounId.toString()}</h1>
            </div>

            <div className={classes.closeBtnWrapper}>
              <button onClick={onDismiss} className={classes.closeBtn}>
                <XIcon className={classes.icon} />
              </button>
            </div>
          </div>
          <div className={classes.bidWrapper}>
            {bids && bids.length > 0 ? (
              <ul>
                {bids?.map((bid: Bid, i: number) => {
                  return <BidHistoryModalRow index={i} bid={bid} />;
                })}
              </ul>
            ) : (
              <div className={classes.nullStateText}>
                <Trans>Bids will appear here</Trans>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const BidHistoryModal: React.FC<{
  auction: Auction;
  onDismiss: () => void;
  isPastAuction?: boolean;
}> = props => {
  const { onDismiss, auction, isPastAuction } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={onDismiss} />,
        document.getElementById('backdrop-root')!,
      )}
      {ReactDOM.createPortal(
        <BidHistoryModalOverlay
          onDismiss={onDismiss}
          auction={auction}
          isPastAuction={isPastAuction}
        />,
        document.getElementById('overlay-root')!,
      )}
    </>
  );
};

export default BidHistoryModal;
