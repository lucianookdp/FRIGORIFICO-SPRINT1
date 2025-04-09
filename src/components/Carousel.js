import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Carousel.css";

import img1 from "../assets/images/carne1.jpg";
import img2 from "../assets/images/carne2.jpg";
import img3 from "../assets/images/carne3.jpg";
import img4 from "../assets/images/carne4.jpg";
import img5 from "../assets/images/carne5.jpg";
import img6 from "../assets/images/carne6.jpg";

const Carousel = () => {
  const swiperRef = useRef(null);

  return (
    <section className="carousel-integrado">
      <div className="carousel-content">
        <h2>Compromisso com a Qualidade</h2>
        <p>
          Aqui no <strong>Frigorífico Padilha</strong>, qualidade significa ir além. Cada corte que oferecemos reflete nossa dedicação em selecionar
          carnes de procedência confiável, com rigor no preparo e respeito à tradição.
        </p>
        <p>
          Nossa missão é simples: entregar produtos frescos, seguros e com o sabor que a sua mesa merece.
        </p>

        <div className="carousel-wrapper-total">
          {/* Setas totalmente fora */}
          <button
            className="carousel-arrow left"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <FaChevronLeft />
          </button>

          <div className="carousel-area">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {[img1, img2, img3, img4, img5, img6].map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Carne ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            className="carousel-arrow right"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="saiba-mais-wrapper">
          <Link to="/sobre-nos" className="saiba-mais-btn">
            Saiba Mais <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
