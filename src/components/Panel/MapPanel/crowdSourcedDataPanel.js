import React from 'react';
import PropTypes from 'prop-types';
import { CrowdSourcedContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const crowdSourced = ['Sms', 'Twitter', 'Direct Message', 'News'];
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

      {categories.map(category => {
        const _id = groupedData[category][0].recordId;
        return (
          <PanelItemContainer key={category[0]}>
            <CheckBox>
              <input
                type="checkbox"
                onClick={e => {
                  props.toggleLayer(_id, e);
                }}
              />
            </CheckBox>
            <Label>{category}</Label>
          </PanelItemContainer>
        );
      })}
    </CrowdSourcedContainer>
  );
};
CrowdSourcedPanel.propTypes = {
  categories: PropTypes.array.isRequired
};
export default CrowdSourcedPanel;
