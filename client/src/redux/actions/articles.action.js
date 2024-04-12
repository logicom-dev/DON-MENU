import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Action creator for fetching articles
export const fetchArticles = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_ARTICLES_REQUEST });

    const response = await axios.get('/api/articles'); // Update the API URL
    dispatch({
      type: actionTypes.FETCH_ARTICLES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_ARTICLES_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator for fetching articles by id
export const fetchArticlesById = (codeCat) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_ARTICLESBYID_REQUEST });

    const response = await axios.get(`/api/articles/${codeCat}`); // Update the API URL
    dispatch({
      type: actionTypes.FETCH_ARTICLESBYID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_ARTICLESBYID_FAILURE,
      payload: error.message,
    });
  }
};