// ./src/context/PizzaReducer.jsx

const PizzaReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_PIZZAS":
      return {
        ...globalState,
        pizzas: action.payload,
      }

    case "GET_PIZZA":
      return {
        ...globalState,
        pizza: {
          ...globalState.pizza,
          ...action.payload,
        },
      }

    default:
      return globalState
  }
}

export default PizzaReducer
