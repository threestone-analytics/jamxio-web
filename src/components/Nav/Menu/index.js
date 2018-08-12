import { NavLink } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

// Actions
import * as menuActions from 'Store/reducers/nav/navActions';

// Selectors
import { getMenu } from 'Utils/selectors/common';
import { Button } from './style';

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

const Menu = props => (
  <ButtonGroup className="nav-buttons">
    <NavLink replace to="/">
      <Button color="#2f80ed" active={props.menuState.left} onClick={props.actions.clickLeft}>
        Mapa
      </Button>
    </NavLink>
    <NavLink replace to="/data">
      <Button color="#2f80ed" active={props.menuState.right} onClick={props.actions.clickRight}>
        Datos
      </Button>
    </NavLink>
    <a
      href="https://docs.google.com/forms/d/1lGqly64HC-fvAQlqBOXNRK-VN3h5d64ySPdSev-OWd0/edit"
      target="_blank"
      without
      rel="noopener noreferrer"
    >
      <Button color="#42e695">Reporta</Button>
    </a>
  </ButtonGroup>
);

Menu.propTypes = {
  actions: PropTypes.object.isRequired,
  menuState: PropTypes.object.isRequired
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Menu);
