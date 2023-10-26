import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/login/loginSlice'
import productSlice from '../features/product/productSlice'
import categorySlice from '../features/category/categorySlice'
import promotionSlice from '../features/promotion/promotionSlice'
import orderSlice from '../features/order/orderSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        product: productSlice,
        category: categorySlice,
        promotion: promotionSlice,
        order: orderSlice,
    },
})