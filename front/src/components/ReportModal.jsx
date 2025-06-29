import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ReportModal.scss'; 

const ReportModal = ({ report, onClose, onReportSaved, onDelete }) => {
  const [title, setTitle] = useState(report.title);
  const [description, setDescription] = useState(report.description);
  const [location, setLocation] = useState(report.location);
//   const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (report) {
      setTitle(report.title);
      setDescription(report.description);
      setLocation(report.location);
    }
  }, [report]);

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('jwtoken');
      if (!token) return alert('Por favor, inicia sesión.');
  
      const updatedReport = {
        title,
        description,
        location
      };
  
      await axios.put(
        `http://localhost:3002/reports/${report._id}`,
        updatedReport,  
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        }
      );
  
      alert('Reporte actualizado con éxito');
      onReportSaved();
  
    } catch (err) {
      alert('Error actualizando el reporte');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>

        <h3>Editar Reporte</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
{/* 
          <div className="form-group">
            <label>Imagen</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div> */}

          <div className="modal-actions">
            <button type="submit" className="btn-primary">Guardar Cambios</button>
            <button type="button" onClick={onDelete} className="btn-danger">Borrar Reporte</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;

