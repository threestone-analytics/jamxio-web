import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {
  LoginModal,
  SignUpModal,
  ResetPasswordModal,
  SetNewPasswordModal
} from 'Components/Modal/Auth';
import MapContainer from 'Containers/appContainers/Map';
import MainMenu from 'Components/Nav/Menu';
import Login from 'Components/Nav/Auth';
import 'Styles/app/map/mapbox-gl.css';
import 'Styles/app/dashboard/home-container.scss';
import 'Styles/app/nav/sidebar.scss';
import 'Styles/app/dashboard/index.scss';

const MapLayout = ({ match, props }) => (
  <div>
    <div className="header-container">
      <MainMenu {...props} />
      <Login {...props} />
    </div>
    <main className="page-wrap">
      <LoginModal />
      <SetNewPasswordModal />
      <SignUpModal />
      <ResetPasswordModal />
      <Switch>
        <Fragment>
          <Route path={`${match.path}`} component={MapContainer} />
        </Fragment>
      </Switch>
    </main>
  </div>
);

MapLayout.propTypes = {
  match: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

export default MapLayout;
