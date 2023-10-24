import { axiosClient } from "./client-axios";

export const apiProduct = {
    getAll: (params) => {
        const url = `/products`;
        return axiosClient.get(url, params);
    },

    getAllWithDescription: (params) => {
        const url = `/products/with-description?page=${params.currentPage}&limit=${params.pageSize}`;
        return axiosClient.get(url, params);
    },

    get: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    getByCategory: (id) => {
        const url = `/products/category/${id}`;
        return axiosClient.get(url);
    },

    getDescriptionByProductId: (id) => {
        const url = `/products/description/${id}`;
        return axiosClient.get(url);
    },

    create: (params) => {
        const url = `/products/add`;
        return axiosClient.post(url, params);
    },

    update: (params) => {
        const url = `/products/edit/${params.id}`;
        return axiosClient.patch(url, params);
    },

    delete: (id) => {
        const url = `/products/delete/${id}`;
        return axiosClient.delete(url);
    },
};