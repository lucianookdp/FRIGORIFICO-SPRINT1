import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuInfo,
  LuBookOpenText,
  LuCircleHelp,
  LuMenu,
  LuX,
} from "react-icons/lu";
import { MdHome } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Frigorífico Padilha" className="logo" />
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <LuX /> : <LuMenu />}
        </button>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">
                <MdHome className="icon" /> <span>Início</span>
              </Link>
            </li>
            <li>
              <Link to="/sobre-nos">
                <LuInfo className="icon" /> <span>Sobre Nós</span>
              </Link>
            </li>
            <li>
              <Link to="/catalogo">
                <LuBookOpenText className="icon" /> <span>Catálogo</span>
              </Link>
            </li>
            <li>
              <Link to="/orcamento">
                <FaClipboardList className="icon" /> <span>Orçamento</span>
              </Link>
            </li>
            <li>
              <Link to="/ajuda">
                <LuCircleHelp className="icon" /> <span>Ajuda</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
