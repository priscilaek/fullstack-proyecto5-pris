// ./src/pages/registro/index.jsx
import { useState, useContext } from "react"
import UserContext from "../../context/User/UserContext"

function SignUp() {
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  })

  const userCtx = useContext(UserContext)
  console.log(userCtx)

  const { registerUser } = userCtx

  const handleChange = (event) => {
    console.log(event.target.name)

    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    return registerUser(newUser)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input name="name" value={newUser.name} onChange={handleChange} />
        </div>

        <div>
          <label>Apellido</label>
          <input
            name="lastname"
            value={newUser.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Correo Electrónico</label>
          <input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>

        <button>Crear usuario</button>
      </form>
    </div>
  )
}

export default SignUp
