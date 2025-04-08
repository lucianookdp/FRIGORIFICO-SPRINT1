import React from "react";
import { FaArrowRight, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../styles/Banner.css";
import "../styles/Home.css";
import "../styles/Carousel.css";
import "../styles/Destaques.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import bannerImage from "../assets/images/banner.png";
import bannerMobile from "../assets/images/banner2.png";

const Home = () => (
  <div>
    <Header />

    <section className="hero-banner">
      <picture>
        <source srcSet={bannerMobile} media="(max-width: 768px)" />
        <img
          src={bannerImage}
          alt="Frigorífico Padilha"
          className="banner-image"
        />
      </picture>
      <div className="banner-divider" />
    </section>

    {/* Seção de qualidade */}
    <section className="sobre-container">
      <div className="sobre-box">
        <h2>Compromisso com a Qualidade</h2>
        <p>
          Aqui no <strong>Frigorífico Padilha</strong>, qualidade significa ir além.
          Cada corte que oferecemos reflete nossa dedicação em selecionar
          carnes de procedência confiável, com rigor no preparo e respeito à tradição.
        </p>
        <p>
          Nossa missão é simples: entregar produtos frescos, seguros e com o
          sabor que a sua mesa merece.
        </p>
      </div>

      <div className="sobre-carousel">
        <Carousel />
      </div>

      <div className="saiba-mais-wrapper abaixo-carousel">
        <Link to="/sobre-nos" className="saiba-mais-btn">
          Saiba Mais <FaArrowRight />
        </Link>
      </div>
    </section>

    {/* Destaques */}
    <section className="destaques">
      <h2>
        <FaArrowRight className="icon" /> Produtos Destaques
      </h2>

      <div className="produtos-grid">
        {[
          ["Picanha Bovina Premium", "R$ 79,90/kg"],
          ["Costela no Bafo", "R$ 59,90/kg"],
          ["Fraldinha Temperada", "R$ 52,90/kg"],
          ["Filé Suíno", "R$ 36,90/kg"],
        ].map(([title, price], index) => (
          <div className="produto-card" key={index}>
            <div className="imagem-fake">
              <FaImage className="icone-imagem" />
            </div>
            <h3>{title}</h3>
            <span className="preco">{price}</span>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
