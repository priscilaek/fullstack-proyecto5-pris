// server/controllers/checkoutController.js

// IMPORTAR STRIPE Y CONFIGURAR CLAVE DE STRIPE
import stripe from "stripe"
import dotenv from "dotenv"
import User from "./../models/User.js"
import Cart from "./../models/Cart.js"

dotenv.config()

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  // 1. OBTENER EL USUARIO
  const userID = req.user.id
  console.log(userID)

  // 2. BUSCAR EN BASE DE DATOS
  const foundUser = await User.findById(userID).lean()
  console.log(foundUser)

  // 3. CREACIÓN DEL CARRITO DE COMPRAS U OBTENCIÓN DEL USUARIO

  // const foundCart = await Cart.findById(foundUser.cart).lean() => 6558e1ff55fec44c463bd837
  // const foundCart = await Cart.findById(foundUser.cart).lean().populate() => { products: [{_id:6558e1ff55fec44c463bd837, quantity: 4, priceID: "price_123u1231" }]

  const foundCart = await Cart.findById(foundUser.cart).lean().populate()
  console.log(foundCart)

  // 4. ACOMODAR LOS DATOS DEL CARRITO PARA STRIPE
  const line_items = foundCart.products.map((productToBuy) => {
    return {
      price: productToBuy.priceID,
      quantity: productToBuy.quantity,
    }
  })

  console.log(line_items)

  // 5. CREACIÓN DE CHECKOUT EN STRIPE
  try {
    const session = await stripeKey.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://yahoo.com",
      customer_email: foundUser.email,
    })
    console.log("session", session)

    res.status(200).json({
      msg: "Accede a este link para la sesión de pago",
      session_url: session.url,
      session,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: "Hubo un problema",
      error,
    })
  }
}

// CREAR ORDEN
// SE VA A RECIBIR UNA PETICIÓN POR STRIPE (NO POR THUNDERCLIENT) EL CUAL VA A INCLUIR
// TODOS LOS DATOS DE LA ORDEN QUE HIZO EL USUARIO (YA LO PAGÓ) Y NOSOTROS
// VAMOS A GENERAR EN BASE DE DATOS SU RECIBO.
const createOrder = async (req, res) => {
  try {
    // 1. OBTENER LA FIRMA DE STRIPE SECRETA WEBHOOKS
    // (SIEMPRE ES ASÍ)
    const sig = req.headers["stripe-signature"]
    const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET
    console.log(sig)
    console.log(endpointSecret)

    // 2. CONSTRUIR EL EVENTO CON TODOS LOS DATOS SENSIBLES DE STRIPE
    // EL EVENTO ES EL OBJETO QUE INCLUYE LOS RECIBOS Y LAS CONFIRMACIONES DE PAGO DEL USUARIO (DE SU ÚLTIMO STRIPE CHECKOUT)
    let event = stripeKey.webhooks.constructEvent(req.body, sig, endpointSecret)
    console.log(event)

    // 3. EVALUAMOS EL EVENTO DE STRIPE
    switch (event.type) {
      // A. SI EL EVENTO FUE UN CARGO EXITOSO AL USUARIO
      case "charge.succeeded":
        // GENERAR VARIABLES PARA ARMAR NUESTRO GUARDADO EN BASE DE DATOS
        const paymentIntent = event.data.object
        console.log(paymentIntent)

        const email = paymentIntent.billing_details.email
        console.log(email)

        const receiptURL = paymentIntent.receipt_url // https://receipt.stripe.com/12312/!2312/23123
        console.log(receiptURL)

        const receiptID = receiptURL
          .split("/")
          .filter((item) => item)
          .pop() // !2312
        console.log(receiptID)

        const amount = paymentIntent.amount
        console.log(amount)

        const date_created = paymentIntent.created
        console.log(date_created)

        const paymentDB = await User.findOneAndUpdate(
          { email },
          {
            $push: {
              receipts: {
                receiptURL,
                receiptID,
                date_created,
                amount,
              },
            },
          },
          { new: true }
        ).lean()

        console.log(paymentDB)
        res.status(200).json({
          msg: "Datos actualizados con éxito. Pago correcto.",
        })

        break

      default:
        console.log("Evento sin coincidencia.")
        res.status(200).json({
          msg: "Evento sin coincidencia",
        })
    }

    return
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hubo un problema en la generación de recibos para el usuario.",
    })
  }
}

const editCart = async (req, res) => {
  console.log(req.user)
  console.log(req.body)
  // OBTENER EL ID DEL USUARIO
  const userID = req.user.id

  try {
    // ENCONTRAR EL USUARIO EN BASE DE DATOS
    console.log(userID)
    const foundUser = await User.findById(userID).lean()

    // OBTENER EL LISTADO DE PRODUCTOS CON DATOS
    const { products } = req.body

    // ACTUALIZAR EL CARRITO
    const updatedCart = await Cart.findByIdAndUpdate(
      foundUser.cart,
      { products },
      { new: true }
    )

    res.status(200).json({
      msg: "Carrito actualizado",
      updatedCart,
    })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.status(500).json({
      msg: "Hubo un error en servidor",
      error,
    })
  }
}

export default {
  createOrder,
  createCheckoutSession,
  editCart,
}
