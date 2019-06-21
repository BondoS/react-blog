import axios from 'axios';
import * as actionTypes from './actionTypes';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
export const loginSuccess = ({id, imageUrl, name, username, password}) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    id,
    imageUrl,
    name,
    username,
    password,
  };
};
export const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error,
  };
};

/* eslint-disable */
export const login = (username, password) => {
  return dispatch => {
    dispatch (loginStart ());
    const loginData = {
      username,
      password,
    };

    axios ({
      method: 'get',
      url: 'http://issr-dev.eu-west-1.elasticbeanstalk.com/api/me',
      auth: {
        username,
        password,
      },
    })
      .then (response => {
        dispatch (loginSuccess ({...response.data, password}));
        console.log (response.data);
      })
      .catch (err => {
        dispatch (loginFail (err));
        console.log (err);
      });
  };
};

export const logout = () => {
  localStorage.removeItem ('user');
  return {
    type: actionTypes.LOGOUT,
  };
};
