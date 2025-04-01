import React from "react";
import { FaArrowRight, FaInfoCircle, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

// Importações dos estilos
import "../styles/Banner.css";
import "../styles/Home.css";
import "../styles/Carousel.css";
import "../styles/Destaques.css";

// Importação dos componentes
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

// Importação das imagens usadas no banner
import bannerImage from "../assets/images/banner.png";
import bannerMobile from "../assets/images/banner2.png";

const Home = () => (
  <div>
    <Header />

    {/* Banner principal responsivo */}
    <section className="hero-banner">
      <picture>
        <source srcSet={bannerMobile} media="(max-width: 768px)" />
        <img src={bannerImage} alt="Frigorífico Padilha" className="banner-image" />
      </picture>
    </section>

    {/* Seção de apresentação com texto e carrossel */}
    <section className="sobre-container">
      <div className="sobre-box">
        <h2>
          <FaInfoCircle className="icon" /> Por Que Nos Escolher?
        </h2>
        <p>
          Garantir produtos de qualidade vai muito além de um simples processo.
          Aqui, trabalhamos com dedicação para levar até você cortes selecionados,
          sempre com frescor e procedência confiável.
        </p>
        <Link to="/sobre-nos" className="saiba-mais-btn">
          Saiba Mais <FaArrowRight />
        </Link>
      </div>

      {/* Carrossel de imagens ao lado do texto */}
      <div className="sobre-carousel">
        <Carousel />
      </div>
    </section>

    {/* Seção de produtos em destaque */}
    <section className="destaques">
      <h2>
        <FaArrowRight className="icon" /> Produtos Destaques
      </h2>

      <div className="produtos-grid">
        {/* Cards individuais de produtos */}
        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Picanha Bovina Premium</h3>
          <span className="preco">R$ 79,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Costela no Bafo</h3>
          <span className="preco">R$ 59,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Fraldinha Temperada</h3>
          <span className="preco">R$ 52,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Filé Suíno</h3>
          <span className="preco">R$ 36,90/kg</span>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;