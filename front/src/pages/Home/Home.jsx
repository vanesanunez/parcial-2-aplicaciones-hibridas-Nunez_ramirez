import React, {useState, useEffect} from 'react'
import axios from "axios"

import useDebounce from '../../hooks/useDebounce'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
// import '../../styles/home.scss';


const Home = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([])
    const [reportName, setReportName] = useState("")
    const [reportDescription, setReportDescription] = useState("")
    const [reportLocation, setReportLocation] = useState("")
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const debouncedSearch = useDebounce(search, 1000)

  //traer todos los reportes (no requiere token de autenticación)
const fetchReports = async () => {
  try {
   const res = await axios.get("http://localhost:3002/reports");
   console.log(res)
   setReports(res.data)
  }catch(err){
    console.error(err)
  }
}
useEffect(() => {
  fetchReports()
}, [])


    //crear nuevo reporte
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReport = {
            title: reportName,
            description: reportDescription,
            location: reportLocation,
            tags: ["general"], // temporal para cumplir con el campo obligatorio
            locationPoint: [] 
        }
        try {
          const token = localStorage.getItem("token");
          await axios.post("http://localhost:3002/reports", newReport, {
            headers: { Authorization: `Bearer ${token}` }
          });
      
          // Limpiar campos del formulario
          setReportName("");
          setReportDescription("");
          setReportLocation("");
      
          // Traer los reportes nuevamente - actualiza la lista
          fetchReports();
        } catch (err) {
          console.error(err);
        }
        
    }

    const handleSearch = async (searchTerm) => {
      try{
        const res = await axios.get("http://localhost:3002/reports/search", {
          params: {title: searchTerm}
        });
        setReports(res.data)
        setSuggestions([])
      }catch(err){
        console.error(err)
      }
    }
    useEffect(() => {
      if(debouncedSearch){
          // fetch
          fetchSuggestions(debouncedSearch)
      }else{
          setSuggestions([])
      }
  }, [debouncedSearch])

  const fetchSuggestions = async (searchTeam) => {
      try{
          const res = await axios.get("http://localhost:3002/reports/search", {
              params: {title: searchTeam}
          });
          setSuggestions(res.data)
      }catch(err){
          console.error(err)
      }
  }
    

    const handleSearchChange = async (e) => {
      const value = e.target.value;
      setSearch(value);

      // if(value){
      //   try{
      //     const res = await axios.get("http://localhost:3002/reports/search", {
      //       params: {title:  value}
      //     });
      //     setSuggestions(res.data) //muestra sugerencias
      //   }catch(err){
      //     console.error(err)
      //   }
      // }else{
      //   setSuggestions([])
      // }
    }

  return (
  <div className="home-container"> 
        <h1>Home</h1>
         <button onClick={() => navigate("/rutas")} className="boton">Ir a rutas seguras</button>

        <h2>Reportes</h2>

    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Título' value={reportName} onChange={(e) => setReportName(e.target.value)}/>
        <input type="text" placeholder='Descripción' value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}/>
        <input type="text" placeholder='Ubicación' value={reportLocation} onChange={(e) => setReportLocation(e.target.value)}/>
        <button type='submit'>Agregar reporte</button>
        </form>

  {/*form search */}
  <form onSubmit={(e) => {e.preventDefault(); handleSearch(search)}}>
    <input type="text"placeholder='buscar por nombre' value={search} onChange={handleSearchChange}/>
    <button type='submit'>Buscar</button>
    {
      suggestions.length > 0 && (
        <ul className='autocomplete-suggestions'>
          {
            suggestions.map((suggestion) => (
              <li key={suggestion._id}>{suggestion.title}</li>
            ))
          }
        </ul>
      )
  }
  
  </form>

  <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <Link to={`/reports/${report._id}`}>{report.title} - Detalle</Link>
            
            </li>
        ))}
      </ul>
      

</div>
    
  )
}

export default Home