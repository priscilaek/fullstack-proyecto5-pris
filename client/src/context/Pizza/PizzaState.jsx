// ./src/context/Pizza/PizzaState

import { useReducer } from "react"
import axios from "axios"

import PizzaContext from "./PizzaContext"
import PizzaReducer from "./PizzaReducer"

const PizzaState = (props) => {
  // 1. VALOR INICIAL
  const initialState = {
    pizzas: [],
    pizza: {
      _id: "",
      idStripe: "",
      name: "",
      currency: "",
      prices: [],
      img: [""],
      description: "",
      slug: "",
    },
  }

  // 2. MANEJO DE REDUCERS (CAMBIOS EN EL ESTADO)
  const [globalState, dispatch] = useReducer(PizzaReducer, initialState)

  // 3. EVENTOS - DISPATCHERS

  // A. OBTENER TODAS LAS PIZZAS
  const getPizzas = async () => {
    const res = await axios.get("http://localhost:3005/api/v1/pizzas/")
    console.log(res)
    const { data } = res
    const { data: dataPizzas } = data

    // VALIDACIONES DE ERRORES

    dispatch({
      type: "GET_PIZZAS",
      payload: dataPizzas,
    })
  }

  // B. OBTENER UNA SOLA PIZZA
  const getPizza = async (slug) => {
    const res = await axios.get(
      `http://localhost:3005/api/v1/pizzas/readone/${slug}`
    )

    console.log(res)

    const { data } = res
    const { data: dataPizza } = data

    dispatch({
      type: "GET_PIZZA",
      payload: dataPizza,
    })
  }

  // 4. RETORNO - ARMADO DE ESTADO

  return (
    <PizzaContext.Provider
      value={{
        pizzas: globalState.pizzas,
        pizza: globalState.pizza,
        getPizzas,
        getPizza,
      }}
    >
      {props.children}
    </PizzaContext.Provider>
  )
}

export default PizzaState
