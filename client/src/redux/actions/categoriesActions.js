import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Action creator for fetching categories
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_CATEGORIES_REQUEST });

    const response = await axios.get('/api/categorie'); // Update the API URL
    dispatch({
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_CATEGORIES_FAILURE,
      payload: error.message,
    });
  }
};
