import React from 'react';
import { CheckBox, SubItem, SubSubItem, SubItemLabel, SubSubItemLabel, Mark } from './style';

export const renderRecords = function(records, props) {
  if (!records) {
    return;
  }
  const data = records.map(record => {
    const _id = record.recordId;
    return (
      <SubSubItem>
        <Mark color={record.color} />
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
  if (!props) {
    return;
  }

  const groupedData = _.mapValues(_.groupBy(props.options, 'documentType.subcategory'));// eslint-disable-line
  const subcategories = [];

  Object.keys(groupedData).forEach(element => {
    subcategories.push(element);
  });

  const data = subcategories.map(subcategory => {
    const { color } = groupedData[subcategory][0];

    return (
      <div>
        <SubItem color={color}>
          <SubItemLabel color={color}>{subcategory}</SubItemLabel>
        </SubItem>
        {renderRecords(groupedData[subcategory], props, '#000')}
      </div>
    );
  });

    return data;  // eslint-disable-line
};
