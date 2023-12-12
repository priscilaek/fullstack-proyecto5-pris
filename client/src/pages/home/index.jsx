// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"
import { useContext, useEffect } from "react"

import toast from "react-hot-toast"
import UserContext from "../../context/User/UserContext"

function notify(message) {
  toast(message)
}

function Home() {
  const { editCart } = useContext(UserContext)

  const query = useQuery()
  console.log(query)

  const status = query.get("status")
  console.log(status)

  useEffect(() => {
    console.log(status)
    if (status === "successful") {
      notify("Pago realizado con éxito.")
      editCart([])
    }
  }, [])
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl text-gray-700 my-4 text-center">
        Bienvenido a Neuroprotección
      </h1>
      <h1 className="text-2xl md:text-4xl text-gray-700 my-4 text-center">
        Catálogo
      </h1>
      <h3>Ponemos a tu alcance conocimiento y recomendaciones</h3>

      <div className="flex justify-around">
      <div className="benefits2" style={{ margin: '0 1px' }}>
          <img className="imagen1" src="https://res.cloudinary.com/dnjkhel2d/image/upload/v1701659286/producto1_gnmqjp.png" alt="Producto 1" />
          <h4 className="font-bold">Productos</h4>
          <p>Alimentos y productos neuroprotectores</p>
      </div>
      <div className="benefits2" style={{ margin: '0 1px' }}>
          <img className="imagen1" src="https://res.cloudinary.com/dnjkhel2d/image/upload/v1701659290/producto2_eaprvq.png" alt="Producto 2" />
          <h4 className="font-bold">Servicios</h4>
          <p>Consultas y terapias neuroprotectoras y neurorestauradoras</p>
          <ul className="list-none mt-4">
          <li className="mb-2 text-center">
            <Link className="text-blue-500 hover:text-blue-700" to="/consultas">Ir a las consultas disponibles</Link>
          </li>
        </ul>
      </div>
      <div className="benefits2" style={{ margin: '0 1px' }}>
          <img className="imagen1" src="https://res.cloudinary.com/dnjkhel2d/image/upload/v1701659290/producto3_i79uhp.png" alt="Producto 3" />
          <h4 className="font-bold">Investigación</h4>
          <p>Estudios de protección cerebral</p>
      </div>
    </div>

    </div>
  )
}

export default Home
