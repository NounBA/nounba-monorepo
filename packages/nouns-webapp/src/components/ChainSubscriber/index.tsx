import { NounsAuctionHouseFactory } from '@nouns/sdk';
import { push } from 'connected-react-router';
import { BigNumberish, BigNumber } from 'ethers';
import { useAppDispatch } from '../../hooks';
import {
  reduxSafeBid,
  reduxSafeNewAuction,
  reduxSafeAuction,
} from '../../state/slices/auction/auctionWrapper';
import { actionType } from '../../state/slices/auction/firstAuction';
import { WebSocketProvider } from '@ethersproject/providers';
import { nounPath } from '../../utils/history';

type ChainSubscriberArgs = {
  wsProvider: WebSocketProvider;
  auctionsActions: actionType[];
  auctionHouseProxyAddresses: string[];
};

const BLOCKS_PER_DAY = 6_500;

export const ChainSubscriber = ({
  wsProvider,
  auctionsActions,
  auctionHouseProxyAddresses,
}: ChainSubscriberArgs) => {
  const dispatch = useAppDispatch();

  const loadState = async (actions: actionType, auctionHouseProxyAddress: string) => {
    const nounsAuctionHouseContract = NounsAuctionHouseFactory.connect(
      auctionHouseProxyAddress,
      wsProvider,
    );
    const bidFilter = nounsAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    const extendedFilter = nounsAuctionHouseContract.filters.AuctionExtended(null, null);
    const createdFilter = nounsAuctionHouseContract.filters.AuctionCreated(null, null, null);
    const settledFilter = nounsAuctionHouseContract.filters.AuctionSettled(null, null, null);
    const processBidFilter = async (
      nounId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      dispatch(
        actions.appendBid(
          reduxSafeBid({ nounId, sender, value, extended, transactionHash, timestamp }),
        ),
      );
    };
    const processAuctionCreated = (
      nounId: BigNumberish,
      startTime: BigNumberish,
      endTime: BigNumberish,
    ) => {
      dispatch(
        actions.setActiveAuction(
          reduxSafeNewAuction({ nounId, startTime, endTime, settled: false }),
        ),
      );
      const nounIdNumber = BigNumber.from(nounId).toNumber();
      dispatch(push(nounPath(nounIdNumber)));
      dispatch(actions.setOnDisplayAuctionNounId(nounIdNumber));
      dispatch(actions.setLastAuctionNounId(nounIdNumber));
    };
    const processAuctionExtended = (nounId: BigNumberish, endTime: BigNumberish) => {
      dispatch(actions.setAuctionExtended({ nounId, endTime }));
    };
    const processAuctionSettled = (nounId: BigNumberish, winner: string, amount: BigNumberish) => {
      dispatch(actions.setAuctionSettled({ nounId, amount, winner }));
    };

    // Fetch the current auction
    const currentAuction = await nounsAuctionHouseContract.auction();
    dispatch(actions.setFullAuction(reduxSafeAuction(currentAuction)));
    dispatch(actions.setLastAuctionNounId(currentAuction.nounId.toNumber()));

    // Fetch the previous 24hours of  bids
    const previousBids = await nounsAuctionHouseContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
    }

    nounsAuctionHouseContract.on(bidFilter, (nounId, sender, value, extended, event) =>
      processBidFilter(nounId, sender, value, extended, event),
    );
    nounsAuctionHouseContract.on(createdFilter, (nounId, startTime, endTime) =>
      processAuctionCreated(nounId, startTime, endTime),
    );
    nounsAuctionHouseContract.on(extendedFilter, (nounId, endTime) =>
      processAuctionExtended(nounId, endTime),
    );
    nounsAuctionHouseContract.on(settledFilter, (nounId, winner, amount) =>
      processAuctionSettled(nounId, winner, amount),
    );
  };

  auctionsActions.forEach((_, index) => {
    loadState(auctionsActions[index], auctionHouseProxyAddresses[index]);
  });

  return <></>;
};

export default ChainSubscriber;