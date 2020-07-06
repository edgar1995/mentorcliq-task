import React from 'react';

import classNames from 'classnames';

import styles from './label.css';

interface ILabelProps {
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
  isValid?: boolean;
  [prop: string]: any;
}

export function Label({
  hasError,
  disabled,
  className,
  children,
  ...props
}: ILabelProps) {
  const labelClasses = classNames({
    [styles.label]: true,
    [className]: true,
    [styles.error]: hasError,
    [styles.disabled]: disabled,
  });

  return (
    <label
      className={labelClasses}
      {...props}
    >
      {children}
    </label>
  );
}
