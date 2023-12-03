// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"

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
      <ul className="flex flex-wrap justify-center md:justify-start">
        <li className="m-2">
          <Link to="/">Inicio</Link>
        </li>
  
        {authStatus ? (
          <>
            <p className="text-center md:text-right">
              Te damos la bienvenida, {user.name} {user.lastname}
            </p>
            <button onClick={logoutUser} className="m-2">
              <Link to="/">Cerrar sesión</Link>
            </button>
            <p className="text-center md:text-left underline">
              <Link to="/carrito" className="flex items-center">
                <Cart className="mr-2" /> Tu carrito de compras: <span> Consultas seleccionadas</span>
              </Link>
            </p>
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
      </ul>
    </div>
  )
}

export default Header
