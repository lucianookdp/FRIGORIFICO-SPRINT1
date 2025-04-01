import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBook,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  // Estado para controlar abertura/fechamento do menu mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // Alterna visibilidade do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Botão para abrir/fechar menu no mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Logotipo da empresa */}
        <Link to="/" className="logo-container">
          <img src={logo} alt="Frigorífico Padilha" className="logo" />
        </Link>

        {/* Menu de navegação principal */}
        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <ul>
            <li>
              <Link to="/">
                <FaHome className="nav-icon" /> Início
              </Link>
            </li>
            <li>
              <Link to="/sobre-nos">
                <FaInfoCircle className="nav-icon" /> Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/catalogo">
                <FaBook className="nav-icon" /> Catálogo
              </Link>
            </li>
            <li>
              <Link to="/ajuda">
                <FaQuestionCircle className="nav-icon" /> Ajuda
              </Link>
            </li>
          </ul>
        </nav>

        {/* Ícone para login do usuário */}
        <div className="user-login">
          <Link to="/usuario">
            <FaUser className="user-icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;