import axios from 'axios';
import * as actionTypes from '../actionTypes';

// Action creator for fetching categories
export const fetchCommande = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_COMMANDE_REQUEST });

    const response = await axios.get('/api/commande'); // Update the API URL
    dispatch({
      type: actionTypes.FETCH_COMMANDE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_COMMANDE_FAILURE,
      payload: error.message,
    });
  }
};
