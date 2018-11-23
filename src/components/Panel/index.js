import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'Components/Dropdown';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import _ from 'lodash';

import { PanelContainer, PanelItemContainer, PanelHeader, Space } from './style';

const crowdSourced = ['Sms', 'Twitter', 'Direct Message', 'News'];

const ShowItem = props => (
  <PanelItemContainer key={props._id}>
    <Dropdown toggleLayer={props.toggleLayer} title={props.title} options={props.options} />
  </PanelItemContainer>
);

ShowItem.propTypes = {
  toggleLayer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
};

const GeoPanel = props => {
  const groupedData = _.mapValues(
    _.groupBy(props.data.getLatestDocuments, 'documentType.category')
  );

  const media = [];
  const geoData = [];

  Object.keys(groupedData).forEach(element => {
    if (crowdSourced.includes(element)) {
      media.push(element);
    } else geoData.push(element);
  });

  return (
    <div>
      <PanelContainer first>
        <PanelHeader>Datos geoespaciales</PanelHeader>
        {geoData.map(category => (
          <ShowItem
            toggleLayer={props.toggleLayer}
            title={category}
            options={groupedData[category]}
          />
        ))}
      </PanelContainer>
      <Space />
      <PanelContainer second>
        <PanelHeader>Reportes en linea</PanelHeader>
        {media.map(category => (
          <ShowItem
            toggleLayer={props.toggleLayer}
            title={category}
            options={groupedData[category]}
          />
        ))}
      </PanelContainer>
    </div>
  );
};
const GET_DATA = gql`
  query {
    getLatestDocuments {
      documentType {
        _id
        category
        subcategory
      }
      title
      color
      recordId
    }
  }
`;

export const Panel = compose(
  graphql(GET_DATA, {
    options: () => ({
      pollInterval: '5000'
    })
  })
)(GeoPanel);

GeoPanel.propTypes = {
  data: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired
};
