// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
    <h1 className="text-2xl md:text-4xl text-gray-700 my-4">
      Bienvenido a la aplicación de consultas
    </h1>
      <ul className="list-none">
        <li className="mb-2">
          <Link className="text-blue-500 hover:text-blue-700" to="/consultas">Ir a las consultas</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
