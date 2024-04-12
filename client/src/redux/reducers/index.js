import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer'
import articlesReducer from "./articlesReducer"
import articlesByIdReducer from "./articlesByIdReducer"
import counterReducer from "./counterReducer"
import cartReducer from "./cartReducer"
// import authReducer from './authReducer';
// import commandeReducer from './commandeReducer'

const rootReducer = combineReducers({
    categories: categoriesReducer,
    articles: articlesReducer,
    articlesById: articlesByIdReducer,
    counterReducer: counterReducer,
    cartReducer: cartReducer
//   auth: authReducer,
//   commande: commandeReducer

});

export default rootReducer;
