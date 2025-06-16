import React, {useState} from 'react'
import axios from "axios"

const Home = () => {
    const [reportName, setReportName] = useState("")
    const [reportDescription, setReportDescription] = useState("")
    const [reportLocation, setReportLocation] = useState("")

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
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          } catch (err) {
            console.error(err);
          }
        
    }

  return (
    <div>
        <h1>Home</h1>
        <h2>Reportes</h2>

    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Título' value={reportName} onChange={(e) => setReportName(e.target.value)}/>
        <input type="text" placeholder='Descripción' value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}/>
        <input type="text" placeholder='Ubicación' value={reportLocation} onChange={(e) => setReportLocation(e.target.value)}/>
        <button type='submit'>Agregar reporte</button>
    </form>

    </div>
    
  )
}

export default Home