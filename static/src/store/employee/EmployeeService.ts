import { Service } from 'typedi';

import { EMPLOYEES } from '../../mock';

@Service()
export class EmployeeService {
  private employees = JSON.parse(localStorage.getItem('employees')) || EMPLOYEES;

  getEmployees = async () => this.employees;

  addEmployee = async (employee) => {
    this.employees = [...this.employees, employee];

    localStorage.setItem('employees', JSON.stringify(this.employees));

    return employee;
  };
}
