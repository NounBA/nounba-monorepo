import { buildAuctionSlice } from './auctionWrapper';
export * from './auctionWrapper';

export const auctionName = 'secondAuction';
const { actions, reducer } = buildAuctionSlice(auctionName);

export const {
  setActiveAuction,
  appendBid,
  setAuctionExtended,
  setAuctionSettled,
  setFullAuction,
} = actions;

export default reducer;
