import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

import {
  FaRoute,
  FaMapSigns,
  FaFlagCheckered,
  FaRegStickyNote,
  FaExclamationTriangle,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { MdCheckCircleOutline } from "react-icons/md";

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
          <ul className={styles.listaCheck}>
            <li>
              <img src="/assets/check-mark.png" alt="check" />
              <span>
                <strong>Alertas urbanas</strong>, como calles sin iluminación o
                con problemas de visibilidad (Reportes).
              </span>
            </li>
            <li>
              <img src="/assets/check-mark.png" alt="check" />
              <span>
                <strong>Zonas seguras</strong> y trayectos recomendados por los
                usuarios (Rutas Seguras).
              </span>
            </li>
            <li>
              <img src="/assets/check-mark.png" alt="check" />
              <span>
                <strong>Novedades locales</strong> como cortes de calles,
                desvíos o accidentes.
              </span>
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

      <section className={styles.beneficios}>
        <h2>Beneficios de usar Vía Segura</h2>
        <div className={styles.beneficiosGrid}>
          <div className={styles.beneficioItem}>
            <img src="/assets/locations.png" alt="Seguridad" />
            <h3>Eficiencia</h3>
            <p>
              Elegí rutas con mejor iluminación y menos riesgo para moverte con
              tranquilidad.
            </p>
          </div>
          <div className={styles.beneficioItem}>
            <img src="/assets/colaboration.png" alt="Colaborativo" />
            <h3>Colaborativo</h3>
            <p>
              Sumá tu experiencia con reportes y ayudá a que otros eviten zonas
              peligrosas.
            </p>
          </div>
          <div className={styles.beneficioItem}>
            <img src="/assets/clock.png" alt="Tiempo real" />
            <h3>Tiempo Real</h3>
            <p>
              La información se actualiza constantemente gracias a las
              contribuciones de la comunidad.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.titulo2}>
          {" "}
          <h2>Últimas rutas compartidas</h2>
        </div>

        <div className={styles.cardsContainer}>
          {rutas.map((ruta) => (
            <div
              className={`${styles.card} ${styles.fadeInCard}`}
              key={ruta._id}
            >
              <h3>
                <FaRoute style={{ marginRight: "6px", color: "#4a90e2" }} />
                {ruta.name}
              </h3>
              <p>
                <FaMapSigns style={{ marginRight: "6px", color: "#2d3436" }} />
                <strong>Desde:</strong> {ruta.startPoint}
              </p>
              <p>
                <FaFlagCheckered
                  style={{ marginRight: "6px", color: "#2d3436" }}
                />
                <strong>Hasta:</strong> {ruta.endPoint}
              </p>
              <p>
                <FaRegStickyNote
                  style={{ marginRight: "6px", color: "#777" }}
                />
                {ruta.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.titulo3}>
          <h2>Últimos reportes registrados</h2>
        </div>

        <div className={styles.cardsContainer}>
          {reportes.map((reporte) => (
            <div className={styles.card} key={reporte._id}>
              <h3>
                <FaExclamationTriangle
                  style={{ marginRight: "6px", color: "#f2826d" }}
                />
                {reporte.title}
              </h3>
              <p>
                <FaMapMarkerAlt
                  style={{ marginRight: "6px", color: "#4a90e2" }}
                />
                {reporte.location}
              </p>
              <p>
                <FaRegStickyNote
                  style={{ marginRight: "6px", color: "#777" }}
                />
                {reporte.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.descargaApp}>
        <div className={styles.curvaSuperior}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,112C672,96,768,128,864,144C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className={styles.contenidoApp}>
          <div className={styles.textoApp}>
            <h2>Descargá la aplicación</h2>
            <p>
              Disponible para Android e iOS. Empezá a moverte de forma más
              segura.
            </p>
            <div className={styles.botonesStores}>
              <img src="/assets/boton3.png" alt="Google Play" />
              <img src="/assets/botonapple.jpg" alt="App Store" />
            </div>
          </div>
          <div className={styles.mockupApp}>
            <img src="/assets/mockup3.png" alt="Mockup Vía Segura" />
          </div>
         
        </div>
      </section>
    </div>
  );
}

export default Home;
