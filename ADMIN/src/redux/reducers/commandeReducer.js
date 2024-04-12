import * as actionTypes from '../actionTypes';

const initialState = {
  commande: [],
  loading: false,
  error: null,
};

const commandeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMANDE_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_COMMANDE_SUCCESS:
      return { ...state, loading: false, commande: action.payload };
    case actionTypes.FETCH_COMMANDE_FAILURE:
      return { ...state, loading: false, error: action.payload };  
    default:
      return state;
  }
};

export default commandeReducer;
