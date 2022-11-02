import { AUCTION_NAMES } from '../../../config';
import { buildAuctionSlice } from './auctionWrapper';
export * from './auctionWrapper';

const { actions: acts, reducer } = buildAuctionSlice(AUCTION_NAMES.FIRST_AUCTION);

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

export type actionType = typeof acts;

export default reducer;
