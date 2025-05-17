import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VerLogs from "./pages/VerLogs"; 
import Ajuda from "./pages/Ajuda";
import Orcamento from "./pages/Orcamento";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orcamentos" element={<VerLogs />} /> 
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/orcamento" element={<Orcamento />} />
      </Routes>
    </Router>
  );
};

export default App;
