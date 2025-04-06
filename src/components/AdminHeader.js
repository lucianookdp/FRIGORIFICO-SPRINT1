import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout realizado");
    navigate("/");
  };

  return (
    <header className="admin-header">
      {/* Logotipo colado à esquerda */}
      <div className="admin-logo-container" onClick={() => navigate("/admin/dashboard")}>
        <img src={logo} alt="Frigorífico Padilha" className="admin-logo" />
      </div>

      {/* Botão "Sair" colado à direita */}
      <button className="admin-btn-sair" onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
};

export default AdminHeader;
