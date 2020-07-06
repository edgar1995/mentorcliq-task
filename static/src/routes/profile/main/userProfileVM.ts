import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { attemptGetEmployees } from '../../../store/employee/EmployeeActions';
import { attemptSignOut } from '../../../store/user/UserActions';
import { ISelectorVariables } from '../../../store/rootSelector';

import { stateSelector } from '../../../helpers/reduxUtils';

const selectorVariables: ISelectorVariables = {
  employeeData: {
    userEmployees: true,
    userEmployee: true,
  },
  userData: {
    user: true,
  },
};

export function userProfileVM() {
  const { user, userEmployee, userEmployees } = useSelector(stateSelector(selectorVariables));

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(attemptGetEmployees());
  }, []);

  useEffect(() => {
    if (userEmployee) {
      setIsLoading(false);
    }
  }, [userEmployee]);

  return {
    logOut: () => dispatch(attemptSignOut()),
    userEmployees,
    userEmployee,
    isLoading,
    user,
  };
}
