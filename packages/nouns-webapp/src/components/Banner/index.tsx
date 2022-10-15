import { Trans } from '@lingui/macro';
import classes from './Banner.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import clsx from 'clsx';
import logo from '../../assets/logo-ball.svg';
import logoText from '../../assets/logo-text.svg';

const Banner = () => (
  <section className={classes.bannerSection}>
    <Container fluid="xl">
      <Row className={classes.bannerWrapper}>
        <Col lg={{ span: 6 }}>
          <div className={clsx(classes.bannerContainer, classes.bannerBlue)}>
            <img src={logo} className={classes.logoBall} alt="NounBA logo" />
          </div>
        </Col>
        <Col lg={{ span: 6 }}>
          <div className={clsx(classes.bannerContainer)}>
            <header>
              <img src={logoText} className={classes.logoText} alt="NounBA logo" />
              <h1 className={classes.title}>
                <Trans>A nounish community of NBA fans</Trans>
              </h1>
            </header>
            <p className={classes.text}>
              <Trans>
                NounBA is a nounish community of basketball fans. The NounBA DAO uses a league style
                governance structure to coordinate competing communities of basketball fans to
                participate in the Nouns ecosystem.
              </Trans>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Banner;
