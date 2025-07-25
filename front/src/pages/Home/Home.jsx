import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

function Home() {
  const [rutas, setRutas] = useState([]);
  const [reportes, setReportes] = useState([]);


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
        <div className={styles.introImage}>
          <img
            src="/assets/inicio-img.png"
            alt="Personas conectadas colaborando"
          />
        </div>
        <div className={styles.introText}>
          <h1>Vía Segura</h1>
          <p>Obtené información colaborativa y en tiempo real sobre:</p>
          <ul>
            <li>
              <strong>Alertas urbanas</strong>, como calles sin iluminación o con problemas de visibilidad (Reportes).
            </li>
            <li>
              <strong>Zonas seguras</strong> y trayectos recomendados por los usuarios (Rutas Seguras).
            </li>
            <li>
              <strong>Novedades locales</strong> como cortes de calles, desvíos o accidentes.
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.solucion}>
        <div className={styles.solucionText}>
          <h2>¿Qué resolvemos?</h2>
          <p>
            Combatimos la inseguridad y la desinformación en la vía pública,
            ayudando a las personas a desplazarse con mayor tranquilidad.
          </p>
          <p>
            a través de tecnología y participación comunitaria, brindamos datos
            en tiempo real sobre calles con mejor iluminación, rutas
            alternativas más seguras, puntos de interés y reportes de la
            comunidad. Nuestra red se nutre de la colaboración entre vecinos,
            creando un ecosistema donde cada reporte contribuye a mejorar la
            experiencia y seguridad de todos.
          </p>
        </div>
        <div className={styles.solucionImage}>
          <img
            src="/assets/solucion-img.png"
            alt="Ilustración de solucion a problema"
          />
        </div>
       
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.titulo2}> <h2>Últimas rutas compartidas</h2></div>
       
        <div className={styles.cardsContainer}>
          {rutas.map((ruta) => (
            <div className={styles.card} key={ruta._id}>
              <h3>{ruta.name}</h3>
              <p>
                <strong>Desde:</strong> {ruta.startPoint}
              </p>
              <p>
                <strong>Hasta:</strong> {ruta.endPoint}
              </p>
              <p>{ruta.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cardsSection}>
      <div className={styles.titulo3}><h2>Últimos reportes registrados</h2></div>
        
        <div className={styles.cardsContainer}>
          {reportes.map((reporte) => (
            <div className={styles.card} key={reporte._id}>
              <h3>{reporte.title}</h3>
              <p>
                <strong>Ubicación:</strong> {reporte.location}
              </p>
              <p>{reporte.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
