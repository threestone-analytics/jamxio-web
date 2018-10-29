import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const categories = ['00-water'];

const crowdSourced = ['sms', 'twitter', 'Direct Message', 'reportes en linea'];

const DefaultContainer = ({ children }) => <div className="control-panel">{children}</div>;
DefaultContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
export default class StyleControls extends PureComponent {
  static propTypes = {
    containerComponent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
      .isRequired,
    toggleLayer: PropTypes.func.isRequired
  };

  render() {
    const Container = this.props.containerComponent || DefaultContainer;

    return (
      <Container>
        <div className="control-panel-title">
          <h5>Geo Data</h5>
        </div>
        <hr />
        {categories.map(category => (
          <label key={`{category}`}>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer('00-water', e);
              }}
            />
            {category}
          </label>
        ))}
        <div className="control-panel-title">
          <h5>Crowd Surced Data</h5>
        </div>
        <hr />
        {crowdSourced.map(cs => (
          <label key={cs}>
            <input
              type="checkbox"
              onClick={e => {
                this.props.toggleLayer('00-water', e);
              }}
            />
            {cs}
          </label>
        ))}
      </Container>
    );
  }
}
