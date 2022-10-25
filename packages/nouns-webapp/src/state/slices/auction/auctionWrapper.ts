import { BigNumber } from '@ethersproject/bignumber';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUCTION_NAMES } from '../../../config';
import {
  AuctionCreateEvent,
  AuctionExtendedEvent,
  AuctionSettledEvent,
  BidEvent,
} from '../../../utils/types';
import { Auction as IAuction } from '../../../wrappers/nounsAuction';

export interface AuctionState {
  activeAuction?: IAuction;
  bids: BidEvent[];
  seed: {
    oneOfOneIndex: string;
  };
  lastAuctionNounId: number | undefined;
  onDisplayAuctionNounId: number | undefined;
  contractAddress: string;
  auctionName?: AUCTION_NAMES;
}

const initialState: AuctionState = {
  activeAuction: undefined,
  bids: [],
  seed: {
    oneOfOneIndex: '',
  },
  lastAuctionNounId: undefined,
  onDisplayAuctionNounId: undefined,
  contractAddress: '',
  auctionName: AUCTION_NAMES.FIRST_AUCTION,
};

export const reduxSafeNewAuction = (auction: AuctionCreateEvent): IAuction => ({
  amount: BigNumber.from(0).toJSON(),
  bidder: '',
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  nounId: BigNumber.from(auction.nounId).toJSON(),
  settled: false,
  contractAddress: auction.contractAddress,
  auctionName: auction.auctionName,
});

export const reduxSafeAuction = (auction: IAuction): IAuction => ({
  amount: BigNumber.from(auction.amount).toJSON(),
  bidder: auction.bidder,
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  nounId: BigNumber.from(auction.nounId).toJSON(),
  settled: auction.settled,
  contractAddress: auction.contractAddress,
  auctionName: auction.auctionName,
});

export const reduxSafeBid = (bid: BidEvent): BidEvent => ({
  nounId: BigNumber.from(bid.nounId).toJSON(),
  sender: bid.sender,
  value: BigNumber.from(bid.value).toJSON(),
  extended: bid.extended,
  transactionHash: bid.transactionHash,
  timestamp: bid.timestamp,
});

const maxBid = (bids: BidEvent[]): BidEvent => {
  return bids.reduce((prev, current) => {
    return BigNumber.from(prev.value).gt(BigNumber.from(current.value)) ? prev : current;
  });
};

const auctionsEqual = (
  a: IAuction,
  b: AuctionSettledEvent | AuctionCreateEvent | BidEvent | AuctionExtendedEvent,
) => BigNumber.from(a.nounId).eq(BigNumber.from(b.nounId));

const containsBid = (bidEvents: BidEvent[], bidEvent: BidEvent) =>
  bidEvents.map(bid => bid.transactionHash).indexOf(bidEvent.transactionHash) >= 0;

/**
 * State of **current** auction (sourced via websocket)
 */
export const buildAuctionSlice = (name: string) =>
  createSlice({
    name,
    initialState: { ...initialState, auctionName: name },
    reducers: {
      setActiveAuction: (state, action: PayloadAction<AuctionCreateEvent>) => {
        state.activeAuction = reduxSafeNewAuction(action.payload);
        state.bids = [];
        console.log('processed auction create', action.payload);
      },
      setFullAuction: (state, action: PayloadAction<IAuction>) => {
        console.log(`from set full auction: `, action.payload);
        state.activeAuction = reduxSafeAuction(action.payload);
      },
      appendBid: (state, action: PayloadAction<BidEvent>) => {
        if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
        if (containsBid(state.bids, action.payload)) return;
        state.bids = [reduxSafeBid(action.payload), ...state.bids];
        const maxBid_ = maxBid(state.bids);
        state.activeAuction.amount = BigNumber.from(maxBid_.value).toJSON();
        state.activeAuction.bidder = maxBid_.sender;
        console.log('processed bid', action.payload);
      },
      setAuctionSettled: (state, action: PayloadAction<AuctionSettledEvent>) => {
        if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
        state.activeAuction.settled = true;
        state.activeAuction.bidder = action.payload.winner;
        state.activeAuction.amount = BigNumber.from(action.payload.amount).toJSON();
        console.log('processed auction settled', action.payload);
      },
      setAuctionExtended: (state, action: PayloadAction<AuctionExtendedEvent>) => {
        if (!(state.activeAuction && auctionsEqual(state.activeAuction, action.payload))) return;
        state.activeAuction.endTime = BigNumber.from(action.payload.endTime).toJSON();
        console.log('processed auction extended', action.payload);
      },
      setLastAuctionNounId: (state, action: PayloadAction<number>) => {
        state.lastAuctionNounId = action.payload;
      },
      setOnDisplayAuctionNounId: (state, action: PayloadAction<number>) => {
        state.onDisplayAuctionNounId = action.payload;
      },
      setPrevOnDisplayAuctionNounId: state => {
        if (!state.onDisplayAuctionNounId) return;
        if (state.onDisplayAuctionNounId === 0) return;
        state.onDisplayAuctionNounId = state.onDisplayAuctionNounId - 1;
      },
      setNextOnDisplayAuctionNounId: state => {
        if (state.onDisplayAuctionNounId === undefined) return;
        if (state.lastAuctionNounId === state.onDisplayAuctionNounId) return;
        state.onDisplayAuctionNounId = state.onDisplayAuctionNounId + 1;
      },
      setContractAddress: (state, action: PayloadAction<string>) => {
        state.contractAddress = action.payload;
      },
    },
  });
