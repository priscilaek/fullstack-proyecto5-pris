// 1. IMPORTACIÓN
import mongoose from "mongoose"

// 2. SCHEMA

const toppingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  availability: {
    type: Boolean,
    default: true,
  },
})

// 3. MODELO
const Topping = mongoose.model("Topping", toppingSchema)

// 4. EXPORTACIÓN
export default Topping
