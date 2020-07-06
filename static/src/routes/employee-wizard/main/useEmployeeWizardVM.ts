import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { attemptAddEmployee } from '../../../store/employee/EmployeeActions';
import { ISelectorVariables } from '../../../store/rootSelector';

import { stateSelector } from '../../../helpers/reduxUtils';

const selectorVariables: ISelectorVariables = {
  userData: {
    userEmployeeId: true,
  },
};

export function useEmployeeWizardVM() {
  const { userEmployeeId } = useSelector(stateSelector(selectorVariables));

  const dispatch = useDispatch();

  const [isEmployeeStep, setIsEmployeeStep] = useState(false);

  function handleFormSubmit(values) {
    dispatch(attemptAddEmployee(values));
  }

  function toggleStep() {
    setIsEmployeeStep(prevState => !prevState);
  }

  return {
    handleFormSubmit,
    userEmployeeId,
    isEmployeeStep,
    toggleStep,
  };
}
