import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

/* eslint-disable */
export const auth = (name, username, password, isLoggedIn) => {
  return dispatch => {
    dispatch(authStart());
  };
};
