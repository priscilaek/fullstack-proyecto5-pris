// ./src/pages/consultas/consulta/index.jsx
import { Link, useParams } from "react-router-dom"
import priceFormatter from "../../../lib/priceFormatter"
import useConsulta from "../../../hooks/useConsulta"

function ConsultaPage() {
  const params = useParams()
  const { slug } = params

  // CUSTOM HOOK
  const { authStatus, cart, consulta, localPrices, handleChange, handleSubmit } =
    useConsulta(slug)

  const { _id, idStripe, name, currency, prices, img, description } = consulta

  // LOCALPRICES = {...PRICES, QUANTITY }
  console.log(localPrices)
  console.log(prices)

  const quantityOptions = [0, 1, 2, 3, 4, 5]

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>

        <form onSubmit={handleSubmit}>
          <ul>
            {prices.length !== 0 ? (
              <>
                {localPrices.map((element) => {
                  console.log(element)
                  const { price, size, priceDescription } = element

                  return (
                    <>
                      <li>
                        <h2>Tipo de precio por tamaño: {size}</h2>
                        <p>
                          Precio: {priceFormatter(price)} {currency}{" "}
                        </p>

                        {authStatus ? (
                          <select
                            type="option"
                            name={`${element.id}`}
                            data-consulta-name={name}
                            data-consulta-size={size}
                            data-consulta-pricedescription={priceDescription}
                            data-consulta-price={price}
                            data-consulta-img={img[0]}
                            data-consulta-slug={slug}
                            onChange={(evt) => {
                              handleChange(evt)
                            }}
                          >
                            {quantityOptions.map((qo) => {
                              return (
                                <>
                                  {qo === element.quantity ? (
                                    <option selected value={qo}>
                                      {qo}
                                    </option>
                                  ) : (
                                    <option value={qo}>{qo}</option>
                                  )}
                                </>
                              )
                            })}
                          </select>
                        ) : null}
                      </li>
                    </>
                  )
                })}
              </>
            ) : (
              "No hay precios disponibles"
            )}
          </ul>
          {authStatus ? (
            <button type="submit">
              {cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"}
            </button>
          ) : (
            <Link to="/iniciar-sesion">
              <button>Crea tu carrito con tu sesión</button>
            </Link>
          )}
        </form>
      </div>
    </>
  )
}

export default ConsultaPage