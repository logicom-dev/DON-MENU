import axios from 'axios';
import * as actionTypes from '../actionTypes';
import jwt_decode from 'jwt-decode'; // Import jwt_decode

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (token = false, message) => {
  // Decode the token
  const decodedToken = token && jwt_decode(token);

  // Save the decoded token to local storage
  token && localStorage.setItem('mas_decodedToken', JSON.stringify(decodedToken));

  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    message: message,
    decodedToken: decodedToken, // Include the decoded token in the action
  };
};

export const loginFail = (error, message) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
    message: message,
  };
};

export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

// Updated login action to use Redux-Thunk
export const loginAction = (NomPrenom, MotPasse) => {
  return (dispatch) => {
    dispatch(loginStart());

    axios
      .post('/api/admin/auth', { NomPrenom, MotPasse })
      .then((response) => {
        const { mas_token, message } = response.data;

        localStorage.setItem('mas_token', mas_token);
        dispatch(loginSuccess(mas_token, message));
      })
      .catch((error) => {
        dispatch(loginFail(error.response.data.message || 'Login failed', 'Login failed'));
      });
  };
};
