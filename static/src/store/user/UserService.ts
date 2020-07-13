import { Service } from 'typedi';

import { USERS } from '../../mock';

@Service()
export class UserService {
  private users = JSON.parse(localStorage.getItem('users')) || USERS;

  signIn = async (username, password) => {
    const userInstance = this.users.find(user => user.username === username && user.password === password);

    if (userInstance) {
      localStorage.setItem('user', JSON.stringify(userInstance));
      return userInstance;
    }

    throw new Error('NotFound');
  };

  signUp = async (username, password) => {
    const user = {
      id: this.users[this.users.length - 1].id + 1,
      employeeGroup: [],
      employeeId: null,
      username,
      password,
    };

    this.users.push(user);

    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  signOut = async () => {
    localStorage.removeItem('user');
  };

  setEmployeeGroup = async (employeeGroup) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    this.users = this.users.map((user) => {
      if (user.id === +currentUser.id) {
        return {
          ...user,
          employeeGroup,
        };
      }

      return user;
    });

    localStorage.setItem('users', JSON.stringify(this.users));
  };

  attachEmployee = async (employeeId) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    this.users = this.users.map((user) => {
      if (user.id === +currentUser.id) {
        return {
          ...user,
          employeeId,
        };
      }

      return user;
    });

    localStorage.setItem('users', JSON.stringify(this.users));
  };
}
