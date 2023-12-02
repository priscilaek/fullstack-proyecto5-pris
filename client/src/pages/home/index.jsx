// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/pizzas">Ir a las pizzas</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
