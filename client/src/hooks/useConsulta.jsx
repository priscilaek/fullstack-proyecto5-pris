// ./src/hooks/useConsulta.js

import { useState, useEffect, useContext } from "react"
import ConsultaContext from "../context/Consulta/ConsultaContext"
import UserContext from "../context/User/UserContext"

// Definición del hook personalizado useConsulta que recibe un slug como parámetro
export default function useConsulta(slug) {
  // Utilizamos el hook useContext para acceder al contexto del usuario y de la consulta
  const userCtx = useContext(UserContext)
  const { authStatus, cart, editCart, getCart } = userCtx

  const consultaCtx = useContext(ConsultaContext)
  const { consulta, getConsulta } = consultaCtx

  // Definimos el estado inicial para el formulario y los precios del estado local
  const [form, setForm] = useState([])
  const [localPrices, setLocalPrices] = useState([])

  // Utilizamos el hook useEffect para realizar acciones al montar el componente
  useEffect(() => {
    // Definimos una función asíncrona para obtener el carrito
    const fetchCart = async () => {
      await getCart()
    }

    // Llamamos a la función para obtener el carrito y obtener la consulta por su slug
    fetchCart()
    getConsulta(slug)
  }, [])

  // Utilizamos otro hook useEffect para realizar acciones cuando cambia el precio de la consulta
  useEffect(() => {
    // Si el id de la consulta es null, no hacemos nada
    if (consulta.id === null) {
      return null
    }

    // Actualizamos los precios locales basándonos en los precios de la consulta
    const updatedPrices = consulta.prices.map((firstElement) => {
      let comparisonCart = cart.filter((secondElement) => {
        return firstElement.id === secondElement.priceID
      })

      const [cartQuantity] = comparisonCart

      return {
        ...firstElement,
        quantity: cartQuantity ? cartQuantity.quantity : 0,
      }
    })

    // Actualizamos el estado con los precios actualizados y el carrito
    setLocalPrices([...updatedPrices])
    setForm([...cart])
  }, [consulta.prices])

  // Definimos la función handleChange para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    // Si el valor del input es "0", filtramos el formulario para eliminar el elemento con el priceID correspondiente
    if (e.target.value === "0") {
      const filteredData = form.filter((element) => {
        return element.priceID !== e.target.name
      })

      return setForm(filteredData)
    }

    // Creamos un nuevo objeto con los datos del input
    const newData = {
      priceID: e.target.name,
      priceDescription: e.target.getAttribute("data-consulta-pricedescription"),
      size: e.target.getAttribute("data-consulta-size"),
      name: e.target.getAttribute("data-consulta-name"),
      quantity: e.target.value,
      price: e.target.getAttribute("data-consulta-price"),
      img: e.target.getAttribute("data-consulta-img"),
      slug: e.target.getAttribute("data-consulta-slug"),
    }

    // Buscamos el elemento en el formulario con el mismo priceID
    const filteredData = form.findIndex((element) => {
      return element.priceID === e.target.name
    })

    // Si no encontramos el elemento, añadimos el nuevo dato al formulario
    if (filteredData === -1) {
      return setForm([...form, newData])
    }

    // Si encontramos el elemento, lo actualizamos con los nuevos datos
    const updatedData = form.map((elt) => {
      return elt.priceID === e.target.name ? newData : elt
    })

    // Actualizamos el estado del formulario con los datos actualizados
    return setForm(updatedData)
  }

  // Definimos la función handleSubmit para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    await editCart(form)
  }

  // Retornamos los valores que queremos exponer a los componentes que utilicen este hook
  return {
    authStatus,
    cart,
    consulta,
    localPrices,
    handleChange,
    handleSubmit,
  }
}
