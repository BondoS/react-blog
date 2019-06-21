import * as actionTypes from '../actions/actionTypes';
/* eslint-disable */
const user = JSON.parse (localStorage.getItem ('user'));
const initialState = {
  loggedIn: user ? true : false,
  userId: user ? user.id : null,
  error: null,
  loading: false,
  username: user ? user.username : null,
  password: user ? user.password : null,
  imageUrl: user ? user.imageUrl : null,
};

const authStart = (state, action) => {
  return {...state, ...{error: null, loading: true}};
};

const logout = (state, action) => {
  return {...state, ...{loggedIn: false}};
};
const authSuccess = (state, action) => {
  const user = {
    id: action.id,
    imageUrl: action.imageUrl,
    name: action.name,
    username: action.username,
    password: action.password,
  };
  localStorage.setItem ('user', JSON.stringify (user));
  return {
    ...state,
    ...{
      loggedIn: true,
      userId: action.id,
      error: null,
      loading: false,
      username: action.username,
      name: action.name,
      imageUrl: action.imageUrl,
      password: action.password,
    },
  };
};

const authFail = (state, action) => {
  return {...state, ...{error: action.error, loading: false}};
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart (state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess (state, action);
    case actionTypes.AUTH_FAIL:
      return authFail (state, action);
    case actionTypes.LOGIN_START:
      return authStart (state, action);
    case actionTypes.LOGIN_SUCCESS:
      return authSuccess (state, action);
    case actionTypes.LOGIN_FAIL:
      return authFail (state, action);
    case actionTypes.LOGOUT:
      return logout (state, action);
    default:
      return state;
  }
};

export default reducer;
