import axios from 'axios';
import { baseURL } from '../../common/summaryApi.js';

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

//!sending access token in the header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
