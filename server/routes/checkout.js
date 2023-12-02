// server/routes/checkout.js

import express from "express"
import checkoutController from "../controllers/checkoutController.js"
import authorization from "./../middleware/authorization.js"

const router = express.Router()

router.get(
  "/create-checkout-session",
  authorization,
  checkoutController.createCheckoutSession
)

router.post(
  "/create-order",
  express.raw({ type: "application/json" }),
  checkoutController.createOrder
)

router.put("/edit-cart", authorization, checkoutController.editCart)

export default router
