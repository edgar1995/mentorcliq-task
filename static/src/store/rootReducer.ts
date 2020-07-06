import { combineReducers } from 'redux-immutable';

import { employeeReducer } from './employee/EmployeeReducer';
import { userReducer } from './user/UserReducer';

export const rootReducer = combineReducers({
  employeeData: (state: any, payload) => employeeReducer(state, payload),
  userData: (state: any, payload) => userReducer(state, payload),
});
