import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
// Containers
import RegisterContainer from 'Containers/appContainers/NavigationContainers/Register';

// Components
import { Toastr } from 'Components/Toastr';

// Styles ; FIXME too many styles instead we sould use styled-components
import 'Styles/app/map/mapbox-gl.css';
import 'Styles/app/dashboard/home-container.scss';
import 'Styles/app/dashboard/dropdown.scss';
import 'Styles/app/nav/sidebar.scss';
import 'Styles/app/dashboard/index.scss';

const DataLayout = ({ location, props }) => (
  <div id="outer-container" location={location}>
    <main id="page-wrap">
      <Toastr />
      <RegisterContainer {...props} />
    </main>
  </div>
);

DataLayout.propTypes = {
  match: PropTypes.object.isRequired,
  props: PropTypes.object,
  location: PropTypes.object.isRequired
};

export default withRouter(DataLayout);
