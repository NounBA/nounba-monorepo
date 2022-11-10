import axios from 'axios';
import * as R from 'ramda';
import config from '../src/config';
import { bigNumbersEqual } from './utils';

export interface NormalizedVote {
  proposalId: number;
  supportDetailed: number;
}

export interface Seed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
  oneOfOne: boolean;
  oneOfOneIndex: number;
}

export interface NormalizedNoun {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
  seed: Seed;
}
export interface NormalizedAuction {
  settled: boolean;
  id: number;
  index: number;
}

const nounsGql = `
{
  nouns {
    id
    owner {
      id
	    delegate {
		    id
	    }
    }
    votes {
      proposal {
        id
      }
      supportDetailed
    }
    seed {
      background
      body
      accessory
      head
      glasses
      oneOfOne
      oneOfOneIndex
    }
  }
}
`;

const auctionsGql = `
{
  auctions(where: {settled: false}, orderBy: id, orderDirection: desc) {
    settled
    id
    noun {
      seed {
        oneOfOneIndex
      }
    }
  }
}
`;

export const normalizeVote = (vote: any): NormalizedVote => ({
  proposalId: Number(vote.proposal.id),
  supportDetailed: Number(vote.supportDetailed),
});

export const normalizeSeed = (seed: any): Seed => ({
  background: Number(seed.background),
  body: Number(seed.body),
  glasses: Number(seed.glasses),
  accessory: Number(seed.accessory),
  head: Number(seed.head),
  oneOfOne: seed.oneOfOne,
  oneOfOneIndex: Number(seed.oneOfOneIndex),
});

export const normalizeNoun = (noun: any): NormalizedNoun => ({
  id: Number(noun.id),
  owner: noun.owner.id,
  delegatedTo: noun.owner.delegate?.id,
  votes: normalizeVotes(noun.votes),
  seed: normalizeSeed(noun.seed),
});
export const normalizeAuction = (auction: any): NormalizedAuction => ({
  id: Number(auction.id),
  settled: auction.settled,
  index: Number(auction.noun.seed.oneOfOneIndex),
});

export const normalizeNouns = R.map(normalizeNoun);

export const normalizeVotes = R.map(normalizeVote);

export const normalizeAuctions = R.map(normalizeAuction);

export const ownerFilterFactory = (address: string) =>
  R.filter((noun: any) => bigNumbersEqual(address, noun.owner));

export const isNounOwner = (address: string, nouns: NormalizedNoun[]) =>
  ownerFilterFactory(address)(nouns).length > 0;

export const delegateFilterFactory = (address: string) =>
  R.filter((noun: any) => noun.delegatedTo && bigNumbersEqual(address, noun.delegatedTo));

export const isNounDelegate = (address: string, nouns: NormalizedNoun[]) =>
  delegateFilterFactory(address)(nouns).length > 0;

export const nounsQuery = async () =>
  normalizeNouns(
    (await axios.post(config.app.subgraphApiUri, { query: nounsGql })).data.data.nouns,
  );

export const nounsAuctions = async () =>
  normalizeAuctions(
    (await axios.post(config.app.subgraphApiUri, { query: auctionsGql })).data.data.auctions,
  );
