import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaBook,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Frigorífico Padilha" className="logo" />
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <ul>
            <li>
              <Link to="/">
                <FaHome /> <span>Início</span>
              </Link>
            </li>
            <li>
              <Link to="/sobre-nos">
                <FaInfoCircle /> <span>Sobre Nós</span>
              </Link>
            </li>
            <li>
              <Link to="/catalogo">
                <FaBook /> <span>Catálogo</span>
              </Link>
            </li>
            <li>
              <Link to="/ajuda">
                <FaQuestionCircle /> <span>Ajuda</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
