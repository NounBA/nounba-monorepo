import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Holder.module.css';
import ShortAddress from '../ShortAddress';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import React, { useMemo } from 'react';
import Tooltip from '../Tooltip';
import { useQuery } from '@apollo/client';
import { nounQuery } from '../../wrappers/subgraph';

interface HolderProps {
  nounId: number;
}

const Holder: React.FC<HolderProps> = props => {
  const { nounId } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const { loading, error, data } = useQuery(nounQuery(nounId.toString()));
  const holder = useMemo(() => data && data.noun.owner.id, [data]);

  const isWinnerYou = useMemo(
    () =>
      activeAccount !== undefined &&
      holder !== undefined &&
      activeAccount.toLocaleLowerCase() === holder.toLocaleLowerCase(),
    [activeAccount, holder],
  );

  if (loading) {
    return <></>;
  } else if (error) {
    return (
      <div>
        <Trans>Failed to fetch Noun info</Trans>
      </div>
    );
  }

  const nonNounderNounContent = (
    <a
      href={buildEtherscanAddressLink(holder)}
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
        {!isWinnerYou && <ShortAddress size={30} address={holder} avatar={true} />}
        {isWinnerYou && 'You'}
      </Tooltip>
    </a>
  );

  return (
    <>
      <Row className={clsx(classes.wrapper, classes.section)}>
        <Col xs={12} className={classes.leftCol}>
          <h4 className={classes.holderCopy}>
            <Trans>Held by</Trans>
          </h4>
        </Col>
        <Col xs={12}>
          <h2 className={classes.holderContent}>{nonNounderNounContent}</h2>
        </Col>
      </Row>
    </>
  );
};

export default Holder;
