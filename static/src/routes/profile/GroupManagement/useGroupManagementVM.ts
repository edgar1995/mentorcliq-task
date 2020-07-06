import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { List } from 'immutable';

import { attemptSetEmployeeGroup, attemptSignOut } from '../../../store/user/UserActions';
import { attemptGetEmployees } from '../../../store/employee/EmployeeActions';
import { ISelectorVariables } from '../../../store/rootSelector';
import { IUserEmployee } from '../../../store/user/UserReducer';

import { stateSelector } from '../../../helpers/reduxUtils';

const selectorVariables: ISelectorVariables = {
  employeeData: {
    userEmployees: true,
    employees: true,
  },
  userData: {
    userEmployeeGroup: true,
  },
};

interface IGroupManagementVM {
  moveEmployee: (dragIndex: number, hoverIndex: number) => void;
  onEmployeeCheck: (isChecked: boolean, id: number) => void;
  saveUserEmployees: () => void;
  userEmployeeGroup: List<any>;
  userEmployeeSortByIds: any;
  employees: List<any>;
  userEmployees: any[];
  logOut: () => void;
  isLoading: boolean;
}

export function useGroupManagementVM(): IGroupManagementVM {
  const { employees, userEmployeeGroup, userEmployees: initialUserEmployees } = useSelector(stateSelector(selectorVariables));

  const dispatch = useDispatch();
  const history = useHistory();

  const [userEmployees, setUserEmployees] = useState([]);
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

  userEmployees && userEmployees.forEach((employee, index) => {
    if (employee) {
      userEmployeeSortByIds[employee.id] = index + 1;
    }
  });

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
    const userEmployeeGroup: IUserEmployee[] = userEmployees.map((employee, index) => ({
      employeeId: employee.id,
      order: index + 1,
    }));

    dispatch(attemptSetEmployeeGroup(userEmployeeGroup));
  }

  return {
    logOut: () => dispatch(attemptSignOut()),
    userEmployeeSortByIds,
    saveUserEmployees,
    userEmployeeGroup,
    onEmployeeCheck,
    userEmployees,
    moveEmployee,
    employees,
    isLoading,
  };
}
