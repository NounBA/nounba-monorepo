import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './CityBoard.module.css';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import citiesByRegion from '../../utils/cities';
import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { REGIONS } from '../../config';

type CityItemProps = {
  name: string;
  id: number;
  isDisabled?: boolean;
  isSelected?: boolean;
  cityRef?: RefObject<HTMLAnchorElement> | null;
};
const CityItem = ({ id, name, isDisabled = false, isSelected, cityRef }: CityItemProps) => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push(`/nounba/${id}`);
  };
  return (
    <ListGroupItem className={classes.itemWrapper} ref={cityRef}>
      <Button
        className={clsx(classes.city, isSelected && classes.isSelected)}
        disabled={isDisabled}
        onClick={onClickHandler}
      >
        <div className={classes.cityWrapper}>
          <span className={classes.avatar} />
          {name}
        </div>
        {!isDisabled && !isSelected && <FontAwesomeIcon icon={faExternalLinkAlt} />}
      </Button>
    </ListGroupItem>
  );
};

type CityBoardProps = {
  auctionID: number;
  side: REGIONS;
  tokenIndex?: number;
};

const setScroll = (element: HTMLDivElement, target: number) => {
  element.scrollTop = target;
};

const CityBoard = ({ auctionID, side, tokenIndex }: CityBoardProps) => {
  const cities = useMemo(() => citiesByRegion[side], [side]);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedCityRef = useRef<HTMLAnchorElement>(null);
  const cityIndex = useMemo(
    () => cities.findIndex(city => city.tokenIndex === tokenIndex),
    [cities, tokenIndex],
  );

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
      <section className={classes.wrapper}>
        <h1 className={classes.title}>
          {side === REGIONS.east ? 'East' : 'West'} <Trans>team current bid</Trans>
        </h1>
        <ListGroup
          className={clsx(classes.list, side === REGIONS.east && classes.blueList)}
          ref={listRef}
        >
          {cities.map((city, index) =>
            city.displayName.indexOf('Dev') !== -1 ? null : (
              <CityItem
                key={city.tokenIndex}
                id={city.id}
                name={city.displayName}
                isSelected={city.tokenIndex === tokenIndex}
                isDisabled={index > cityIndex}
                cityRef={city.tokenIndex === tokenIndex ? selectedCityRef : null}
              />
            ),
          )}
        </ListGroup>
      </section>
    </div>
  );
};

export default CityBoard;
