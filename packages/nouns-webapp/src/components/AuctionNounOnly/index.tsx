import { StandaloneNounWithSeed } from '../StandaloneNoun';
import { setStateBackgroundColor } from '../../state/slices/application';
import { LoadingNoun } from '../Noun';
import { Auction as IAuction } from '../../wrappers/nounsAuction';
import classes from './AuctionNounOnly.module.css';
import { INounSeed } from '../../wrappers/nounToken';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { beige, grey } from '../../utils/nounBgColors';

interface AuctionNounOnlyProps {
  auction?: IAuction;
}

const AuctionNounOnly: React.FC<AuctionNounOnlyProps> = props => {
  const { auction: currentAuction } = props;

  const dispatch = useAppDispatch();
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  const loadedNounHandler = (seed: INounSeed) => {
    dispatch(setStateBackgroundColor(seed.background === 0 ? grey : beige));
  };

  const nounContent = currentAuction && (
    <div className={classes.nounWrapper}>
      <StandaloneNounWithSeed
        nounId={currentAuction.nounId}
        onLoadSeed={loadedNounHandler}
        shouldLinkToProfile={false}
      />
    </div>
  );

  const loadingNoun = (
    <div className={classes.nounWrapper}>
      <LoadingNoun />
    </div>
  );

  return (
    <div style={{ backgroundColor: stateBgColor }} className={classes.wrapper}>
      {currentAuction ? nounContent : loadingNoun}
    </div>
  );
};

export default AuctionNounOnly;
