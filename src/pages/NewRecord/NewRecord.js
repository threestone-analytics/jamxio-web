import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './style';

const Container = props => {
  const { record } = props;
  const handleOpen = name => {
    props.actions.show(name, { record });
  };
  return (
    <Container>
      <Button onClick={() => handleOpen('uploadRecordModal')}>Contribuir</Button>
    </Container>
  );
};

Container.propTypes = {
  record: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Container;
