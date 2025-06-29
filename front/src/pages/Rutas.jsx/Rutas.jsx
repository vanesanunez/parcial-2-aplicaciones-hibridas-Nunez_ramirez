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

export default Rutas;

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
        description,
        locationPoint:[]
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


import { useEffect, useState } from "react";
import axios from "axios";

function Rutas() {
  const [rutas, setRutas] = useState([]);

  const [name, setName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

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

  const startEditing = (ruta) => {
  setEditMode(true);
  setEditId(ruta._id);
  setName(ruta.name);
  setStartPoint(ruta.startPoint);
  setEndPoint(ruta.endPoint);
  setDescription(ruta.description);
  if (ruta.locationPoint.length > 0) {
    setLat(ruta.locationPoint[0].lat);
    setLng(ruta.locationPoint[0].lng);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const nuevaRuta = {
        name,
        startPoint,
        endPoint,
        description,
        locationPoint: [{ lat: parseFloat(lat), lng: parseFloat(lng) }]
      };

      const response = await axios.post("http://localhost:3002/routes", nuevaRuta, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRutas([...rutas, response.data]);

      // Limpiar formulario
      setName("");
      setStartPoint("");
      setEndPoint("");
      setDescription("");
      setLat("");
      setLng("");
    } catch (error) {
      console.error("Error al guardar la ruta:", error.response?.data || error.message);
      alert("Tenés que iniciar sesión para guardar rutas.");
    }
  };

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3002/routes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Filtrar la lista de rutas para quitar la eliminada
    setRutas(rutas.filter((ruta) => ruta._id !== id));
  } catch (error) {
    console.error("Error al eliminar la ruta:", error.response?.data || error.message);
    alert("No se pudo eliminar la ruta.");
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
        <input
          type="number"
          placeholder="Latitud"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          step="any"
          required
        />
        <input
          type="number"
          placeholder="Longitud"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          step="any"
          required
        />
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
              <br />
              {ruta.locationPoint.length > 0 && (
                <span>
                  Latitud: {ruta.locationPoint[0].lat}, Longitud: {ruta.locationPoint[0].lng}
                </span>
              )}
                <br />
               <button onClick={() => handleDelete(ruta._id)}>Eliminar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rutas;
*/

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RutaModal from "../../components/RutaModal";
import Button from "../../components/Button";

function Rutas() {
  const [rutas, setRutas] = useState([]);

  const [name, setName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);

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

  /*const startEditing = (ruta) => {
    setEditMode(true);
    setEditId(ruta._id);
    setName(ruta.name);
    setStartPoint(ruta.startPoint);
    setEndPoint(ruta.endPoint);
    setDescription(ruta.description);
    if (ruta.locationPoint.length > 0) {
      setLat(ruta.locationPoint[0].lat);
      setLng(ruta.locationPoint[0].lng);
    }
  };*/

  const startEditing = (ruta) => {
    setSelectedRuta(ruta);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwtoken");
    const nuevaRuta = {
      name,
      startPoint,
      endPoint,
      description,
      locationPoint: [{ lat: parseFloat(lat), lng: parseFloat(lng) }],
    };

    try {
      if (editMode) {
        await axios.put(`http://localhost:3002/routes/${editId}`, nuevaRuta, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRutas(
          rutas.map((ruta) =>
            ruta._id === editId ? { ...ruta, ...nuevaRuta } : ruta
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        const response = await axios.post(
          "http://localhost:3002/routes",
          nuevaRuta,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRutas([...rutas, response.data]);
      }

      // Limpiar formulario
      setName("");
      setStartPoint("");
      setEndPoint("");
      setDescription("");
      setLat("");
      setLng("");
    } catch (error) {
      console.error(
        "Error al guardar la ruta:",
        error.response?.data || error.message
      );
      alert("Tenés que iniciar sesión.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("jwtoken");
      await axios.delete(`http://localhost:3002/routes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRutas(rutas.filter((ruta) => ruta._id !== id));
    } catch (error) {
      console.error(
        "Error al eliminar la ruta:",
        error.response?.data || error.message
      );
      alert("No se pudo eliminar la ruta.");
    }
  };

  return (
    <div className="page-container">
      <h1>{editMode ? "Editar ruta" : "Agregar nueva ruta"}</h1>
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
      
        <button type="submit">
          {editMode ? "Guardar cambios" : "Guardar ruta"}
        </button>
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
              Descripción: {ruta.description} <br />
              {ruta.locationPoint.length > 0 && (
                <span>
                  Latitud: {ruta.locationPoint[0].lat}, Longitud:{" "}
                  {ruta.locationPoint[0].lng}
                </span>
              )}
              <br />
              <button onClick={() => handleDelete(ruta._id)}>Eliminar</button>
              <button onClick={() => startEditing(ruta)}>Editar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
      {showModal && selectedRuta && (
        <RutaModal
          ruta={selectedRuta}
          onClose={() => setShowModal(false)}
          onRutaSaved={() => {
            setShowModal(false);
            axios
              .get("http://localhost:3002/routes")
              .then((res) => setRutas(res.data))
              .catch((err) => console.error("Error actualizando rutas", err));
          }}
        />
      )}
    </div>
  );
}

export default Rutas;
