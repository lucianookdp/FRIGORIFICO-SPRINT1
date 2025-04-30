import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Ajuda.css";

import { FiPhone, FiMail, FiMessageCircle } from "react-icons/fi"; // Ícones modernos

function Ajuda() {
  return (
    <>
      <Header />

      <main className="ajuda-container">
        <h1 className="ajuda-titulo">Central de Suporte e Contato</h1>
        <p className="ajuda-subtitulo">
          Estamos aqui para te ajudar. Confira abaixo as dúvidas frequentes ou entre em contato com nossa equipe.
        </p>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Perguntas Frequentes</h2>

          <div className="faq-item">
            <h3 className="faq-pergunta">Como faço para solicitar um orçamento?</h3>
            <p className="faq-resposta">
              Acesse a página de catálogo, selecione os cortes desejados e clique em "Solicitar Orçamento". Você pode enviar pelo WhatsApp.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">O site mostra preços atualizados?</h3>
            <p className="faq-resposta">
              Os valores exibidos são aproximados. Para valores corretos, entre em contato conosco.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Quais são as formas de contato?</h3>
            <p className="faq-resposta">
              Você pode falar com a gente pelo WhatsApp, telefone fixo, e-mail ou formulário de contato.
            </p>
          </div>
        </section>

        {/* Contato */}
        <section className="contato-section">
          <h2>Fale com a gente</h2>
          <h3>Se sua dúvida não foi resolvida, entre em contato conosco diretamente:</h3>
          <ul>
            <li>
              <FiPhone className="icon" /> <strong>Telefone:</strong>&nbsp; (42) 3623-6627
            </li>
            <li>
              <FiMessageCircle className="icon" /> <strong>WhatsApp:</strong>{" "}
              <a href="https://wa.me/554212345678" target="_blank" rel="noopener noreferrer">
              &nbsp;Clique aqui para nos chamar
              </a>
            </li>
            <li>
              <FiMail className="icon" /><strong>E-mail:</strong>&nbsp;padilha.dudafrigorificoltda@hotmail.com
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Ajuda;
