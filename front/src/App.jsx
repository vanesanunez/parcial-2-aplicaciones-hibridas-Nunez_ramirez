import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Rutas from './pages/Rutas.jsx/Rutas';
import ReportList from './pages/ReportList.jsx/ReportList';

function App() {
  
  return (
    <>
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
