import * as actionTypes from '../actionTypes';

const initialState = {
  articlesById: [],
  loading: false,
  error: null,
};

const articlesByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLESBYID_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_ARTICLESBYID_SUCCESS:
      return { ...state, loading: false, articlesById: action.payload };
    case actionTypes.FETCH_ARTICLESBYID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default articlesByIdReducer;
