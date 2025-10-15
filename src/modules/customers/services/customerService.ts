import api from "@/api/axios";
import { Customer, Product } from "@/types";

const baseUrl = '/customers/';

export const customerService = {
  getAll: async () => {
    const res = await api.get(baseUrl);
    return res.data;
  },

  getOne: async (id:number) => {
    const res = await api.get(baseUrl + id);
    return res.data;
  },

  create: async (data: Customer) => {
    const res = await api.post(baseUrl, data);
    return res.data;
  },

  update: async (data: Customer) => {
    const res = await api.patch(baseUrl, data);
    return res.data
  },

  delete: async (id: number) => {
    await api.delete(baseUrl + id,);
  }
};
