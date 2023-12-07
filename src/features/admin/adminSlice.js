import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAdmins,
    fetchAdmin,
    fetchProfiles,
    createAdmin,
    editAdmin,
    updateProfile,
    updatePassword,
    deleteAdmin,
} from "./path-api";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admins: [],
        admin: null,
        loading: false,
        message: "",
        profiles: [],
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchAdmins.pending]: (state) => {
            state.loading = true;
        },
        [fetchAdmins.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = action.payload.admins;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchAdmins.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchAdmin.pending]: (state) => {
            state.loading = true;
        },
        [fetchAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.admin = action.payload;
        },
        [fetchAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProfiles.pending]: (state) => {
            state.loading = true;
        },
        [fetchProfiles.fulfilled]: (state, action) => {
            state.loading = false;
            state.profiles = action.payload;
        },
        [fetchProfiles.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createAdmin.pending]: (state) => {
            state.loading = true;
        },
        [createAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins.unshift(action.payload.newAdmin);
        },
        [createAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [editAdmin.pending]: (state) => {
            state.loading = true;
        },
        [editAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = state.admins.map((admin) =>
                admin._id === action.payload.data._id ? action.payload.data : admin
            );
        },
        [editAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProfile.pending]: (state) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.profiles = state.profiles.map((profile) =>
                profile._id === action.payload.data._id ? action.payload.data : profile
            );
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updatePassword.pending]: (state) => {
            state.loading = true;
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.loading = false;
            // state.profiles = state.profiles.map((profile) =>
            //     profile._id === action.payload.data._id ? action.payload.data : profile
            // );
        },
        [updatePassword.rejected]: (state, action) => {
            state.loading = false;
            // state.message = action.payload;
        },
        [deleteAdmin.pending]: (state) => {
            state.loading = true;
        },
        [deleteAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = state.admins.filter((admin) => admin._id !== action.payload.id);
        },
        [deleteAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default adminSlice.reducer;