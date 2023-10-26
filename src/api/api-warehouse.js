import { axiosClient } from "./client-axios";

export const apiWarehouse = {
    getAll: (params) => {
        const url = `/warehouses`;
        return axiosClient.get(url, params);
    },

    in: (params) => {
        const url = `/warehouses/in`;
        return axiosClient.post(url, params);
    },

    out: (params) => {
        const url = `/warehouses/out`;
        return axiosClient.post(url, params);
    },
};