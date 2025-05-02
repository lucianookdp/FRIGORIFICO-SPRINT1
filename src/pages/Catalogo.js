import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filtros from "../components/Filtros"; // Importando o componente de filtros
import api, { API_BASE } from "../api/api";
import "../styles/Catalogo.css";

const Catalogo = () => {
  const [destaques, setDestaques] = useState([]);
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resDestaques = await api.get("/produtos/destaques");
        const resTodos = await api.get("/produtos");

        setDestaques(resDestaques.data);
        setTodosProdutos(resTodos.data);
        setProdutosFiltrados(resTodos.data); // Inicializa filtrados também
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      }
    };

    carregarDados();
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
        <span className="preco">
          {Number(produto.valorKg).toFixed(2)} R$/kg
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Header />

      <section className="catalogo">
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

        {/* Todos os produtos */}
        <h2>Todos os Produtos</h2>

        {/* Agora a filtragem vem logo abaixo do título */}
        <div className="linha-filtros">
          <Filtros
            produtos={todosProdutos}
            onFiltroAtualizado={setProdutosFiltrados}
            classeExtra="filtros-catalogo"
          />
        </div>

        <div className="produtos-grid">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map(renderCard)
          ) : (
            <p style={{ marginTop: "20px", color: "#666" }}>
              Nenhum produto encontrado.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogo;
