import axios from 'axios';
import qs from 'qs';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = ({id, imageUrl, name, username, password}) => {
  // console.log ('action authSuccess ', id, imageUrl, name, username);

  return {
    type: actionTypes.AUTH_SUCCESS,
    id,
    imageUrl,
    name,
    username,
    password,
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

/* eslint-disable */
export const auth = (name, username, password, imageUrl, isLoggedIn) => {
  return dispatch => {
    dispatch (authStart ());
    const authData = {
      name,
      username,
      password,
      imageUrl: typeof (imageUrl !== 'undefined') && imageUrl != ''
        ? 'https://homepages.cae.wisc.edu/~ece533/images/cat.png'
        : imageUrl,
    };
    // console.log (qs.stringify (authData));
    axios ({
      method: 'POST',
      data: qs.stringify (authData),
      url: 'http://issr-dev.eu-west-1.elasticbeanstalk.com/api/users',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      crossdomain: true,
      withCredentials: true,
    })
      .then (response => {
        dispatch (authSuccess ({...response.data, password}));
        // console.log (response.data);
      })
      .catch (err => {
        dispatch (authFail (err));
        console.log (err);
      });
  };
};
