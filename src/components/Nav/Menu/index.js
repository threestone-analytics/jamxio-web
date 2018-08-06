import { NavLink } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button } from './style';

// Actions
import * as menuActions from '../../../store/reducers/nav/navActions';

// Selectors
import { getMenu } from '../../../utils/selectors/common';

const actions = [menuActions];

function mapStateToProps(state) {
  return {
    menuState: getMenu(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const Menu = props => {
  console.log(props.menuState.left);
  return (
    <ButtonGroup className="nav-buttons">
      <NavLink replace to="/">
        <Button active={props.menuState.left} onClick={props.actions.clickLeft}>
          {' '}
          Mapa{' '}
        </Button>
      </NavLink>
      <NavLink replace to="/data">
        <Button active={props.menuState.right} onClick={props.actions.clickRight}>
          {' '}
          Datos{' '}
        </Button>
      </NavLink>
    </ButtonGroup>
  );
};

Menu.propTypes = {
  actions: PropTypes.object.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Menu);
