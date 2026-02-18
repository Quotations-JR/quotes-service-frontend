import api from "./api";

export const authService = {
  // Llama al backend cuando existe en firebase. Registra en la DB
  syncUser: async () => {
    const response = await api.post("/auth/sync");
    return response.data;
  },
  
  // Obtener perfil
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  }
};