import axios from "axios";

let axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ANALYTICS_BASE_URL,
    headers: {"Content-Type": "application/json; charset=UTF-8"}
});

export {axiosInstance};
