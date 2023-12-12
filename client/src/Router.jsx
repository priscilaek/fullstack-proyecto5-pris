// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"

import ConsultasPage from "./pages/consultas"
import ConsultaState from "./context/Consulta/ConsultaState"
import ConsultaPage from "./pages/consultas/consulta"

import Login from "./pages/iniciar-sesion"
import SignUp from "./pages/registro"
import UserState from "./context/User/UserState"

import Auth from "./routes/Auth"
import Public from "./routes/Public"
import Private from "./routes/Private"
import Home from "./pages/home"
import Cart from "./pages/carrito"

function Router() {
  return (
    <>
      <UserState>
        <ConsultaState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Public component={Home} />} />
                <Route
                  path="/iniciar-sesion"
                  element={<Auth component={Login} />}
                />
                <Route path="/registro" element={<Auth component={SignUp} />} />
                <Route
                  path="/perfil"
                  element={
                    <>
                      <p>Esta página es mi perfil de usuario</p>
                    </>
                  }
                />
                <Route path="/carrito" element={<Private component={Cart} />} />
                <Route
                  path="/consultas"
                  element={<Public component={ConsultasPage} />}
                />
                <Route
                  path="/consultas/:slug"
                  element={<Public component={ConsultaPage} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
          </ConsultaState>
      </UserState>
    </>
  )
}

export default Router
