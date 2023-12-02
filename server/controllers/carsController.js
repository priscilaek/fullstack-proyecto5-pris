let data = [
  {
    id: 1,
    marca: "VW",
    modelo: "Tiguan",
  },
  {
    id: 2,
    marca: "VW",
    modelo: "Taos",
  },
]

const readAll = (req, res) => {
  res.json({
    msg: "Carros obtenidos con éxito",
    data: data,
  })
}

export default {
  readAll,
}
