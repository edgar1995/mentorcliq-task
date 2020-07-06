import { List, Map } from 'immutable';

import { IEmployee } from './EmployeeReducer';

import {
  userEmployeeIdSelector,
  userEmployeeIdsGroupSelector,
  userEmployeeOrderByIdsSelector
} from '../user/UserSelector';

import { createSelector } from '../../helpers/utils';

const employeeDataSelector: any = state => state.get('employeeData');

export const employeesListSelector: any = createSelector(
  employeeDataSelector,
  userEmployeeIdSelector,
  (employeeData, id) => employeeData.get('employees').filter(employee => employee.get('id') !== id)
);

export const userEmployeeSelector: any = createSelector(
  employeeDataSelector,
  userEmployeeIdSelector,
  (employeeData, id) => employeeData.get('employees').find(employee => employee.get('id') === id)
);

export const userEmployeesSelector: any = createSelector(
  employeesListSelector,
  userEmployeeIdsGroupSelector,
  userEmployeeOrderByIdsSelector,
  (employees, ids, orderByIds) => employees
    .filter(employee => ids.includes(employee.get('id')))
    .sort((employee1, employee2) => {
      const order1 = orderByIds.get(`${employee1.get('id')}`);
      const order2 = orderByIds.get(`${employee2.get('id')}`);

      return order1 - order2;
    }),
);

export interface IEmployeeModuleProps extends Map<string, any> {
  employees: List<IEmployee>;
  userEmployees: IEmployee[];
  userEmployee: IEmployee;
}

export interface IEmployeeDataSelectorVariables {
  userEmployees?: boolean;
  userEmployee?: boolean;
  employees?: boolean;
}

export const employeeSelector = {
  main: state => ({ employee: employeeDataSelector(state) }),
  userEmployees: userEmployeesSelector,
  userEmployee: userEmployeeSelector,
  employees: employeesListSelector,
};
