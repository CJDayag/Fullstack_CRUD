import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://backend_api.test/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false  // Changed to false
});

export default apiClient;