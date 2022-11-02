import { useContext } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import AuctionActivity from '../AuctionActivity';
import classes from './NounbaHistory.module.css';
// import NounderNounContent from '../NounderNounContent';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { isNounderNoun } from '../../utils/nounderNoun';
import {
  setNextOnDisplayAuctionNounId,
  setPrevOnDisplayAuctionNounId,
} from '../../state/slices/onDisplayAuction';
import { StandaloneNounWithSeed } from '../StandaloneNoun';
import { LoadingNoun } from '../Noun';

import PastAuctionContext from '../../contexts/PastAuctionContext';
import { STATUS } from '../../hooks/useAuctionHistory';
import { AUCTION_NAMES, REGIONS } from '../../config';

const NounbaHistory = () => {
  const { auction: currentAuction, side, status } = useContext(PastAuctionContext);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const lastDisplayAuctionId = useAppSelector(state =>
    Math.min(
      state[AUCTION_NAMES.FIRST_AUCTION].lastAuctionNounId ?? 0,
      state[AUCTION_NAMES.SECOND_AUCTION].lastAuctionNounId ?? 0,
    ),
  );

  // if (status === STATUS.ERROR) history.push('/');
  const auctionIdBigNumber = BigNumber.from(currentAuction?.nounId ?? 0);

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionNounId());
    currentAuction && history.push(`/nounba/${currentAuction.nounId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionNounId());
    currentAuction && history.push(`/nounba/${currentAuction.nounId.toNumber() + 1}`);
  };
  const isDevToken = status === STATUS.DEV_TOKEN;
  const isLoaded = status === STATUS.SUCCESS || isDevToken;

  const currentAuctionActivityContent = currentAuction && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={auctionIdBigNumber.eq(0)}
      // TODO: use lastNounId from Auctions
      isLastAuction={auctionIdBigNumber.eq(lastDisplayAuctionId - 1)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={false}
      side={side || REGIONS.west}
      isPastAuction
      isNounbaNoun={isDevToken}
    />
  );
  // const nounderNounContent = currentAuction && status === STATUS.DEV_TOKEN && (
  //   <NounderNounContent
  //     mintTimestamp={currentAuction.startTime}
  //     nounId={currentAuction.nounId}
  //     isFirstAuction={currentAuction.nounId.eq(0)}
  //     isLastAuction={auctionIdBigNumber.eq(lastDisplayAuctionId - 1)}
  //     onPrevAuctionClick={prevAuctionHandler}
  //     onNextAuctionClick={nextAuctionHandler}
  //   />
  // );

  const nounContent = currentAuction && (
    <div className={classes.nounWrapper}>
      <StandaloneNounWithSeed
        nounId={currentAuction.nounId}
        shouldLinkToProfile={false}
        wrapperClassName={classes.nounbaProfileWrapper}
        className={classes.nounbaProfile}
      />
    </div>
  );

  const loadingNoun = (
    <div className={classes.nounWrapper}>
      <LoadingNoun
        wrapperClassName={clsx(classes.nounbaProfileWrapper, classes.loadingSkeleton)}
        className={classes.nounbaProfile}
      />
    </div>
  );

  return (
    <Container fluid="xl">
      <Row>
        <Col lg={{ span: 6 }}>
          {!isLoaded && loadingNoun}
          {isLoaded && currentAuction && nounContent}
        </Col>

        <Col lg={{ span: 6 }}>
          <div className={clsx(classes.infoWrapper, isDevToken && classes.isDevToken)}>
            <div className={clsx(classes.auctionInfo, isLoaded && classes.loaded)}>
              {isLoaded && currentAuction && currentAuctionActivityContent}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NounbaHistory;
