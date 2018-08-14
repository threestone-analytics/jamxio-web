import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Actions
import * as modalActions from 'Store/reducers/modal/modalActions';
import * as menuActions from 'Store/reducers/nav/navActions';
import { getIntl } from 'Utils/selectors/common';
import DataPage from 'Pages/Data';

// Selectors

const actions = [modalActions, menuActions];

function mapStateToProps(state) {
  return {
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

const GET_DOCUMENT = gql`
  query {
    getRecords {
      _id
      title
      thumbnail
      documentType {
        _id
        category
        subcategory
      }
    }
  }
`;

export default compose(
  graphql(GET_DOCUMENT, {
    options: () => ({
      pollInterval: '5'
    })
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DataPage);
