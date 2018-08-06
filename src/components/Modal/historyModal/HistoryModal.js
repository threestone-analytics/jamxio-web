import React from 'react';
import PropTypes from 'prop-types';
import { connectModal } from 'redux-modal';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Map } from 'immutable';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { SyncLoader } from 'react-spinners';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
/* show, handleHide, message, title */
import {
  Button,
  ModalBox,
  ModalInfo,
  ModalOuter,
  ModalButtonBox,
  ModalLabelBox,
  Title,
  CheckBox,
  Label,
  Date,
  User,
  SpinnerBox,
  DataType,
  HistoryContainer,
  HistoryBox,
  HistoryItem,
  HistoryInfoTab,
  HistoryItemContainer
} from './style';

// Actions
import * as historyActions from '../../../store/reducers/history/historyActions';

// Selectors

import { getHistoryItems } from '../../../utils/selectors/common';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px'
};

const actions = [historyActions];

function mapStateToProps(state) {
  return {
    history: getHistoryItems(state)
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

const GET_DOCUMENTS = gql`
  query($_id: ID!) {
    getRecordById(_id: $_id) {
      title
      documents {
        _id
        source
        url
        documentType {
          _id
          category
          subcategory
        }
        publishedDate
      }
    }
  }
`;

const RenderCheckBox = props => {
  const handleclick = () => {
    props.actions.toggleHistoryItem(props.document.url);
  };
  let checked = false;
  if (props.state[props.document.url]) {
    checked = props.state[props.document.url].selected;
  }
  return <CheckBox type="checkbox" onChange={handleclick} defaultChecked={checked} />;
};

const Items = ({ props, _id }) => (
  <Query pollInterval={50} query={GET_DOCUMENTS} variables={{ _id }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <SpinnerBox>
            <SyncLoader color="#2F80ED" />
          </SpinnerBox>
        );
      if (error) return `Error! ${error.message}`;
      return data.getRecordById.documents.map(d => {
        const timestamp = d.publishedDate.toString();
        const date = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(timestamp);
        return (
          <HistoryItem key={d._id}>
            <RenderCheckBox document={d} actions={props.actions} state={props.history} />
            <Date> On {date} </Date>
            <User> alexter42</User>
            <DataType> {d.source} </DataType>
          </HistoryItem>
        );
      });
    }}
  </Query>
);

Items.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const HistoryModal = props => {
  const handleclick = () => {
    console.log(props); // descargar aqui
  };

  return (
    <Modal
      isOpen={props.show}
      onRequestClose={props.handleHide}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <ModalOuter>
        <ModalBox>
          <ModalInfo>
            <ModalLabelBox>
              <Label big>Categoria:</Label>
              <Label thin>{props.record.documentType.category}</Label>
            </ModalLabelBox>
            <ModalLabelBox>
              <Label>Subcategoria:</Label>
              <Label thin>{props.record.documentType.subcategory}</Label>
            </ModalLabelBox>
            <ModalLabelBox>
              <Label>Titulo:</Label>
              <Label thin>{props.record.title}</Label>
            </ModalLabelBox>
          </ModalInfo>
          <HistoryContainer>
            <HistoryBox>
              <HistoryInfoTab>
                <Title>Historial</Title>
                <Title margin_right="10%">Fuente</Title>
              </HistoryInfoTab>
              <HistoryItemContainer>
                <form>
                  <Items props={props} _id={props.record._id} />
                </form>
              </HistoryItemContainer>
            </HistoryBox>
          </HistoryContainer>
          <ModalButtonBox>
            <Button cancel="true" onClick={props.handleHide}>
              Salir
            </Button>
            <Button onClick={handleclick}>Descargar</Button>
          </ModalButtonBox>
        </ModalBox>
      </ModalOuter>
    </Modal>
  );
};

HistoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired
};
const HM = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HistoryModal);

export default connectModal({
  name: 'historyModal',
  getModalState: state => state.get('modal')
})(HM);
