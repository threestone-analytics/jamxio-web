import React from 'react';
/* show, handleHide, message, title */
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import * as dropdownActions from 'Store/reducers/dropdown/dropdownActions';
import { getDropdown } from 'Utils/selectors/common';
import { renderSubcategories } from './handlers';

// Actions
import { Label, Item, ItemContainer, Circle, SubItemContainer } from './style';

// Selectors

function mapStateToProps(state) {
  return {
    dropdownState: getDropdown(state)
  };
}

const actions = [dropdownActions];

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

const DD = props => {
  let active = false;
  if (props.dropdownState[props.title] && props.dropdownState[props.title].show) {
    active = props.dropdownState[props.title].show;
  }

  const { color } = props.options[0];

  return (
    <ItemContainer>
      <Item active={active}>
        <Circle
          color={color}
          onClick={() => {
            props.actions.toggleItems(props.title);
          }}
        />
        <Label
          onClick={() => {
            props.actions.toggleItems(props.title);
          }}
        >
          {props.title}
        </Label>
      </Item>
      <ul
        id="subcategory-list"
        className={`dropdown__list ${active ? 'dropdown__list--active' : ''}`}
      >
        <SubItemContainer>{renderSubcategories(props)}</SubItemContainer>
      </ul>
    </ItemContainer>
  );
};

export const Dropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(DD);

DD.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  dropdownState: PropTypes.object.isRequired
};
