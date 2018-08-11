import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register, ChangePassword, ResetPassword, ValidateRegister } from 'Components/Auth';
import MapLayout from './app/Map';
import DataLayout from './app/Data';

/* import AuthLayout from './auth/AuthLayout'; */

const RootLayout = ({ loggedInUser, loading }) =>
  loggedInUser ? (
    // private routes
    <Route
      children={() => (
        <Switch>
          <Route exact path="/" component={MapLayout} />
          <Route path="/change_password" component={ChangePassword} />
          <Route path="/reset_password" component={ResetPassword} />
          <Route path="/validate_register" component={ValidateRegister} />
          <Route path="/register" component={Register} />
          <Route path="/data" component={DataLayout} />
          <Redirect to="/" />
        </Switch>
      )}
    />
  ) : !loading ? (
    // public routes
    <Switch />
  ) : (
    <Switch />
  );

RootLayout.defaultProps = {
  loggedInUser: false
};

RootLayout.propTypes = {
  loggedInUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loading: PropTypes.bool.isRequired
};

export default RootLayout;
