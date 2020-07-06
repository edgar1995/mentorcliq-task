import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

const GroupManagement = React.lazy(() => import('./profile/GroupManagement/GroupManagement'));
const EmployeeWizard = React.lazy(() => import('./employee-wizard/main/EmployeeWizard'));
const Registration = React.lazy(() => import('./registration/main/Registration'));
const Profile = React.lazy(() => import('./profile/main/Profile'));
const Login = React.lazy(() => import('./login/main/Login'));

import { WizardWrapper } from '../components/WizardWrapper/WizardWrapper';
import { AuthWrapper } from '../components/AuthWrapper/AuthWrapper';

import { URLS } from './configs';

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          path={URLS.login}
          component={Login}
          exact
        />
        <Route
          path={URLS.registration}
          component={Registration}
          exact
        />
        <AuthWrapper>
          <WizardWrapper>
            <Route
              path={URLS.profile}
              component={Profile}
              exact
            />
            <Route
              path={URLS.groupManagement}
              component={GroupManagement}
            />
          </WizardWrapper>
          <Route
            path={URLS.employeeWizard}
            component={EmployeeWizard}
          />
        </AuthWrapper>
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  );
}
