import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Rutas from './pages/Rutas.jsx/Rutas';
import Reports from './pages/Reports.jsx/Reports';
import {useContext} from 'react'
import { AuthContext } from './context/AuthContext';

function App() {

  const {user, logoutUser} = useContext(AuthContext)
  
  return (
    <>
      {user?.name ? (
        <>
          <h3>Hola, {user.name}</h3>
          <Link onClick={logoutUser} to="/login">
            Cerrar sesión
          </Link>
        </>
      ) : (
        <h3>No user</h3>
      )}

     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/reports/:id" element={<Reports/>}></Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/rutas" element={<Rutas />} />
     </Routes>
    </>
  )
}

export default App
