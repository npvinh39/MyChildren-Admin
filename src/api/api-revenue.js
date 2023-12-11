import { axiosClient } from "./client-axios";

export const apiRevenue = {
    getAll: (params) => {
        const url = `/revenue?page=${params.currentPage}&limit=${params.pageSize}`;
        return axiosClient.get(url, params);
    },
    getAllFillTime: (params) => {
        const url = `/revenue/time?page=${params.currentPage}&limit=${params.pageSize}`;
        return axiosClient.post(url, params);
    },
};