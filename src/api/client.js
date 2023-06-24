import axios from 'axios'
import {notification} from "../utils/helpers.js";

const axiosOptions = {
    baseURL: 'https://tournament-production.up.railway.app/api/',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosInstance = axios.create(axiosOptions)

axiosInstance.interceptors.response.use((res) => {
    console.log('from data', res.data)

    if (res.data.errors && res.data.errors.length > 0) {
        notification(res.data.message, 'danger')
    }

    return res
})