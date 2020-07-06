import { employeeSelector, IEmployeeModuleProps, IEmployeeDataSelectorVariables } from './employee/EmployeeSelector';
import { userSelector, IUserModuleProps, IUserDataSelectorVariables } from './user/UserSelector';

export interface IStoreProps extends IUserModuleProps, IEmployeeModuleProps {}

export interface ISelectorVariables {
  employeeData?: true | IEmployeeDataSelectorVariables;
  userData?: true | IUserDataSelectorVariables;
}

export const rootSelector: any = {
  employeeData: employeeSelector,
  userData: userSelector,
};
