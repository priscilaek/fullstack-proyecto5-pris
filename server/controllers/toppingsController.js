// ./server/controllers/toppingsController.js

import Topping from "../models/Topping.js"

export const readAll = async (req, res) => {
  try {
    // OBTENER LOS TOPPINGS DE BASES DE DATOS
    const toppings = await Topping.find()

    // DEVOLVER UNA RESPUESTA AL CLIENTE
    res.json({
      msg: "Listado de toppings mostrado exitosamente.",
      data: toppings,
    })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      msg: "Hubo un error obteniendo los datos.",
    })
  }
}

export const create = async (req, res) => {
  try {
    const { name, slug, price, image, availability } = req.body

    const newTopping = await Topping.create({
      name,
      slug,
      price,
      image,
      availability,
    })

    return res.json({
      msg: "Topping creado.",
      data: newTopping,
    })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      msg: "Hubo un error generando los datos.",
    })
  }
}

export default {
  readAll,
  create,
}
