import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaClipboardList, FaHome } from "react-icons/fa"; // Ícone Home
import logo from "../assets/images/logo.png";
import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleVerLogs = () => {
    navigate("/admin/orcamentos");
  };

  const handleHome = () => {
    navigate("/admin/dashboard");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        {/* Logotipo alinhado à esquerda */}
        <div
          className="admin-logo-container"
          onClick={handleHome}
        >
          <img src={logo} alt="Frigorífico Padilha" className="admin-logo" />
        </div>

        {/* Botões alinhados à direita */}
        <div className="admin-actions">
          <button className="admin-btn-home" onClick={handleHome}>
            <FaHome size={18} />
            Home
          </button>
          <button className="admin-btn-logs" onClick={handleVerLogs}>
            <FaClipboardList size={18} />
            Ver Logs
          </button>
          <button className="admin-btn-sair" onClick={handleLogout}>
            <FiLogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
