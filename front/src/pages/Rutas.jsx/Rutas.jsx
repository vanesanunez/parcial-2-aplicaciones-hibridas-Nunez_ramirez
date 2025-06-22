/*import { useEffect, useState } from "react";
import axios from "axios";

function Rutas() {
  const [rutas, setRutas] = useState([]);

  const [name, setName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const obtenerRutas = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/api/rutas");
        setRutas(respuesta.data);
      } catch (error) {
        console.error("Error al obtener las rutas:", error);
      }
    };


    obtenerRutas();
  }, []);

  //Esta función se llama cuando enviás el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); 

      const nuevaRuta = {
        name,
        startPoint,
        endPoint,
        description,
      };

      await axios.post("http://localhost:3000/api/rutas", nuevaRuta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Limpiar formulario
      setName("");
      setStartPoint("");
      setEndPoint("");
      setDescription("");

      // Volver a cargar las rutas actualizadas
      const respuesta = await axios.get("http://localhost:3000/api/rutas");
      setRutas(respuesta.data);
    } catch (error) {
      console.error("Error al guardar la ruta:", error);
    }
  };

  return (
    <div>
      <h1>Agregar nueva ruta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la ruta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Punto de inicio"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Punto final"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Guardar ruta</button>
      </form>

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

export default Rutas;*/

import { useEffect, useState } from "react";
import axios from "axios";

function Rutas() {
  const [rutas, setRutas] = useState([]);

  const [name, setName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const obtenerRutas = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3002/routes");
        setRutas(respuesta.data);
      } catch (error) {
        console.error("Error al obtener las rutas:", error);
      }
    };

    obtenerRutas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const nuevaRuta = {
        name,
        startPoint,
        endPoint,
        description
      };

      const response = await axios.post("http://localhost:3002/routes", nuevaRuta, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Agregar la nueva ruta directamente a la lista
      setRutas([...rutas, response.data]);

      // Limpiar el formulario
      setName("");
      setStartPoint("");
      setEndPoint("");
      setDescription("");
    } catch (error) {
      console.error("Error al guardar la ruta:", error.response?.data || error.message);
      alert("Tenés que iniciar sesión para guardar rutas.");
    }
  };

  return (
    <div>
      <h1>Agregar nueva ruta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la ruta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Punto de inicio"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Punto final"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Guardar ruta</button>
      </form>

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
