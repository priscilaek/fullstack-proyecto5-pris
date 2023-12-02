// routes/consultas.js
import express from "express"
import consultasController from "../controllers/consultasController.js"

const router = express.Router()

// A. OBTENER TODAS LAS CONSULTAS
router.get("/", consultasController.readAll)

// B. CREAR UNA CONSULTA
router.post("/create", consultasController.create)

// C. OBTENER UNA CONSULTA ESPECÍFICA
router.get("/readone/:id", consultasController.readOne)

// D. ACTUALIZAR UNA CONSULTA ESPECÍFICA
router.put("/updateone/:id", consultasController.edit)

// E. BORRAR UNA CONSULTA ESPECÍFICA
router.delete("/deleteone/:id", consultasController.deleteOne)

export default router
