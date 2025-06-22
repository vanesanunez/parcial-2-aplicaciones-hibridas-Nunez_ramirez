import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"

const Reports = () => {
  const {id} = useParams()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

const fetchReportDetails = async () => {
  setLoading(true)
  try{
    const res = await axios.get(`http://localhost:3002/reports/${id}`);
    setReport(res.data.report)
  }catch(err){
    console.error(err)
  }
}
useEffect(() => {
  fetchReportDetails()
}, [id])

  return (
    <div>Detalle de reporte</div>
  )
}

export default Reports