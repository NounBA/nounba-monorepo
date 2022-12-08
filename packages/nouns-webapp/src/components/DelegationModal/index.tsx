import classes from './DelegationModal.module.css';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import ChangeDelegatePannel from '../ChangeDelegatePannel';
import CurrentDelegatePannel from '../CurrentDelegatePannel';
import { X } from 'lucide-react';

export const Backdrop: React.FC<{ onDismiss: () => void }> = props => {
  return <div className={classes.backdrop} onClick={props.onDismiss} />;
};

const DelegationModalOverlay: React.FC<{
  onDismiss: () => void;
  delegateTo?: string;
}> = props => {
  const { onDismiss, delegateTo } = props;

  const [isChangingDelegation, setIsChangingDelegation] = useState(delegateTo !== undefined);

  return (
    <div className={classes.modal}>
      <button onClick={onDismiss} className={classes.closeBtn}>
        <X size={24} />
      </button>
      {isChangingDelegation ? (
        <ChangeDelegatePannel onDismiss={onDismiss} delegateTo={delegateTo} />
      ) : (
        <CurrentDelegatePannel
          onPrimaryBtnClick={() => setIsChangingDelegation(true)}
          onSecondaryBtnClick={onDismiss}
        />
      )}
    </div>
  );
};

const DelegationModal: React.FC<{
  onDismiss: () => void;
  delegateTo?: string;
}> = props => {
  const { onDismiss, delegateTo } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={onDismiss} />,
        document.getElementById('backdrop-root')!,
      )}
      {ReactDOM.createPortal(
        <DelegationModalOverlay onDismiss={onDismiss} delegateTo={delegateTo} />,
        document.getElementById('overlay-root')!,
      )}
    </>
  );
};

export default DelegationModal;
