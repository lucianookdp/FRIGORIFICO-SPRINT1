import React from "react";
import {
  FaInfoCircle,
  FaRegBuilding,
  FaTools,
  FaBoxOpen,
  FaBullseye,
  FaHeart,
  FaHandshake,
  FaAward,
} from "react-icons/fa";
import "../styles/SobreNos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SobreNos = () => (
  <div>
    <Header />

    <section className="sobre-nos-container">
      <h1>
        <FaInfoCircle className="icon" /> Sobre Nós
      </h1>

      <div className="divider"></div>

      <div className="sobre-blocos-area">

        {/* Origem */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaRegBuilding className="bloco-icon" />
            <h2>Quem Somos</h2>
          </div>
          <p>
            Fundado em 2000 na cidade de Guarapuava, o <strong>Frigorífico Padilha</strong> nasceu com o propósito de oferecer o que há de melhor em carnes bovinas, suínas e de aves. Desde o início, construímos uma trajetória baseada em seriedade, responsabilidade e respeito com clientes, parceiros e colaboradores.
          </p>
        </div>

        {/* Estrutura */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaTools className="bloco-icon" />
            <h2>Estrutura e Qualidade</h2>
          </div>
          <p>
            Investimos constantemente em infraestrutura, tecnologia e capacitação de equipe. Contamos com instalações modernas, equipamentos de última geração e um rigoroso controle de qualidade, garantindo produtos sempre frescos e seguros em todas as etapas do processo.
          </p>
        </div>

        {/* Produtos */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaBoxOpen className="bloco-icon" />
            <h2>Portfólio de Produtos</h2>
          </div>
          <p>
            Nosso portfólio é amplo e diversificado, desde cortes tradicionais até linhas especiais. Oferecemos linguiças defumadas, carnes para churrasco e opções práticas para o dia a dia, sempre com foco em sabor, praticidade e qualidade.
          </p>
        </div>

        {/* Missão */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaBullseye className="bloco-icon" />
            <h2>Missão</h2>
          </div>
          <p>
            Proporcionar alimentos de qualidade com excelência no atendimento, prezando pela segurança alimentar, respeito aos clientes e compromisso com a sustentabilidade e o bem-estar social.
          </p>
        </div>

        {/* Valores */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaHeart className="bloco-icon" />
            <h2>Valores</h2>
          </div>
          <p>
           Honestidade, responsabilidade, qualidade, inovação, respeito às pessoas e paixão pelo que fazemos. Acreditamos na força do trabalho em equipe e no compromisso com a satisfação de nossos clientes.
          </p>
        </div>

        {/* Empresa Familiar */}
        <div className="sobre-bloco">
          <div className="bloco-header">
            <FaHandshake className="bloco-icon" />
            <h2>Essência Familiar</h2>
          </div>
          <p>
            Somos uma empresa familiar com valores sólidos. Prezamos pelo atendimento próximo e transparente, mantendo viva a essência do interior: trabalhar com honestidade, respeito e dedicação. Mais do que vender carne, levamos tradição, confiança e sabor para a mesa dos nossos clientes.
          </p>
        </div>

      </div>
    </section>

    <Footer />
  </div>
);

export default SobreNos;
