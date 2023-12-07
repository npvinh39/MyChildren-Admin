import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../api/api-admin";
import { message } from "antd";

export const fetchAdmins = createAsyncThunk(
    "admin/fetchAdmins",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.getAllAdmin(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch admins: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchAdmin = createAsyncThunk(
    "admin/fetchAdmin",
    async (id, thunkAPI) => {
        try {
            const response = await apiAdmin.getAdminById(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch admin: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProfiles = createAsyncThunk(
    "admin/fetchProfiles",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.getProfile(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch profiles: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createAdmin = createAsyncThunk(
    "admin/createAdmin",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.register(params);
            message.success("Tạo người dùng thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create admin: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const editAdmin = createAsyncThunk(
    "admin/editAdmin",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.editAdmin(params);
            message.success("Sửa người dùng thành công");
            return response;
        } catch (error) {
            message.error(`Sửa danh mục thất bại: ${error.msg}`);
            console.log("Failed to edit admin: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "admin/updateProfile",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.updateProfile(params);
            message.success("Cập nhật thông tin thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật thông tin thất bại: ${error.msg}`);
            console.log("Failed to update profile: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updatePassword = createAsyncThunk(
    "admin/updatePassword",
    async (params, thunkAPI) => {
        try {
            const response = await apiAdmin.updatePassword(params);
            message.success("Cập nhật mật khẩu thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật mật khẩu thất bại: ${error.msg}`);
            console.log("Failed to update password: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAdmin = createAsyncThunk(
    "admin/deleteAdmin",
    async (id, thunkAPI) => {
        try {
            const response = await apiAdmin.deleteAdmin(id);
            message.success("Xóa người dùng thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete admin: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

