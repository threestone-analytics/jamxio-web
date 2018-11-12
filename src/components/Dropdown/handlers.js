import React from 'react';
import { CheckBox, SubItem, SubSubItem, SubItemLabel, SubSubItemLabel, Mark } from './style';

const layersShown = [
  'Centrales electricas mayores a 100MW',
  'Cruces fronterizos de electricidad',
  'Fabricas de sustancias toxicas y/o peligrosas para la salud',
  'Fracking',
  'Segmento manufacturero. Por municipio',
  'ANP estatal',
  'ANP federal',
  'Degradación ambiental ',
  'Infraestructura energetica'
];

export const renderRecords = function(records, props) {
  if (!records) {
    return;
  }

  const data = records.map(layer => {
    const _id = layer.recordId;
    const checked = layersShown.includes(layer.title) ? true : false; // eslint-disable-line
    return (
      <SubSubItem>
        <Mark color={layer.color} />
        <SubSubItemLabel>{layer.title}</SubSubItemLabel>
        <CheckBox>
          <input
            type="checkbox"
            defaultChecked={checked}
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

  const groupedData = _.mapValues(_.groupBy(props.options, 'documentType.subcategory')); // eslint-disable-line
  const subcategories = [];

  Object.keys(groupedData).forEach(element => {
    subcategories.push(element);
  });

  const data = subcategories.map(subcategory => {
    const { color } = groupedData[subcategory][0];
    if (props.crowd) {
      return <div>{renderRecords(groupedData[subcategory], props, '#fff')}</div>;
    }

    return (
      <div>
        <SubItem color={color}>
          <SubItemLabel color={color}>{subcategory}</SubItemLabel>
        </SubItem>
        {renderRecords(groupedData[subcategory], props, '#fff')}
      </div>
    );
  });

  return data; // eslint-disable-line
};
