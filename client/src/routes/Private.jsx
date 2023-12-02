// ./src/routes/Private.jsx

// Verificar autenticación, pero también si el usuario está autorizado a entrar.
// Editar perfil. Áreas de recibos

import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import { Blocks } from "react-loader-spinner"

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component }) => {
  const [isLoading, setIsLoading] = useState(true)

  const userCtx = useContext(UserContext)
  const { authStatus, verifyingToken } = userCtx

  useEffect(() => {
    const verifyToken = async () => {
      await verifyingToken()

      setIsLoading(false)
    }

    verifyToken()
  }, [authStatus])

  return (
    <>
      {isLoading ? (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      ) : authStatus ? (
        <Component />
      ) : (
        <Navigate replace to="/iniciar-sesion" />
      )}
    </>
  )
}

export default PrivateRoute
