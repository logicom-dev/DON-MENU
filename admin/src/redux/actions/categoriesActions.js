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


export const addCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_CATEGORY_REQUEST });

    await axios.post('/api/categorie', categoryData)
    .then(()=> {
      dispatch(fetchCategories());
    })

    // After successful POST, fetch the updated categories
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const editeCategory = (CodeCat, updatedCategoryData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_CATEGORY_REQUEST });

    await axios.put(`/api/categorie/${CodeCat}`, updatedCategoryData)
    .then(()=> {
      dispatch(fetchCategories());
    })


    // After successful PUT, fetch the updated categories
    dispatch(fetchCategories());
  } catch (error) {
    dispatch({
      type: actionTypes.EDIT_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};


export const deleteCategory = (CodeCat) => async (dispatch) => {
  try {
     await axios.delete(`/api/categorie/${CodeCat}`)
     .then(() => dispatch(fetchCategories())) 
  } catch (error) {
     alert("Category cannot be deleted due to associated articles.")
  }
};

