import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:3002/reports/usuario/${user.id}`)
        .then((res) => setReportes(res.data))
        .catch((err) => console.error("Error al traer reportes:", err));
    }
  }, [user]);

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="user-profile">
      <h2>Perfil de {user.name}</h2>

      <div className="user-data">
        <p><strong>ID:</strong> {user.id}</p>
        {/* Podés agregar más campos si los decodificás desde el token */}
      </div>

      <h3>Mis reportes</h3>
      <ul>
        {reportes.length > 0 ? (
          reportes.map((r) => (
            <li key={r._id}>
              <strong>{r.title}</strong> - {r.location}
            </li>
          ))
        ) : (
          <p>No tenés reportes todavía.</p>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
