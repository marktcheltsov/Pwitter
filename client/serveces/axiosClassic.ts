import axios from "axios"

const axiosClassic = axios.create({
    baseURL: 'http://localhost:8000',
})

export default axiosClassic