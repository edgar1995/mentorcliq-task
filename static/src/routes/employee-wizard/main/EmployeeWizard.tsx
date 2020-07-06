import React from 'react';
import * as yup from 'yup';
import { Redirect } from 'react-router';

import { FormInput } from '../../../components/FormInput/FormInput';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';

import { URLS } from '../../configs';

import { useEmployeeWizardVM } from './useEmployeeWizardVM';

import styles from './employeeWizard.css';

export default function EmployeeWizard() {
  const vm = useEmployeeWizardVM();

  if (vm.userEmployeeId) {
    return <Redirect to={URLS.groupManagement} />;
  }

  return (
    <Form
      validationScheme={yup.object().shape({
        email: yup.string().trim().required().email(),
        department: yup.string().trim().required(),
        firstName: yup.string().trim().required(),
        lastName: yup.string().trim().required(),
        jobTitle: yup.string().trim().required(),
        country: yup.string().trim().required(),
        gender: yup.string().trim().required(),
        city: yup.string().trim().required(),
      })}
      initialValues={{
        department: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        country: '',
        gender: '',
        email: '',
        city: '',
      }}
      onSubmit={vm.handleFormSubmit}
    >
      {vm.isEmployeeStep ? (
        <>
          <FormInput
            label='Department'
            name='department'
          />
          <FormInput
            label='Job title'
            name='jobTitle'
          />
        </>
      ) : (
        <>
          <FormInput
            label='First name'
            name='firstName'
          />
          <FormInput
            label='Last name'
            name='lastName'
          />
          <FormInput
            label='Gender'
            name='gender'
          />
          <FormInput
            label='Email'
            name='email'
          />
          <FormInput
            label='Country'
            name='country'
          />
          <FormInput
            label='City'
            name='city'
          />
        </>
      )}
      <div className={styles.actions}>
        {vm.isEmployeeStep ? (
          <>
            <Button
              onClick={vm.toggleStep}
              warning
            >
              Back
            </Button>
            <Button
              type='submit'
              primary
            >
              Save
            </Button>
          </>
        ) : (

          <Button
            onClick={vm.toggleStep}
            primary
          >
            Next
          </Button>
        )}
      </div>
    </Form>
  );
}
