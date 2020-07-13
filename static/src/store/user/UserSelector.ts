import { fromJS, List, Map } from 'immutable';

import { IUser, IUserEmployee } from './UserReducer';

import { createSelector } from '../../helpers/utils';

const userDataSelector: any = state => state.get('userData');

export const errorFieldsSelector: any = createSelector(
  userDataSelector, userData => userData.get('errorFields'),
);

export const isLoggedInSelector: any = createSelector(
  userDataSelector, userData => userData.get('isLoggedIn'),
);

export const userInstanceSelector: any = createSelector(
  userDataSelector, userData => userData.get('user'),
);

export const userEmployeeIdSelector: any = createSelector(
  userInstanceSelector, user => user && user.get('employeeId'),
);

export const userEmployeeGroupSelector: any = createSelector(
  userInstanceSelector, user => user && user.get('employeeGroup'),
);

export const userEmployeeIdsGroupSelector: any = createSelector(
  userInstanceSelector, user => user && user.get('employeeGroup').map(employee => employee.get('employeeId')),
);

export const userEmployeeOrderByIdsSelector: any = createSelector(
  userInstanceSelector, (user) => {
    const userEmployeeSortByIds = {};

    if (user) {
      user.get('employeeGroup').forEach((employee) => {
        userEmployeeSortByIds[employee.get('employeeId')] = employee.get('order');
      });
    }

    return fromJS(userEmployeeSortByIds);
  },
);

export interface IUserModuleProps extends Map<string, any> {
  userEmployeeOrderByIds: Map<string, number>;
  userEmployeeGroup: List<IUserEmployee>;
  errorFields: List<string>;
  userEmployeeId: number;
  isLoggedIn: boolean;
  user: IUser;
}

export interface IUserDataSelectorVariables {
  userEmployeeOrderByIds?: boolean;
  userEmployeeGroup?: boolean;
  userEmployeeId?: boolean;
  errorFields?: boolean;
  isLoggedIn?: boolean;
  username?: boolean;
  user?: boolean;
}

export const userSelector = {
  main: state => ({ user: userDataSelector(state) }),
  userEmployeeOrderByIds: userEmployeeOrderByIdsSelector,
  userEmployeeGroup: userEmployeeGroupSelector,
  userEmployeeId: userEmployeeIdSelector,
  errorFields: errorFieldsSelector,
  isLoggedIn: isLoggedInSelector,
  user: userInstanceSelector,
};
