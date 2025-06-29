
/*
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

*/

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Button from "./Button";

const RutaModal = ({ ruta, onClose, onRutaSaved }) => {
  const [name, setName] = useState(ruta.name || "");
  const [startPoint, setStartPoint] = useState(ruta.startPoint || "");
  const [endPoint, setEndPoint] = useState(ruta.endPoint || "");
  const [description, setDescription] = useState(ruta.description || "");
  const [lat, setLat] = useState(ruta.locationPoint?.[0]?.lat || "");
  const [lng, setLng] = useState(ruta.locationPoint?.[0]?.lng || "");

  const handleSave = async () => {
    const token = Cookies.get("jwtoken");
    if (!token) {
      return alert("Por favor, iniciá sesión.");
    }

    const updatedRuta = {
      name,
      startPoint,
      endPoint,
      description,
      locationPoint: [{ lat: parseFloat(lat), lng: parseFloat(lng) }]
    };

    try {
      await axios.put(`http://localhost:3002/routes/${ruta._id}`, updatedRuta, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onRutaSaved(); // actualiza en el padre
    } catch (err) {
      alert("Error al guardar los cambios.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Querés borrar esta ruta?")) {
      try {
        const token = Cookies.get("jwtoken");
        await axios.delete(`http://localhost:3002/routes/${ruta._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onClose(); // cerrar el modal
        onRutaSaved(); // actualiza rutas en padre
      } catch (err) {
        alert("Error al borrar la ruta.");
        console.error(err);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Editar Ruta</h3>

        <div className="form-group">
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Punto de inicio</label>
          <input value={startPoint} onChange={(e) => setStartPoint(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Punto final</label>
          <input value={endPoint} onChange={(e) => setEndPoint(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Latitud</label>
          <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Longitud</label>
          <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} />
        </div>

        <div className="modal-actions">
          <Button onClick={handleSave} className="btn-primary">Guardar</Button>
          <Button onClick={handleDelete} className="btn-danger">Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

export default RutaModal;