import Banner from '../../components/Banner';
import Documentation from '../../components/Documentation';
import { Container, Row, Col, Button } from 'react-bootstrap';

import classes from './Teams.module.css';
import ScrollToTop from '../../components/ScrollToTop';
import { REGIONS } from '../../config';
import { StandaloneNounWithSeed } from '../../components/StandaloneNoun';
import { BigNumber } from 'ethers';
import AuctionActivityNounTitle from '../../components/AuctionActivityNounTitle';
import Holder from '../../components/Holder';
import { useHistory } from 'react-router-dom';
import citiesByRegion from '../../utils/cities';
import { useMemo } from 'react';
// import { isNounbaNoun } from '../../utils/nounderNoun';
import { nounsIndex } from '../../wrappers/subgraph';
import { useQuery } from '@apollo/client';
import Line from '../../components/Line';

interface TeamsPageProps {
  initialAuctionId?: number;
}

const teams = [REGIONS.west, REGIONS.east];
const TeamsPage: React.FC<TeamsPageProps> = () => {
  const history = useHistory();
  const { data } = useQuery(nounsIndex());

  const nounsBySeed = useMemo(() => {
    if (!data?.nouns) return {};
    return data.nouns.reduce(
      // @ts-ignore
      (prev, noun) => ({ ...prev, [noun.seed?.oneOfOneIndex ?? '1']: noun }),
      {},
    );
  }, [data]);

  const onClickHandler = (id: number) => () => {
    history.push(`/nounba/${id}`);
  };
  return (
    <div style={{ backgroundColor: 'var(--brand-bg-gray)' }}>
      <Line />
      <ScrollToTop />
      <Container fluid="xl">
        {/* <Row>
          <Col sm={12} className={classes.header}>
            <h2>Season 2022</h2>
            <h1>NounBA 2022</h1>
            <p>Below you can see the summary of the 2022 season.</p>
          </Col>
        </Row> */}
        <Row className={classes.wrapperTeam}>
          {data?.nouns &&
            teams.map(side => (
              <Col md={6} key={side} className={classes.colTeam}>
                <div className={classes.conferenceTitleWrapper}>
                  <div
                    className={`${classes.conferenceTitle} ${
                      side === REGIONS.east ? classes.eastSide : classes.westSide
                    }`}
                  >
                    {side === REGIONS.east ? 'East' : 'West'}
                  </div>
                </div>
                <ul
                  className={`${classes.teamList} ${
                    side === REGIONS.east ? classes.bgEastSide : classes.bgWestSide
                  }`}
                >
                  {/* {console.log(citiesByRegion[side].filter(city => !isNounbaNoun(city.displayName)))} */}
                  {citiesByRegion[side]
                    // .filter(city => !isNounbaNoun(city.displayName))
                    .map(city => {
                      const id = nounsBySeed[city.tokenIndex]?.id;
                      return (
                        <li className={classes.team} key={id}>
                          <div className={classes.woodWrapper}>
                            <StandaloneNounWithSeed
                              nounId={BigNumber.from(id)}
                              shouldLinkToProfile
                              wrapperClassName={classes.nounbaProfileWrapper}
                              className={classes.nounbaPic}
                            />
                          </div>
                          <section className={classes.teamInfo}>
                            <div className={classes.teamInfoTitle}>
                              <AuctionActivityNounTitle nounId={BigNumber.from(id)} />
                            </div>
                            <div className={classes.teamInfoHolder}>
                              <Holder nounId={id} simple />
                            </div>
                            <Button onClick={onClickHandler(id)} className={classes.bidHistory}>
                              View More
                            </Button>
                          </section>
                        </li>
                      );
                    })}
                </ul>
              </Col>
            ))}
        </Row>
      </Container>
      <Banner />
      <Documentation />
    </div>
  );
};
export default TeamsPage;
