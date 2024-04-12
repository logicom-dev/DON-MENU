import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articlesReducer from "./articlesReducer"
import categoriesReducer from './categoriesReducer'
import commandeReducer from './commandeReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  categories: categoriesReducer,
  commande: commandeReducer
  // Add more reducers here if needed
});

export default rootReducer;
