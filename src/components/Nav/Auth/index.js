import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
// Actions
import * as modalActions from 'Store/reducers/modal/modalActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';

// Selectors
import { getAuthForm, getIntl, getloggedInUser } from 'Utils/selectors/common';
import { Button } from './style';

const actions = [modalActions, authActions];

function mapStateToProps(state) {
  return {
    formState: getAuthForm(state),
    intlState: getIntl(state),
    loggedInUser: getloggedInUser(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const Login = props => {
  const handleOpen = name => {
    props.actions.show(name, { message: `This is a ${name} modal`, title: 'Title' });
  };
  return (
    <div className="nav-buttons-right">
      {props.loggedInUser ? (
        <Button right onClick={() => props.actions.logOut(props.apolloClient)}>
          Salir
        </Button>
      ) : (
        <Fragment>
          <Button onClick={() => handleOpen('loginModal')}>Entrar</Button>
          <Button onClick={() => handleOpen('signupModal')}>Registrarse</Button>
        </Fragment>
      )}
    </div>
  );
};

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  apolloClient: PropTypes.object
};

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
