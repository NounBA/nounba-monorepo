import classes from './Noun.module.css';
import React from 'react';
import clsx from 'clsx';
import Image from 'react-bootstrap/Image';
import loadingNoun from '../../assets/loading-skull-noun.gif';

export const LoadingNoun = (props: { wrapperClassName?: string; className?: string }) => {
  const { wrapperClassName, className } = props;
  return (
    <div className={clsx(classes.imgWrapper, wrapperClassName)}>
      <Image
        className={clsx(classes.img, className)}
        src={loadingNoun}
        alt={'loading noun'}
        fluid
      />
    </div>
  );
};

const Noun: React.FC<{
  imgPath: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}> = props => {
  const { imgPath, alt, className, wrapperClassName } = props;
  return (
    <div className={`${classes.imgWrapper} ${wrapperClassName}`}>
      <Image
        className={`${classes.img} ${className}`}
        src={imgPath ? imgPath : loadingNoun}
        alt={alt}
      />
    </div>
  );
};

export default Noun;
