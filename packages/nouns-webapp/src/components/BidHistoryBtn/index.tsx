import bidBtnClasses from './BidHistoryBtn.module.css';

import { useAppSelector } from '../../hooks';
import { Trans } from '@lingui/macro';
import { Button } from 'react-bootstrap';

const BidHistoryBtn: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props;

  const isCool = useAppSelector(state => state.application.stateBackgroundColor) === '#d5d7e1';

  return (
    <div
      className={isCool ? bidBtnClasses.bidHistoryWrapperCool : bidBtnClasses.bidHistoryWrapperWarm}
      onClick={onClick}
    >
      <Button className={bidBtnClasses.bidHistory}>
        <Trans>View all bids</Trans>
      </Button>
    </div>
  );
};
export default BidHistoryBtn;
