import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import classes from './CityBoard.module.css';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import citiesByRegion from '../../utils/cities';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { REGIONS } from '../../config';
import { useHistory } from 'react-router-dom';

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
        <span className={classes.avatar} />
        {name}
      </Button>
    </ListGroupItem>
  );
};

type CityBoardProps = {
  auctionID: number;
  side: REGIONS;
};

const setScroll = (element: HTMLDivElement, target: number) => {
  element.scrollTop = target;
};

const CityBoard = ({ auctionID, side }: CityBoardProps) => {
  const [currentID, setCurrentID] = useState(auctionID);
  const cities = useMemo(() => citiesByRegion[side], [side]);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedCityRef = useRef<HTMLAnchorElement>(null);

  const scrollToCity = useCallback(() => {
    if (selectedCityRef.current !== null && listRef.current !== null) {
      setScroll(listRef.current, selectedCityRef.current.offsetTop - 120);
    }
  }, [listRef, selectedCityRef]);

  useEffect(() => {
    if (auctionID) {
      setCurrentID(auctionID);
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
          {cities.map(city => (
            <CityItem
              key={city.id}
              id={city.id}
              name={city.displayName}
              isSelected={city.id === currentID}
              isDisabled={city.id > currentID}
              cityRef={city.id === currentID ? selectedCityRef : null}
            />
          ))}
        </ListGroup>
      </section>
    </div>
  );
};

export default CityBoard;
