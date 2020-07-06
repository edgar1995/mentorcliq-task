import React from 'react';
import * as yup from 'yup';
import { Redirect } from 'react-router';

import { FormInput } from '../../../components/FormInput/FormInput';
import { Button } from '../../../components/Button/Button';
import { Error } from '../../../components/Error/Error';
import { Form } from '../../../components/Form/Form';

import { URLS } from '../../configs';

import { useLoginVM } from './useLoginVM';

import styles from './login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const vm = useLoginVM();

  if (vm.isLoggedIn) {
    return <Redirect to={URLS.profile} />;
  }

  return (
    <Form
      validationScheme={yup.object().shape({
        username: yup.string().trim().required().min(5),
        password: yup.string().trim().required().min(5),
      })}
      initialValues={{
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
          Log in
        </Button>
        <Button
          to={URLS.registration}
          as={Link}
          secondary
        >
          Sign up
        </Button>
      </div>
    </Form>
  );
}
