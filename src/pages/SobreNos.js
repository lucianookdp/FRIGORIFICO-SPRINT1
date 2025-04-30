import React from "react";
import {
  FaInfoCircle,
  FaRegBuilding,
  FaTools,
  FaBoxOpen,
  FaHandshake,
  FaAward,
  FaBullseye,
  FaHeart,
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

      <div className="sobre-bloco">
        <FaRegBuilding className="bloco-icon" />
        <p>
          Fundado em 2000 na cidade de Guarapuava, o <strong>Frigorífico Padilha</strong> nasceu com o propósito de oferecer o que há de melhor em carnes bovinas, suínas e de aves. Desde o início, construímos uma trajetória baseada em seriedade, responsabilidade e respeito com clientes, parceiros e colaboradores.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaTools className="bloco-icon" />
        <p>
          Investimos constantemente em infraestrutura, tecnologia e capacitação de equipe. Contamos com instalações modernas, equipamentos de última geração e um rigoroso controle de qualidade, garantindo produtos sempre frescos e seguros em todas as etapas do processo.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaBoxOpen className="bloco-icon" />
        <p>
          Nosso portfólio é amplo e diversificado, desde cortes tradicionais até linhas especiais. Oferecemos linguiças defumadas, carnes para churrasco e opções práticas para o dia a dia, sempre com foco em sabor, praticidade e qualidade.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaBullseye className="bloco-icon" />
        <p>
          <strong>Missão:</strong> Proporcionar alimentos de qualidade com excelência no atendimento, prezando pela segurança alimentar, respeito aos clientes e compromisso com a sustentabilidade e o bem-estar social.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaHeart className="bloco-icon" />
        <p>
          <strong>Valores:</strong> Honestidade, responsabilidade, qualidade, inovação, respeito às pessoas e paixão pelo que fazemos. Acreditamos na força do trabalho em equipe e no compromisso com a satisfação de nossos clientes.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaHandshake className="bloco-icon" />
        <p>
          Somos uma empresa familiar com valores sólidos. Prezamos pelo atendimento próximo e transparente, mantendo viva a essência do interior: trabalhar com honestidade, respeito e dedicação. Mais do que vender carne, levamos tradição, confiança e sabor para a mesa dos nossos clientes.
        </p>
      </div>

      <div className="sobre-bloco">
        <FaAward className="bloco-icon" />
        <p>
          Ao longo dos anos, conquistamos reconhecimento pela nossa qualidade e comprometimento. E seguimos olhando para o futuro, sempre atentos às necessidades do mercado e dispostos a inovar — sem jamais abrir mão daquilo que nos torna únicos: a paixão por oferecer excelência em cada detalhe.
        </p>
      </div>
    </section>

    <Footer />
  </div>
);

export default SobreNos;
