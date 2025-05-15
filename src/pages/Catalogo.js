import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filtros from "../components/Filtros";
import api, { API_BASE } from "../api/api";
import "../styles/Catalogo.css";

const Catalogo = () => {
  const [destaques, setDestaques] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [baseFrigorifico, setBaseFrigorifico] = useState([]);
  const [baseAcougue, setBaseAcougue] = useState([]);
  const [frigorificoFiltrados, setFrigorificoFiltrados] = useState([]);
  const [acougueFiltrados, setAcougueFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    const carregarDados = async () => {
      setLoading(true);

      try {
        const [resDestaques, resTodos] = await Promise.all([
          api.get("/produtos/destaques"),
          api.get("/produtos"),
        ]);

        if (cancelado) return;

        const todos = resTodos.data;
        const frigorifico = todos.filter((p) => p.local === "Frigorifico");
        const acougue = todos.filter((p) => p.local === "Acougue");

        setProdutos(todos);
        setDestaques(resDestaques.data);
        setBaseFrigorifico(frigorifico);
        setFrigorificoFiltrados(frigorifico);
        setBaseAcougue(acougue);
        setAcougueFiltrados(acougue);

        setTimeout(() => {
          if (!cancelado) setLoading(false);
        }, 400);
      } catch (error) {
        if (!cancelado) {
          console.error("Erro ao carregar catálogo:", error);
          setLoading(false);
        }
      }
    };

    carregarDados();

    return () => {
      cancelado = true;
    };
  }, []);

  const renderCard = (produto) => (
    <div className="produto-card" key={produto.id}>
      <img
        src={`${API_BASE}${produto.foto}`}
        alt={produto.titulo}
        className="imagem-produto"
      />
      <div className="info-produto">
        <h3>{produto.titulo}</h3>
        <p className="descricao">{produto.descricao}</p>
        <span className="preco">{Number(produto.valorKg).toFixed(2)} R$/kg</span>
      </div>
    </div>
  );

  return (
    <div>
      <Header />

      <section className="catalogo">
        {loading ? (
          <div className="carregando">
            <p>Carregando catálogo...</p>
          </div>
        ) : (
          <>
            {/* Destaques */}
            <h1>Produtos em Destaque</h1>
            <div className="produtos-grid">
              {destaques.length > 0 ? (
                destaques.map(renderCard)
              ) : (
                <p style={{ marginTop: "20px", color: "#666" }}>
                  Nenhum produto em destaque no momento.
                </p>
              )}
            </div>

            {/* Produtos Frigorifico */}
            <h2>Frigorífico</h2>
            <div className="linha-filtros">
              <Filtros
                key="filtro-frigorifico"
                produtos={baseFrigorifico}
                onFiltroAtualizado={setFrigorificoFiltrados}
                classeExtra="filtros-catalogo"
              />
            </div>
            <div className="produtos-grid">
              {frigorificoFiltrados.length > 0 ? (
                frigorificoFiltrados.map(renderCard)
              ) : (
                <p style={{ marginTop: "20px", color: "#666" }}>
                  Nenhum produto do frigorífico encontrado.
                </p>
              )}
            </div>

            {/* Produtos Açougue */}
            <h2>Açougue</h2>
            <div className="linha-filtros">
              <Filtros
                key="filtro-acougue"
                produtos={baseAcougue}
                onFiltroAtualizado={setAcougueFiltrados}
                classeExtra="filtros-catalogo"
              />
            </div>
            <div className="produtos-grid">
              {acougueFiltrados.length > 0 ? (
                acougueFiltrados.map(renderCard)
              ) : (
                <p style={{ marginTop: "20px", color: "#666" }}>
                  Nenhum produto do açougue encontrado.
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Catalogo;
