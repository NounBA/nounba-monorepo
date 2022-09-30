import { buildAuctionSlice } from './auctionWrapper';
export * from './auctionWrapper';

export const auctionName = 'firstAuction';
const { actions: acts, reducer } = buildAuctionSlice(auctionName);

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
