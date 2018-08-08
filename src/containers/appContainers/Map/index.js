import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { layerColor } from '../../../styles/app/map/layers';

import GeoDataPanel from '../../../components/Panel/MapPanel/geoDataPanel';
import CrowdSourcedDataPanel from '../../../components/Panel/MapPanel/crowdSourcedDataPanel';
import NewsFeedPanel from '../../../components/Panel/MapPanel/newsFeedPanel';
import { PanelContainer } from './style';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
// async function (tweets, m) {
//   tweets.map(async doc => {
//     const { url } = doc;
//     const color = layerColor.category[doc.documentType.category].pop();
//     m.addSource(doc.recordId, {
//       type: 'geojson',
//       data: url
//     });

//     if (doc.geojsonType === 'Point') {
//       m.addLayer({
//         type: 'circle',
//         paint: {
//           'circle-color': color,
//           'circle-radius': 5
//         },
//         layout: {
//           visibility: 'none'
//         },
//         id: doc.recordId, // Sets id as current child's key
//         source: doc.recordId // The source layer defined above
//       });
//     }
//     if (doc.geojsonType === 'Polygon') {
//       m.addLayer({
//         type: 'fill',
//         paint: {
//           'fill-color': color,
//           'fill-opacity': 1
//         },
//         layout: {
//           visibility: 'none'
//         },
//         id: doc.recordId, // Sets id as current child's key
//         source: doc.recordId // The source layer defined above
//       });
//     }
//   });
// }
async function plotData(docs, m) {
  let n = 0;
  docs.map(async doc => {
    const { url } = doc;
    const color = layerColor.category[doc.documentType.category];
    if (n >= color.length) {
      n = 0;
    }
    m.addSource(doc.recordId, {
      type: 'geojson',
      data: url
    });

    if (doc.geojsonType === 'Point') {
      m.addLayer({
        type: 'circle',
        paint: {
          'circle-color': color[n],
          'circle-radius': 5
        },
        layout: {
          visibility: 'none'
        },
        id: doc.recordId, // Sets id as current child's key
        source: doc.recordId // The source layer defined above
      });
    }
    if (doc.geojsonType === 'Polygon') {
      m.addLayer({
        type: 'fill',
        paint: {
          'fill-color': color[n],
          'fill-opacity': 1
        },
        layout: {
          visibility: 'none'
        },
        id: doc.recordId, // Sets id as current child's key
        source: doc.recordId // The source layer defined above
      });
    }
    n += 1;
  });
}

class MapContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      lat: 23.3704762,
      lng: -91.7996812,
      zoom: 4.5
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
      this.setState({ categories: datos });
      map.on('load', () => {
        plotData(datos, a);
      });
    }

    if (this.props.data.getTweets) {
      // const datos = this.props.data.getTweets;
      // // map.on('load', () => {
      // //   plotData(datos, a);
      // // });
    }
  }

  toggleLayer(key, event) {
    if (!event.target.checked) {
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
          <GeoDataPanel
            categories={this.state.categories}
            toggleLayer={this.toggleLayer.bind(this)}
          />
          <CrowdSourcedDataPanel
            data={this.props.data.getTweets}
            toggleLayer={this.toggleLayer.bind(this)}
          />
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
      documentType {
        _id
        category
        subcategory
      }
      geojsonType
      title
      source
      recordId
      url
    }
  }
`;

export default compose(
  graphql(GET_DATA, {
    options: () => ({
      pollInterval: '6'
    })
  })
)(MapContainer);

MapContainer.propTypes = {
  width: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  height: PropTypes.object.isRequired
};
