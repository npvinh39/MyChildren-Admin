import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
} from "./path-api";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        category: {},
        loading: false,
        message: "",
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.loading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchCategory.pending]: (state) => {
            state.loading = true;
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        [fetchCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createCategory.pending]: (state) => {
            state.loading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [createCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

// export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;