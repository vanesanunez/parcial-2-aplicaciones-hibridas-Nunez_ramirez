// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import "./UserProfile.scss";


// const UserProfile = () => {
//   const { user } = useContext(AuthContext);
//   const [reportes, setReportes] = useState([]);

//   useEffect(() => {
//     if (user?.id) {
//       axios
//         .get(`http://localhost:3002/reports/usuario/${user.id}`)
//         .then((res) => setReportes(res.data))
//         .catch((err) => console.error("Error al traer reportes:", err));
//     }
//   }, [user]);

//   if (!user) return <p>Cargando usuario...</p>;

//   return (
//     <div className="user-profile">
//       <h2>Perfil de {user.name}</h2>
      

//       <div className="user-data">
//         <p><strong>ID:</strong> {user.id}</p>
//         <p><strong>Nombre de usuario:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
 
//       </div>

//       <h3>Mis reportes</h3>
//       <ul>
//         {reportes.length > 0 ? (
//           reportes.map((r) => (
//             <li key={r._id}>
//               <strong>{r.title}</strong> - {r.location}
//             </li>
//           ))
//         ) : (
//           <p>No tenés reportes todavía.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./UserProfile.scss";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    if (user?.id) {
      // Obtener datos completos del usuario
      axios
        .get(`http://localhost:3002/users/${user.id}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error("Error al obtener datos del usuario:", err));

      // Obtener reportes del usuario
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

      <div className="user-data">
        <p><strong>ID:</strong> {userData._id}</p>
        <p><strong>Nombre:</strong> {userData.name} {userData.lastname}</p>
        <p><strong>Nombre de usuario:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>DNI:</strong> {userData.dni}</p>
      </div>

      <h3>Mis reportes creados</h3>
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
