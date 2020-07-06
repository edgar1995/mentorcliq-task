import React from 'react';
import * as yup from 'yup';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { FormInput } from '../../../components/FormInput/FormInput';
import { Button } from '../../../components/Button/Button';
import { Error } from '../../../components/Error/Error';
import { Form } from '../../../components/Form/Form';

import { URLS } from '../../configs';

import { useRegistrationVM } from './useRegistrationVM';

import styles from './registration.css';

export default function Registration() {
  const vm = useRegistrationVM();

  if (vm.isLoggedIn) {
    return <Redirect to={URLS.profile} />;
  }

  return (
    <Form
      validationScheme={yup.object().shape({
        username: yup.string()
          .trim()
          .required()
          .min(5),
        password: yup.string()
          .trim()
          .required()
          .min(5),
        repeatPassword: yup.string()
          .trim()
          .required()
          .min(5)
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
      })}
      initialValues={{
        repeatPassword: '',
        username: '',
        password: '',
      }}
      onSubmit={vm.handleFormSubmit}
    >
      <FormInput
        label='Username'
        name='username'
      />
      <FormInput
        label='Password'
        type='password'
        name='password'
      />
      <FormInput
        label='Repeat password'
        name='repeatPassword'
        type='password'
      />
      {vm.errorFields.map((message, index) => (
        <Error
          className={styles.error}
          key={index}
        >
          {message}
        </Error>
      ))}
      <div className={styles.actions}>
        <Button
          type='submit'
          primary
        >
          Sign up
        </Button>
        <Button
          to={URLS.login}
          as={Link}
          secondary
        >
          Log in
        </Button>
      </div>
    </Form>
  );
}
