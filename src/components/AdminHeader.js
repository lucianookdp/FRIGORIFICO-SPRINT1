// AdminHeader.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaClipboardList, FaHome } from "react-icons/fa";
import { LuMenu, LuX } from "react-icons/lu";
import logo from "../assets/images/logo.png";
import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleVerLogs = () => {
    navigate("/admin/orcamentos");
    setMenuOpen(false);
  };

  const handleHome = () => {
    navigate("/admin/dashboard");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-logo-container" onClick={handleHome}>
          <img src={logo} alt="Frigorífico Padilha" className="admin-logo" />
        </div>

        <button className="admin-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>

        <nav className={`admin-nav-menu ${menuOpen ? "active" : ""}`}>
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
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
