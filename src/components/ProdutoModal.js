// src/components/ProdutoModal.jsx
import React from "react";
import "../styles/ModalAdicionarProduto.css";

const ProdutoModal = ({
  editandoId,
  titulo,
  descricao,
  valorKg,
  setTitulo,
  setDescricao,
  setValorKg,
  setFoto,
  onSalvar,
  onCancelar
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-formulario">
        <h3>{editandoId ? "Editar Produto" : "Novo Produto"}</h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor por Kg"
          min="0"
          value={valorKg}
          onChange={(e) => setValorKg(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
        />
        <button onClick={onSalvar} className="btn-salvar-modal">Salvar</button>
        <button className="btn-cancelar-modal" onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default ProdutoModal;
