import AuctionActivity from '../AuctionActivity';
import { Auction as IAuction } from '../../wrappers/nounsAuction';
import classes from './NounbaHistory.module.css';
// import NounderNounContent from '../NounderNounContent';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
// import { isNounderNoun } from '../../utils/nounderNoun';
import {
  setNextOnDisplayAuctionNounId,
  setPrevOnDisplayAuctionNounId,
} from '../../state/slices/onDisplayAuction';
import { StandaloneNounWithSeed } from '../StandaloneNoun';
import { LoadingNoun } from '../Noun';

import { REGIONS } from '../../config';
import { BigNumber } from '@ethersproject/bignumber';
import { Container, Row, Col } from 'react-bootstrap';

interface NounbaHistoryProps {
  auction: IAuction;
  side: REGIONS;
}

const NounbaHistory: React.FC<NounbaHistoryProps> = props => {
  const { auction: currentAuction, side } = props;
  const auctionIdBigNumber = BigNumber.from(currentAuction.nounId);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionNounId());
    currentAuction && history.push(`/nounba/${currentAuction.nounId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionNounId());
    currentAuction && history.push(`/nounba/${currentAuction.nounId.toNumber() + 1}`);
  };

  const currentAuctionActivityContent = currentAuction && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={auctionIdBigNumber.eq(0)}
      // TODO: use lastNounId from Auctions
      isLastAuction={auctionIdBigNumber.eq(20)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
      side={side}
    />
  );
  // const nounderNounContent = currentAuction && lastNounId && (
  //   <NounderNounContent
  //     mintTimestamp={currentAuction.startTime}
  //     nounId={currentAuction.nounId}
  //     isFirstAuction={currentAuction.nounId.eq(0)}
  //     isLastAuction={currentAuction.nounId.eq(lastNounId)}
  //     onPrevAuctionClick={prevAuctionHandler}
  //     onNextAuctionClick={nextAuctionHandler}
  //   />
  // );

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
    <Container fluid="xl">
      <Row>
        <Col lg={{ span: 6, offset: 1 }}>
          <div className={classes.wrapper}>{currentAuction ? nounContent : loadingNoun}</div>
        </Col>

        <Col lg={{ span: 5 }}>
          <div className={classes.infoWrapper}>
            <div className={classes.auctionInfo}>
              {currentAuction && currentAuctionActivityContent}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NounbaHistory;
