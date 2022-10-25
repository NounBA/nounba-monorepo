import React from 'react';
import { Col, Row } from 'react-bootstrap';
import clsx from 'clsx';

import classes from './NounInfoCard.module.css';

import { ExternalLink } from 'lucide-react';
import NounInfoRowBirthday from '../NounInfoRowBirthday';
import NounInfoRowHolder from '../NounInfoRowHolder';
import NounInfoRowButton from '../NounInfoRowButton';

import config from '../../config';
import { buildEtherscanTokenLink } from '../../utils/etherscan';
import { Trans } from '@lingui/macro';

interface NounInfoCardProps {
  nounId: number;
  bidHistoryOnClickHandler: () => void;
  hideBids?: boolean;
}

const NounInfoCard: React.FC<NounInfoCardProps> = props => {
  const { nounId, bidHistoryOnClickHandler, hideBids } = props;

  const etherscanButtonClickHandler = () =>
    window.open(buildEtherscanTokenLink(config.addresses.nounsToken, nounId));

  return (
    <>
      <Row>
        <Col xs={6} className={classes.nounInfoRow}>
          <NounInfoRowBirthday />
        </Col>
        {!hideBids && (
          <Col xs={6} className={clsx(classes.nounInfoRow, classes.lastCol)}>
            <NounInfoRowHolder />
          </Col>
        )}
      </Row>
      {!hideBids && (
        <Row>
          <Col lg={12} className={clsx(classes.nounInfoRow, classes.noMargin)}>
            <NounInfoRowButton
              btnText={<Trans>View all bids</Trans>}
              onClickHandler={bidHistoryOnClickHandler}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col lg={12} className={clsx(classes.nounInfoRow, classes.noMargin)}>
          <NounInfoRowButton
            icon={<ExternalLink size={24} className={classes.buttonIcon} />}
            btnText={<Trans>Check on Etherscan</Trans>}
            onClickHandler={etherscanButtonClickHandler}
            className={classes.blueButton}
          />
        </Col>
      </Row>
    </>
  );
};

export default NounInfoCard;
