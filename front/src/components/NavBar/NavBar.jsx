import React, { useState, useContext } from "react";
import "./NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuMovil, setMenuMovil] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  const cambioMenuMovil = () => setMenuMovil(!menuMovil);

  return (
    <nav className="NavBar">
      <div className="NavBar_logo">
        <p>Vía Segura</p>
      </div>

      {/* menú hamburguesa */}
      <button
        onClick={cambioMenuMovil}
        className="IconMenuMovil"
        aria-label="Menú móvil"
      >
        {menuMovil ? (
          <FontAwesomeIcon icon={faTimes} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="2x" />
        )}
      </button>

      {/* Links */}
      <div className={menuMovil ? "NavBar_items_Open" : "NavBar_items"}>
        <div className="NavBar_links">
          <Link to="/" onClick={() => setMenuMovil(false)}>
            Inicio
          </Link>
          <Link to="/reports" onClick={() => setMenuMovil(false)}>
            Reportes
          </Link>
          <Link to="/rutas" onClick={() => setMenuMovil(false)}>
            Rutas
          </Link>

          {/* Mostrar solo si NO hay usuario */}
          {!user && (
            <>
              <Link to="/register" onClick={() => setMenuMovil(false)}>
                Registro
              </Link>
              <Link to="/login" onClick={() => setMenuMovil(false)}>
                Iniciar sesión
              </Link>
            </>
          )}
        </div>

        <div className="NavBar_user">
          {user ? (
            <>
              <span>¡Hola, {user.name} !</span>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <span>No user</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
