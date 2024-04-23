import * as actionTypes from '../actionTypes';

const initialState = {
  token: null,
  loading: false,
  checkupErrorCredentials: false,
  error: null,
  message: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
        checkupErrorCredentials: false,
        message: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        checkupErrorCredentials: true,
        error: null,
        message: action.message,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: action.message,
      };
    case actionTypes.LOGOUT: // Handle the LOGOUT action
      return {
        ...state,
        token: null,
        loading: false,
        checkupErrorCredentials: false,
        error: null,
        message: '',
      };
    default:
      return state;
  }
};

export default authReducer;
