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
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import UserProfile from './pages/userProfile.jsx'


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes/>}>
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetails />} />  
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/perfil" element={<UserProfile />} />
      </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
