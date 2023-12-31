import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../api/api-user";
import { message } from "antd";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.getAllUser(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch users: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (id, thunkAPI) => {
        try {
            const response = await apiUser.getUserById(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchUserLength = createAsyncThunk(
    "user/fetchUserLength",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.getUserLength(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch users: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.register(params);
            message.success("Tạo người dùng thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.editUser(params);
            message.success("Cập nhật người dùng thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật danh mục thất bại: ${error.msg}`);
            console.log("Failed to update user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, thunkAPI) => {
        try {
            const response = await apiUser.deleteUser(id);
            message.success("Xóa danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);