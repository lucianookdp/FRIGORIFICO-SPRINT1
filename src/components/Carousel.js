import React from "react";
// Importação dos componentes e módulos necessários do Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importação das folhas de estilo do Swiper e estilos personalizados
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Carousel.css";

// Importação das imagens que serão exibidas no carrossel
import img1 from "../assets/images/carne1.jpg";
import img2 from "../assets/images/carne2.jpg";
import img3 from "../assets/images/carne3.jpg";
import img4 from "../assets/images/carne4.jpg";
import img5 from "../assets/images/carne5.jpg";
import img6 from "../assets/images/carne6.jpg";

// Componente Carousel usando Swiper para criar o carrossel de imagens
const Carousel = () => {
  return (
    <section className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Ativa navegação, paginação e autoplay
        spaceBetween={10} // Espaçamento entre slides
        slidesPerView={1} // Quantidade de slides visíveis por vez
        navigation // Habilita setas de navegação
        pagination={{ clickable: true }} // Paginação clicável
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Slide automático a cada 3 segundos
        loop={true} // Faz o carrossel rodar em loop infinito
      >
        {/* Slides individuais com imagens e descrições alternativas */}
        <SwiperSlide><img src={img1} alt="Carne 1" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="Carne 2" /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="Carne 3" /></SwiperSlide>
        <SwiperSlide><img src={img4} alt="Carne 4" /></SwiperSlide>
        <SwiperSlide><img src={img5} alt="Carne 5" /></SwiperSlide>
        <SwiperSlide><img src={img6} alt="Carne 6" /></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Carousel;