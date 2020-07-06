import React from 'react';
import { ObjectSchema } from 'yup';
import classNames from 'classnames';

import { Loading } from '../Loading/Loading';

import { FormContext } from './FormContext';

import { useFormVM } from './useFormVM';

import styles from './form.css';

interface IFormProps {
  onSubmit: (event: any) => void;
  children: any;
  initialValues?: {
    [key: string]: string | number;
  };
  validationScheme?: ObjectSchema<any>;
  wrapperClassName?: string;
  className?: string;
  [prop: string]: any;
}

export function Form({
  onSubmit,
  children,
  initialValues = {},
  validationScheme = null,
  wrapperClassName = '',
  className = '',
  ...props
}: IFormProps) {
  const vm = useFormVM({ onSubmit, initialValues, validationScheme });

  if (vm.isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={classNames({
        [wrapperClassName]: !!wrapperClassName,
        [styles.formWrapper]: true,
      })}
    >
      <form
        {...props}
        className={classNames({
          [className]: !!className,
          [styles.form]: true,
        })}
        onSubmit={vm.handleFromSubmit}
      >
        <FormContext.Provider
          value={{
            handleInputChange: vm.handleInputChange,
            touched: vm.touched,
            errors: vm.errors,
            values: vm.values,
          }}
        >
          {children}
        </FormContext.Provider>
      </form>
    </div>
  );
}
