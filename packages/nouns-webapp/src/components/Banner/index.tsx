import { Trans } from '@lingui/macro';
import classes from './Banner.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Banner = () => (
  <section className={classes.bannerSection}>
    <Container fluid="xl">
      <Row className={classes.bannerContainer}>
        <Col lg={{ span: 9 }} className={classes.bannerContent}>
          <header>
            <img src={logo} className={classes.sectionLogo} alt="Nouns DAO logo" />
            <h1>NounBA</h1>
            <h2>
              <Trans>A nounish community of NBA fans</Trans>
            </h2>
          </header>
          <p>
            NounBA is a nounish community of basketball fans. The NounBA DAO uses a league style
            governance structure to coordinate competing communities of basketball fans to
            participate in the Nouns ecosystem.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Banner;
