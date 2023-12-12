// ./src/context/User/UserReducer.jsx

const UserReducer = (globalState, action) => {
  switch (action.type) {
    case "SUCCESSFUL_LOGIN":
    case "SUCCESSFUL_REGISTER":
      localStorage.setItem("token", action.payload)
      return {
        ...globalState,
        authStatus: true,
      }

    case "LOGOUT_USER":
      localStorage.removeItem("token")

      console.log("token borrado")

      return {
        ...globalState,
        currentUser: null,
        authStatus: false,
        msg: action.payload,
      }

    case "GET_DATA_USER":
      return {
        ...globalState,
        authStatus: true,
        currentUser: action.payload,
      }

    case "GET_CART":
      return {
        ...globalState,
        cart: action.payload,
      }

    case "GET_CHECKOUT_SESSION":
      return {
        ...globalState,
        sessionURL: action.payload,
      }

    default:
      return globalState
  }
}

export default UserReducer

