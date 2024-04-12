import * as actionTypes from '../actionTypes';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
    case actionTypes.ADD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case actionTypes.FETCH_CATEGORIES_FAILURE:
    case actionTypes.ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.EDIT_CATEGORY_REQUEST:
        return { ...state, loading: true };
    case actionTypes.EDIT_CATEGORY_SUCCESS:
        return { ...state, loading: false};
    case actionTypes.EDIT_CATEGORY_FAILURE:
        return { ...state, loading: false };
      
    default:
      return state;
  }
};

export default categoriesReducer;
