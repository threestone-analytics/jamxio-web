import { bindActionCreators } from 'redux';
import { connectModal } from 'redux-modal';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React from 'react';

import * as alertActions from 'Store/reducers/alert/alertActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';
import * as modalActions from 'Store/reducers/modal/modalActions';
import { getAlert, getAuthForm } from 'Utils/selectors/common';
import { LoginForm } from 'Components/Form';
import { ModalOuter, ExitButton, ModalBox, ModalHeader, Title } from '../style';

const actions = [authActions, alertActions, modalActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state),
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

const LoginModalForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo
)(LoginForm);

const LoginModal = props => (
  <Modal
    isOpen={props.show}
    onRequestClose={props.handleHide}
    contentLabel="Modal"
    ariaHideApp={false}
  >
    <ModalOuter>
      <ModalBox>
        <ModalHeader>
          <Title>Validar correo</Title>
          <ExitButton onClick={props.handleHide}>X</ExitButton>
        </ModalHeader>
        <LoginModalForm handleHide={props.handleHide} {...props} />
      </ModalBox>
    </ModalOuter>
  </Modal>
);

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connectModal({
  name: 'emailValidationModal',
  getModalState: state => state.get('modal')
})(LoginModal);
