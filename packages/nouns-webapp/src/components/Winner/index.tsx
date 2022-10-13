import { Button } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';
import clsx from 'clsx';
import { isMobileScreen } from '../../utils/isMobile';
import { Trans } from '@lingui/macro';
import React from 'react';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import Tooltip from '../Tooltip';

interface WinnerProps {
  winner: string;
  isNounders?: boolean;
}

const Winner: React.FC<WinnerProps> = props => {
  const { winner, isNounders } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);

  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const isMobile = isMobileScreen();

  const isWinnerYou =
    activeAccount !== undefined && activeAccount.toLocaleLowerCase() === winner.toLocaleLowerCase();

  // const activeLocale = useActiveLocale();

  const nonNounderNounContent = isWinnerYou ? (
    <h2
      className={classes.winnerContent}
      style={{
        color: 'var(--brand-white)',
      }}
    >
      <Trans>You</Trans>
      {/* {!isMobile && (
        <Col>
          <a
            href="https://nouns.center/nouners"
            target="_blank"
            rel="noreferrer noopener"
            className={classes.verifyLink}
          >
            <Button className={classes.verifyButton}>
              <Trans>What now?</Trans>
            </Button>
          </a>
        </Col>
      )} */}
    </h2>
  ) : (
    <ShortAddress size={40} address={winner} avatar={!isMobile} />
  );

  const nounderNounContent = (
    <a
      href={buildEtherscanAddressLink('nounders.eth')}
      target={'_blank'}
      rel="noreferrer"
      className={classes.link}
    >
      <Tooltip
        tip="View on Etherscan"
        tooltipContent={(tip: string) => {
          return <Trans>View on Etherscan</Trans>;
        }}
        id="holder-etherscan-tooltip"
      >
        nounders.eth
      </Tooltip>
    </a>
  );

  return (
    <>
      <div className={clsx(classes.wrapper, classes.section)}>
        <div className={classes.leftCol}>
          <h4
            style={{
              color: isCool ? 'var(--brand-warm-light-text)' : 'var(--brand-warm-light-text)',
            }}
            className={classes.winnerCopy}
          >
            <Trans>Winner</Trans>
          </h4>
        </div>
        <div>
          <h2
            className={classes.winnerContent}
            style={{
              color: 'var(--brand-white)',
            }}
          >
            {isNounders ? nounderNounContent : nonNounderNounContent}
          </h2>
        </div>
      </div>
      {isWinnerYou && isMobile && (
        <div>
          <a
            href="https://nouns.center/nouners"
            target="_blank"
            rel="noreferrer noopener"
            className={classes.verifyLink}
          >
            <Button className={classes.verifyButton}>
              <Trans>What now?</Trans>
            </Button>
          </a>
        </div>
      )}
    </>
  );
};

export default Winner;
