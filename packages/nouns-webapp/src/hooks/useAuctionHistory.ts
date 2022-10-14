import { WebSocketProvider } from '@ethersproject/providers';
import { NounsAuctionHouseFactory } from '@nouns/sdk';
import { BigNumberish } from 'ethers';
import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import config, { AUCTION_NAMES, REGIONS } from '../config';
import { reduxSafeBid } from '../state/slices/auction/auctionWrapper';
import { Bid } from '../utils/types';
import { Auction } from '../wrappers/nounsAuction';
import { getSide } from '../utils/cities';
import { deserializeBids } from '../wrappers/onDisplayAuction';

const wsProvider = new WebSocketProvider(config.app.wsRpcUri);

const deserializeSettledAuction = (auction: Auction): Auction => {
  return {
    amount: BigNumber.from(auction.amount),
    bidder: auction.bidder,
    endTime: BigNumber.from(auction.endTime),
    startTime: BigNumber.from(auction.endTime),
    nounId: BigNumber.from(auction.nounId),
    settled: true,
    contractAddress: '',
    auctionName: AUCTION_NAMES.FIRST_AUCTION,
  };
};

export enum STATUS {
  LOADING,
  SUCCESS,
  ERROR,
}

/**
 * A function that loads the auction info and history of the nounba id passed
 * @param nounbaId the id you want to have the history
 * @returns data
 */

export function useAuctionHistory(nounbaId: string) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [auction, setAuction] = useState<Auction>();
  const [side, setSide] = useState(REGIONS.east);
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);

  const processBidFilter = async (
    nounId: BigNumberish,
    sender: string,
    value: BigNumberish,
    extended: boolean,
    event: any,
  ) => {
    const timestamp = (await event.getBlock()).timestamp;
    const transactionHash = event.transactionHash;
    setBids(currentBids => {
      return deserializeBids([
        ...currentBids,
        reduxSafeBid({ nounId, sender, value, extended, transactionHash, timestamp }),
      ]);
    });
  };

  useEffect(() => {
    setStatus(STATUS.LOADING);
    setBids([]);

    const nounId = BigNumber.from(nounbaId);
    const currentSide = getSide(nounId.toNumber());
    const auctionAddress =
      currentSide === REGIONS.east
        ? config.addresses.nounsAuctionHouseProxy
        : config.addresses.nounsAuctionHouseProxy2;
    const nounsAuctionHouseContract = NounsAuctionHouseFactory.connect(auctionAddress, wsProvider);
    const bidFilter = nounsAuctionHouseContract.filters.AuctionBid(nounId, null, null, null);
    const settledFilter = nounsAuctionHouseContract.filters.AuctionSettled(nounId, null, null);
    const auctionCreatedFilter = nounsAuctionHouseContract.filters.AuctionCreated(
      nounId,
      null,
      null,
    );

    const loadAuction = async () => {
      const createdAuction = await nounsAuctionHouseContract.queryFilter(auctionCreatedFilter);
      const settledAuction = await nounsAuctionHouseContract.queryFilter(settledFilter);

      if (settledAuction.length < 1) {
        setStatus(STATUS.ERROR);
        return;
      }

      const block = await settledAuction[0].getBlock();
      const currentSide = getSide(nounId.toNumber());

      setSide(currentSide);
      setAuction(
        deserializeSettledAuction({
          amount: settledAuction[0].args.amount,
          bidder: settledAuction[0].args.winner,
          nounId: settledAuction[0].args.nounId,
          endTime: BigNumber.from(block.timestamp),
          startTime: BigNumber.from(createdAuction[0].args.startTime),
          settled: true,
          contractAddress: '',
          auctionName:
            currentSide === REGIONS.west
              ? AUCTION_NAMES.FIRST_AUCTION
              : AUCTION_NAMES.SECOND_AUCTION,
        }),
      );

      setStatus(STATUS.SUCCESS);
    };
    const loadBids = async () => {
      // Fetch the previous 24hours of  bids
      const previousBids = await nounsAuctionHouseContract.queryFilter(bidFilter);
      for (let event of previousBids) {
        if (event.args === undefined) return;
        processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
      }
    };

    try {
      loadAuction();
      loadBids();
    } catch (error) {
      setStatus(STATUS.ERROR);
    }
  }, [nounbaId]);

  return {
    bids,
    auction,
    side,
    status,
  };
}
