import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear el usuario
    
      await axios.post("http://localhost:3002/users", formData);
      

      // Si se creó bien, iniciar sesión automáticamente
      const loginRes = await axios.post("http://localhost:3002/users/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", loginRes.data.token);
      navigate("/"); // Redirigir a Home
    }catch (err) {
        console.error("Error completo:", err);
      
        // Mostrar el mensaje claro que viene del backend
        const backendMsg = err.response?.data?.message || "Error desconocido al registrar.";
        alert(backendMsg);
      }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} required />
        <input name="lastname" placeholder="Apellido" onChange={handleChange} required />
        <input name="dni" type="number" placeholder="DNI" onChange={handleChange} required />
        <input name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
