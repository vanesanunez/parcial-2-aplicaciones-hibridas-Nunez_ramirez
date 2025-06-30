import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Rutas from './pages/Rutas.jsx/Rutas'
import Reports from './pages/Reports.jsx/Reports'
import ReportDetails from './pages/ReportDetails/ReportDetails'
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rutas" element={<Rutas />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
