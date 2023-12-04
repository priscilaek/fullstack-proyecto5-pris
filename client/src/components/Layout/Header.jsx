// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"
import { Helmet } from "react-helmet"

function Header() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
  })

  const userCtx = useContext(UserContext)

  const { authStatus, currentUser, logoutUser } = userCtx

  useEffect(() => {
    if (currentUser) {
      const { name, lastname } = currentUser

      setUser({
        name,
        lastname,
      })
    }
  }, [currentUser])

  return (
    <div className="p-4 md:p-8">
      <Helmet>
        <title>Neuroprotección - Protegemos el desarrollo</title>
      </Helmet>
      <ul className="flex flex-wrap justify-between md:justify-start">
        {authStatus && (
          <p className="text-center md:text-left">
            Te damos la bienvenida, {user.name} {user.lastname}
          </p>
        )}
        <div className="flex">
          <li className="m-2">
            <Link to="/">Inicio</Link>
          </li>
          {authStatus ? (
            <>
              <li onClick={logoutUser} className="m-2">
                <Link to="/">Cerrar sesión</Link>
              </li>
              <li className="m-2">
                <Link to="/perfil">Perfil</Link>
              </li>
            </>
          ) : (
            <>
              <li className="m-2">
                <Link to="/registro">Registro</Link>
              </li>
              <li className="m-2">
                <Link to="/iniciar-sesion">Iniciar sesión</Link>
              </li>
            </>
          )}
        </div>
        <p className="text-center md:text-right underline">
          <Link to="/carrito" className="flex items-center">
            <Cart className="mr-2" /> Tu carrito de compras: <span> 2 Consultas </span>
          </Link>
        </p>
      </ul>
    </div>
  )
}

export default Header