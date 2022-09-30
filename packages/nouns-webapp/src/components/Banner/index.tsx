import { Trans } from '@lingui/macro';
import classes from './Banner.module.css';
import { Col, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Banner = () => (
  <section className={classes.bannerSection}>
    <Container className={classes.bannerContainer}>
      <Col lg={8} className={classes.bannerContent}>
        <header>
          <img src={logo} className={classes.sectionLogo} alt="Nouns DAO logo" />
          <h1>NounBA</h1>
          <h2>
            <Trans>A nounish community of NBA fans</Trans>
          </h2>
        </header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat diam non tempor, orci,
          volutpat. Euismod dapibus fringilla sagittis, donec ornare sed vestibulum orci ligula.
          Purus dui libero mauris, congue. Faucibus nunc egestas nulla consectetur cursus posuere
          consectetur at lacus. Ornare vitae, faucibus maecenas lectus neque vivamus. Massa gravida
          pharetra sit eros sit nunc nam integer massa. Orci, eget odio odio vitae at in platea eu,
          mattis. Accumsan, egestas urna, tempor non urna. Luctus ut in in ullamcorper pellentesque
          proin porttitor nullam. Ornare aliquet dui malesuada id. Velit faucibus nisl, ultrices
          platea. Habitant risus ornare imperdiet sit eget.
        </p>
      </Col>
    </Container>
  </section>
);

export default Banner;
