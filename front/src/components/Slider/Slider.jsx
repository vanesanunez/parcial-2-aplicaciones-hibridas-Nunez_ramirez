
/*
import React from "react";
import Slider from "react-slick";
import styles from "./Slider.module.css";

const bannerImages = [
  {
    src: "/assets/banner1.jpg",
    texto:
      "Sentite acompañada en cada paso. Con Vía Segura, no estás sola: cada reporte es un acto de cuidado colectivo. Juntas construimos un camino más seguro.",
  },
  {
    src: "/assets/banner2.png",
    texto: `✅ Análisis colaborativo de trayectos\n✅ Priorización por iluminación y seguridad\n✅ Geolocalización y mapeo actualizado`,
  },
  {
    src: "/assets/banner3.png",
    texto:
      "Disponible en Android e iOS, Vía Segura te permite visualizar reportes, elegir rutas seguras y recibir alertas en tiempo real desde una interfaz clara y rápida.",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
};

const SliderComponent = () => {
  return (
   <div className={styles.sliderWrapper}>
  <Slider {...sliderSettings}>
    {bannerImages.map((item, index) => (
      <div key={index} className={styles.slide}>
        <img src={item.src} alt={`Slide ${index + 1}`} className={styles.slideImage} />
        <div className={styles.slideText}>
          {item.texto.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default SliderComponent;*/