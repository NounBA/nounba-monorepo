import { createContext } from 'react';
import { REGIONS } from '../../config';
import { STATUS, useAuctionHistory } from '../../hooks/useAuctionHistory';
import { Bid } from '../../utils/types';
import { Auction } from '../../wrappers/nounsAuction';

type Context = {
  auction?: Auction;
  bids: Bid[];
  side?: REGIONS;
  status: STATUS;
};

const DEFAULT_CONTEXT: Context = {
  auction: undefined,
  bids: [],
  side: REGIONS.east,
  status: STATUS.LOADING,
};

const PastAuctionContext = createContext(DEFAULT_CONTEXT);

export const PastAuctionContextProvider: React.FC<{
  nounId: string;
}> = props => {
  const { nounId, children } = props;
  const { auction, side, bids, status } = useAuctionHistory(nounId);

  return (
    <PastAuctionContext.Provider
      value={{
        ...DEFAULT_CONTEXT,
        auction,
        bids,
        side,
        status,
      }}
    >
      {children}
    </PastAuctionContext.Provider>
  );
};

export default PastAuctionContext;
