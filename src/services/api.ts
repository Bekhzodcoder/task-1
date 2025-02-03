import axios from "axios";

const url = "http://45.138.158.137:92/api";
export const BASE_URL = url;

const Api = axios.create({
    baseURL: url,
});

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("error: ", error);
        if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);