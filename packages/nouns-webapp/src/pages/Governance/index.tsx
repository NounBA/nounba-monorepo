import { Col, Container, Row } from 'react-bootstrap';
// import Section from '../../layout/Section';
import { useAllProposals, useProposalThreshold } from '../../wrappers/nounsDao';
import Proposals from '../../components/Proposals';
import classes from './Governance.module.css';
import { utils } from 'ethers/lib/ethers';
import clsx from 'clsx';
import { useTreasuryBalance, useTreasuryUSDValue } from '../../hooks/useTreasuryBalance';
import { Trans } from '@lingui/macro';
import { i18n } from '@lingui/core';
import Image from 'react-bootstrap/Image';
import ballsImage from '../../assets/three-balls.svg';
import Line from '../../components/Line';

const GovernancePage = () => {
  const { data: proposals } = useAllProposals();
  const threshold = useProposalThreshold();
  const nounsRequired = threshold !== undefined ? threshold + 1 : '...';

  const treasuryBalance = useTreasuryBalance();
  const treasuryBalanceUSD = useTreasuryUSDValue();

  // Note: We have to extract this copy out of the <span> otherwise the Lingui macro gets confused
  const nounSingular = <Trans>NounBA</Trans>;
  const nounPlural = <Trans>NounBAs</Trans>;

  return (
    <>
      <Line />
      <Container fluid="xl" className={classes.section}>
        <Row className="align-items-justify">
          <Col xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <div className={classes.headerRow}>
                <Image
                  className={classes.image}
                  width={'100%'}
                  src={ballsImage}
                  alt={'Balls illustration'}
                />
                <span>
                  <Trans>Governance</Trans>
                </span>
                <h1>
                  <Trans>NounBA DAO</Trans>
                </h1>
              </div>
              <p className={classes.subheading}>
                  NounBAs govern <span className={classes.boldText}>NounBA DAO</span>. NounBAs can
                  vote on proposals or delegate their vote to a third party. A minimum of{' '}
                  <span className={classes.boldText}>
                    {nounsRequired} {threshold === 0 ? nounSingular : nounPlural}
                  </span>{' '}
                  is required to submit proposals.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} className={classes.cardWrapper}>
            <div className={clsx(classes.card, classes.treasuryWrapper)}>
              <div className={classes.headerRow}>
                <span>
                  <Trans>Treasury</Trans>
                </span>
                <p className={classes.subheading}>
                  This treasury exists for NounBAs DAO participants to allocate resources for the
                  long-term growth and prosperity of the NounBAs project.
                </p>
              </div>
              <div>
                <div className={clsx(classes.treasuryCards)}>
                  <div className={classes.ethSymbol}>Ξ</div>
                  <div>
                    {treasuryBalance &&
                      i18n.number(Number(Number(utils.formatEther(treasuryBalance)).toFixed(2)))}
                  </div>
                </div>
                <div className={clsx(classes.treasuryCards, classes.treasuryCardRed)}>
                  <div>
                    {!isNaN(treasuryBalanceUSD) &&
                      treasuryBalanceUSD &&
                      i18n.number(Number(treasuryBalanceUSD.toFixed(0)), {
                        style: 'currency',
                        currency: 'USD',
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="align-items-justify">
          <Col sm={12}>
            <Proposals proposals={proposals} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default GovernancePage;
