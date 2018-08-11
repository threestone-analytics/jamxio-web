import { Record } from 'immutable';
import ActionTypes from '../../../../ActionsTypes';

export default Record({
  loggedInUser: false,
  authType: ActionTypes.SIGNIN_STATEFORM,
  error: null,
  isFetching: false,
  showPassword: false
});
