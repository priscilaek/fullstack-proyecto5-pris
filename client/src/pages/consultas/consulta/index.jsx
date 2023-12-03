// ./src/pages/consultas/consulta/index.jsx
//Este componente utiliza el contexto de UserContext y ConsultaContext para obtener y mostrar la información de una consulta individual, 
//y realiza la solicitud para obtener la consulta del servidor cuando se monta.

import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { useContext } from "react"
import ConsultaContext from "../../../context/Consulta/ConsultaContext"
import priceFormatter from "../../../lib/priceFormatter"

import UserContext from "../../../context/User/UserContext"

function ConsultaPage() {
  const userCtx = useContext(UserContext)

  const { authStatus } = userCtx

  const params = useParams()
  console.log(params)
  const { slug } = params

  const consultaCtx = useContext(ConsultaContext)
  const { consulta, getConsulta } = consultaCtx
  console.log(consulta)

  const { _id, idStripe, name, currency, prices, img, description } = consulta

  useEffect(() => {
    getConsulta(slug)
  }, [])

  const quantityOptions = [0, 1, 2, 3, 4, 5]

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>
        <ul>
          {prices.length !== 0 ? (
            <>
              {prices.map((element) => {
                console.log(element)
                const { price, size } = element

                return (
                  <>
                    <li>
                      <h2>Tipo de precio por tamaño: {size}</h2>
                      <p>
                        Precio: {priceFormatter(price)} {currency}{" "}
                      </p>

                      {authStatus ? (
                        <>
                          <select>
                            {quantityOptions.map((element) => {
                              return (
                                <>
                                  <option value={element}>{element}</option>
                                </>
                              )
                            })}
                          </select>

                          <button>Agregar al carrito</button>
                        </>
                      ) : (
                        <Link to="/iniciar-sesion">
                          <button>Crea tu carrito con tu sesión</button>
                        </Link>
                      )}
                    </li>
                  </>
                )
              })}
            </>
          ) : (
            "No hay precios disponibles"
          )}
        </ul>
      </div>
    </>
  )
}

export default ConsultaPage
