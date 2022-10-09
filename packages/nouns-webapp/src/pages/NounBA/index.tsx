import classes from './NounBA.module.css';
import NounbaHistory from '../../components/NounbaHistory';
import Documentation from '../../components/Documentation';
// import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { PastAuctionContextProvider } from '../../contexts/PastAuctionContext';

interface NounBAPageProps {
  initialAuctionId: string;
}

const NounBAPage: React.FC<NounBAPageProps> = props => {
  const { initialAuctionId } = props;

  return (
    <PastAuctionContextProvider nounId={initialAuctionId}>
      <div className={classes.wrapper}>
        <NounbaHistory />
        {/* <ProfileActivityFeed nounId={auction.nounId.toNumber()} /> */}
        <Documentation />
      </div>
    </PastAuctionContextProvider>
  );
};
export default NounBAPage;
