// src/context/User/UserState.jsx

import { useReducer } from "react"
import axiosClient from "../../config/axios"
import UserContext from "./UserContext"
import UserReducer from "./UserReducer"
import getToken from "./../../config/token"

// POR HACER: IMPORTAR AXIOS
const UserState = (props) => {
  // 1. INITIAL STATE
  const initialState = {
    currentUser: {
      name: "",
      lastname: "",
      country: "",
      address: "",
      email: "",
      receipts: [],
      zipCode: 0,
    },
    cart: [],
    authStatus: false,
    sessionURL: null,
  }

  // 2. REDUCERS
  const [globalState, dispatch] = useReducer(UserReducer, initialState)

  // 3. DISPATCHERS

  // A. REGISTRO DE USUARIO
  const registerUser = async (form) => {
    console.log(form)
    try {
      const res = await axiosClient.post("/api/v1/users/create", form)

      const token = res.data.data

      dispatch({
        type: "SUCCESSFUL_REGISTER",
        payload: token,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // B. INICIO DE SESIÓN DE USUARIO
  const loginUser = async (form) => {
    try {
      const res = await axiosClient.post("/api/v1/users/login", form)
      console.log(res)

      const token = res.data.data

      dispatch({
        type: "SUCCESSFUL_LOGIN",
        payload: token,
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  // C. VERIFICACIÓN DE TOKEN PARA NAVEGACIÓN
  const verifyingToken = async () => {
    // 1. NECESITO LEER EL TOKEN DEL USUARIO QUE ESTÁ EN LOCAL STORAGE
    getToken()
    // 2. REALIZAR LA LLAMADA VÍA AXIOS
    try {
      const res = await axiosClient.get("/api/v1/users/verifytoken")
      console.log(res)

      const userData = res.data.data
      console.log(userData)

      dispatch({
        type: "GET_DATA_USER",
        payload: userData,
      })
    } catch (error) {
      console.log(error)
      return
    }

    // 3. NECESITO EJECUTAR UN DISPATCH PARA QUE EL REDUCER PUEDA ACTUALIZAR EL ESTADO GLOBAL
  }

  // D. CERRAR SESIÓN
  const logoutUser = () => {
    console.log("borrando usuario")

    dispatch({
      type: "LOGOUT_USER",
      payload: "Usuario cerró sesión exitosamente.",
    })
  }

  // E. EDITAR CARRITO DE COMPRA
  const editCart = async (data) => {
    console.log(data)

    // 1. NECESITO LEER EL TOKEN DEL USUARIO QUE ESTÁ EN LOCAL STORAGE
    getToken()

    try {
      // 2. EDITAR CARRITO
      // EJEMPLO
      /**
       * {
             "products": [
              {
                "priceID": "price_1OBJJVCl7xMuNYvu8LEDXhcf",
                "quantity": 3
              },
              ...
            ] 
          }
       */

      const res = await axiosClient.put("/api/v1/checkout/edit-cart", {
        products: data,
      })

      console.log(res)
      await getCart()
    } catch (error) {
      console.log(error)
      return
    }
  }

  // F. OBTENER CARRITO DE COMPRA
  const getCart = async () => {
    getToken()

    try {
      const res = await axiosClient.get("/api/v1/checkout/get-cart")
      console.log(res)

      dispatch({
        type: "GET_CART",
        payload: res.data.cart.products,
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  // G. CREAR SESIÓN DE STRIPE
  const getCheckoutSession = async () => {
    getToken()

    const res = await axiosClient.get(
      "/api/v1/checkout/create-checkout-session"
    )

    console.log(res)

    dispatch({
      type: "GET_CHECKOUT_SESSION",
      payload: res.data.session_url,
    })
  }

  // H. EDITAR PERFIL

  // 4. RETORNO

  return (
    <UserContext.Provider
      value={{
        currentUser: globalState.currentUser,
        authStatus: globalState.authStatus,
        cart: globalState.cart,
        sessionURL: globalState.sessionURL,
        registerUser,
        verifyingToken,
        logoutUser,
        loginUser,
        editCart,
        getCart,
        getCheckoutSession,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
