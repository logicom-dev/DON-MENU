import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {ArticleService} from "../Services/Article-Service"

export const getArticles = createAsyncThunk(
    "article/getArticles",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
      const res = await ArticleService.fetchArticles();
      return res.data;
      }
      catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const createArticle = createAsyncThunk(
    "article/createArticle",
    async (article, thunkAPI) => { 
      const { rejectWithValue } = thunkAPI;
      try{
      const res= await ArticleService.addArticle(article);
      return res.data
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    }
  );
  
  export const deleteArticle = createAsyncThunk(
    "article/deleteArticle",
    async (id,thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      await ArticleService.deleteArticle(id);
      return  id ;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    });

  export const updateArticle = createAsyncThunk(
      "article/updateArticle",
      async ({formData,id}, thunkAPI) => { 
      const { rejectWithValue } = thunkAPI;
        try{ 
       const res= await ArticleService.editArticle(formData,id);
        return res.data
      
      }
      catch (error) { 
        return rejectWithValue(error.message);
      }
     
      }
    );

  export const findArticleByID = createAsyncThunk(
    "article/findArticleByID",
    async (id,thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try{
      const res = await ArticleService.fetchArticleById(id);
      return res.data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
    });
export const articleSlice = createSlice({
  name: 'article',
  initialState:{
    articles:[],
    article:{},
    isLoading: false,
    status:null,
  },
  reducers: {
    removeSelectedProduct: (state) => {
      state.article= {}
      
    }
  },
  
  extraReducers: {
    //get articles
    [getArticles.pending]:(state,action)=>{
      state.isLoading=true;
      state.status=null;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.isLoading=false;
      state.status = null;
        state.articles=action.payload;
    },
    [getArticles.rejected]: (state, action) => {
      state.isLoading=false;
      state.status=action.payload;
      console.log("impossible de se connecter au serveur")
    },

    //insertion article
    [createArticle.pending]: (state, action) => {
      state.isLoading=true;
      state.status=null;
    },
    [createArticle.fulfilled]: (state, action) => {
     
      state.articles.push(action.payload);
      state.isLoading=false;
      state.status=null;
    },
    [createArticle.rejected]: (state, action) => {
      state.isLoading=false;
      state.status=action.payload;
    },
    //Modification article
    [updateArticle.fulfilled]: (state, action) => { 
      const index = state.articles.findIndex(article => article._id === action.payload._id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    //Delete article
    [deleteArticle.pending]: (state, action) => {
      state.isLoading=true;
      state.status=null;    
    },
    [deleteArticle.fulfilled]: (state, action) => {
      state.isLoading=false;
      state.status=null;    
      state.articles=state.articles.filter((item)=> item._id!==action.payload)
    
    },
    [deleteArticle.rejected]: (state, action) => {
      state.isLoading=false;
      state.status=action.payload;       
    },
  //Fectch article
    [findArticleByID.pending]: (state, action) => {
      state.isLoading = true
      state.status = null
        
      },
    [findArticleByID.fulfilled]:(state, action) => {
      state.isLoading = false
      state.status = null
      state.article=action.payload;
   },
   
  }

  }
  
)

export const { removeSelectedProduct } = articleSlice.actions
export default articleSlice.reducer;
