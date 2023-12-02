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
    <div>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>

        {authStatus ? (
          <>
            <p>
              Te damos la bienvenida, {user.name} {user.lastname}
            </p>
            <button onClick={logoutUser}>
              <Link to="/">Cerrar sesión</Link>
            </button>
            <p style={{ textDecoration: "underline" }}>
              <Link to="/carrito">
                <Cart style={{ marginRight: "8px" }} /> Tu carrito de compras:{" "}
                <span>3 pizzas</span>
              </Link>
            </p>
          </>
        ) : (
          <>
            <li>
              <Link to="/registro">Registro</Link>
            </li>
            <li>
              <Link to="/iniciar-sesion">Iniciar sesión</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Header
