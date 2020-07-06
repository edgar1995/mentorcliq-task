import { all } from 'redux-saga/effects';

import { employeeSaga } from './employee/EmployeeSaga';
import { userSaga } from './user/UserSaga';

export function* rootSaga(): any {
  yield all([
    employeeSaga(),
    userSaga(),
  ]);
}
