import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connectModal } from 'redux-modal';
import { bindActionCreators } from 'redux';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';

// Actions
import { SetNewPassword } from 'Components/Form/Auth';
import { getAlert, getAuthForm } from 'Utils/selectors/common';

// Actions
import * as alertActions from 'Store/reducers/alert/alertActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';
import { ModalOuter, ExitButton, Title } from '../style';
import { ModalBox, ModalHeader } from './style';

const actions = [authActions, alertActions];

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

const SetNewPasswordForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo
)(SetNewPassword);

const SetNewPasswordModal = props => (
  <Modal
    isOpen={props.show}
    onRequestClose={props.handleHide}
    contentLabel="Modal"
    ariaHideApp={false}
  >
    <ModalOuter>
      <ModalBox>
        <ModalHeader>
          <Title>Nueva Contrasena</Title>
          <ExitButton onClick={props.handleHide}>X</ExitButton>
        </ModalHeader>
        <SetNewPasswordForm handleHide={props.handleHide} {...props} />
      </ModalBox>
    </ModalOuter>
  </Modal>
);

SetNewPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connectModal({
  name: 'setNewPasswordModal',
  getModalState: state => state.get('modal')
})(SetNewPasswordModal);
