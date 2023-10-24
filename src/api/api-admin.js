import { axiosClient } from "./client-axios";

export const apiAdmin = {
    login: (params) => {
        const url = `/admin/login`;
        return axiosClient.post(url, params);
    },

    register: (params) => {
        const url = `/admin/register`;
        return axiosClient.post(url, params);
    },

    refreshToken: (params) => {
        const url = `/admin/refresh_token`;
        return axiosClient.get(url, params);
    },

    logout: (params) => {
        const url = `/admin/logout`;
        return axiosClient.get(url, params);
    },

    getUser: (params) => {
        const url = `/admin/info`;
        return axiosClient.get(url, params);
    },

    getAllUser: (params) => {
        const url = `/admin/all`;
        return axiosClient.get(url, params);
    },

    updateUser: (params) => {
        const url = `/admin/update`;
        return axiosClient.patch(url, params);
    },

    changePassword: (params) => {
        const url = `/admin/change_password`;
        return axiosClient.patch(url, params);
    },

    forgotPassword: (params) => {
        const url = `/admin/forgot_password`;
        return axiosClient.post(url, params);
    },

    resetPassword: (params) => {
        const url = `/admin/reset_password`;
        return axiosClient.post(url, params);
    },
};