import React from 'react';
import classNames from 'classnames';

import { Error } from '../Error/Error';

import styles from './input.css';

interface IInputProps {
  disabled?: boolean;
  className?: string;
  error?: string;
  type?: string;
  style?: any;
  [prop: string]: any;
}

export function Input({
  disabled,
  className,
  error,
  style,
  type = 'text',
  ...props
}: IInputProps) {
  const inputWrapperClasses = classNames({
    [styles.inputWrapper]: true,
    [styles.disabled]: disabled,
    [styles.successWrapper]: !error,
    [styles.errorWrapper]: !!error,
    [styles.hidden]: type === 'hidden',
    [className]: true,
  });

  return (
    <div className={styles.margin}>
      <div
        className={inputWrapperClasses}
        style={style}
      >
        <input
          className={styles.input}
          disabled={disabled}
          type={type}
          {...props}
        />
      </div>
      {error && (
        <Error>
          {error}
        </Error>
      )}
    </div>
  );
}
