// ./src/context/Consulta/ConsultaState

import { useReducer } from "react"
//import axios from "axios"
import axiosClient from "../../config/axios"

import ConsultaContext from "./ConsultaContext"
import ConsultaReducer from "./ConsultaReducer"

const ConsultaState = (props) => {
  // 1. VALOR INICIAL
  const initialState = {
    consultas: [],
    consulta: {
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
  const [globalState, dispatch] = useReducer(ConsultaReducer, initialState)

  // 3. EVENTOS - DISPATCHERS

  // A. OBTENER TODAS LAS CONSULTAS
  const getConsultas = async () => {
    const res = await axiosClient.get("/api/v1/consultas/")
    console.log(res)
    const { data } = res
    const { data: dataConsultas } = data

    // VALIDACIONES DE ERRORES

    dispatch({
      type: "GET_CONSULTAS",
      payload: dataConsultas,
    })
  }

  // B. OBTENER UNA SOLA CONSULTA
  const getConsulta = async (slug) => {
    const res = await axiosClient.get(
      `/api/v1/consultas/readone/${slug}`
    )

    console.log(res)

    const { data } = res
    const { data: dataConsulta } = data

    dispatch({
      type: "GET_CONSULTA",
      payload: dataConsulta,
    })
  }

  // 4. RETORNO - ARMADO DE ESTADO

  return (
    <ConsultaContext.Provider
      value={{
        consultas: globalState.consultas,
        consulta: globalState.consulta,
        getConsultas,
        getConsulta,
      }}
    >
      {props.children}
    </ConsultaContext.Provider>
  )
}

export default ConsultaState
