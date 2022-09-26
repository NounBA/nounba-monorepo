import { buildAuctionSlice } from './auctionWrapper';
export * from './auctionWrapper';

export const auctionName = 'secondAuction';
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
} = acts;

export const actions = acts;

export default reducer;
