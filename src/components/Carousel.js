import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
  return (
    <section className="sobre-carousel">
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide><img src={img1} alt="Carne 1" /></SwiperSlide>
          <SwiperSlide><img src={img2} alt="Carne 2" /></SwiperSlide>
          <SwiperSlide><img src={img3} alt="Carne 3" /></SwiperSlide>
          <SwiperSlide><img src={img4} alt="Carne 4" /></SwiperSlide>
          <SwiperSlide><img src={img5} alt="Carne 5" /></SwiperSlide>
          <SwiperSlide><img src={img6} alt="Carne 6" /></SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Carousel;
