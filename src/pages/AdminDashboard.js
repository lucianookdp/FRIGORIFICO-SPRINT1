// App.js ou AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { FaPlus, FaClipboardList, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../components/AdminHeader";
import API_URL from "../api/api";
import BASE_URL from "../api/baseUrl";
import ProdutoModal from "../components/ProdutoModal";
import "../styles/AdminDashboard.css";
import "../styles/ModalAdicionarProduto.css";

const AdminDashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorKg, setValorKg] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/produtos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setProdutos(data);
      } else {
        setErro(data.message || "Erro ao carregar produtos.");
      }
    } catch (error) {
      setErro("Erro na conexão com o servidor.");
    }
  };

  const salvarProduto = async () => {
    if (!titulo || !descricao || !valorKg || (!foto && !editandoId)) {
      alert("Preencha todos os campos e selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("valorKg", valorKg);
    if (foto) formData.append("foto", foto);

    try {
      const token = localStorage.getItem("token");
      const url = editandoId
        ? `${API_URL}/produtos/${editandoId}`
        : `${API_URL}/produtos`;
      const method = editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        limparFormulario();
        buscarProdutos();
      } else {
        alert(data.message || "Erro ao salvar produto.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const removerProduto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) buscarProdutos();
      else alert("Erro ao remover produto.");
    } catch (error) {
      alert("Erro ao remover produto.");
    }
  };

  const editarProduto = (produto) => {
    setTitulo(produto.titulo);
    setDescricao(produto.descricao);
    setValorKg(produto.valorKg);
    setFoto(null);
    setEditandoId(produto.id);
    setMostrarFormulario(true);
  };

  const limparFormulario = () => {
    setTitulo("");
    setDescricao("");
    setValorKg("");
    setFoto(null);
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  const verLogs = () => {
    window.location.href = "/admin/orcamentos";
  };

  return (
    <>
      <AdminHeader onLogout={() => (window.location.href = "/")} />

      <div className="produtos-container" style={{ paddingTop: "140px" }}>
        <div className="topo-painel">
          <button
            className="btn-adicionar"
            onClick={() => setMostrarFormulario(true)}
          >
            <FaPlus /> Adicionar Novo Produto
          </button>
          <button className="btn-logs" onClick={verLogs}>
            <FaClipboardList /> Ver Logs de Orçamentos
          </button>
        </div>

        {erro && (
          <p className="erro" style={{ textAlign: "center", color: "red" }}>
            {erro}
          </p>
        )}

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>IMG</th>
              <th>TÍTULO</th>
              <th>DESCRIÇÃO</th>
              <th>VALOR (KG)</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={`${BASE_URL}${p.foto}`}
                    alt="Produto"
                    className="imagem-produto"
                  />
                </td>
                <td className="coluna-titulo">{p.titulo}</td>
                <td className="coluna-descricao">{p.descricao}</td>
                <td className="coluna-valor">
                  {Number(p.valorKg).toFixed(2)} R$
                </td>
                <td className="coluna-acoes">
                  <div className="botoes-wrapper">
                    <button
                      className="btn-editar"
                      onClick={() => editarProduto(p)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="btn-remover"
                      onClick={() => removerProduto(p.id)}
                    >
                      <FaTrash /> Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <ProdutoModal
          editandoId={editandoId}
          titulo={titulo}
          descricao={descricao}
          valorKg={valorKg}
          setTitulo={setTitulo}
          setDescricao={setDescricao}
          setValorKg={setValorKg}
          setFoto={setFoto}
          onSalvar={salvarProduto}
          onCancelar={limparFormulario}
        />
      )}
    </>
  );
};

export default AdminDashboard;
