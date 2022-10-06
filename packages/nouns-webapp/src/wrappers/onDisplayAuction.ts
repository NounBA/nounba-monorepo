import { BigNumber } from '@ethersproject/bignumber';
import { AUCTION_NAMES } from '../config';
import { useAppSelector } from '../hooks';
import { generateEmptyNounderAuction, isNounderNoun } from '../utils/nounderNoun';
import { Bid, BidEvent } from '../utils/types';
import { Auction } from './nounsAuction';

export const deserializeAuction = (reduxSafeAuction: Auction): Auction => {
  return {
    amount: BigNumber.from(reduxSafeAuction.amount),
    bidder: reduxSafeAuction.bidder,
    startTime: BigNumber.from(reduxSafeAuction.startTime),
    endTime: BigNumber.from(reduxSafeAuction.endTime),
    nounId: BigNumber.from(reduxSafeAuction.nounId),
    settled: false,
    contractAddress: reduxSafeAuction.contractAddress,
    auctionName: reduxSafeAuction.auctionName,
  };
};

const deserializeBid = (reduxSafeBid: BidEvent): Bid => {
  return {
    nounId: BigNumber.from(reduxSafeBid.nounId),
    sender: reduxSafeBid.sender,
    value: BigNumber.from(reduxSafeBid.value),
    extended: reduxSafeBid.extended,
    transactionHash: reduxSafeBid.transactionHash,
    timestamp: BigNumber.from(reduxSafeBid.timestamp),
  };
};
const deserializeBids = (reduxSafeBids: BidEvent[]): Bid[] => {
  return reduxSafeBids
    .map(bid => deserializeBid(bid))
    .sort((a: Bid, b: Bid) => {
      return b.timestamp.toNumber() - a.timestamp.toNumber();
    });
};

const useOnDisplayAuction = (
  currentAuctionName: AUCTION_NAMES = AUCTION_NAMES.FIRST_AUCTION,
): Auction | undefined => {
  const lastAuctionNounId = useAppSelector(
    state => state[currentAuctionName].activeAuction?.nounId,
  );
  const onDisplayAuctionNounId = useAppSelector(
    state => state[currentAuctionName].onDisplayAuctionNounId,
  );
  const currentAuction = useAppSelector(state => state[currentAuctionName].activeAuction);
  const contractAddress = useAppSelector(state => state[currentAuctionName].contractAddress);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  if (
    onDisplayAuctionNounId === undefined ||
    lastAuctionNounId === undefined ||
    currentAuction === undefined ||
    !pastAuctions
  )
    return undefined;

  // current auction
  if (BigNumber.from(onDisplayAuctionNounId).eq(lastAuctionNounId)) {
    return deserializeAuction({ ...currentAuction, contractAddress });
  }

  // nounder auction
  if (isNounderNoun(BigNumber.from(onDisplayAuctionNounId))) {
    const emptyNounderAuction = generateEmptyNounderAuction(
      BigNumber.from(onDisplayAuctionNounId),
      pastAuctions,
    );

    return deserializeAuction(emptyNounderAuction);
  }

  // past auction
  const reduxSafeAuction: Auction | undefined = pastAuctions.find(auction => {
    const nounId = auction.activeAuction && BigNumber.from(auction.activeAuction.nounId);
    return nounId && nounId.toNumber() === onDisplayAuctionNounId;
  })?.activeAuction;

  return reduxSafeAuction ? deserializeAuction(reduxSafeAuction) : undefined;
};

export const useAuctionBids = (
  auctionNounId: BigNumber,
  currentAuctionName: AUCTION_NAMES = AUCTION_NAMES.FIRST_AUCTION,
): Bid[] | undefined => {
  const lastAuctionNounId = useAppSelector(state => state[currentAuctionName].lastAuctionNounId);
  const lastAuctionBids = useAppSelector(state => state[currentAuctionName].bids);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  // auction requested is active auction
  if (lastAuctionNounId === auctionNounId.toNumber()) {
    return deserializeBids(lastAuctionBids);
  } else {
    // find bids for past auction requested
    const bidEvents: BidEvent[] | undefined = pastAuctions.find(auction => {
      const nounId = auction.activeAuction && BigNumber.from(auction.activeAuction.nounId);
      return nounId && nounId.eq(auctionNounId);
    })?.bids;

    return bidEvents && deserializeBids(bidEvents);
  }
};

export default useOnDisplayAuction;
