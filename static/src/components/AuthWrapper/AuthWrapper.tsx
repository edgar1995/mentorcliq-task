import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import { ISelectorVariables } from '../../store/rootSelector';

import { stateSelector } from '../../helpers/reduxUtils';

import { URLS } from '../../routes/configs';

const selectorVariables: ISelectorVariables = {
  userData: {
    isLoggedIn: true,
  },
};

export function AuthWrapper({ children }) {
  const { isLoggedIn } = useSelector(stateSelector(selectorVariables));

  return isLoggedIn ? children : <Redirect to={URLS.login} />;
}
