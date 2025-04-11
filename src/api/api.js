import axios from "axios";

// Base da API e das imagens
const API_BASE = "https://backendfrigorifico-production.up.railway.app";
const API_URL = `${API_BASE}/api`;

// Instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {},
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função de login do administrador
const loginAdmin = async (email, senha) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao fazer login:", error);

    const message =
      error?.response?.data?.message ||
      (error?.response?.status === 401
        ? "Não autorizado. Verifique suas credenciais."
        : error?.message || "Erro ao conectar com o servidor.");

    return {
      success: false,
      message,
    };
  }
};

// Exportações
export default api;
export { API_URL, API_BASE, loginAdmin };
