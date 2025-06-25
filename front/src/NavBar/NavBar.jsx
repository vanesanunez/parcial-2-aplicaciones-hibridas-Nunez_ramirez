import React, { useState, useContext } from "react"
import Style from "./NavBar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [menuMovil, setMenuMovil] = useState(false)
  const { user, logoutUser } = useContext(AuthContext)

  const cambioMenuMovil = () => setMenuMovil(!menuMovil)

  return (
    <nav className={Style.NavBar}>

<div className={Style.NavBar_logo}>
  <p>Icono</p>
</div>

<button
  onClick={cambioMenuMovil}
  className={Style.IconMenuMovil}
  aria-label="Menú móvil"
>
  {menuMovil ? (
    <FontAwesomeIcon icon={faTimes} size="2x" />
  ) : (
    <FontAwesomeIcon icon={faBars} size="2x" />
  )}
</button>

      <div className={menuMovil ? Style.NavBar_items_Open : Style.NavBar_items}>
        <div className={Style.NavBar_links}>
          <Link to="/home">Inicio</Link>
          <Link to="/reports">Reportes</Link>
          <Link to="/rutas">Rutas</Link>
          <Link to="/register">Registro</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className={Style.NavBar_user}>
          {user ? (
            <>
              <span>Hola, {user.name}</span>
              <button onClick={logoutUser}>Cerrar sesión</button>
            </>
          ) : (
            <span>No hay usuario</span>
          )}
        </div>
      </div>

    </nav>
  )
}

export default NavBar
