import React from 'react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Button } from '../../../components/Button/Button';
import { Popup } from '../../../components/Popup/Popup';
import { Row } from '../../../components/Row/Row';

import { EMPLOYEE_DIFF_SKIPPED_KEYS, EMPLOYEE_SCHEMA } from '../../../helpers/constants';

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
              {EMPLOYEE_SCHEMA.map(({ label, key }) => (
                <th key={key}>{label}</th>
              ))}
              <th />
            </tr>
            </thead>
            <tbody>
            {vm.employees.map(employee => (
              <tr key={employee.get('id')} onClick={() => vm.showDiff(employee)}>
                {EMPLOYEE_SCHEMA.map(({ key }) => (
                  <td key={key}>{employee.get(key)}</td>
                ))}
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
              {EMPLOYEE_SCHEMA.map(({ label, key }) => (
                <th key={key}>{label}</th>
              ))}
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
                  {EMPLOYEE_SCHEMA.map(({ key }) => (
                    <td key={key}>{employee[key]}</td>
                  ))}
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
      {vm.isDiffShown && (
        <Popup
          handleDismiss={vm.closeDiff}
          dismissOnEsc
          hasOverlay
        >
          <div>
            <table
              className={classNames({
                [styles.diffTable]: true,
                [styles.table]: true,
              })}
            >
              <tbody>
              {EMPLOYEE_SCHEMA.map(({ key, label }) => {
                if (EMPLOYEE_DIFF_SKIPPED_KEYS.includes(key)) {
                  return null;
                }

                return (
                  <tr key={key}>
                    <td
                      className={vm.userEmployee.get(key) !== vm.diffEmployee.get(key)
                        ? styles.differentRow
                        : ''
                      }
                    >
                      {label}
                    </td>
                    <td>{vm.userEmployee.get(key)}</td>
                    <td>{vm.diffEmployee.get(key)}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </Popup>
      )}
    </div>
  );
}
