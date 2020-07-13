import { fromJS, List, Map } from 'immutable';

import { IEmployeeAction } from './EmployeeActions';

export interface IEmployeeReducerActions {
  ATTEMPT_GET_EMPLOYEES: string;
  GET_EMPLOYEES_SUCCEED: string;
  ATTEMPT_ADD_EMPLOYEE: string;
  RESET: string;
}

export const EMPLOYEE_REDUCER_ACTIONS: IEmployeeReducerActions = {
  ATTEMPT_GET_EMPLOYEES: 'EMPLOYEE:ATTEMPT_GET_EMPLOYEES',
  GET_EMPLOYEES_SUCCEED: 'EMPLOYEE:GET_EMPLOYEES_SUCCEED',
  ATTEMPT_ADD_EMPLOYEE: 'EMPLOYEE:ATTEMPT_ADD_EMPLOYEE',
  RESET: 'EMPLOYEE:RESET',
};

export interface IEmployee {
  department: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  country: string;
  gender: string;
  email: string;
  city: string;
  id: number;
}

interface IEmployeeData extends Map<string, any> {
  employees: List<IEmployee>;
}

const defaultEmployeeState: IEmployeeData = fromJS({
  employees: [],
});

export function employeeReducer(
  state: IEmployeeData = defaultEmployeeState,
  { type, payload }: IEmployeeAction,
): IEmployeeData {
  switch (type) {
    case EMPLOYEE_REDUCER_ACTIONS.GET_EMPLOYEES_SUCCEED:
      return state.set('employees', fromJS(payload.employees));

    case EMPLOYEE_REDUCER_ACTIONS.RESET:
      return defaultEmployeeState;

    default:
      return state;
  }
}
