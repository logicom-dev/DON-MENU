import * as actionTypes from '../actionTypes';

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_REQUEST:
    case actionTypes.ADD_ARTICLES_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
    case actionTypes.ADD_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload };
    case actionTypes.FETCH_ARTICLES_FAILURE:
    case actionTypes.ADD_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.EDIT_ARTICLES_REQUEST:
        return { ...state, loading: true };
    case actionTypes.EDIT_ARTICLES_SUCCESS:
        return { ...state, loading: false};
    case actionTypes.EDIT_ARTICLES_FAILURE:
        return { ...state, loading: false };
    default:
      return state;
  }
};

export default articlesReducer;
