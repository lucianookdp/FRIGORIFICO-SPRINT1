import React from "react";
import { FaPlus, FaClipboardList, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../components/AdminHeader";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const produtos = [
    {
      id: 1,
      nome: "Alcatra",
      descricao: "Corte bovino macio e saboroso, perfeito para grelhar ou assar.",
      imagem: "/assets/images/alcatra.jpg",
    },
    {
      id: 2,
      nome: "Pernil",
      descricao: "Carne suína suculenta da perna do porco, ideal para assados e festas.",
      imagem: "/assets/images/pernil.jpg",
    },
    {
      id: 3,
      nome: "Carne Moída",
      descricao: "Versátil e prática, usada em hambúrgueres, molhos e recheios.",
      imagem: "/assets/images/moida.jpg",
    },
  ];

  const editarProduto = (id) => {
    console.log("Editar produto:", id);
  };

  const removerProduto = (id) => {
    console.log("Remover produto:", id);
  };

  const adicionarProduto = () => {
    console.log("Abrir modal ou redirecionar para cadastro");
  };

  const verLogs = () => {
    window.location.href = "/admin/orcamentos";
  };

  return (
    <>
      <AdminHeader />
      <div className="produtos-container" style={{ paddingTop: "140px" }}>
        <div className="topo-painel">
          <button className="btn-adicionar" onClick={adicionarProduto}>
            <FaPlus /> Adicionar Novo Produto
          </button>
          <button className="btn-logs" onClick={verLogs}>
            <FaClipboardList /> Ver Logs de Orçamentos
          </button>
        </div>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>IMG</th>
              <th>PRODUTO</th>
              <th>DESCRIÇÃO</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td data-label="Imagem">
                  <img src={p.imagem} alt={p.nome} className="imagem-produto" />
                </td>
                <td data-label="Produto">{p.nome}</td>
                <td data-label="Descrição">{p.descricao}</td>
                <td data-label="Ação">
                  <button className="btn-editar" onClick={() => editarProduto(p.id)}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn-remover" onClick={() => removerProduto(p.id)}>
                    <FaTrash /> Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
