import api from "./api";

export const quotationService = {
  getAll: async (page = 1, limit = 10, search = "") => {
    const response = await api.get("/quotations", {
      params: {
        page,
        limit,
        search
      }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/quotations/${id}`);
    return response.data;
  },

  create: async (quotationData) => {
    const response = await api.post("/quotations", quotationData);
    return response.data;
  },

  update: async (id, quotationData) => {
    const response = await api.put(`/quotations/${id}`, quotationData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/quotations/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/quotations/stats");
    return response.data;
  },
};