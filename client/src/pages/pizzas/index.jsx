// ./src/pages/pizzas/index.jsx
import { useContext, useEffect } from "react"
import PizzaContext from "../../context/Pizza/PizzaContext"
import { Link } from "react-router-dom"

function PizzasPage() {
  // TRAERME LOS DATOS DE LAS PIZZAS DEL SERVER
  const pizzaCtx = useContext(PizzaContext)

  const { pizzas, getPizzas } = pizzaCtx

  useEffect(() => {
    getPizzas()
  }, [])

  console.log(pizzaCtx)

  return (
    <>
      <div>
        <ul>
          {pizzas.length !== 0
            ? pizzas.map((pizza, i) => {
                const { name, slug } = pizza

                return (
                  <Link key={i} to={`/pizzas/${slug}`}>
                    <li>{name}</li>
                  </Link>
                )
              })
            : "No hay pizzas disponibles"}
        </ul>
      </div>
    </>
  )
}

export default PizzasPage
