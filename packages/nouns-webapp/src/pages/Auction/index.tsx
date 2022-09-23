import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { nounPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { Container, Row, Col } from 'react-bootstrap';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const onDisplayAuction = useOnDisplayAuction();
  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const onDisplayAuctionNounId = onDisplayAuction?.nounId.toNumber();
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lastAuctionNounId) return;

    if (initialAuctionId !== undefined) {
      // handle out of bounds noun path ids
      if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
        dispatch(push(nounPath(lastAuctionNounId)));
      } else {
        if (onDisplayAuction === undefined) {
          // handle regular noun path ids on first load
          dispatch(setOnDisplayAuctionNounId(initialAuctionId));
        }
      }
    } else {
      // no noun path id set
      if (lastAuctionNounId) {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
      }
    }
  }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  return (
    <div style={{ backgroundColor: stateBgColor }}>
      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 5 }}>
            <Auction auction={onDisplayAuction} />
          </Col>
          <Col lg={{ span: 5, offset: 2 }}>
            <Auction auction={onDisplayAuction} />
          </Col>
        </Row>
      </Container>
      {onDisplayAuctionNounId !== undefined && onDisplayAuctionNounId !== lastAuctionNounId ? (
        <ProfileActivityFeed nounId={onDisplayAuctionNounId} />
      ) : (
        <Banner />
      )}
      <Documentation />
    </div>
  );
};
export default AuctionPage;
