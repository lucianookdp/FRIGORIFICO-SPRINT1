import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/AdminLogin.css";
import { loginAdmin } from "../api/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    const result = await loginAdmin(email, senha);

    if (result.success) {
      localStorage.setItem("token", result.token);
      navigate("/admin/dashboard");
    } else {
      if (result.message === "Usuário não encontrado") {
        setErro("E-mail não cadastrado.");
      } else if (result.message === "Senha incorreta") {
        setErro("Senha incorreta.");
      } else {
        setErro(result.message || "Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Área Administrativa</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErro(""); // Limpa mensagem de erro ao digitar
            }}
          />

          <label htmlFor="senha">Senha</label>
          <div className="senha-wrapper">
            <input
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro(""); // Limpa mensagem de erro ao digitar
              }}
            />
            <span
              className="icone-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
