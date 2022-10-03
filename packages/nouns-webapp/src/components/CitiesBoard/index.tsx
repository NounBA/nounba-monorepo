import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import classes from './CitiesBoard.module.css';
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { east, west } from '../../utils/cities';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

type CityItemProps = {
  name: string;
  isDisabled?: boolean;
  isSelected?: boolean;
};
const CityItem = ({ name, isDisabled = false, isSelected }: CityItemProps) => (
  <ListGroupItem className={classes.itemWrapper}>
    <Button className={clsx(classes.city, isSelected && classes.isSelected)} disabled={isDisabled}>
      <span className={classes.avatar} />
      {name}
    </Button>
  </ListGroupItem>
);

type CitiesBoardProps = {
  westAuctionID?: BigNumber;
  eastAuctionID?: BigNumber;
};

const CitiesBoard = ({ westAuctionID, eastAuctionID }: CitiesBoardProps) => {
  const [westCurrentId, setWestCurrentId] = useState(westAuctionID?.toNumber() ?? 1);
  const [eastCurrentId, setEastCurrentId] = useState(eastAuctionID?.toNumber() ?? 2);

  useEffect(() => {
    if (westAuctionID) {
      setWestCurrentId(westAuctionID.toNumber());
    }
  }, [westAuctionID]);
  useEffect(() => {
    if (eastAuctionID) {
      setEastCurrentId(eastAuctionID.toNumber());
    }
  }, [eastAuctionID]);

  return (
    <section className={classes.wrapper}>
      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 6 }}>
            <h1 className={classes.title}>
              <Trans>Western team current bid</Trans>
            </h1>
            <ListGroup className={classes.list}>
              {west.map(city => (
                <CityItem
                  name={city.displayName}
                  isSelected={city.id === westCurrentId}
                  isDisabled={city.id > westCurrentId}
                />
              ))}
            </ListGroup>
          </Col>
          <Col lg={{ span: 6 }}>
            <h1 className={classes.title}>
              <Trans>Eastern team current bid</Trans>
            </h1>
            <ListGroup className={clsx(classes.list, classes.blueList)}>
              {east.map(city => (
                <CityItem
                  name={city.displayName}
                  isSelected={city.id === eastCurrentId}
                  isDisabled={city.id > eastCurrentId}
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CitiesBoard;
