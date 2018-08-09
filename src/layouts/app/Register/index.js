import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
// Containers
import RegisterContainer from 'Containers/appContainers/NavigationContainers/Register';

// Components
import { Toastr } from 'Components/Toastr';

// Styles ; FIXME too many styles instead we sould use styled-components
import '../../../styles/app/map/mapbox-gl.css';
import '../../../styles/app/dashboard/home-container.scss';
import '../../../styles/app/dashboard/dropdown.scss';
import '../../../styles/app/nav/sidebar.scss';
import '../../../styles/app/dashboard/index.scss';

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
