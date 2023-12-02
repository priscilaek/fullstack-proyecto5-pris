// server/controllers/userController.js

import User from "./../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Cart from "./../models/Cart.js"

const readAll = (req, res) => {
  res.json({
    message: "Datos obtenidos con éxito.",
    data: data,
  })
}

const create = async (req, res) => {
  const { name, lastname, country, address, zipcode, email, password } =
    req.body

  try {
    // 1. CAPA DE CONTRASEÑA
    // ESTABLECER EL NIVEL DE DIFICULTAD DE ENCRIPTAMIENTO DEL PASSWORD
    const salt = await bcryptjs.genSalt(10)

    // 1A. CREAR CARRITO DE COMPRAS
    const newCart = await Cart.create({})

    // ENCRIPTAR EL PASSWORD
    const hashedPassword = await bcryptjs.hash(password, salt)
    console.log("hashedPassword", hashedPassword)

    const newUser = await User.create({
      name,
      lastname,
      country,
      address,
      zipcode,
      email,
      password: hashedPassword,
      cart: newCart,
    })

    // CAPA DE SEGURIDAD JWT
    // 1. GENERAR UNA ELECCIÓN DE DATOS (ID) - PAYLOAD
    const payload = {
      user: {
        id: newUser._id,
      },
    }

    // 2. ESTABLECER LA FIRMA JWT (SUPER SECRETA. SOLO LA TIENE EL CLIENTE Y EL SERVER)
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) {
          console.log("error", error)
          return new Error(error)
        }

        return res.json({
          msg: "Usuario creado con éxito y super seguro. guiño guiño",
          data: token,
        })
      }
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Hubo un problema en el servidor",
      error,
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // 1. CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS
    const foundUser = await User.findOne({ email })
    console.log("foundUser", foundUser)

    if (!foundUser) {
      return res.status(400).json({
        msg: "El usuario o la contraseña no coinciden. Código: 5841",
      })
    }

    // 2. EVALUACIÓN DEL PASSWORD
    const dbUserPassword = foundUser.password

    // password: holamundo123
    // passworddb: $2a$10$KX.spNG28hut8r8G7gLMb.el9xcZXc9E1c/4iUf07AYs3F5KRJcaK
    const verifiedPass = await bcryptjs.compare(password, dbUserPassword)

    // UNA VEZ HECHO LA COMPARACIÓN, verifiedPass DEVOLVERÁ TRUE O FALSE
    if (!verifiedPass) {
      return await res.status.json({
        msg: "El usuario o la contraseña no coinciden. Código: 5845",
      })
    }

    // GENERAMOS DE CAPA DE SEGURIDAD JWT
    const payload = {
      user: {
        id: foundUser._id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      },
      (error, token) => {
        if (error) {
          console.log("error", error)
          return new Error(error)
        }

        return res.json({
          msg: "Usuario con inicio de sesión exitoso.",
          data: token,
        })
      }
    )
  } catch (error) {
    console.log("error", error)
    res.status(500).json({
      msg: "Hubo un problema de conexión",
    })
  }
}

const verifyToken = async (req, res) => {
  try {
    console.log("req.user", req.user)
    const foundUser = await User.findById(req.user.id).select("-password")
    console.log("foundUser", foundUser)

    return res.json({
      msg: "Datos de usuario encontrados.",
      data: foundUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "El usuario no se encontró.",
    })
  }
}

export default {
  readAll,
  create,
  login,
  verifyToken,
}
