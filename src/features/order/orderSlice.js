import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, fetchOrder, fetchOrdersLength, createOrder, updateOrder, deleteOrder } from './path-api';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: null,
        loading: false,
        ordersLength: 0,
        message: '',
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchOrders.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchOrder.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action)
            state.order = action.payload;

        },
        [fetchOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchOrdersLength.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrdersLength.fulfilled]: (state, action) => {
            state.loading = false;
            state.ordersLength = action.payload.length;
        },
        [fetchOrdersLength.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createOrder.pending]: (state) => {
            state.loading = true;
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders.unshift(action.payload.data);
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateOrder.pending]: (state) => {
            state.loading = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.loading = false;
            console.log(action)
            state.orders = state.orders.map((order) => {
                if (order?._id === action.meta.arg?.id) {
                    order = action.payload.data;
                }
                return order;
            });
        },
        [updateOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteOrder.pending]: (state) => {
            state.loading = true;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(
                (order) => order._id !== action.payload.data.id
            );
        },
        [deleteOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    }
});

export default orderSlice.reducer;