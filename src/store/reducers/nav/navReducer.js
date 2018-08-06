import ActionTypes from '../../ActionsTypes';
import InitialState from './navInitialState';

const initialState = new InitialState();
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.ClICK_LEFT_BUTTON:
      return state.setIn(['left'], true).setIn(['right'], false);
    case ActionTypes.ClICK_RIGHT_BUTTON:
      return state.setIn(['left'], false).setIn(['right'], true);
    default:
      return state;
  }
};
