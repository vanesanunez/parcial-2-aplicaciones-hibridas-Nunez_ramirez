// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // para redireccionar

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3002/users/login", {
//         email,
//         password,
//       });

//       const token = res.data.token;
//       localStorage.setItem("token", token);
//       navigate("/"); // redirige al Home

//     } catch (error) {
//       console.error("Error al iniciar sesión:", error.response?.data?.message || error.message);
//       alert("Credenciales incorrectas");
//     }
//   };

//   return (
//     <div>
//       <h1>Iniciar Sesión</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Ingresar</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"; 
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const {setUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3002/users/login', userData)
      .then((res) => {
        Cookies.set('jwtoken', res.data.token, { expires: 3, path: '/' }) // ✅ aquí
        setUser(res.data.usuario)
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setError(error.response?.data?.message || "Error en el login")
      })
  }

  return (
    <div>
    <h2>Iniciar sesión</h2>
    <form>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {
        error &&  <p>{error}</p>
      }
     
    </form>
  </div>
  )
}

export default Login