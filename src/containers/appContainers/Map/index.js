import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import _ from 'lodash';

import { Panel } from 'Components/Panel';
import NewsFeedPanel from 'Components/Panel/NewsFeedPanel';
import { PanelContainer } from './style';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

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

function plotData(docs, m) {
  // FIXME duplicate
  const groupedData = _.mapValues(_.groupBy(docs, 'documentType.category'));

  Object.keys(groupedData).forEach(element => {
    const records = groupedData[element];

    let n = 0;
    if (n >= records.lenght) {
      n = 0;
    }
    records.map(async doc => {
      const { url, color } = doc;

      m.addSource(doc.recordId, {
        type: 'geojson',
        data: url
      });
      if (doc.geojsonType === 'Point') {
        m.addLayer({
          type: 'circle',
          paint: {
            'circle-color': color,
            'circle-radius': 5
          },
          layout: {
            visibility: layersShown.includes(doc.title) ? 'visible' : 'none'
          },
          id: doc.recordId, // Sets id as current child's key
          source: doc.recordId // The source layer defined above
        });
      }
      if (doc.geojsonType === 'Polygon') {
        m.addLayer({
          type: 'fill',
          paint: {
            'fill-color': color,
            'fill-opacity': 1
          },
          layout: {
            visibility: layersShown.includes(doc.title) ? 'visible' : 'none'
          },
          id: doc.recordId, // Sets id as current child's key
          source: doc.recordId // The source layer defined above
        });
      }
      n += 1;
    });
  });
}

class MapContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: 24.3704762,
      lng: -96.7996812,
      zoom: 4.9
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight,
      zoom
    });
    this.map = map;
    const a = this.map;
    if (this.props.data.getLatestDocuments) {
      const datos = this.props.data.getLatestDocuments;
      map.on('load', () => {
        plotData(datos, a, this);
      });
    }
  }

  toggleLayer(key, event) {
    if (event && !event.target.checked) {
      this.map.setLayoutProperty(key, 'visibility', 'none');
      // this.className = '';
    } else {
      // this.className = 'active';
      this.map.setLayoutProperty(key, 'visibility', 'visible');
    }
  }

  render() {
    return (
      <div style={{ height: `${100}%`, width: `${100}%` }}>
        <div id="map" style={{ height: `100vh`, width: `100vw` }} />
        <PanelContainer>
          <Panel toggleLayer={this.toggleLayer.bind(this)} />
          {this.props.data.getPosts ? (
            <NewsFeedPanel
              data={this.props.data.getPosts}
              toggleLayer={this.toggleLayer.bind(this)}
            />
          ) : (
            ''
          )}
        </PanelContainer>
      </div>
    );
  }
}

const GET_DATA = gql`
  query {
    getTweets {
      url
    }

    getPosts {
      url
      image
      title
      author
      position
    }

    getLatestDocuments {
      geojsonType
      title
      source
      recordId
      url
      color
    }
  }
`;

export default compose(
  graphql(GET_DATA, {
    options: () => ({
      pollInterval: '5000'
    })
  })
)(MapContainer);

MapContainer.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  height: PropTypes.object.isRequired
};
