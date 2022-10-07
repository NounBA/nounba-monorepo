import { createContext } from 'react';
import { REGIONS } from '../../config';
import { useAuctionHistory } from '../../hooks/useAuctionHistory';
import { BidEvent } from '../../utils/types';
import { Auction } from '../../wrappers/nounsAuction';

type Context = {
  auction?: Auction;
  bids: BidEvent[];
  side: REGIONS;
};

const DEFAULT_CONTEXT: Context = {
  auction: undefined,
  bids: [],
  side: REGIONS.east,
};

const PastAuctionContext = createContext(DEFAULT_CONTEXT);

export const PastAuctionContextProvider: React.FC<{
  nounId: string;
}> = props => {
  const { nounId, children } = props;
  const { auction, side, bids } = useAuctionHistory(nounId);

  if (!auction) return <></>;

  return (
    <PastAuctionContext.Provider
      value={{
        ...DEFAULT_CONTEXT,
        auction,
        bids,
        side,
      }}
    >
      {children}
    </PastAuctionContext.Provider>
  );
};

export default PastAuctionContext;
