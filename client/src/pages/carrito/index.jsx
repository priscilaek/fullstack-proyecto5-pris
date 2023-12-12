import { useEffect, useContext } from "react"
import { useCart } from "../../hooks/useCart"
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"

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
      <div>
        <ul>
          {cart.map((e) => {
            return (
              <li key={e._id}>
                <h3>
                  <Link to={`/pizzas/${e.slug}`}>{e.name}</Link>
                </h3>

                <p>{e.size}</p>
                <p>${((e.price / 100) * e.quantity).toFixed(2)}</p>
                <select
                  name={e.priceID}
                  onChange={(e) => {
                    handleChange(e)
                  }}
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
                >
                  Eliminar
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <p>Total</p>
        <p>$ {total.toFixed(2)}</p>
      </div>

      <div>
        <button onClick={handleSubmit}>Pagar carrito</button>
      </div>
    </div>
  )
}