

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

function Home() {
  const [rutas, setRutas] = useState([]);
  const [reportes, setReportes] = useState([]);

  /*  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await axios.get("http://localhost:3002/routes");
        setRutas(response.data);
      } catch (error) {
        console.error("Error al obtener las rutas:", error);
      }
    };

    fetchRutas();
  }, []);*/

  useEffect(() => {
    const fetchRutasYReportes = async () => {
      try {
        const rutasRes = await axios.get("http://localhost:3002/routes");
        setRutas(rutasRes.data);

        const reportesRes = await axios.get("http://localhost:3002/reports");
        setReportes(reportesRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchRutasYReportes();
  }, []);

  return (
       <div className={styles.homeContainer}>
    <section className={styles.intro}>
        <h1>Vía Segura</h1>
        <p>Obtené información colaborativa y en tiempo real sobre:</p>
        <ul>
          <li><strong>Calles sin iluminación</strong> o con problemas de visibilidad (Reportes).</li>
          <li><strong>Zonas seguras</strong> recomendadas por los usuarios (Rutas Seguras).</li>
          <li><strong>Usuarios</strong> que interactúan con la plataforma.</li>
        </ul>
      </section>

      <section className={styles.solucion}>
        <h2>¿Qué resolvemos?</h2>
        <p>
          Combatimos la inseguridad y la desinformación en la vía pública,
          ayudando a las personas a desplazarse con mayor tranquilidad.
        </p>
      </section>

      <section className={styles.cardsSection}>
        <h2>Últimas rutas compartidas</h2>
        <div className={styles.cardsContainer}>
          {rutas.map((ruta) => (
            <div className={styles.card} key={ruta._id}>
              <h3>{ruta.name}</h3>
              <p><strong>Desde:</strong> {ruta.startPoint}</p>
              <p><strong>Hasta:</strong> {ruta.endPoint}</p>
              <p>{ruta.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <h2>Últimos reportes registrados</h2>
        <div className={styles.cardsContainer}>
          {reportes.map((reporte) => (
            <div className={styles.card} key={reporte._id}>
              <h3>{reporte.title}</h3>
              <p><strong>Ubicación:</strong> {reporte.location}</p>
              <p>{reporte.description}</p>
            </div>
          ))}
        </div>
      </section>

     
      
    </div>
  );
}

export default Home;
