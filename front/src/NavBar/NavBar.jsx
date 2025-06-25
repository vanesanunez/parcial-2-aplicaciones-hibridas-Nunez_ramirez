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

      {/* menu hamburguesa */}
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

      {/* Links */}
      <div className={menuMovil ? Style.NavBar_items_Open : Style.NavBar_items}>

        <div className={Style.NavBar_links}>
          <Link to="/" onClick={() => setMenuMovil(false)}>Inicio</Link>
          <Link to="/reports" onClick={() => setMenuMovil(false)}>Reportes</Link>
          <Link to="/rutas" onClick={() => setMenuMovil(false)}>Rutas</Link>

          {/* Mostrar solo si NO hay usuario */}
          {!user && (
            <>
              <Link to="/register">Registro</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>

        <div className={Style.NavBar_user}>
          {user ? (
            <>
              <span>¡Hola, {user.name}!</span>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <span>No user</span>
          )}
        </div>

      </div>

    </nav>
  )
}

export default NavBar

