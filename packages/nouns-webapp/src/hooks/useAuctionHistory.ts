import { WebSocketProvider } from '@ethersproject/providers';
import { NounsAuctionHouseFactory } from '@nouns/sdk';
import { BigNumberish } from 'ethers';
import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';

import config, { AUCTION_NAMES } from '../config';
import { reduxSafeBid, reduxSafeAuction } from '../state/slices/auction/auctionWrapper';
import { BidEvent } from '../utils/types';
import { Auction } from '../wrappers/nounsAuction';
import { deserializeAuction } from '../wrappers/onDisplayAuction';

const BLOCKS_PER_DAY = 6_500;
const wsProvider = new WebSocketProvider(config.app.wsRpcUri);

/**
 * A function that loads the auction info and history of the nounba id passed
 * @param nounbaId the id you want to have the history
 * @returns data
 */

export function useAuctionHistory(nounbaId: BigNumber) {
  const [bids, setBids] = useState<BidEvent[]>([]);
  const [nounId, setNounId] = useState<BigNumber>(nounbaId);
  const [amount, setAmount] = useState<BigNumber>();
  const [winner, setWinner] = useState<BigNumber>();
  const [auction, setAuction] = useState<Auction>();

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
      return [
        ...currentBids,
        reduxSafeBid({ nounId, sender, value, extended, transactionHash, timestamp }),
      ];
    });
  };
  const processAuctionSettled = (nounId: BigNumberish, winner: string, amount: BigNumberish) => {
    setNounId(BigNumber.from(nounId));
    setAmount(BigNumber.from(amount));
    setWinner(BigNumber.from(winner));
  };

  useEffect(() => {
    const auctionAddress = config.addresses.nounsAuctionHouseProxy;
    const nounsAuctionHouseContract = NounsAuctionHouseFactory.connect(auctionAddress, wsProvider);
    const bidFilter = nounsAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    const settledFilter = nounsAuctionHouseContract.filters.AuctionSettled(null, null, null);

    const loadAuction = async () => {
      const auctionData = await nounsAuctionHouseContract.auction();
      setAuction(
        deserializeAuction(
          reduxSafeAuction({
            ...auctionData,
            contractAddress: auctionAddress,
            auctionName: AUCTION_NAMES.FIRST_AUCTION,
          }),
        ),
      );
    };
    const loadBids = async () => {
      // Fetch the previous 24hours of  bids
      const previousBids = await nounsAuctionHouseContract.queryFilter(
        bidFilter,
        0 - BLOCKS_PER_DAY,
      );
      for (let event of previousBids) {
        if (event.args === undefined) return;
        processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
      }
    };
    loadAuction();
    loadBids();

    nounsAuctionHouseContract.on(settledFilter, (nounId, winner, amount) =>
      processAuctionSettled(nounId, winner, amount),
    );
  }, []);

  return {
    bids,
    nounId,
    amount,
    winner,
    auction,
  };
}
