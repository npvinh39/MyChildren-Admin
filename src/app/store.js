import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/login/loginSlice'
import productSlice from '../features/product/productSlice'
import categorySlice from '../features/category/categorySlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        product: productSlice,
        category: categorySlice,
    },
})