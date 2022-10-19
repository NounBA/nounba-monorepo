import { Container, Row, Col } from 'react-bootstrap';
import clsx from 'clsx';
import fireLogo from '../../assets/fire-basketball.svg';
import logoText from '../../assets/logo-text.svg';

import Documentation from '../../components/Documentation';

import classes from './Soon.module.css';

const SoonPage: React.FC = () => {
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
                    <h1 className={classes.title}> A nounish community of basketball fans.</h1>
                    <p className={classes.text}>Coming soon.</p>
                  </header>
                </div>
                <div className={clsx(classes.bannerContainer, classes.bannerGray)}>
                  <p className={classes.text}>
                    The NounBA DAO will coordinate basketball fans to participate in the Nouns
                    ecosystem.
                  </p>
                  <p className={classes.text}>
                    The NounBA auction schedule will be announced shortly.
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
