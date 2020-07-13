import React from 'react';
import classNames from 'classnames';

import styles from './button.css';

interface IButtonProps {
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  primary?: boolean;
  warning?: boolean;
  children?: any;
  onClick?: any;
  type?: string;
  as?: any;
  [prop: string]: any;
}

export function Button({
  type = 'button',
  as: Component = 'button',
  disabled = false,
  primary = true,
  secondary = false,
  warning = false,
  onClick = undefined,
  className = '',
  children = null,
  ...props
}: IButtonProps) {
  const buttonClasses = classNames({
    [className]: true,
    [styles.button]: true,
    [styles.primary]: primary && !(secondary || warning),
    [styles.secondary]: secondary,
    [styles.warning]: warning,
    [styles.disabled]: disabled,
  });

  return (
    <Component
      className={buttonClasses}
      disabled={disabled}
      type={type}
      {...props}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </Component>
  );
}
