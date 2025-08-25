import axios from 'axios';

const instance = axios.create({
  baseURL: "https://institute-backend.azurewebsites.net",
});

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;