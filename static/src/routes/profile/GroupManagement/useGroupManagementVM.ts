import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { List, Map } from 'immutable';

import { attemptSetEmployeeGroup, attemptSignOut } from '../../../store/user/UserActions';
import { attemptGetEmployees } from '../../../store/employee/EmployeeActions';
import { IEmployee } from '../../../store/employee/EmployeeReducer';
import { ISelectorVariables } from '../../../store/rootSelector';
import { IUserEmployee } from '../../../store/user/UserReducer';

import { stateSelector } from '../../../helpers/reduxUtils';

const selectorVariables: ISelectorVariables = {
  employeeData: {
    userEmployees: true,
    userEmployee: true,
    employees: true,
  },
  userData: {
    userEmployeeGroup: true,
  },
};

interface IGroupManagementVM {
  moveEmployee: (dragIndex: number, hoverIndex: number) => void;
  onEmployeeCheck: (isChecked: boolean, id: number) => void;
  showDiff: (employee: IEmployee) => void;
  userEmployee: Map<string, string>;
  diffEmployee: Map<string, string>;
  saveUserEmployees: () => void;
  userEmployeeGroup: List<any>;
  userEmployeeSortByIds: any;
  closeDiff: () => void;
  employees: List<any>;
  userEmployees: any[];
  isDiffShown: boolean;
  logOut: () => void;
  isLoading: boolean;
}

export function useGroupManagementVM(): IGroupManagementVM {
  const {
    userEmployees: initialUserEmployees,
    userEmployeeGroup,
    userEmployee,
    employees,
  } = useSelector(stateSelector(selectorVariables));

  const dispatch = useDispatch();
  const history = useHistory();

  const [userEmployees, setUserEmployees] = useState([]);
  const [diffEmployee, setDiffEmployee] = useState(null);
  const [isDiffShown, setIsDiffShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    dispatch(attemptGetEmployees());

    setIsInitial(false);
  }, []);

  useEffect(() => {
    if (employees && employees.size > 0) {
      setIsLoading(false);
    }
  }, [employees]);

  useEffect(() => {
    if (initialUserEmployees && initialUserEmployees.size > 0) {
      if (userEmployees.length === 0) {
        setUserEmployees(initialUserEmployees.toJS());
      } else if (!isInitial) {
        history.push('/profile');
      }
    }
  }, [initialUserEmployees]);

  const userEmployeeSortByIds = {};

  if (userEmployees) {
    userEmployees.forEach((employee, index) => {
      if (employee) {
        userEmployeeSortByIds[employee.id] = index + 1;
      }
    });
  }

  function moveEmployee(dragIndex: number, hoverIndex: number) {
    if (
      (!dragIndex && dragIndex !== 0)
      || (!hoverIndex && hoverIndex !== 0)
      || !userEmployees[dragIndex]
      || !userEmployees[hoverIndex]
    ) {
      return;
    }

    const nextUserEmployees = [...userEmployees];
    [
      nextUserEmployees[hoverIndex],
      nextUserEmployees[dragIndex],
    ] = [
      nextUserEmployees[dragIndex],
      nextUserEmployees[hoverIndex],
    ];

    setUserEmployees(nextUserEmployees);
  }

  function onEmployeeCheck(isChecked: boolean, id: number) {
    if (!isChecked) {
      setUserEmployees(userEmployees.filter(employee => employee.id !== id));
    } else {
      setUserEmployees([...userEmployees, employees.find(employee => employee.get('id') === id).toJS()]);
    }
  }

  function saveUserEmployees() {
    const nextUserEmployeeGroup: IUserEmployee[] = userEmployees.map((employee, index) => ({
      employeeId: employee.id,
      order: index + 1,
    }));

    dispatch(attemptSetEmployeeGroup(nextUserEmployeeGroup));
  }

  function showDiff(employee) {
    setDiffEmployee(employee);
    setIsDiffShown(true);
  }

  function closeDiff() {
    setIsDiffShown(false);
    setDiffEmployee(null);
  }

  return {
    logOut: () => dispatch(attemptSignOut()),
    userEmployeeSortByIds,
    saveUserEmployees,
    userEmployeeGroup,
    onEmployeeCheck,
    userEmployees,
    moveEmployee,
    userEmployee,
    diffEmployee,
    isDiffShown,
    employees,
    isLoading,
    closeDiff,
    showDiff,
  };
}
