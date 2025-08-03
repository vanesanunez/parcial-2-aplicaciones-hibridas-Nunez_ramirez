import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ReportModal from "../../components/ReportModal.jsx";
import Button from "../../components/Button/Button.jsx";
import './ReportDetails.scss';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch detalle reporte
  const fetchReport = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/reports/${id}`);
      setReport(res.data);
      setLoading(false);
    } catch (err) {
      setError("No se pudo cargar el reporte.");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  // guardar el reporte (desde la modal)
  const handleReportSaved = () => {
    fetchReport();
    setShowModal(false);
  };

  // Borrar reporte
  const handleDelete = async () => {
    if (window.confirm("¿Querés borrar este reporte?")) {
      try {
        const token = Cookies.get("jwtoken");
        if (!token) return alert("Iniciá sesión por favor");

        await axios.delete(`http://localhost:3002/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Reporte borrado");
        navigate("/reports");
      } catch (err) {
        alert("Error borrando reporte");
        console.error(err);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="report-details-card">
  <div className="info">
  {report.image && (
    <div className="image-container">
      <img
        className="report-image"
        src={`http://localhost:3002${report.image}`}
        alt="Imagen del reporte"
      />
    </div>
  )}
    <h2>Reporte: {report.title}</h2>
    <p>Descripción: {report.description}</p>
    <p>Ubicación: {report.location}</p>
    <p>Fecha: {report.date.substring(0, 10)}</p>

    <Button onClick={() => setShowModal(true)} className="btn-primary">Editar</Button>
    <Button onClick={handleDelete} className="btn-danger">Eliminar</Button>
  </div>

 

  {showModal && (
    <ReportModal
      report={report}
      onClose={() => setShowModal(false)}
      onReportSaved={handleReportSaved}
      onDelete={handleDelete}
    />
  )}
</div>

  );
};

export default ReportDetails;
