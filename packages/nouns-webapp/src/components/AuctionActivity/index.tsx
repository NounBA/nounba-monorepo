import { Auction } from '../../wrappers/nounsAuction';
import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { Row, Col } from 'react-bootstrap';
import classes from './AuctionActivity.module.css';
import bidHistoryClasses from './BidHistory.module.css';
import Bid from '../Bid';
import AuctionTimer from '../AuctionTimer';
import CurrentBid from '../CurrentBid';
import Winner from '../Winner';
import BidHistory from '../BidHistory';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
import AuctionActivityNounTitle from '../AuctionActivityNounTitle';
import BidHistoryBtn from '../BidHistoryBtn';
import config, { REGIONS } from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import NounInfoCard from '../NounInfoCard';
import { useAppSelector } from '../../hooks';
import BidHistoryModal from '../BidHistoryModal';
import Holder from '../Holder';
import AuctionTitleAndNavWrapper from '../AuctionTitleAndNavWrapper';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';

const openEtherscanBidHistory = () => {
  const url = buildEtherscanAddressLink(config.addresses.nounsAuctionHouseProxy);
  window.open(url);
};

interface AuctionActivityProps {
  auction: Auction;
  isFirstAuction?: boolean;
  isLastAuction?: boolean;
  onPrevAuctionClick?: () => void;
  onNextAuctionClick?: () => void;
  displayGraphDepComps: boolean;
  side: REGIONS;
  isPastAuction?: boolean;
}

const AuctionActivity: React.FC<AuctionActivityProps> = (props: AuctionActivityProps) => {
  const {
    auction,
    isLastAuction,
    displayGraphDepComps,
    side,
    isPastAuction,
    onPrevAuctionClick,
    onNextAuctionClick,
    isFirstAuction,
  } = props;

  const isCool = useAppSelector(state => state.application.isCoolBackground);

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);

  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const showBidModalHandler = () => {
    setShowBidHistoryModal(true);
  };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };

  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  useEffect(() => {
    if (!auction) return;

    const timeLeft = Number(auction.endTime) - Math.floor(Date.now() / 1000);

    if (auction && timeLeft <= 0) {
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer);
        },
        timeLeft > 300 ? 30000 : 1000,
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionTimer, auction]);

  if (!auction) return null;

  return (
    <>
      {showBidHistoryModal && (
        <BidHistoryModal
          onDismiss={dismissBidModalHanlder}
          auction={auction}
          isPastAuction={isPastAuction}
        />
      )}

      <AuctionActivityWrapper>
        <div className={classes.informationRow}>
          <Row className={classes.activityRow}>
            {onNextAuctionClick && onPrevAuctionClick && (
              <>
                <AuctionTitleAndNavWrapper>
                  <AuctionNavigation
                    isFirstAuction={isFirstAuction ?? false}
                    isLastAuction={isLastAuction ?? false}
                    onNextAuctionClick={onNextAuctionClick}
                    onPrevAuctionClick={onPrevAuctionClick}
                  />
                  <AuctionActivityDateHeadline startTime={auction.startTime} />
                </AuctionTitleAndNavWrapper>
              </>
            )}
            <Col lg={12}>
              <AuctionActivityNounTitle isCool={isCool} nounId={auction.nounId} />
            </Col>
          </Row>
          <Row className={classes.activityRow}>
            <Col lg={4} className={classes.currentBidCol}>
              <CurrentBid
                currentBid={new BigNumber(auction.amount.toString())}
                auctionEnded={auctionEnded}
              />
            </Col>
            <Col lg={6} className={classes.auctionTimerCol}>
              {auctionEnded && (
                <>
                  {!isPastAuction && isLastAuction && <Winner winner={auction.bidder} />}
                  {isPastAuction && <Holder holder={auction.bidder} />}
                </>
              )}
              {!auctionEnded && <AuctionTimer auction={auction} auctionEnded={auctionEnded} />}
            </Col>
          </Row>
        </div>
        {!isPastAuction && isLastAuction && (
          <>
            <Row className={classes.activityRow}>
              <Col lg={12}>
                <Bid auction={auction} auctionEnded={auctionEnded} side={side} />
              </Col>
            </Row>
          </>
        )}
        <Row className={classes.activityRow}>
          <Col lg={12}>
            {isPastAuction ? (
              <NounInfoCard
                nounId={auction.nounId.toNumber()}
                bidHistoryOnClickHandler={showBidModalHandler}
              />
            ) : (
              displayGraphDepComps && (
                <BidHistory
                  auctionId={auction.nounId.toString()}
                  auctionName={auction.auctionName}
                  max={3}
                  classes={bidHistoryClasses}
                />
              )
            )}
            {/* If no bids, show nothing. If bids avail:graph is stable? show bid history modal,
            else show etherscan contract link */}
            {!isPastAuction &&
              isLastAuction &&
              !auction.amount.eq(0) &&
              (displayGraphDepComps ? (
                <BidHistoryBtn onClick={showBidModalHandler} />
              ) : (
                <BidHistoryBtn onClick={openEtherscanBidHistory} />
              ))}
          </Col>
        </Row>
      </AuctionActivityWrapper>
    </>
  );
};

export default AuctionActivity;
