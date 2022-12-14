import { Auction } from '../../wrappers/nounsAuction';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
import { useAppSelector } from '../../hooks';
import BidHistoryModal from '../BidHistoryModal';
import Holder from '../Holder';
import AuctionTitleAndNavWrapper from '../AuctionTitleAndNavWrapper';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';
import NounInfoCard from '../NounInfoCard';

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
  isNounbaNoun?: boolean;
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
    isNounbaNoun,
  } = props;

  const title = side === REGIONS.west ? 'West' : 'East';
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

  if (!auction) return <AuctionActivityWrapper />;

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
                  <h1
                    className={clsx(
                      classes.sideTitle,
                      side === REGIONS.east ? classes.eastTitle : classes.westTitle,
                    )}
                  >
                    {title}
                  </h1>
                  <div className={classes.navSide}>
                    <AuctionActivityDateHeadline startTime={auction.startTime} />
                    <AuctionNavigation
                      isFirstAuction={isFirstAuction ?? false}
                      isLastAuction={isLastAuction ?? false}
                      onNextAuctionClick={onNextAuctionClick}
                      onPrevAuctionClick={onPrevAuctionClick}
                    />
                  </div>
                </AuctionTitleAndNavWrapper>
              </>
            )}
            <Col lg={12}>
              <AuctionActivityNounTitle isCool={isCool} nounId={auction.nounId} />
            </Col>
          </Row>
          <Row className={classes.activityCustomRow}>
            {!isNounbaNoun && (
              <Col xs={5}>
                <CurrentBid
                  currentBid={new BigNumber(auction.amount.toString())}
                  auctionEnded={auctionEnded}
                />
              </Col>
            )}
            <Col xs={isNounbaNoun ? 12 : 7}>
              <div className={classes.auctionTimerCol}>
                {auctionEnded && (
                  <>
                    {!isPastAuction && isLastAuction && <Winner winner={auction.bidder} />}
                    {isPastAuction && !isNounbaNoun && (
                      <Holder nounId={auction.nounId.toNumber()} />
                    )}
                    {isPastAuction && isNounbaNoun && <Winner winner={auction.bidder} isNounders />}
                  </>
                )}
                {!auctionEnded && <AuctionTimer auction={auction} auctionEnded={auctionEnded} />}
              </div>
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
            <div className={clsx(classes.bidHistorySection, isPastAuction && classes.noMargin)}>
              {(!isLastAuction || isPastAuction) && (
                <NounInfoCard
                  nounId={auction.nounId.toNumber()}
                  bidHistoryOnClickHandler={showBidModalHandler}
                  hideBids={isNounbaNoun}
                />
              )}
              {isLastAuction && displayGraphDepComps && (
                <BidHistory
                  auctionId={auction.nounId.toString()}
                  max={3}
                  classes={bidHistoryClasses}
                  auctionName={auction.auctionName}
                />
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
            </div>
          </Col>
        </Row>
      </AuctionActivityWrapper>
    </>
  );
};

export default AuctionActivity;
