// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"

function Home() {
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
      <img className="imagen1" src="./img/producto1.jpg" alt="Producto 1" />
      <h4 className="font-bold">Productos</h4>
      <p>Alimentos y productos neuroprotectores</p>
  </div>
  <div className="benefits2" style={{ margin: '0 1px' }}>
      <img className="imagen1" src="./img/producto2.jpg" alt="Producto 2" />
      <h4 className="font-bold">Servicios</h4>
      <p>Consultas y terapias neuroprotectoras y neurorestauradoras</p>
      <ul className="list-none mt-4">
      <li className="mb-2 text-center">
        <Link className="text-blue-500 hover:text-blue-700" to="/consultas">Ir a las consultas disponibles</Link>
      </li>
    </ul>
  </div>
  <div className="benefits2" style={{ margin: '0 1px' }}>
      <img className="imagen1" src="./img/producto3.jpg" alt="Producto 3" />
      <h4 className="font-bold">Investigación</h4>
      <p>Estudios de protección cerebral</p>
  </div>
</div>

    </div>
  )
}

export default Home
