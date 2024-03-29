import { ImageData as data, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { BigNumber as EthersBN } from 'ethers';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { INounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';
import classes from './StandaloneNoun.module.css';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import nounClasses from '../Noun/Noun.module.css';

interface StandaloneNounProps {
  nounId: EthersBN;
  className?: string;
}
interface StandaloneCircularNounProps {
  nounId: EthersBN;
  border?: boolean;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  shouldLinkToProfile: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const getNoun = (nounId: string | EthersBN, seed: INounSeed, hasBg = false) => {
  const id = nounId.toString();
  const name = `Nounba ${id}`;
  const description = `Nounba ${id} is a member of the NounBA DAO`;
  const { parts, background } = getNounData(seed);

  const image = `data:image/svg+xml;base64,${btoa(
    buildSVG(parts, data.palette, background, !hasBg),
  )}`;

  return {
    name,
    description,
    image,
  };
};

const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId, className } = props;
  const seed = useNounSeed(nounId);

  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/noun/' + nounId.toString()}
      className={clsx(classes.clickableNoun, className)}
      onClick={onClickHandler}
    >
      <Noun imgPath={noun ? noun.image : ''} alt={noun ? noun.description : 'Noun'} />
    </Link>
  );
};

export const StandaloneNounCircular: React.FC<StandaloneCircularNounProps> = (
  props: StandaloneCircularNounProps,
) => {
  const { nounId, border } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  if (!seed || !nounId) return <Noun imgPath="" alt="NounBA empty" />;

  return (
    <Link
      to={'/nounba/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'NounBA'}
        wrapperClassName={nounClasses.circularNounWrapper}
        className={clsx(
          border ? nounClasses.circleWithBorder : nounClasses.circular,
          nounClasses.withImage,
        )}
      />
    </Link>
  );
};

export const StandaloneNounRoundedCorners: React.FC<StandaloneNounProps> = (
  props: StandaloneNounProps,
) => {
  const { nounId, className } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/noun/' + nounId.toString()}
      className={clsx(classes.clickableNoun, className)}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'Noun'}
        className={nounClasses.rounded}
      />
    </Link>
  );
};

export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (
  props: StandaloneNounWithSeedProps,
) => {
  const { nounId, shouldLinkToProfile, className, wrapperClassName } = props;

  const dispatch = useDispatch();
  const seed = useNounSeed(nounId);
  const seedIsInvalid = Object.values(seed || {}).every(v => v === 0);

  if (!seed || seedIsInvalid || !nounId) {
    return <Noun imgPath="" alt="Noun" />;
  }

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };
  const { image, description } = getNoun(nounId, seed);

  const noun = (
    <Noun
      wrapperClassName={wrapperClassName}
      className={className}
      imgPath={image}
      alt={description}
    />
  );
  const nounWithLink = (
    <Link
      to={'/nounba/' + nounId.toString()}
      className={clsx(classes.clickableNoun, className)}
      onClick={onClickHandler}
    >
      {noun}
    </Link>
  );
  return shouldLinkToProfile ? nounWithLink : noun;
};

export default StandaloneNoun;
