import { BigNumber } from '@ethersproject/bignumber';
import React, { useContext } from 'react';

import classes from './NounInfoRowBirthday.module.css';
import _BirthdayIcon from '../../assets/icons/Birthday.svg';

import { Image } from 'react-bootstrap';
import { AuctionState } from '../../state/slices/auction/auctionWrapper';
import { Trans } from '@lingui/macro';
import { i18n } from '@lingui/core';
import PastAuctionContext from '../../contexts/PastAuctionContext';

export const getNounBirthday = (nounId: number, pastAuctions: AuctionState[]) => {
  return BigNumber.from(
    pastAuctions.find((auction: AuctionState, i: number) => {
      const maybeNounId = auction.activeAuction?.nounId;
      return maybeNounId ? BigNumber.from(maybeNounId).eq(BigNumber.from(nounId)) : false;
    })?.activeAuction?.startTime || 0,
  );
};

const NounInfoRowBirthday = () => {
  const { auction } = useContext(PastAuctionContext);

  const startTime = auction?.startTime;

  if (!startTime) {
    return <Trans>Error fetching Noun birthday</Trans>;
  }

  const birthday = new Date(Number(startTime._hex) * 1000);

  return (
    <div className={classes.birthdayInfoContainer}>
      <span>
        <Image src={_BirthdayIcon} className={classes.birthdayIcon} />
      </span>
      <Trans>Born</Trans>
      <span className={classes.nounInfoRowBirthday}>
        {i18n.date(birthday, { month: 'long', year: 'numeric', day: '2-digit' })}
      </span>
    </div>
  );
};

export default NounInfoRowBirthday;
