import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
/* show, handleHide, message, title */
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { RegisterForm } from 'Components/Form';
// Actions
import * as alertActions from 'Store/reducers/alert/alertActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';

// Selectors
import { getAlert } from 'Utils/selectors/common';
import { ModalOuter, ModalBox, ModalHeader, Title } from './style';

const actions = [alertActions, authActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state)
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

const Register = props => {
  const handleSubmit = () => {};
  return (
    <ModalOuter>
      <ModalBox>
        <ModalHeader>
          <Title>Regístrate</Title>
        </ModalHeader>
        <RegisterForm handleSubmit={handleSubmit} {...props} />
      </ModalBox>
    </ModalOuter>
  );
};

Register.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired
};

const LM = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo
)(Register);

export default LM;
