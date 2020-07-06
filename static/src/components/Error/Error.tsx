import React from 'react';
import classNames from 'classnames';

import styles from './error.css';

export function Error({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={classNames({
        [className]: !!className,
        [styles.error]: true,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
