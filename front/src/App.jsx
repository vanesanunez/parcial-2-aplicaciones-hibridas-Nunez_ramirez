import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Register from './pages/Register';

function App() {
  
  return (
    <>
     <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register />} />
     </Routes>
    </>
  )
}

export default App
