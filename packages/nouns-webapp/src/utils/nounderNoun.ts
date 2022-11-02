import { Auction } from '../wrappers/nounsAuction';
import { AuctionState } from '../state/slices/auction/auctionWrapper';
import { BigNumber } from '@ethersproject/bignumber';
import { AUCTION_NAMES } from '../config';

export const isNounderNoun = (nounId: BigNumber) => {
  return false;
  // return nounId?.mod(10)?.eq(0) || nounId.eq(0);
};

export const isNounbaNoun = (displayName: string) => {
  return displayName.includes('Referee');
};

const emptyNounderAuction = (onDisplayAuctionId: number): Auction => {
  return {
    amount: BigNumber.from(0).toJSON(),
    bidder: 'NounBA Team',
    startTime: BigNumber.from(0).toJSON(),
    endTime: BigNumber.from(0).toJSON(),
    nounId: BigNumber.from(onDisplayAuctionId).toJSON(),
    settled: true,
    contractAddress: '',
    auctionName: AUCTION_NAMES.FIRST_AUCTION,
  };
};

const findAuction = (id: BigNumber, auctions: AuctionState[]): Auction | undefined => {
  return auctions.find(auction => {
    return BigNumber.from(auction.activeAuction?.nounId).eq(id);
  })?.activeAuction;
};

/**
 *
 * @param nounId
 * @param pastAuctions
 * @returns empty `Auction` object with `startTime` set to auction after param `nounId`
 */
export const generateEmptyNounderAuction = (
  nounId: BigNumber,
  pastAuctions: AuctionState[],
): Auction => {
  const nounderAuction = emptyNounderAuction(nounId.toNumber());
  // use nounderAuction.nounId + 1 to get mint time
  const auctionAbove = findAuction(nounId.add(1), pastAuctions);
  const auctionAboveStartTime = auctionAbove && BigNumber.from(auctionAbove.startTime);
  if (auctionAboveStartTime) {
    nounderAuction.startTime = auctionAboveStartTime.toJSON();
    nounderAuction.endTime = auctionAboveStartTime.toJSON();
  }

  return nounderAuction;
};
