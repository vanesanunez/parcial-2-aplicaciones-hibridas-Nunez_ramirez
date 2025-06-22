import { useEffect, useState } from 'react';
import axios from 'axios';

function Rutas() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const obtenerRutas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/api/rutas');
        setRutas(respuesta.data);
      } catch (error) {
        console.error("Error al obtener las rutas:", error);
      }
    };

    obtenerRutas();
  }, []);

  return (
    <div>
      <h2>Rutas Seguras</h2>
      {rutas.length === 0 ? (
        <p>No hay rutas disponibles.</p>
      ) : (
        <ul>
          {rutas.map((ruta) => (
            <li key={ruta._id}>
              <strong>{ruta.name}</strong> <br />
              Desde: {ruta.startPoint} <br />
              Hasta: {ruta.endPoint} <br />
              Descripción: {ruta.description}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rutas;