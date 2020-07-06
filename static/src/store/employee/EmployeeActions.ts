import { EMPLOYEE_REDUCER_ACTIONS, IEmployee } from './EmployeeReducer';

export interface IEmployeeAction {
  type: string;
  payload?: {
    employees?: IEmployee[];
    employee?: IEmployee;
  };
}

export function attemptGetEmployees(): IEmployeeAction {
  return { type: EMPLOYEE_REDUCER_ACTIONS.ATTEMPT_GET_EMPLOYEES };
}

export function getEmployeesSucceed(employees: IEmployee[]): IEmployeeAction {
  return { type: EMPLOYEE_REDUCER_ACTIONS.GET_EMPLOYEES_SUCCEED, payload: { employees } };
}

export function attemptAddEmployee(employee): IEmployeeAction {
  return { type: EMPLOYEE_REDUCER_ACTIONS.ATTEMPT_ADD_EMPLOYEE, payload: { employee } };
}
