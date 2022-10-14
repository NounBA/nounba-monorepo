import { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Trans } from '@lingui/macro';
import _LinkIcon from '../../assets/icons/Link.svg';
import _HeartIcon from '../../assets/icons/Heart.svg';
import classes from './NounInfoRowHolder.module.css';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import ShortAddress from '../ShortAddress';

import Tooltip from '../Tooltip';
import PastAuctionContext from '../../contexts/PastAuctionContext';

const NounInfoRowHolder = () => {
  const { auction } = useContext(PastAuctionContext);

  const winner = auction?.bidder;

  if (!winner) {
    return (
      <div className={classes.nounHolderInfoContainer}>
        <span className={classes.nounHolderLoading}>
          <Trans>Loading...</Trans>
        </span>
      </div>
    );
  }

  const etherscanURL = buildEtherscanAddressLink(winner);
  const shortAddressComponent = <ShortAddress address={winner} />;

  return (
    <Tooltip
      tip="View on Etherscan"
      tooltipContent={(tip: string) => {
        return <Trans>View on Etherscan</Trans>;
      }}
      id="holder-etherscan-tooltip"
    >
      <div className={classes.nounHolderInfoContainer}>
        <span>
          <Image src={_HeartIcon} className={classes.heartIcon} />
        </span>
        <span>
          <Trans>Winner</Trans>
        </span>
        <span>
          <a
            className={classes.nounHolderEtherscanLinkCool}
            href={etherscanURL}
            target={'_blank'}
            rel="noreferrer"
          >
            {winner.toLowerCase() === config.addresses.nounsAuctionHouseProxy.toLowerCase() ? (
              <Trans>Nouns Auction House</Trans>
            ) : (
              shortAddressComponent
            )}
          </a>
        </span>
        <span className={classes.linkIconSpan}>
          <Image src={_LinkIcon} className={classes.linkIcon} />
        </span>
      </div>
    </Tooltip>
  );
};

export default NounInfoRowHolder;
