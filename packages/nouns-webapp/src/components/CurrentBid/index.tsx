import BigNumber from 'bignumber.js';
import classes from './CurrentBid.module.css';
import TruncatedAmount from '../TruncatedAmount';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';

/**
 * Passible to CurrentBid as `currentBid` prop to indicate that
 * the bid amount is not applicable to this auction. (Nounder Noun)
 */
export const BID_N_A = 'n/a';

/**
 * Special Bid type for not applicable auctions (Nounder Nouns)
 */
type BidNa = typeof BID_N_A;

const CurrentBid: React.FC<{ currentBid: BigNumber | BidNa; auctionEnded: boolean }> = props => {
  const { currentBid, auctionEnded } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const titleContent = auctionEnded ? <Trans>Winning bid</Trans> : <Trans>Current bid</Trans>;

  return (
    <div className={clsx(classes.wrapper, classes.container, classes.section)}>
      <div className={classes.leftCol}>
        <h4
          style={{
            color: isCool ? 'var(--brand-warm-light-text)' : 'var(--brand-warm-light-text)',
          }}
        >
          {titleContent}
        </h4>
      </div>
      <div>
        <h2 className={classes.currentBid} style={{ color: 'var(--brand-white)' }}>
          {currentBid === BID_N_A ? BID_N_A : <TruncatedAmount amount={currentBid && currentBid} />}
        </h2>
      </div>
    </div>
  );
};

export default CurrentBid;
