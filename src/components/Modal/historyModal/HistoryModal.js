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

// Actions
import * as historyActions from 'Store/reducers/history/historyActions';
import * as modalActions from 'Store/reducers/modal/modalActions';

// Selectors

import { getHistoryItems, getloggedInUser } from 'Utils/selectors/common';
import {
  Button,
  ModalBox,
  ModalInfo,
  ModalOuter,
  ButtonBox,
  ModalLabelBox,
  Title,
  CheckBox,
  Label,
  Date,
  User,
  SpinnerBox,
  DataType,
  HistoryContainer,
  Alert,
  AlertBox,
  HistoryBox,
  HistoryItem,
  HistoryInfoTab,
  BottomContainer,
  HistoryItemContainer
} from './style';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
Modal.defaultStyles.overlay.zIndex = '999';

Modal.defaultStyles.content = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  borderRadius: '4px',
  outline: 'none',
  padding: '20px'
};

const actions = [historyActions, modalActions];

function mapStateToProps(state) {
  return {
    history: getHistoryItems(state),
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

const GET_DOCUMENTS = gql`
  query($_id: ID!) {
    getRecordById(_id: $_id) {
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
    props.actions.toggleHistoryItem(props.document);
  };
  let checked = false;
  if (props.state[props.document._id]) {
    checked = props.state[props.document._id].selected;
  }
  return <CheckBox type="checkbox" onChange={handleclick} defaultChecked={checked} />;
};

RenderCheckBox.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};

const Items = ({ props, _id }) => (
  <Query pollInterval={5000} query={GET_DOCUMENTS} variables={{ _id }}>
    {({ loading, error, data }) => {
      if (data)
        if (data.getRecordById)
          return data.getRecordById.documents.map((d, i) => {
            try {
              const timestamp = d.publishedDate.toString();
              const date = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).format(timestamp);
              return (
                <HistoryItem key={d._id} color={i === 0 ? '#00ff94' : '#fff'}>
                  <RenderCheckBox document={d} actions={props.actions} state={props.history} />
                  <Date> On {date} </Date>
                  <User color={i === 0 ? '#2980E7' : '#2f80ed'}> alexter42</User>
                  <DataType> {d.source} </DataType>
                </HistoryItem>
              );
            } catch (err) {
              return <div />;
            }
          });

      if (loading)
        return (
          <SpinnerBox>
            <SyncLoader color="#2F80ED" />
          </SpinnerBox>
        );
      if (error) return `Error! ${error.message}`;
      return <div />;
    }}
  </Query>
);

Items.propTypes = {
  _id: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired
};

const HistoryModal = props => {
  const handleclick = () => {
    props.actions.downloadHistory(props);
  };

  const handleOpen = name => {
    props.actions.show(name, {});
  };
  return (
    <Modal
      closeTimeoutMS={0}
      isOpen={props.show}
      onRequestClose={props.handleHide}
      shouldCloseOnOverlayClick={true} // eslint-disable-line
      contentLabel="Modal"
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
                <Items props={props} _id={props.record._id} />
              </HistoryItemContainer>
            </HistoryBox>
          </HistoryContainer>
          <BottomContainer>
            <ButtonBox>
              <Button cancel onClick={props.handleHide}>
                Salir
              </Button>
              <Button disabled={!props.loggedInUser} onClick={handleclick}>
                Descargar
              </Button>
            </ButtonBox>
            <AlertBox disabled={props.loggedInUser}>
              <Title right>
                ¡Ups!, Necesitas <Alert onClick={() => handleOpen('loginModal')}>registrarte</Alert>{' '}
                para poder descargar.
              </Title>
            </AlertBox>
          </BottomContainer>
        </ModalBox>
      </ModalOuter>
    </Modal>
  );
};

HistoryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  loggedInUser: PropTypes.bool.isRequired,
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
