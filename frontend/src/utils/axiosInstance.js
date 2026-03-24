import axios from 'axios'

const BASE_URL = process.env.VITE_BASE_URL;


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
})

export default axiosInstance;