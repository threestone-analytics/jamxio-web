import React from 'react';
import PropTypes from 'prop-types';

/* show, handleHide, message, title */
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { ResetPasswordForm } from 'Components/Form';
import { ModalOuter, ModalBox, ModalHeader, Title } from './style';
// Actions
import * as alertActions from '../../store/reducers/alert/alertActions';

// Selectors
import { getAlert } from '../../utils/selectors/common';

const actions = [alertActions];

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

const LoginModal = props => {
  const handleSubmit = () => {};

  return (
    <div id="outer-container">
      <main id="page-wrap">
        <ModalOuter>
          <ModalBox>
            <ModalHeader>
              <Title>Cambiar contraseña</Title>
            </ModalHeader>
            <ResetPasswordForm
              handleHide={props.handleHide}
              handleSubmit={handleSubmit}
              {...props}
            />
          </ModalBox>
        </ModalOuter>
      </main>
    </div>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired
};

const LM = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginModal);

export default LM;
