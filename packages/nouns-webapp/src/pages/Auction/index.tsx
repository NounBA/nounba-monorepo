import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { push } from 'connected-react-router';
// import { nounPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
// import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { Container, Row, Col } from 'react-bootstrap';

import {
  auctionName as firstAuctionName,
  setOnDisplayAuctionNounId as setOnDisplayFirstAuctionNounId,
} from '../../state/slices/auction/firstAuction';
import {
  auctionName as secondAuctionName,
  setOnDisplayAuctionNounId as setOnDisplaySecondAuctionNounId,
} from '../../state/slices/auction/secondAuction';

import classes from './Auction.module.css';
import { REGIONS } from '../../config';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  // const { initialAuctionId } = props;
  const onDisplayFirstAuction = useOnDisplayAuction();
  const lastFirstAuctionNounId = useAppSelector(state => state.firstAuction.lastAuctionNounId);

  const onDisplaySecondAuction = useOnDisplayAuction('secondAuction');
  const lastSecondAuctionNounId = useAppSelector(state => state.secondAuction.lastAuctionNounId);

  // Used by activities
  // const onDisplayFirstAuctionNounId = onDisplayFirstAuction?.nounId.toNumber();
  // const onDisplaySecondAuctionNounId = onDisplaySecondAuction?.nounId.toNumber();
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lastFirstAuctionNounId) return;

    // TODO: use routes to the selected noun
    // if (initialAuctionId !== undefined) {
    // handle out of bounds noun path ids
    // if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
    //   dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
    //   dispatch(push(nounPath(lastAuctionNounId)));
    // } else {
    //   if (onDisplayAuction === undefined) {
    //     // handle regular noun path ids on first load
    //     dispatch(setOnDisplayAuctionNounId(initialAuctionId));
    //   }
    // }
    // } else {
    // no noun path id set
    if (lastFirstAuctionNounId) {
      dispatch(setOnDisplayFirstAuctionNounId(lastFirstAuctionNounId));
    }
    // }
  }, [dispatch, lastFirstAuctionNounId]);

  useEffect(() => {
    if (!lastSecondAuctionNounId) return;

    // TODO: use routes to the selected noun
    // if (initialAuctionId !== undefined) {
    // handle out of bounds noun path ids
    // if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
    //   dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
    //   dispatch(push(nounPath(lastAuctionNounId)));
    // } else {
    //   if (onDisplayAuction === undefined) {
    //     // handle regular noun path ids on first load
    //     dispatch(setOnDisplayAuctionNounId(initialAuctionId));
    //   }
    // }
    // } else {
    // no noun path id set
    if (lastSecondAuctionNounId) {
      dispatch(setOnDisplaySecondAuctionNounId(lastSecondAuctionNounId));
    }
    // }
  }, [dispatch, lastSecondAuctionNounId]);

  // useEffect(() => {
  //   if (!lastAuctionNounId) return;

  //   if (initialAuctionId !== undefined) {
  //     // handle out of bounds noun path ids
  //     if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
  //       dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
  //       dispatch(push(nounPath(lastAuctionNounId)));
  //     } else {
  //       if (onDisplayAuction === undefined) {
  //         // handle regular noun path ids on first load
  //         dispatch(setOnDisplayAuctionNounId(initialAuctionId));
  //       }
  //     }
  //   } else {
  //     // no noun path id set
  //     if (lastAuctionNounId) {
  //       dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
  //     }
  //   }
  // }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  return (
    <div style={{ backgroundColor: stateBgColor }}>
      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 5 }} className={classes.westernSide}>
            <Auction
              side={REGIONS.west}
              auction={onDisplayFirstAuction}
              auctionName={firstAuctionName}
            />
          </Col>
          <Col lg={{ span: 5, offset: 2 }} className={classes.easternSide}>
            <Auction
              side={REGIONS.east}
              auction={onDisplaySecondAuction}
              auctionName={secondAuctionName}
            />
          </Col>
        </Row>
      </Container>
      {/* TODO: show profileActivityFeed to the owner */}
      <Banner />
      {/* {onDisplayAuctionNounId !== undefined && onDisplayAuctionNounId !== lastAuctionNounId ? (
        <ProfileActivityFeed nounId={onDisplayAuctionNounId} />
      ) : (
        <Banner />
      )} */}
      <Documentation />
    </div>
  );
};
export default AuctionPage;
