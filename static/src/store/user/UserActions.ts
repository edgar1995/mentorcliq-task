import { IUser, IUserEmployee, USER_REDUCER_ACTIONS } from './UserReducer';

export interface IUserAction {
  type: string;
  payload?: {
    employeeGroup?: IUserEmployee[];
    employeeId?: number;
    username?: string;
    password?: string;
    errors?: string[];
    user?: IUser;
  };
}

export function attemptSetEmployeeGroup(employeeGroup: IUserEmployee[]): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTEMPT_SET_EMPLOYEE_GROUP, payload: { employeeGroup } };
}

export function setEmployeeGroupSucceed(employeeGroup: IUserEmployee[]): IUserAction {
  return { type: USER_REDUCER_ACTIONS.SET_EMPLOYEE_GROUP_SUCCEED, payload: { employeeGroup } };
}

export function attemptAttachEmployee(employeeId: number): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTEMPT_ATTACH_EMPLOYEE, payload: { employeeId } };
}

export function attachEmployeeSucceed(employeeId: number): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTACH_EMPLOYEE_SUCCEED, payload: { employeeId } };
}

export function attemptSignIn(username: string, password: string): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTEMPT_SIGN_IN, payload: { username, password } };
}

export function attemptSignUp(username: string, password: string): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTEMPT_SIGN_UP, payload: { username, password } };
}

export function signInSucceed(user: IUser): IUserAction {
  return { type: USER_REDUCER_ACTIONS.SIGN_IN_SUCCEED, payload: { user } };
}

export function signInFailed(errors: string[]): IUserAction {
  return { type: USER_REDUCER_ACTIONS.SIGN_IN_FAILED, payload: { errors } };
}

export function attemptSignOut(): IUserAction {
  return { type: USER_REDUCER_ACTIONS.ATTEMPT_SIGN_OUT };
}

export function signOutSucceed(): IUserAction {
  return { type: USER_REDUCER_ACTIONS.SIGN_OUT_SUCCEED };
}

export function resetUserErrors(): IUserAction {
  return { type: USER_REDUCER_ACTIONS.RESET_ERRORS };
}

export function resetUserData(): IUserAction {
  return { type: USER_REDUCER_ACTIONS.RESET };
}
