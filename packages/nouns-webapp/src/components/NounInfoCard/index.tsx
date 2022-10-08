import React from 'react';
import { Col } from 'react-bootstrap';

import classes from './NounInfoCard.module.css';

import _AddressIcon from '../../assets/icons/Address.svg';
import _BidsIcon from '../../assets/icons/Bids.svg';

import NounInfoRowBirthday from '../NounInfoRowBirthday';
import NounInfoRowHolder from '../NounInfoRowHolder';
import NounInfoRowButton from '../NounInfoRowButton';

import config from '../../config';
import { buildEtherscanTokenLink } from '../../utils/etherscan';
import { Trans } from '@lingui/macro';

interface NounInfoCardProps {
  nounId: number;
  bidHistoryOnClickHandler: () => void;
}

const NounInfoCard: React.FC<NounInfoCardProps> = props => {
  const { nounId, bidHistoryOnClickHandler } = props;

  const etherscanButtonClickHandler = () =>
    window.open(buildEtherscanTokenLink(config.addresses.nounsToken, nounId));

  return (
    <>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowBirthday />
      </Col>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowHolder />
      </Col>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowButton
          iconImgSource={_BidsIcon}
          btnText={<Trans>Bid history</Trans>}
          onClickHandler={bidHistoryOnClickHandler}
        />
        <NounInfoRowButton
          iconImgSource={_AddressIcon}
          btnText={<Trans>Etherscan</Trans>}
          onClickHandler={etherscanButtonClickHandler}
        />
      </Col>
    </>
  );
};

export default NounInfoCard;
