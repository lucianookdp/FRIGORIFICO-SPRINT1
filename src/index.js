import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Importação do CSS global
import App from './App'; // Importação do componente principal
import reportWebVitals from './reportWebVitals'; // Ferramenta para medir performance

// Cria a raiz do React vinculada ao elemento com o ID 'root' no HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal da aplicação em modo estrito (StrictMode)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ativa relatório de métricas e performance
reportWebVitals();