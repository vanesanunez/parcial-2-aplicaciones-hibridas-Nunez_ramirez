
import React, { useContext, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"; 
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

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
        Cookies.set('jwtoken', res.data.token, { expires: 3, path: '/' })
        setUser(res.data.usuario)
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setError(error.response?.data?.message || "Error en el login")
      })
  }
  return (
    <div className="login-page">
      <div className="login-image-container"></div>
  
      <div className="login-form-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
         
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}

          
        </form>
      </div>
    </div>
  );
}

export default Login;
