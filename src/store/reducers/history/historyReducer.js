import Immutable from 'immutable';
import ActionTypes from '../../ActionsTypes';

const initialState = Immutable.fromJS({});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_HISTORY_ITEM:
      if (state[action.payload.input._id]) {
        return {
          [action.payload.input._id]: {
            selected: !state[action.payload.input._id].selected,
            url: action.payload.input.url
          }
        };
      }
      return {
        [action.payload.input._id]: {
          selected: true,
          url: action.payload.input.url
        }
      };

    default:
      return state;
  }
};
