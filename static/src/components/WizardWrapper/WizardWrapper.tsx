import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { ISelectorVariables } from '../../store/rootSelector';

import { stateSelector } from '../../helpers/reduxUtils';

import { URLS } from '../../routes/configs';

const selectorVariables: ISelectorVariables = {
  userData: {
    userEmployeeId: true,
  },
};

export function WizardWrapper({ children }) {
  const { userEmployeeId } = useSelector(stateSelector(selectorVariables));

  return userEmployeeId ? children : <Redirect to={URLS.employeeWizard} />;
}
