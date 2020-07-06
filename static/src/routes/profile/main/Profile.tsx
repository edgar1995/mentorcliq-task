import React from 'react';
import { Link } from 'react-router-dom';

import { Loading } from '../../../components/Loading/Loading';
import { Button } from '../../../components/Button/Button';

import { userProfileVM } from './userProfileVM';

import styles from './profile.css';

export default function Profile() {
  const vm = userProfileVM();

  if (vm.isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.profile}>
      <div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{vm.user.get('username')}</td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{vm.userEmployee.get('firstName')}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{vm.userEmployee.get('lastName')}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{vm.userEmployee.get('gender')}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{vm.userEmployee.get('email')}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{vm.userEmployee.get('country')}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{vm.userEmployee.get('city')}</td>
            </tr>
            <tr>
              <td>Job title</td>
              <td>{vm.userEmployee.get('jobTitle')}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.actions}>
          <Button
            to='/profile/group-management'
            as={Link}
            primary
          >
            Group Management
          </Button>
          <Button
            onClick={vm.logOut}
            warning
          >
            Log out
          </Button>
        </div>
      </div>
      <div>
        {vm.userEmployees && vm.userEmployees.size > 0 && (
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
              {vm.userEmployees.map(employee => (
                <tr key={employee.get('id')}>
                  <td>{employee.get('firstName')}</td>
                  <td>{employee.get('lastName')}</td>
                  <td>{employee.get('gender')}</td>
                  <td>{employee.get('email')}</td>
                  <td>{employee.get('country')}</td>
                  <td>{employee.get('city')}</td>
                  <td>{employee.get('department')}</td>
                  <td>{employee.get('jobTitle')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
