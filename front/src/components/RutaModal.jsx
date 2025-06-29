import React, { useState } from "react";

const RutaModal = ({ ruta, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: ruta.name,
    startPoint: ruta.startPoint,
    endPoint: ruta.endPoint,
    description: ruta.description,
    lat: ruta.locationPoint[0]?.lat || "",
    lng: ruta.locationPoint[0]?.lng || ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Editar Ruta</h3>

        <div className="form-group">
          <label>Nombre</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Desde</label>
          <input name="startPoint" value={formData.startPoint} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Hasta</label>
          <input name="endPoint" value={formData.endPoint} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Latitud</label>
          <input name="lat" value={formData.lat} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Longitud</label>
          <input name="lng" value={formData.lng} onChange={handleChange} />
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSubmit}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default RutaModal;