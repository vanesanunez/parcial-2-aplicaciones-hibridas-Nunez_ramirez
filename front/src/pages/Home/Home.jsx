import React, {useState, useEffect} from 'react'
import axios from "axios"

const Home = () => {
    const [reports, setReports] = useState([])
    const [reportName, setReportName] = useState("")
    const [reportDescription, setReportDescription] = useState("")
    const [reportLocation, setReportLocation] = useState("")

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
        
    };

  return (
    <div>
        <h1>Home</h1>
        <h2>Reportes</h2>

    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Título' value={reportName} onChange={(e) => setReportName(e.target.value)}/>
        <input type="text" placeholder='Descripción' value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}/>
        <input type="text" placeholder='Ubicación' value={reportLocation} onChange={(e) => setReportLocation(e.target.value)}/>
        <button type='submit'>Agregar reporte</button>

    <ul> 
      {
        reports.map(report => (
          <li key={report._id}>{report.title}</li>
        ))
      }
    </ul>

    </form>

    </div>
    
  )
}

export default Home