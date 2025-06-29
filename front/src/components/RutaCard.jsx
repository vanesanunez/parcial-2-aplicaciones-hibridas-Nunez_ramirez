import React from "react";
import Button from "./Button";

const RutaCard = ({ ruta, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h2>{ruta.name}</h2>
      <p className="description">{ruta.description}</p>
      <p className="location">Desde: {ruta.startPoint}</p>
      <p className="location">Hasta: {ruta.endPoint}</p>
    
      <div className="card-children">
        <Button className="btn-primary" onClick={onEdit}>
          Editar
        </Button>
        <Button className="btn-danger" onClick={onDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default RutaCard;
