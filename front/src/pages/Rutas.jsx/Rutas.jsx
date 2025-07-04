
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RutaModal from "../../components/RutaModal";
import RutaCard from "../../components/RutaCard";
import Button from "../../components/Button/Button.jsx";
import "../../styles/rutas.scss";

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
    const confirmacion = window.confirm(
      "¿Estás segura de que querés eliminar esta ruta?"
    );
    if (!confirmacion) return;

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
      <div className="form-container">
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

          <Button type="submit" className="btn-primary">
            {editMode ? "Guardar cambios" : "Guardar ruta"}
          </Button>
        </form>

        <h2>Rutas Seguras</h2>
        {rutas.length === 0 ? (
          <p>No hay rutas disponibles.</p>
        ) : (
          <div className="card-grid">
            {rutas.map((ruta) => (
              <RutaCard
                key={ruta._id}
                ruta={ruta}
                onEdit={() => startEditing(ruta)}
                onDelete={() => handleDelete(ruta._id)}
              />
            ))}
          </div>
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
    </div>
  );
}

export default Rutas;
