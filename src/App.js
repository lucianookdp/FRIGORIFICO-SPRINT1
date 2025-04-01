import React from "react";
// Importação dos componentes necessários para criação das rotas
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação das páginas (componentes) usadas nas rotas
import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";

// Componente principal da aplicação onde as rotas são configuradas
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página inicial */}
        <Route path="/" element={<Home />} />

        {/* Rota para a página "Sobre Nós" */}
        <Route path="/sobre-nos" element={<SobreNos />} />
      </Routes>
    </Router>
  );
};

export default App;