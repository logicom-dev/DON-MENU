import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategorieById, fetchCategories, delCategorie, editCategorie, addCategorie } from "../services/CategorieService"
export const getCategories = createAsyncThunk(
    "categorie/getCategories",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetchCategories();
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createCategorie = createAsyncThunk(
    "categorie/createCategorie",
    async (categorie, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await addCategorie(categorie);
            return res.data
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteCategorie = createAsyncThunk(
    "categorie/deleteCategorie",
    async (CodeCat, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await delCategorie(CodeCat);
            return CodeCat;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCategorie = createAsyncThunk(
    "categorie/updateCategorie",
    async (cat, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await editCategorie(cat);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const findCategorieByID = createAsyncThunk(
    "categorie/findCategorieByID",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetchCategorieById(id);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const categorieSlice = createSlice({
    name: 'categorie',
    initialState: {
        categories: [],
        categorie: {},
        isLoading: false,
        success: null,
        error: null,
    },
    extraReducers: (builder) => {
        //get categories
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload;

            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("impossible de se connecter au serveur")
            })
            //insertion categorie
            .addCase(createCategorie.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createCategorie.fulfilled, (state, action) => {
                state.categories.push(action.payload);
                state.isLoading = false;
                state.error = null;
                state.success = action.payload;
            })
            .addCase(createCategorie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.success = null;
            })
            //Modification categorie
            .addCase(updateCategorie.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateCategorie.fulfilled, (state, action) => {
                state.categories = state.categories.map((item) =>
                    item.CodeCat === action.payload.CodeCat ? action.payload : item
                );
                state.isLoading = false;
                state.error = null;
                state.success = action.payload;
            })
            //Delete categorie
            .addCase(deleteCategorie.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCategorie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = state.categories.filter((item) => item.CodeCat !== action.payload)
            })
            .addCase(deleteCategorie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //Fectch categorie
            .addCase(findCategorieByID.pending, (state, action) => {
                state.isLoading = true
                state.error = null;
            })
            .addCase(
                findCategorieByID.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.error = null
                    state.categorie = action.payload;
                })
    }
}
)
export default categorieSlice.reducer;