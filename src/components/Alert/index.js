import React from 'react';
/* show, handleHide, message, title */
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// Components

// Actions
import * as alertActions from 'Store/reducers/alert/alertActions';

// Selectors
import { getAlert } from 'Utils/selectors/common';
import { Alert } from './style';

const AlertText = props => (
  <Alert isOpen={props.alertState.isShown} red>
    * Fallo al ser comparado con el esquema
  </Alert>
);
AlertText.propTypes = {
  alertState: PropTypes.object.isRequired
};
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertText);
