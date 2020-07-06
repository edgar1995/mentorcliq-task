import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { attemptSignUp, attemptSignIn, resetUserErrors } from '../../../store/user/UserActions';
import { ISelectorVariables } from '../../../store/rootSelector';

import { stateSelector } from '../../../helpers/reduxUtils';

const selectorVariables: ISelectorVariables = {
  userData: {
    errorFields: true,
    isLoggedIn: true,
  },
};

export function useRegistrationVM() {
  const { isLoggedIn, errorFields } = useSelector(stateSelector(selectorVariables));

  const dispatch = useDispatch();

  function handleFormSubmit(values) {
    dispatch(attemptSignUp(values.username, values.password));
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch(attemptSignIn(user.username, user.password));
    }

    dispatch(resetUserErrors());
  }, []);

  return {
    handleFormSubmit,
    errorFields,
    isLoggedIn,
  };
}
