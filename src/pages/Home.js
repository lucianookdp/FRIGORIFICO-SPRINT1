import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../styles/Banner.css";
import "../styles/Home.css";
import "../styles/Carousel.css";
import "../styles/Destaques.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import api, { API_BASE } from "../api/api";

import bannerImage from "../assets/images/banner.png";
import bannerMobile from "../assets/images/banner2.png";

// no bannerImage, tirar o 'Produtos de Guarapuava'

const Home = () => {
  const [destaques, setDestaques] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDestaques = async () => {
      try {
        const response = await api.get("/produtos/destaques");
        setDestaques(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos em destaque:", error);
      }
    };

    carregarDestaques();
  }, []);

  return (
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

      {/* Destaques */}
      <section className="destaques">
        <h2>
          <FaArrowRight className="icon" /> Produtos em Destaque
        </h2>

        <div className="produtos-grid">
          {destaques.length > 0 ? (
            destaques.map((produto) => (
              <div
                className="produto-card"
                key={produto.id}
                onClick={() => navigate("/orcamento")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`${API_BASE}${produto.foto}`}
                  alt={produto.titulo}
                  className="imagem-produto"
                />
                <div className="info-produto">
                  <h3>{produto.titulo}</h3>
                  <p className="descricao">{produto.descricao}</p>
                  <span className="preco">
                    {Number(produto.valorKg).toFixed(2)} R$/kg
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ marginTop: "20px", color: "#666" }}>
              Nenhum produto em destaque no momento.
            </p>
          )}
        </div>
      </section>

      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
