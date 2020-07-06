import React, { useContext } from 'react';
import classNames from 'classnames';

import { Input } from '../Input/Input';
import { Label } from '../Label/Label';

import { FormContext } from '../Form/FormContext';

import styles from './formInput.css';

interface IFormInputProps {
  label: string;
  name: string;
  labelClassName?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  [prop: string]: any;
}

export function FormInput({
  label,
  name,
  labelClassName = '',
  placeholder = '',
  className = '',
  type = 'text',
  ...props
}: IFormInputProps) {
  const { values, errors, handleInputChange, touched } = useContext(FormContext);

  return (
    <Label
      className={classNames({
        [labelClassName]: !!labelClassName,
        [styles.label]: true,
      })}
      hasError={touched[name] && !!errors[name]}
    >
      {label}
      <Input
        {...props}
        className={classNames({
          [className]: !!className,
          [styles.input]: true,
        })}
        error={touched[name] ? errors[name] : ''}
        placeholder={placeholder || label}
        onChange={handleInputChange}
        value={values[name]}
        name={name}
        type={type}
      />
    </Label>
  );
}
