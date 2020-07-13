import { call, put, takeLatest } from 'redux-saga/effects';
import { Container } from 'typedi';

import { attemptAttachEmployee } from '../user/UserActions';

import { getEmployeesSucceed, IEmployeeAction } from './EmployeeActions';
import { EMPLOYEE_REDUCER_ACTIONS } from './EmployeeReducer';
import { EmployeeService } from './EmployeeService';

const employeeService = Container.get(EmployeeService);

function* attemptGetEmployees(): any {
  try {
    const employees = yield call(employeeService.getEmployees);

    yield put(getEmployeesSucceed(employees));
  } catch ({ message }) {
    console.error(message);
  }
}

function* attemptAddEmployee({ payload: { employee } }: IEmployeeAction): any {
  try {
    const employees = yield call(employeeService.getEmployees);
    employee.id = employees[employees.length - 1].id + 1;

    const createdEmployee = yield call(employeeService.addEmployee, employee);

    yield put(attemptAttachEmployee(createdEmployee.id));
    yield put(getEmployeesSucceed([...employees, createdEmployee]));
  } catch ({ message }) {
    console.error(message);
  }
}

export function* employeeSaga(): any {
  yield takeLatest(EMPLOYEE_REDUCER_ACTIONS.ATTEMPT_GET_EMPLOYEES, attemptGetEmployees);
  yield takeLatest(EMPLOYEE_REDUCER_ACTIONS.ATTEMPT_ADD_EMPLOYEE, attemptAddEmployee);
}
