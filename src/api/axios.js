import axios from "axios";
import axiosRetry from "axios-retry";
const BASE_URL = 'http://localhost:8000/api'

export default axios.create({
    baseURL: BASE_URL
})

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return error.response.status === 429;
    },
});