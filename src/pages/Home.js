import React from "react";
import { FaArrowRight, FaInfoCircle, FaImage } from "react-icons/fa"; // Adicionado FaImage
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
        <img src={bannerImage} alt="Frigorífico Padilha" className="banner-image" />
      </picture>
    </section>

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
        <p>
          Do campo à sua mesa, cada detalhe importa. Desde a escolha rigorosa das
          carnes até o cuidado na produção, buscamos atender diferentes necessidades,
          seja para o dia a dia ou para ocasiões especiais.
        </p>
        <p>
          Quer saber mais sobre nossa história e o que torna nosso trabalho único?
        </p>
        <Link to="/sobre-nos" className="saiba-mais-btn">
          Saiba Mais <FaArrowRight />
        </Link>
      </div>

      <div className="sobre-carousel">
        <Carousel />
      </div>
    </section>

    <section className="destaques">
      <h2>
        <FaArrowRight className="icon" /> Produtos Destaques
      </h2>

      <div className="produtos-grid">
        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Picanha Bovina Premium</h3>
          <p>Corte nobre, ideal para churrascos. Sabor marcante e maciez incomparável.</p>
          <span className="preco">R$ 79,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Costela no Bafo</h3>
          <p>Costela especial com alto marmoreio, perfeita para longos cozimentos.</p>
          <span className="preco">R$ 59,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Fraldinha Temperada</h3>
          <p>Carne suculenta já temperada, pronta para grelhar ou assar.</p>
          <span className="preco">R$ 52,90/kg</span>
        </div>

        <div className="produto-card">
          <div className="imagem-fake">
            <FaImage className="icone-imagem" />
          </div>
          <h3>Filé Suíno</h3>
          <p>Carne magra e versátil, ideal para receitas do dia a dia com muito sabor.</p>
          <span className="preco">R$ 36,90/kg</span>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;
