import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import api from "../api/api";
import "../styles/VerLogs.css";

const VerLogs = () => {
  const [logs, setLogs] = useState([]);
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/orcamentos", {
          headers: { Authorization: token },
        });
        setLogs(res.data);
      } catch (error) {
        console.error("Erro ao carregar logs:", error);
      }
    };
    fetchLogs();
  }, []);

  const removerOrcamento = async (id) => {
    if (!window.confirm("Deseja mesmo apagar este orçamento?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/orcamentos/${id}`, {
        headers: { Authorization: token },
      });
      setLogs((atual) => atual.filter((o) => o.id !== id));
    } catch (error) {
      alert("Erro ao remover orçamento.");
    }
  };

  const abrirDetalhes = (orcamento) => {
    try {
      const detalhes = JSON.parse(orcamento.itens_detalhados);
      setOrcamentoSelecionado({ ...orcamento, detalhes });
    } catch {
      alert("Não foi possível exibir os produtos.");
    }
  };

  const fecharModal = () => setOrcamentoSelecionado(null);

  return (
    <div>
      <AdminHeader />
      <section className="verlogs-container">
        <h1>Logs de Orçamentos</h1>
        <div className="tabela-logs">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Cidade/UF</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.nome_cliente}</td>
                  <td>{log.email_cliente}</td>
                  <td>{log.local_cliente}</td>
                  <td>{new Date(log.criado_em).toLocaleString()}</td>
                  <td>R$ {Number(log.valor_total).toFixed(2)}</td>
                  <td>
                    <button onClick={() => abrirDetalhes(log)}>Visualizar</button>
                    <button onClick={() => removerOrcamento(log.id)}>Apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {orcamentoSelecionado && (
        <div className="modal-detalhes">
          <div className="modal-conteudo">
            <h2>Produtos do Orçamento</h2>
            {orcamentoSelecionado.detalhes.map((item, index) => (
              <div key={index} className="produto-detalhado">
                <p><strong>Produto:</strong> {item.produto}</p>
                <p><strong>Quantidade:</strong> {item.quantidade}kg</p>
                <p><strong>Valor Unitário:</strong> R$ {item.valor_unitario}</p>
              </div>
            ))}
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default VerLogs;
