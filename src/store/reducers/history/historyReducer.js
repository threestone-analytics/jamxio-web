import Immutable from 'immutable';
import ActionTypes from '../../ActionsTypes';

const initialState = Immutable.fromJS({});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_HISTORY_ITEM:
      if (state[action.payload.input]) {
        return {
          [action.payload.input]: {
            selected: !state[action.payload.input].selected
          }
        };
      }
      return {
        [action.payload.input]: {
          selected: true
        }
      };

    default:
      return state;
  }
};
