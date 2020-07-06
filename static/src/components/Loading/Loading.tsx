import React from 'react';
import classNames from 'classnames';

import styles from './loading.css';

interface ILoadingProps {
  secondary?: boolean;
  primary?: boolean;
}

export const Loading: React.FunctionComponent<ILoadingProps> = ({
  secondary = false,
  primary = true,
}) => {
  const circleClasses = classNames({
    [styles.circle]: true,
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <svg className={styles.spinner}>
          <circle className={circleClasses} cx='20' cy='20' r='18' />
        </svg>
      </div>
    </div>
  );
};
