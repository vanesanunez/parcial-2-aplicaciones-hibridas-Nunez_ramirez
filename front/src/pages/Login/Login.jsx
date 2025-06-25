
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