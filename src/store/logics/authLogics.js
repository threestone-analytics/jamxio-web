import { Auth } from 'aws-amplify';
import { createLogic } from 'redux-logic';
import { hide } from 'redux-modal';
import { replace } from 'connected-react-router';
import ActionTypes from '../ActionsTypes';
import * as authActions from '../reducers/app/forms/auth/authActions';

const signUpLogic = createLogic({
  type: ActionTypes.SIGNUP,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.signUpRequest());
    const { username, email, name,password, institution, institution_type } = action.payload; // eslint-disable-line


    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name,
        'custom:institution': institution,
        'custom:institution_type': institution_type
      }
    })
      .then(() => {
        dispatch(authActions.signUpSuccess());
        dispatch(replace('/validate_register'));
        done();
      })
      .catch(err => {
        dispatch(authActions.signUpFailure(err));
        done();
      });
  }
});

const confirmSignUpLogic = createLogic({
  type: ActionTypes.CONFIRM_SIGNUP,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.confirmSignUpRequest());
    const { username, code } = action.payload;
    Auth.confirmSignUp(username, code)
      .then(() => {
        dispatch(authActions.confirmSignUpSuccess());
        dispatch(replace('/'));
        done();
      })
      .catch(err => {
        dispatch(authActions.confirmSignUpFailure(err));
        done();
      });
  }
});

const signInLogic = createLogic({
  type: ActionTypes.SIGNIN,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.signInRequest());
    const { username, password } = action.payload;
    Auth.signIn(username, password)
      .then(() => {
        dispatch(authActions.signInSuccess());
        dispatch(hide('loginModal'));
        done();
      })
      .catch(err => {
        dispatch(authActions.signInFailure(err));
        done();
      });
  }
});

const forgotPasswordLogic = createLogic({
  type: ActionTypes.FORGOT_PASSWORD,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.forgotPasswordRequest());
    const { username } = action.payload; // eslint-disable-line

    Auth.forgotPassword({
      username
    })
      .then(() => {
        dispatch(authActions.forgotPasswordSuccess());
        done();
      })
      .catch(err => {
        dispatch(authActions.forgotPasswordFailure(err));
        done();
      });
  }
});

const resetPasswordLogic = createLogic({
  type: ActionTypes.RESET_PASSWORD,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.resetPasswordRequest());
    const { username } = action.payload; // eslint-disable-line
    Auth.forgotPassword(username)
      .then(() => {
        dispatch(authActions.resetPasswordSuccess());
        dispatch(replace('/change_password'));
        done();
      })
      .catch(err => {
        dispatch(authActions.resetPasswordFailure(err));
        done();
      });
  }
});

const changePasswordLogic = createLogic({
  type: ActionTypes.CHANGE_PASSWORD,
  latest: true,
  process({ action }, dispatch, done) {
    dispatch(authActions.changePasswordRequest());
    const { username, code, password } = action.payload; // eslint-disable-line
    Auth.forgotPasswordSubmit(username, code, password)
      .then(() => {
        dispatch(authActions.changePasswordSuccess());
        dispatch(replace('/'));
        done();
      })
      .catch(err => {
        dispatch(authActions.changePasswordFailure(err));
        done();
      });
  }
});

const logOutLogic = createLogic({
  type: ActionTypes.LOGOUT,
  latest: true,
  process(
    {
      action: {
        payload: { apolloClient }
      }
    },
    dispatch,
    done
  ) {
    dispatch(authActions.logOutRequest());// eslint-disable-line
    Auth.signOut()
      .then(() => {
        dispatch(authActions.logOutSuccess());
        apolloClient.resetStore();
        done();
      })
      .catch(err => {
        dispatch(authActions.logOutFailure(err));
        done();
      });
  }
});

const getAuthSessionLogic = createLogic({
  type: ActionTypes.GETAUTHSESSION,
  latest: true,
  async process(params, dispatch, done) {
    try {
      dispatch(authActions.getAuthSessionRequest());
      const res = await Auth.currentSession();
      if (res) {
        dispatch(authActions.getAuthSessionSuccess());
      }
    } catch (err) {
      dispatch(authActions.getAuthSessionFailure(err));
    } finally {
      done();
    }
  }
});

export default [
  signUpLogic,
  confirmSignUpLogic,
  signInLogic,
  forgotPasswordLogic,
  resetPasswordLogic,
  logOutLogic,
  getAuthSessionLogic,
  changePasswordLogic
];
