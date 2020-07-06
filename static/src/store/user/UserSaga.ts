import { call, put, takeLatest } from 'redux-saga/effects';
import { Container } from 'typedi';

import {
  attachEmployeeSucceed,
  IUserAction,
  resetUserData,
  setEmployeeGroupSucceed,
  signInFailed,
  signInSucceed,
  signOutSucceed
} from './UserActions';
import { USER_REDUCER_ACTIONS } from './UserReducer';
import { UserService } from './UserService';

const userService = Container.get(UserService);

function* attemptSetEmployeeGroup({ payload: { employeeGroup } }: IUserAction): any {
  try {
    yield call(userService.setEmployeeGroup, employeeGroup);

    yield put(setEmployeeGroupSucceed(employeeGroup));
  } catch ({ message }) {
    yield put(signInFailed([message]));
  }
}

function* attemptAttachEmployee({ payload: { employeeId } }: IUserAction): any {
  try {
    yield call(userService.attachEmployee, employeeId);

    yield put(attachEmployeeSucceed(employeeId));
  } catch ({ message }) {
    yield put(signInFailed([message]));
  }
}

function* attemptSignIn({ payload: { username, password } }: IUserAction): any {
  try {
    const user = yield call(userService.signIn, username, password);

    yield put(signInSucceed(user));
  } catch ({ message }) {
    yield put(signInFailed([message]));
  }
}

function* attemptSignUp({ payload: { username, password } }: IUserAction): any {
  try {
    const user = yield call(userService.signUp, username, password);

    yield put(signInSucceed(user));
  } catch ({ message }) {
    yield put(signInFailed([message]));
  }
}

function* attemptSignOut(): any {
  try {
    yield call(userService.signOut);

    yield put(signOutSucceed());
    yield put(resetUserData());
  } catch ({ message }) {

  }
}

export function* userSaga(): any {
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SET_EMPLOYEE_GROUP, attemptSetEmployeeGroup);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_ATTACH_EMPLOYEE, attemptAttachEmployee);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SIGN_OUT, attemptSignOut);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SIGN_UP, attemptSignUp);
  yield takeLatest(USER_REDUCER_ACTIONS.ATTEMPT_SIGN_IN, attemptSignIn);
}
