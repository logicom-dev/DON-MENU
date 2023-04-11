import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import categorieReducer from '../features/categorieSlice'
const store = configureStore({
reducer: {
storearticles:articlesReducer,
storecategories:categorieReducer,
}
})
export default store
