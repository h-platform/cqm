export function handleAxiosError(error: any) {
    const axiosReport = {
        axiosRequest: {
            method: error.response?.config?.method || error.config?.method,
            baseURL: error.response?.config?.baseURL || error.config?.baseURL,
            url: error.response?.config?.url || error.config?.url,
            params: error.response?.config?.params || error.config?.params,
            data: error.response?.config?.data || error.config?.data,
        },
        axiosResponse: {
            data: error.response?.data,
            status: error.response?.status,
        }
    };
    return axiosReport;
}