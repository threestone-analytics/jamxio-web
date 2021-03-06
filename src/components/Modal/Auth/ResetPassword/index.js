import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import { withApollo } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import Modal from 'react-modal';

import { ResetPasswordForm } from 'Components/Form/Auth';

import * as alertActions from 'Store/reducers/alert/alertActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';

import { getAuthForm } from 'Utils/selectors/common';
import { ModalBox } from './style';
import { ModalOuter, ExitButton, ModalHeader, Title } from '../style';

// Actions

const actions = [authActions, alertActions];

// Selectors
function mapStateToProps(state) {
  return {
    formState: getAuthForm(state)
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

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px'
};

const ResetPasswordModalForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo
)(ResetPasswordForm);

const ResetPasswordModal = props => (
  <Modal isOpen={props.show} contentLabel="Modal" ariaHideApp={false}>
    <ModalOuter>
      <ModalBox>
        <ModalHeader>
          <Title size="40px">Restablecer contraseña</Title>
          <ExitButton onClick={props.handleHide}>X</ExitButton>
        </ModalHeader>
        <ResetPasswordModalForm handleHide={props.handleHide} {...props} />
      </ModalBox>
    </ModalOuter>
  </Modal>
);

ResetPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connectModal({
  name: 'resetPasswordModal',
  getModalState: state => state.get('modal')
})(ResetPasswordModal);
