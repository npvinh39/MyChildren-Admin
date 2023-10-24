import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchProductsWithDescription,
    fetchProduct,
    fetchProductsByCategory,
    fetchDescriptionByProductId,
    createProduct,
    updateProduct,
    deleteProduct,
} from './path-api';


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        description: {},
        product: null,
        loading: false,
        message: '',
        currentPage: 1,
        pageSize: 12,
        totalPages: 0,
        hasNextPageL: false,
        hasPreviousPage: false,
    },

    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductsWithDescription.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductsWithDescription.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.results;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchProductsWithDescription.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProduct.pending]: (state) => {
            state.loading = true;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [fetchProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductsByCategory.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductsByCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [fetchProductsByCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchDescriptionByProductId.pending]: (state) => {
            state.loading = true;
        },
        [fetchDescriptionByProductId.fulfilled]: (state, action) => {
            state.loading = false;
            state.description = action.payload;
        },
        [fetchDescriptionByProductId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products.push(action.payload.data);
        },
        [createProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            const data = action.payload.data;

            const index = state.products.findIndex(p => p._id === data._id);
            if (index !== -1) state.products[index] = data;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            // delete from products
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) state.products.splice(index, 1);
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export const { products } = productSlice.actions;

export default productSlice.reducer;