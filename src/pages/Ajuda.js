import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Ajuda.css";
import { FiPhone, FiMessageCircle } from "react-icons/fi"; // Retirei o FiMail

function Ajuda() {
  return (
    <>
      <Header />

      <main className="ajuda-container">
        <h1 className="ajuda-titulo">Central de Atendimento</h1>
        <p className="ajuda-subtitulo">
          Tire suas dúvidas ou entre em contato direto com nossa equipe especializada.
        </p>

        {/* Perguntas Frequentes */}
        <section className="faq-section">
          <h2>Perguntas Frequentes</h2>

          <div className="faq-item">
            <h3 className="faq-pergunta">Como solicitar um orçamento de carnes específicas?</h3>
            <p className="faq-resposta">
              Acesse o nosso catálogo de produtos, selecione os cortes desejados e clique em "Solicitar Orçamento". Você será direcionado para envio pelo WhatsApp.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Quais cortes de carne estão disponíveis?</h3>
            <p className="faq-resposta">
              Trabalhamos com uma variedade de cortes bovinos, suínos e especiais. No catálogo, você encontra fotos, descrições e informações de cada produto.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Vocês vendem para pessoa física ou apenas para empresas?</h3>
            <p className="faq-resposta">
              Atendemos tanto pessoa física quanto empresas, restaurantes, mercados e açougues. Consulte condições especiais para compras em maior volume.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Posso retirar minha compra diretamente no frigorífico?</h3>
            <p className="faq-resposta">
              Sim. Após confirmação do pedido, disponibilizamos retirada diretamente no nosso endereço ou envio conforme combinado.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Como funciona a validade e o armazenamento das carnes?</h3>
            <p className="faq-resposta">
              Nossas carnes seguem rigorosos padrões de qualidade e armazenamento. As informações sobre validade e conservação acompanham o pedido.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Quais são as formas de pagamento aceitas?</h3>
            <p className="faq-resposta">
              Aceitamos pagamento via transferência bancária, PIX e outras modalidades. Consulte nossa equipe para confirmar as opções disponíveis.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-pergunta">Vocês fazem entrega para outras cidades?</h3>
            <p className="faq-resposta">
              Entregamos em Guarapuava e região. Para outras localidades, consulte disponibilidade e valores adicionais.
            </p>
          </div>
        </section>

        {/* Contato Direto */}
        <section className="contato-section">
          <h2>Fale Conosco</h2>
          <h3>Entre em contato da forma que preferir:</h3>

          <div className="contato-cards">
            <div className="contato-card">
              <FiPhone className="icon" />
              <strong>Telefone</strong>
              <p>Atendimento de segunda a sábado, em horário comercial.</p>
              <a href="tel:+554236236627">(42) 3623-6627</a>
            </div>

            <div className="contato-card">
              <FiMessageCircle className="icon" />
              <strong>WhatsApp</strong>
              <p>Envie sua dúvida ou orçamento rapidamente pelo nosso WhatsApp.</p>
              <a href="https://wa.me/554236236627" target="_blank" rel="noopener noreferrer">
                Conversar Agora
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Ajuda;
