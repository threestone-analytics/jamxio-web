import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'Components/Dropdown';
import { CrowdSourcedContainer, PanelHeader, PanelItemContainer } from './style';

const crowdSourced = ['Sms', 'Twitter', 'Direct Message', 'News'];

const ShowItem = props => (
  <PanelItemContainer key={props._id}>
    <Dropdown crowd toggleLayer={props.toggleLayer} title={props.title} options={props.options} />
  </PanelItemContainer>
);

ShowItem.propTypes = {
  toggleLayer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
};

const CrowdSourcedPanel = props => {
  const groupedData = props.categories;

  const categories = [];

  Object.keys(groupedData).forEach(element => {
    if (crowdSourced.includes(element)) {
      categories.push(element);
    }
  });

  return (
    <CrowdSourcedContainer>
      <PanelHeader>Reportes en linea</PanelHeader>
      {categories.map(category => (
        <ShowItem
          toggleLayer={props.toggleLayer}
          title={category}
          options={groupedData[category]}
        />
      ))}
    </CrowdSourcedContainer>
  );
};
CrowdSourcedPanel.propTypes = {
  categories: PropTypes.array.isRequired,
  toggleLayer: PropTypes.func.isRequired
};
export default CrowdSourcedPanel;
