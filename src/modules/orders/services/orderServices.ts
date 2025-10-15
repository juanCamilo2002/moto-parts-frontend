import api from "@/api/axios";

export const orderServices = {
  getOrders: async () => {
    const res = await api.get("/orders/");
    return res.data;
  },

  updateStatus: async (orderId: number, status: string) => {
    const res = await api.post(`/orders/${orderId}/update-status/`, { status });
    return res.data;
  },
};
