import React, { useEffect, useState } from "react";
import { FaPlus, FaClipboardList, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../components/AdminHeader";
import API_URL from "../api/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoProduto, setNovoProduto] = useState({ descricao: "", valorKg: "" });

  // Buscar produtos
  const buscarProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/produtos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProdutos(data);
      } else {
        setErro(data.message || "Erro ao carregar produtos.");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setErro("Erro na conexão com o servidor.");
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Lidar com alterações nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar novo produto
  const adicionarProduto = async () => {
    if (!novoProduto.descricao || !novoProduto.valorKg) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const produtoData = {
      descricao: novoProduto.descricao,
      valorKg: novoProduto.valorKg,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoData),
      });

      const data = await response.json();

      if (response.ok) {
        setNovoProduto({ descricao: "", valorKg: "" });
        setMostrarFormulario(false);
        buscarProdutos();  // Recarrega a lista de produtos
      } else {
        alert(data.message || "Erro ao adicionar produto.");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Remover produto
  const removerProduto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        buscarProdutos(); 
      } else {
        alert("Erro ao remover produto.");
      }
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  // Ver logs
  const verLogs = () => {
    window.location.href = "/admin/orcamentos";
  };

  return (
    <>
      <AdminHeader onLogout={() => window.location.href = "/"} />
      <div className="produtos-container" style={{ paddingTop: "140px" }}>
        <div className="topo-painel">
          <button className="btn-adicionar" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            <FaPlus /> {mostrarFormulario ? "Cancelar" : "Adicionar Novo Produto"}
          </button>
          <button className="btn-logs" onClick={verLogs}>
            <FaClipboardList /> Ver Logs de Orçamentos
          </button>
        </div>

        {mostrarFormulario && (
          <div className="formulario-produto">
            <input
              type="text"
              name="descricao"
              placeholder="Descrição do Produto"
              value={novoProduto.descricao}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="valorKg"
              placeholder="Valor por Kg"
              value={novoProduto.valorKg}
              onChange={handleInputChange}
            />
            <button onClick={adicionarProduto} className="btn-adicionar">
              <FaPlus /> Salvar Produto
            </button>
          </div>
        )}

        {erro && <p className="erro" style={{ textAlign: "center", color: "red" }}>{erro}</p>}

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>IMG</th>
              <th>DESCRIÇÃO</th>
              <th>VALOR (kg)</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td data-label="Imagem">
                  <img src={p.foto} alt="Produto" className="imagem-produto" />
                </td>
                <td data-label="Descrição">{p.descricao}</td>
                <td data-label="Valor">{Number(p.valorKg).toFixed(2)} R$</td>
                <td data-label="Ação">
                  <button className="btn-editar" onClick={() => alert("Em breve")}>
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
