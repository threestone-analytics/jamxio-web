import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { CrowdSourcedContainer, PanelHeader, PanelItemContainer, CheckBox, Label } from './style';

const crowdSourced = ['Sms', 'Twitter', 'Direct Message', 'News'];
const CrowdSourcedPanel = props => {
  const array = props.categories;

  const groupedData = _.mapValues(_.groupBy(array, 'documentType.category'), doc =>
    doc.map(e => _.omit(e, 'documentType.category'))
  );

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
  categories: PropTypes.array.isRequired,
};
export default CrowdSourcedPanel;
