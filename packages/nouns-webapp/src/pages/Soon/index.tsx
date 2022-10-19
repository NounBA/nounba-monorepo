import { Container, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import fireLogo from '../../assets/fire-basketball.svg';
import logoText from '../../assets/logo-text.svg';

import Documentation from '../../components/Documentation';

import classes from './Soon.module.css';
import Link from '../../components/Link';
import { ExternalURL, externalURL } from '../../utils/externalURL';

const SoonPage: React.FC = () => {
  const twitterURL = externalURL(ExternalURL.twitter);
  const discordURL = externalURL(ExternalURL.discord);
  return (
    <div style={{ backgroundColor: 'var(--brand-bg-gray)' }}>
      <div className={classes.woodWrapper}>
        <Container fluid="xl" className={classes.wrapper}>
          <Row className={classes.row}>
            <Col md={{ span: 6 }}>
              <div className={clsx(classes.bannerContainer, classes.bannerBlue)}>
                <img src={fireLogo} className={classes.logoBall} alt="NounBA logo" />
              </div>
            </Col>
            <Col md={{ span: 6 }}>
              <div className={classes.bannerWrapper}>
                <div className={clsx(classes.bannerContainer)}>
                  <header>
                    <img src={logoText} className={classes.logoText} alt="NounBA logo" />
                    <h1 className={classes.title}>
                      A nounish community of basketball fans, arriving on-chain soon
                    </h1>
                    <br />
                    <p className={classes.text}>
                      Join us on <Link text={'Twitter'} url={twitterURL} leavesPage={true} /> and{' '}
                      <Link text={'Discord'} url={discordURL} leavesPage={true} />
                    </p>
                  </header>
                </div>
                <div className={clsx(classes.bannerContainer, classes.bannerGray)}>
                  <p className={classes.text}>
                    The NounBA DAO is launching soon to coordinate basketball fans to participate in
                    the Nouns ecosystem.
                  </p>
                  <p className={classes.text}>
                    A schedule for NounBA auctions will be announced shortly.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Documentation />
      </div>
    </div>
  );
};
export default SoonPage;
