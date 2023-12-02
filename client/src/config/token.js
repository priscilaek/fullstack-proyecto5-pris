// ./src/config/token.js
import axiosClient from "./axios"

const getToken = () => {
  const token = localStorage.getItem("token")

  // SÍ HUBO TOKEN
  if (token) {
    return (axiosClient.defaults.headers.common["x-auth-token"] = token)
  }

  // NO HUBO TOKEN
  return delete axiosClient.defaults.headers.common["x-auth-token"]
}

export default getToken
