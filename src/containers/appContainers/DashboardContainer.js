import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { getAuthForm, getIntl } from 'Utils/selectors/common';
import DashboardPage from 'Pages/DashboardPage';
// Actions
import * as modalActions from 'Store/reducers/modal/modalActions';
import * as userActions from 'Store/reducers/app/user/userActions';
// Selectors

const actions = [modalActions, userActions];

function mapStateToProps(state) {
  return {
    formState: getAuthForm(state),
    intlState: getIntl(state)
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardPage);
