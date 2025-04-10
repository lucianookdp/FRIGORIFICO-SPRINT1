import API_URL from "./api";

export async function loginAdmin(email, senha) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}
