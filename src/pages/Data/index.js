import React from 'react';
import PropTypes from 'prop-types';
import DataCard from 'Components/Card/DataCard';
import { CardContainer, TopBar } from './style';

/* <AddRecordButton onClick={() => handleOpen('uploadRecordModal')}>+</AddRecordButton> */

const DashboardView = props => {
  props.actions.clickRight();
  const handleOpen = name => {
    props.actions.show(name);
  };
  if (props.data.getRecords) {
    const listCards = props.data.getRecords.map(record => (
      <DataCard
        loggedInUser={props.loggedInUser}
        key={record._id}
        handleOpen={handleOpen}
        record={record}
        actions={props.actions}
      />
    ));
    return (
      <div className="dashboard">
        <TopBar />
        <CardContainer>{listCards}</CardContainer>
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
  loggedInUser: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default DashboardView;
