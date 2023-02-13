import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'react-bootstrap/Image';
import classes from './CityBoard.module.css';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import citiesByRegion, { referees } from '../../utils/cities';
import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { REGIONS } from '../../config';
import { useAppSelector } from '../../hooks';
import { AuctionState } from '../../state/slices/auction/auctionWrapper';
import { BigNumber } from '@ethersproject/bignumber';
import { isNounbaNoun } from '../../utils/nounderNoun';
import { getNoun } from '../StandaloneNoun';
import { useNounSeed } from '../../wrappers/nounToken';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import comingAuctionNoun from '../../assets/coming-auction.svg';
import { nounsIndex } from '../../wrappers/subgraph';

type CityItemProps = {
  name: string;
  tokenIndex: number;
  id: number;
  isDisabled?: boolean;
  isSelected?: boolean;
  cityRef?: RefObject<HTMLAnchorElement> | null;
};
const CityItem = ({
  id,
  tokenIndex,
  name,
  isDisabled = false,
  isSelected,
  cityRef,
}: CityItemProps) => {
  const history = useHistory();
  const seed = useNounSeed(BigNumber.from(id));
  let image = loadingNoun;
  if (!isDisabled) {
    try {
      image = getNoun(
        BigNumber.from(tokenIndex),
        { ...seed, oneOfOneIndex: tokenIndex },
        true,
      ).image;
    } catch (error) {
      image = loadingNoun;
    }
  } else {
    image = comingAuctionNoun;
  }

  const onClickHandler = () => {
    if (!isSelected) history.push(`/nounba/${id}`);
  };
  // if (isNounbaNoun(name)) return null;
  return (
    <ListGroupItem className={classes.itemWrapper} ref={cityRef}>
      <Button
        className={clsx(classes.city, isSelected && classes.isSelected)}
        disabled={isDisabled}
        onClick={onClickHandler}
      >
        <div className={classes.cityWrapper}>
          {/* <span className={classes.avatar} /> */}
          <Image className={classes.avatar} src={image} alt={'Noun'} />
          {id}
          {name}
        </div>
        {!isDisabled && !isSelected && <FontAwesomeIcon icon={faExternalLinkAlt} />}
      </Button>
    </ListGroupItem>
  );
};

const referee = 'referee';
type CityBoardProps = {
  auctionID: number;
  side: REGIONS | 'referee';
  tokenIndex?: number;
};

const setScroll = (element: HTMLDivElement, target: number) => {
  element.scrollTop = target;
};

const getAuctionTokenId = (list: { [key: string]: AuctionState }, tokenIndex: number) => {
  const nounId = list[tokenIndex]?.activeAuction?.nounId;
  return nounId !== undefined ? BigNumber.from(nounId).toNumber() : 0;
};
const CityBoard = ({ auctionID, side, tokenIndex }: CityBoardProps) => {
  const isReferee = side === referee;
  const { data } = useQuery(nounsIndex());
  const nounsBySeed = useMemo(() => {
    if (!data?.nouns) return {};
    return data.nouns.reduce(
      // @ts-ignore
      (prev, noun) => ({ ...prev, [noun.seed?.oneOfOneIndex ?? '1']: noun }),
      {},
    );
  }, [data]);

  const cities = useMemo(
    () =>
      isReferee ? referees : citiesByRegion[side].filter(city => !isNounbaNoun(city.displayName)),
    [isReferee, side],
  );

  const pastAuctionsBySeed = useAppSelector<{ [key: string]: AuctionState }>(state =>
    state.pastAuctions.pastAuctions.reduce(
      (prev, auction) => ({ ...prev, [auction.seed.oneOfOneIndex]: auction }),
      {},
    ),
  );

  const listRef = useRef<HTMLDivElement>(null);
  const selectedCityRef = useRef<HTMLAnchorElement>(null);

  const scrollToCity = useCallback(() => {
    if (selectedCityRef.current !== null && listRef.current !== null) {
      setScroll(listRef.current, selectedCityRef.current.offsetTop - 120);
    }
  }, [listRef, selectedCityRef]);

  useEffect(() => {
    if (auctionID) {
      setTimeout(scrollToCity, 1000);
    }
  }, [auctionID, scrollToCity]);

  useEffect(() => {
    scrollToCity();
  }, [scrollToCity]);

  return (
    <div className={classes.containerWrapper}>
      <section className={clsx(classes.wrapper, !isReferee && classes.wrapperWithoutSpace)}>
        <h1 className={classes.title}>
          {!isReferee && (
            <>
              {side === REGIONS.east ? 'East' : 'West'} <Trans>team current bid</Trans>
            </>
          )}
          {isReferee && 'Referees'}
        </h1>
        <ListGroup
          className={clsx(
            classes.list,
            side === REGIONS.east && classes.blueList,
            isReferee && classes.refereeList,
          )}
          ref={listRef}
        >
          {cities.map(city => {
            return (
              <CityItem
                id={
                  nounsBySeed[city.tokenIndex]?.id ??
                  getAuctionTokenId(pastAuctionsBySeed, city.tokenIndex)
                }
                tokenIndex={city.tokenIndex}
                key={city.tokenIndex}
                name={city.displayName}
                isSelected={city.tokenIndex === tokenIndex}
                isDisabled={!!!nounsBySeed[city.tokenIndex]}
                cityRef={city.tokenIndex === tokenIndex ? selectedCityRef : null}
              />
            );
          })}
        </ListGroup>
      </section>
    </div>
  );
};

export default CityBoard;
