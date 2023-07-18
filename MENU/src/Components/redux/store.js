import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../../features/cartSlice"
import articleReducer from '../../features/articleSlice'
 const store = configureStore({
  reducer: {
    articles:articleReducer,
    cart:cartReducer
  }
})
export default store