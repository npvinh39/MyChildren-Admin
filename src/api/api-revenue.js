import { axiosClient } from "./client-axios";

export const apiRevenue = {
    getAll: (params) => {
        const url = `/revenues`;
        return axiosClient.get(url, params);
    },
};