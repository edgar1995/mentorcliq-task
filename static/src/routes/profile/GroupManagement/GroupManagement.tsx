import React from 'react';
import { DndProvider } from 'react-dnd';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Row/Row';

import { useGroupManagementVM } from './useGroupManagementVM';

import styles from './groupManagement.css';

export default function GroupManagement() {
  const vm = useGroupManagementVM();

  return (
    <div className={styles.groupManagement}>
      <div>
        {vm.employees && vm.employees.size > 0 && (
          <table className={styles.table}>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Country</th>
              <th>City</th>
              <th>Department</th>
              <th>Job title</th>
              <th />
            </tr>
            </thead>
            <tbody>
            {vm.employees.map(employee => (
              <tr key={employee.get('id')}>
                <td>{employee.get('firstName')}</td>
                <td>{employee.get('lastName')}</td>
                <td>{employee.get('gender')}</td>
                <td>{employee.get('email')}</td>
                <td>{employee.get('country')}</td>
                <td>{employee.get('city')}</td>
                <td>{employee.get('department')}</td>
                <td>{employee.get('jobTitle')}</td>
                <td>
                  <input
                    onChange={({ currentTarget: { checked } }) => vm.onEmployeeCheck(checked, employee.get('id'))}
                    disabled={!vm.userEmployeeSortByIds[employee.get('id')] && vm.userEmployees.length === 5}
                    checked={!!vm.userEmployeeSortByIds[employee.get('id')]}
                    type='checkbox'
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        {vm.userEmployees && vm.userEmployees.length > 0 && (
          <table className={styles.table}>
            <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Country</th>
              <th>City</th>
              <th>Department</th>
              <th>Job title</th>
            </tr>
            </thead>
            <tbody>
            <DndProvider backend={HTML5Backend}>
              {vm.userEmployees.map((employee, index) => (
                <Row
                  moveRow={vm.moveEmployee}
                  key={employee.id}
                  id={employee.id}
                  index={index}
                >
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.email}</td>
                  <td>{employee.country}</td>
                  <td>{employee.city}</td>
                  <td>{employee.department}</td>
                  <td>{employee.jobTitle}</td>
                </Row>
              ))}
            </DndProvider>
            </tbody>
          </table>
        )}
        <div className={styles.actions}>
          <Button
            onClick={vm.saveUserEmployees}
            primary
          >
            Save
          </Button>
          <Button
            to='/profile'
            as={Link}
            secondary
          >
            Profile
          </Button>
          <Button
            onClick={vm.logOut}
            warning
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
