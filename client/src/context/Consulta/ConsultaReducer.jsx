// ./src/context/ConsultaReducer.jsx

const ConsultaReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_CONSULTAS":
      return {
        ...globalState,
        consultas: action.payload,
      }

    case "GET_CONSULTA":
      return {
        ...globalState,
        consulta: {
          ...globalState.consulta,
          ...action.payload,
        },
      }

    default:
      return globalState
  }
}

export default ConsultaReducer
