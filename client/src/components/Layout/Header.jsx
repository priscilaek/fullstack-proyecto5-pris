// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"
import { Helmet } from "react-helmet"
import NavBar from "../Header/NavBar"

//import { Dialog } from '@headlessui/react'
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function Header() {
  const data = [
    { name: "Inicio", href: "#" },
    { name: "Sobre nosotros", href: "#" },
  ]

  const [total, setTotal] = useState(0)

  const [user, setUser] = useState({
    name: "",
    lastname: "",
  })

  const userCtx = useContext(UserContext)

  const { cart, authStatus, currentUser, logoutUser, getCart } = userCtx

  console.log(cart)
  console.log(getCart)

//useEffect autenticacion
  useEffect(() => {
    if (currentUser) {
      const { name, lastname } = currentUser

      setUser({
        name,
        lastname,
      })
    }
  }, [currentUser])

//useEffect de atualizacion de carrito
  useEffect(() => {
    const fetchCart = async () => {
      await getCart()
    }
    fetchCart()
  }, [currentUser])

//useEffect de actualizacion de total - calculo del carrito
  useEffect(() => {
    const getTotalProducts = () => {
      const totalQty = cart.reduce((acc, cv) => {
        return acc + cv.quantity
      }, 0)
      return totalQty
    }
    const result = getTotalProducts()
    setTotal(result)
  }, [cart])

  return (
    <>
      <NavBar
        userAvatarUrl={
          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        }
        totalItemsCart={total}
        linkCart={"/carrito"}
      />
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
            <Link to="/">Home</Link>
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
            <Cart className="mr-2" /> Tu carrito de compras: <span> {total} Consulta(s) </span>
          </Link>
        </p>
      </ul>
    </div>
    </>
  )
}

export default Header