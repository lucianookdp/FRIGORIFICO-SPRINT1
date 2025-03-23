import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Informações de contato */}
        <div className="footer-info">
          <h3>Contato</h3>
          <p>
            <FaMapMarkerAlt className="icon" />
            Frigorífico Padilha, Guarapuava - PR
          </p>
          <p>
            <FaPhone className="icon" />
            (42) 3623-6627
          </p>

          <div className="footer-social-buttons">
            <a
              href="https://www.facebook.com/padilha.duda.frigorificoltda/?locale=pt_BR"
              className="social-button facebook"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/frigorificopadilha/"
              className="social-button instagram"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/5542991121372?text=Ol%C3%A1%2C%20vim%20pelo%20site!%20Poderia%20me%20ajudar%3F"
              className="social-button whatsapp"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Mapa incorporado */}
        <div className="footer-map">
          <iframe
            title="Localização Frigorífico Padilha"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.527371420766!2d-51.48202272373365!3d-25.420626532522565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ef4831723fb503%3A0x19c9acfeafec65db!2sFrigorifico%20Padilha!5e0!3m2!1spt-BR!2sbr!4v1741565705934!5m2!1spt-BR!2sbr"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Direitos reservados */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Todos os direitos reservados — Padilha e Duda Frigorífico LTDA
      </div>
    </footer>
  );
};

export default Footer;
