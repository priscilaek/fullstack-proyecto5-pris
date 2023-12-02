// ./src/routes/Auth.jsx
// Este archivos nos servirá para confirmar si el usuario está autenticado o no

import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import { Blocks } from "react-loader-spinner"

// HOCs
// High Order Components
// Componentes que incluyen otros componentes dentro de sí mismo, evaluando algo antes de renderizar.

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component }) => {
  const [isLoading, setIsLoading] = useState(true)

  // 1. OBTENER LOS DATOS DE USUARIO
  // SABER SI EL USUARIO ESTÁ AUTENTICADO O NO, CON AUTHSTATUS
  const userCtx = useContext(UserContext)
  const { authStatus, verifyingToken } = userCtx

  // 2. HOOK DE EFECTO
  // VERIFICARÁ DE INICIO Y CUANDO HAYA UN CAMBIO EN AUTHSTATUS SI EL USUARIO TUVO MODIFICACIONES EN SU SESIÓN, Y SI SÍ, EJECUTARÁ EL VERIFYINGT TOKEN
  useEffect(() => {
    const verifyToken = async () => {
      await verifyingToken()

      setIsLoading(false)
    }

    verifyToken()
  }, [authStatus])

  console.log(isLoading)
  // 3. GENERACIÓN DE COMPONENTE
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
        <Navigate replace to="/" />
      ) : (
        <Component />
      )}
    </>
  )
}

export default AuthRoute
