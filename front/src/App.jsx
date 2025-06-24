import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Rutas from './pages/Rutas.jsx/Rutas';
import ReportList from './pages/ReportList.jsx/ReportList';
import {useContext} from 'react'
import { AuthContext } from './context/AuthContext';

function App() {

  const {user} = useContext(AuthContext)
  
  return (
    <>

    {
      user?.name ? <h3>Usuario logueado: {user.name}</h3> : <h3>No user</h3>
    }

     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/reports/:id" element={<ReportList/>}></Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/rutas" element={<Rutas />} />
     </Routes>
    </>
  )
}

export default App
