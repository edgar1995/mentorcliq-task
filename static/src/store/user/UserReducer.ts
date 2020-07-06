import { fromJS, List, Map } from 'immutable';

import { IUserAction } from './UserActions';

export interface IUserReducerActions {
  ATTEMPT_SET_EMPLOYEE_GROUP: string;
  SET_EMPLOYEE_GROUP_SUCCEED: string;
  ATTEMPT_ATTACH_EMPLOYEE: string;
  ATTACH_EMPLOYEE_SUCCEED: string;
  ATTEMPT_SIGN_OUT: string;
  SIGN_OUT_SUCCEED: string;
  ATTEMPT_SIGN_UP: string;
  ATTEMPT_SIGN_IN: string;
  SIGN_IN_SUCCEED: string;
  SIGN_IN_FAILED: string;
  RESET_ERRORS: string;
  RESET: string;
}

export const USER_REDUCER_ACTIONS: IUserReducerActions = {
  ATTEMPT_SET_EMPLOYEE_GROUP: 'USER:ATTEMPT_SET_EMPLOYEE_GROUP',
  SET_EMPLOYEE_GROUP_SUCCEED: 'USER:SET_EMPLOYEE_GROUP_SUCCEED',
  ATTEMPT_ATTACH_EMPLOYEE: 'USER:ATTEMPT_ATTACH_EMPLOYEE',
  ATTACH_EMPLOYEE_SUCCEED: 'USER:ATTACH_EMPLOYEE_SUCCEED',
  ATTEMPT_SIGN_OUT: 'USER:ATTEMPT_SIGN_OUT',
  SIGN_OUT_SUCCEED: 'USER:SIGN_OUT_SUCCEED',
  ATTEMPT_SIGN_UP: 'USER:ATTEMPT_SIGN_UP',
  ATTEMPT_SIGN_IN: 'USER:ATTEMPT_SIGN_IN',
  SIGN_IN_SUCCEED: 'USER:SIGN_IN_SUCCEED',
  SIGN_IN_FAILED: 'USER:SIGN_IN_FAILED',
  RESET_ERRORS: 'USER:RESET_ERRORS',
  RESET: 'USER:RESET',
};

export interface IUserEmployee {
  employeeId: number;
  order: number;
}

export interface IUser {
  employeeGroup: IUserEmployee[];
  employeeId: number;
  username: string;
  id: number;
}

interface IUserData extends Map<string, any> {
  errorFields: List<string>;
  isLoggedIn: boolean;
  user: IUser;
}

const defaultUserState: IUserData = fromJS({
  isLoggedIn: false,
  errorFields: [],
  user: null,
});

export function userReducer(state: IUserData = defaultUserState, { type, payload }: IUserAction): IUserData {
  switch (type) {
    case USER_REDUCER_ACTIONS.SET_EMPLOYEE_GROUP_SUCCEED:
      return state.setIn(['user', 'employeeGroup'], fromJS(payload.employeeGroup));

    case USER_REDUCER_ACTIONS.ATTACH_EMPLOYEE_SUCCEED:
      return state.setIn(['user', 'employeeId'], fromJS(payload.employeeId));

    case USER_REDUCER_ACTIONS.SIGN_IN_SUCCEED:
      return state.set('user', fromJS(payload.user)).set('isLoggedIn', true);

    case USER_REDUCER_ACTIONS.SIGN_OUT_SUCCEED:
      return state.set('user', null).set('isLoggedIn', false);

    case USER_REDUCER_ACTIONS.SIGN_IN_FAILED:
      return state.set('errorFields', fromJS(payload.errors));

    case USER_REDUCER_ACTIONS.RESET_ERRORS:
      return state.set('errorFields', List());

    case USER_REDUCER_ACTIONS.RESET:
      return defaultUserState;

    default:
      return state;
  }
}
