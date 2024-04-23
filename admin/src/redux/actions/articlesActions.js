// client/src/redux/actions/authActions.js

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

export const addArticle = (articleData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_ARTICLES_REQUEST });

    await axios.post('/api/articles', articleData)
    .then(()=> {
      dispatch(fetchArticles());
    })
    
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_ARTICLES_FAILURE,
      payload: error.message,
    });
  }
};

export const editeArticle = (CodeArt, updatedArticleData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_ARTICLES_REQUEST });

    await axios.put(`/api/articles/${CodeArt}`, updatedArticleData)
    .then(()=> {
      dispatch(fetchArticles());
    })
  } catch (error) {
    dispatch({
      type: actionTypes.EDIT_ARTICLES_FAILURE,
      payload: error.message,
    });
  }
};


export const deleteArticle = (CodeArt) => async (dispatch) => {
  try {
     await axios.delete(`/api/articles/${CodeArt}`)
     .then(() => dispatch(fetchArticles())) 
  } catch (error) {
     alert("Article cannot be deleted ")
  }
};
