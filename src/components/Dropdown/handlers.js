import React from 'react';
import { CheckBox, Label, SubItem, SubSubItem, SubItemLabel, SubSubItemLabel, Mark } from './style';
import { layerColor } from '../../styles/app/map/layers';

export const renderRecords = function(records, props, color) {
  if (!records) {
    return;
  }
  const data = records.map(record => {
    const _id = record.recordId;
    return (
      <SubSubItem>
        <Mark color={color} />
        <SubSubItemLabel>{record.title}</SubSubItemLabel>
        <CheckBox>
          <input
            type="checkbox"
            onClick={e => {
              props.toggleLayer(_id, e);
            }}
          />
        </CheckBox>
      </SubSubItem>
    );
  });

  return data; // eslint-disable-line
};

export const renderSubcategories = function(props) {
  const category = props.title;
  if (!props) {
    return;
  }
  const color = layerColor.category[category];
    const groupedData = _.mapValues(_.groupBy(props.options, 'documentType.subcategory'));// eslint-disable-line
  const subcategories = [];
  Object.keys(groupedData).forEach(element => {
    subcategories.push(element);
  });

  const data = subcategories.map((subcategory, i) => (
    <div>
      <SubItem color={color[i]}>
        <SubItemLabel color={color[i]}>{subcategory}</SubItemLabel>
      </SubItem>
      {renderRecords(groupedData[subcategory], props, color[i])}
    </div>
  ));

    return data;  // eslint-disable-line
};
