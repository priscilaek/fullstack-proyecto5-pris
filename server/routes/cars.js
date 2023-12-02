import express from "express"
import carsController from "./../controllers/carsController.js"

const router = express.Router()

// OBTENER TODOS LOS CARROS
router.get("/", carsController.readAll)

export default router
