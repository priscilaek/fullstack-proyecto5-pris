// hooks/useCart.js
import { useState, useEffect } from "react"

// El hook useCart recibe tres argumentos: initialCart (el carrito inicial), getCheckoutSession (una función para obtener la sesión de pago) y editCart (una función para editar el carrito).
export const useCart = (initialCart, getCheckoutSession, editCart) => {
  // Se declara el estado para el total del carrito, inicializado en 0.
  const [total, setTotal] = useState(0)

  // handleSubmit es una función que se ejecuta cuando se envía el formulario del carrito.
  // Previene la recarga de la página y llama a la función getCheckoutSession.
  const handleSubmit = (e) => {
    e.preventDefault()
    getCheckoutSession()
  }

  // handleChange es una función que se ejecuta cuando cambia el valor de un elemento del carrito.
  // Actualiza la cantidad del elemento en el carrito y llama a la función editCart con el carrito actualizado.
  const handleChange = (e) => {
    const updatedCart = initialCart.map((elt) => {
      return elt.priceID === e.target.name
        ? {
            ...elt,
            quantity: parseInt(e.target.value),
          }
        : elt
    })

    editCart(updatedCart)
  }

  // handleRemove es una función que se ejecuta cuando se quiere eliminar un elemento del carrito.
  // Filtra el elemento del carrito y llama a la función editCart con el carrito actualizado.
  const handleRemove = (e, currentPriceID) => {
    e.preventDefault()

    const updatedCart = initialCart.filter((elt) => {
      return elt.priceID !== currentPriceID
    })

    editCart(updatedCart)
  }

  // useEffect se ejecuta cuando cambia el carrito inicial.
  // Calcula el total del carrito multiplicando la cantidad de cada elemento por su precio y sumándolos todos.
  // Luego, actualiza el estado del total con el total calculado.
  useEffect(() => {
    const reduceTotalFromOrder = () => {
      return initialCart.reduce((acc, cv) => {
        const updatedQuantity = (cv.price / 100) * cv.quantity
        return updatedQuantity + acc
      }, 0)
    }

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder()
      setTotal(total)
    }

    getOrderDetails()
  }, [initialCart])

  // El hook retorna un objeto con el total del carrito y las funciones para manejar el envío del formulario, los cambios en los elementos y la eliminación de elementos.
  return { total, handleSubmit, handleChange, handleRemove }
}
