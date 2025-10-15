import { create } from "zustand";
import { orderServices } from '../services/orderServices'
import { Order } from "@/types";
import { enqueueSnackbar } from "notistack";

interface OrderState {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  updateStatus: (orderId: number, status: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const data = await orderServices.getOrders();
      set({ orders: data });
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateStatus: async (orderId, status) => {
    try {
      const updatedOrder = await orderServices.updateStatus(orderId, status);
      set({
        orders: get().orders.map((o) => (o.id === orderId ? updatedOrder : o)),
      });
      enqueueSnackbar("Estado actualizado exitosamente ✅", { variant: "success" });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  },
}));
