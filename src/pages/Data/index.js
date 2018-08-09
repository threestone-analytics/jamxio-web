import React from 'react';
import PropTypes from 'prop-types';
import DataCard from '../../components/Card/DataCard';
import { CardContainer, TopBar, AddRecordButton } from './style';

const DashboardView = props => {
  props.actions.clickRight();
  const handleOpen = name => {
    props.actions.show(name);
  };
  if (props.data.getRecords) {
    const listCards = props.data.getRecords.map(record => (
      <DataCard key={record._id} handleOpen={handleOpen} record={record} actions={props.actions} />
    ));
    return (
      <div className="dashboard">
        <TopBar />
        <CardContainer>{listCards}</CardContainer>
        <AddRecordButton onClick={() => handleOpen('uploadRecordModal')}>+</AddRecordButton>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <TopBar />
      <CardContainer />
    </div>
  );
};
DashboardView.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default DashboardView;
