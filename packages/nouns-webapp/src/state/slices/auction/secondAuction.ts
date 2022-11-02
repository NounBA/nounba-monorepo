import { AUCTION_NAMES } from '../../../config';
import { buildAuctionSlice } from './auctionWrapper';
export * from './auctionWrapper';

const { actions: acts, reducer } = buildAuctionSlice(AUCTION_NAMES.SECOND_AUCTION);

export const {
  setActiveAuction,
  appendBid,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
  setLastAuctionNounId,
  setOnDisplayAuctionNounId,
  setPrevOnDisplayAuctionNounId,
  setNextOnDisplayAuctionNounId,
  setContractAddress,
} = acts;

export const actions = acts;

export default reducer;
