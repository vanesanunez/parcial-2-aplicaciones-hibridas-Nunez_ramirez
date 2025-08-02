
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./UserProfile.scss";
import perfilImg from "../assets/perfil.avif";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:3002/users/${user.id}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Error al obtener datos del usuario:", err));

      axios
        .get(`http://localhost:3002/reports/usuario/${user.id}`)
        .then((res) => setReportes(res.data))
        .catch((err) => console.error("Error al traer reportes:", err));
    }
  }, [user]);

  if (!userData) return <p>Cargando usuario...</p>;

  return (
    <div className="user-profile">
      <h2>Perfil de {userData.name}</h2>

      <div className="profile-container">
      <div className="profile-image">
          <img
            src={perfilImg} alt="Foto de perfil"
          />
        </div>

        <div className="profile-info">
          <p><strong>Nombre:</strong> {userData.name} {userData.lastname}</p>
          <p><strong>Nombre de usuario:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>DNI:</strong> {userData.dni}</p>
        </div>
      </div>

      <h3>Mis reportes</h3>
      <div className="reportes-grid">
        {reportes.length > 0 ? (
          reportes.map((r) => (
            <div className="reporte-card" key={r._id}>
              <h4>{r.title}</h4>
              <p><strong>Ubicación:</strong> {r.location}</p>
              <p>{r.description}</p>
            </div>
          ))
        ) : (
          <p>No tenés reportes todavía</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
