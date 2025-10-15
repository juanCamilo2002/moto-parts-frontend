import { Cart } from "@/types";
import { create } from "zustand";
import { cartServices } from "../services/cartServices";
import { enqueueSnackbar } from "notistack";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  fetchCart: (customerId: number) => Promise<void>;
  checkout: (cartId: number) => Promise<void>;
  addItemToCart: (cartId: number, productId: number, quantity: number) => Promise<void>;
  addProduct: (customerId: number, productId: number, quantity: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,

  fetchCart: async (customerId: number) => {
    set({ loading: true });
    try {
      const data = await cartServices.getCartCurrentCustomer(customerId);
      set({ cart: data });
    } catch (error) {
      console.error("Error al obtener carrito:", error);
    } finally {
      set({ loading: false });
    }
  },
  checkout: async (cartId: number) => {
    const { cart} = get();
    if (cart?.items_detail.length === 0) {
      enqueueSnackbar("El carrito está vacío", { variant: "warning" });
      return;
    }
    try {
      await cartServices.checkout(cartId);
      set({ cart: null });
      enqueueSnackbar("Pedido creado exitosamente ✅", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error al crear el pedido", { variant: "error" });
      console.error("Error al hacer checkout:", error);
    }
  },
  addItemToCart: async (cartId: number, productId: number, quantity: number) => {
    try {
      const data = await cartServices.addItem(cartId, productId, quantity);
      set({ cart: data })
    } catch (error) {
      console.error("Error al agregar producto:", error)
    }
  },

  addProduct: async (customerId: number, productId: number, quantity = 1) => {
    try {
      let cartData = get().cart;

      if (!cartData) {
        cartData = await cartServices.getCartCurrentCustomer(customerId);
        set({ cart: cartData });
      }

      if (!cartData) {
        throw new Error("No se pudo obtener o crear el carrito.");
      }

      const updatedCart = await cartServices.addItem(cartData.id, productId, quantity);
      set({ cart: updatedCart });
      enqueueSnackbar("Producto agregado al carrito 🛒", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error al agregar producto al carrito", { variant: "error" });
      console.error("Error al agregar producto al carrito:", error);
    }
  }
}));