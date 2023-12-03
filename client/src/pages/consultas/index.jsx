// ./src/pages/consultas/index.jsx
// Este componente utiliza el contexto de ConsultaContext para obtener y mostrar las consultas, 
//y realiza la solicitud para obtener las consultas del servidor cuando se monta.

import { useContext, useEffect } from "react"
import ConsultaContext from "../../context/Consulta/ConsultaContext"
import { Link } from "react-router-dom"

function ConsultasPage() {
  // TRAERME LOS DATOS DE LAS CONSULTAS DEL SERVER
  const consultaCtx = useContext(ConsultaContext)

  const { consultas, getConsultas } = consultaCtx

  useEffect(() => {
    getConsultas()
  }, [])

  console.log(consultaCtx)

  return (
    <>
      <div>
        <ul>
          {consultas.length !== 0
            ? consultas.map((consulta, i) => {
                const { name, slug } = consulta

                return (
                  <Link key={i} to={`/consultas/${slug}`}>
                    <li>{name}</li>
                  </Link>
                )
              })
            : "No hay consultas disponibles"}
        </ul>
      </div>
    </>
  )
}

export default ConsultasPage
