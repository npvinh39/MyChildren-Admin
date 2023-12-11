import { axiosClient } from "./client-axios";

export const apiRated = {
    getAll: (params) => {
        const url = `/rated?page=${params.currentPage}&limit=${params.pageSize}`;
        return axiosClient.get(url, params);
    },

    get: (id) => {
        const url = `/rated/${id}`;
        return axiosClient.get(url);
    },

    getByProductId: (id) => {
        const url = `/rated/product/${id}`;
        return axiosClient.get(url);
    },

    getRatedLength: (parans) => {
        const url = `/rated/length/all`;
        return axiosClient.get(url, parans);
    },

    create: (params) => {
        const url = `/rated/add`;
        return axiosClient.post(url, params);
    },

    update: (params) => {
        const url = `/rated/edit/${params.id}`;
        return axiosClient.patch(url, params);
    },

    delete: (id) => {
        const url = `/rated/delete/${id}`;
        return axiosClient.delete(url);
    },
};