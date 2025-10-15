import api from "@/api/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post("/auth/token/", { email, password });
    return res.data;
  },

  register: async (email: string, password: string) => {
    const res = await api.post("/auth/register/", { email, password });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get("/auth/me/");
    return res.data;
  },

  logout: async () => {
    const refresh = localStorage.getItem("refresh");
    await api.post("/auth/logout/", { refresh });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};
