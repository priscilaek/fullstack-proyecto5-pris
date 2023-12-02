// ./src/config/axios.js

import axios from "axios"

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
})

export default axiosClient
