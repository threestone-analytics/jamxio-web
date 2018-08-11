import ActionTypes from '../../../../ActionsTypes';

export function logOutStateForm() {
  return {
    type: ActionTypes.LOGOUT_STATEFORM
  };
}
export function signUpStateForm() {
  return {
    type: ActionTypes.SIGNUP_STATEFORM
  };
}

export function signInStateForm() {
  return {
    type: ActionTypes.SIGNIN_STATEFORM
  };
}
export function forgotPasswordStateForm() {
  return {
    type: ActionTypes.FORGOT_PASSWORD_STATEFORM
  };
}
/**
 * ## Logout actions
 */
export function logOutRequest() {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
}

export function logOutSuccess() {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
}
export function logOutFailure(error) {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    payload: error
  };
}
/**
 * ## Logout
 */

export function logOut(apolloClient) {
  return {
    type: ActionTypes.LOGOUT,
    payload: { apolloClient }
  };
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */

export function onAuthFormFieldChange(field, value) {
  return {
    type: ActionTypes.ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field, value }
  };
}

/**
 * ## Signup actions
 */
export function signUpRequest() {
  return {
    type: ActionTypes.SIGNUP_REQUEST
  };
}
export function signUpSuccess() {
  return {
    type: ActionTypes.SIGNUP_SUCCESS
  };
}
export function signUpFailure(error) {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    payload: error
  };
}

/**
 * ## Signup actions
 */

export function confirmSignUp(payload) {
  return {
    type: ActionTypes.CONFIRM_SIGNUP,
    payload
  };
}

export function confirmSignUpRequest() {
  return {
    type: ActionTypes.CONFIRM_SIGNUP_REQUEST
  };
}
export function confirmSignUpSuccess() {
  return {
    type: ActionTypes.CONFIRM_SIGNUP_SUCCESS
  };
}
export function confirmSignUpFailure(error) {
  return {
    type: ActionTypes.CONFIRM_SIGNUP_FAILURE,
    payload: error
  };
}

/**
 * ## DeleteToken actions
 */

export function deleteSessionTokenRequest() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_REQUEST
  };
}
export function deleteSessionTokenSuccess() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_SUCCESS
  };
}
export function deleteSessionTokenFailure() {
  return {
    type: ActionTypes.DELETE_SESSIONTOKEN_FAILURE
  };
}

/**
 * ## signup
 */

export function signUp(payload) {
  return {
    type: ActionTypes.SIGNUP,
    payload
  };
}

export function signIn(payload) {
  return {
    type: ActionTypes.SIGNIN,
    payload
  };
}

export function signInRequest() {
  return {
    type: ActionTypes.SIGNIN_REQUEST
  };
}

export function signInSuccess() {
  return {
    type: ActionTypes.SIGNIN_SUCCESS
  };
}

export function signInFailure(error) {
  return {
    type: ActionTypes.SIGNIN_FAILURE,
    payload: error
  };
}

/**
 * ## Forgot Password actions
 */

export function forgotPassword(payload) {
  return {
    type: ActionTypes.FORGOT_PASSWORD,
    payload
  };
}

export function forgotPasswordRequest() {
  return {
    type: ActionTypes.FORGOT_PASSWORD_REQUEST
  };
}

export function forgotPasswordSuccess() {
  return {
    type: ActionTypes.FORGOT_PASSWORD_SUCCESS
  };
}

export function forgotPasswordFailure(error) {
  return {
    type: ActionTypes.FORGOT_PASSWORD_FAILURE,
    payload: error
  };
}

export function resetPassword(payload) {
  return {
    type: ActionTypes.RESET_PASSWORD,
    payload
  };
}

export function resetPasswordRequest() {
  return {
    type: ActionTypes.RESET_PASSWORD_REQUEST
  };
}

export function resetPasswordSuccess() {
  return {
    type: ActionTypes.RESET_PASSWORD_SUCCESS
  };
}

export function resetPasswordFailure(error) {
  return {
    type: ActionTypes.RESET_PASSWORD_FAILURE,
    payload: error
  };
}

export function changePassword(payload) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload
  };
}

export function changePasswordRequest() {
  return {
    type: ActionTypes.CHANGE_PASSWORD_REQUEST
  };
}

export function changePasswordSuccess() {
  return {
    type: ActionTypes.CHANGE_PASSWORD_SUCCESS
  };
}

export function changePasswordFailure(error) {
  return {
    type: ActionTypes.CHANGE_PASSWORD_FAILURE,
    payload: error
  };
}

export function getAuthSession() {
  return {
    type: ActionTypes.GETAUTHSESSION
  };
}

export function getAuthSessionRequest() {
  return {
    type: ActionTypes.GETAUTHSESSION_REQUEST
  };
}

export function getAuthSessionSuccess() {
  return {
    type: ActionTypes.GETAUTHSESSION_SUCCESS
  };
}

export function getAuthSessionFailure(error) {
  return {
    type: ActionTypes.GETAUTHSESSION_FAILURE,
    payload: error
  };
}
