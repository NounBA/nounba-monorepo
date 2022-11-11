import clsx from 'clsx';
import { ExternalLink } from 'lucide-react';
import Modal from '../Modal';
import NounInfoRowButton from '../NounInfoRowButton';
import classes from './NotifyModal.module.css';

const NotifyModal: React.FC<{ onDismiss: () => void }> = props => {
  const { onDismiss } = props;

  const content = (
    <div className={classes.NotifyModal}>
      <p className={classes.text}>
        We will notify you when a new bid is placed or when a new auction begins or ends.
      </p>
      <NounInfoRowButton
        icon={<ExternalLink size={24} className={classes.buttonIcon} />}
        btnText={'Notify me'}
        onClickHandler={() => {
          window.open('https://notif.yzlb.net/subscribe/?type=NounBA');
          onDismiss();
        }}
        className={clsx(classes.modalButton, classes.blueButton)}
      />
      <NounInfoRowButton
        btnText={'Mayber later'}
        onClickHandler={onDismiss}
        className={classes.modalButton}
      />
    </div>
  );
  return <Modal title={'Get notified'} content={content} onDismiss={onDismiss} />;
};
export default NotifyModal;
