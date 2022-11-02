import React from 'react';
import clsx from 'clsx';
import classes from './NounInfoRowButton.module.css';
import { useAppSelector } from '../../hooks';

interface NounInfoRowButtonProps {
  icon?: React.ReactNode;
  btnText: React.ReactNode;
  onClickHandler: () => void;
  className?: string;
}

const NounInfoRowButton: React.FC<NounInfoRowButtonProps> = props => {
  const { icon, btnText, onClickHandler, className } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  return (
    <div
      className={clsx(isCool ? classes.nounButtonCool : classes.nounButtonWarm, className)}
      onClick={onClickHandler}
    >
      <div className={classes.nounButtonContents}>{btnText}</div>
      {icon && icon}
    </div>
  );
};

export default NounInfoRowButton;
