import { useEffect, useContext } from "react"
import { useCart } from "../../hooks/useCart"
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"

//import { Fragment } from "react"
//import { Badge, Dropdown } from "daisyui"

export default function Cart() {
  const userCtx = useContext(UserContext)

  const { cart, sessionURL, getCheckoutSession, editCart } = userCtx

  const { total, handleSubmit, handleChange, handleRemove } = useCart(
    cart,
    getCheckoutSession,
    editCart
  )

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL
  }, [sessionURL])

  return (
    <div>
      <ul className="p-4 space-y-4">
        {cart.map((e) => (
          <li key={e._id} className="border p-4">
            <h3 className="text-lg font-bold">
              <Link to={`/consultas/${e.slug}`}>{e.name}</Link>
            </h3>
            <p>{e.size}</p>
            <p className="text-green-500 font-bold">
              ${((e.price / 100) * e.quantity).toFixed(2)}
            </p>
            <select
              name={e.priceID}
              onChange={(e) => {
                handleChange(e)
              }}
              className="p-2 border rounded"
            >
              {Array(5)
                .fill(null)
                .map((_, i) => {
                  const initial = i + 1
                  return initial === e.quantity ? (
                    <option selected value={initial}>
                      {initial}
                    </option>
                  ) : (
                    <option value={initial}>{initial}</option>
                  )
                })}
            </select>
            <button
              type="button"
              onClick={(evt) => {
                handleRemove(evt, e.priceID)
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="p-4 bg-gray-100">
        <p className="text-xl font-bold">Total</p>
        <p className="text-2xl text-green-500 font-bold">${total.toFixed(2)}</p>
      </div>
      <div className="p-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pagar carrito
        </button>
      </div>
    </div>
  )
}