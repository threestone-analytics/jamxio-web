import React from 'react';
import PropTypes from 'prop-types';

const Container = props => {
  const { record } = props;
  const handleOpen = name => {
    props.actions.show(name, { record });
  };
  return (
    <Container>
      <buttom onClick={() => handleOpen('uploadRecordModal')}>Contribuir</buttom>
    </Container>
  );
};

Container.propTypes = {
  record: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Container;
