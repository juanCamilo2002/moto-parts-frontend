import api from "@/api/axios";


export const cartServices = {
  getCartCurrentCustomer: async (customerId: number) => {
    const res = await api.get(`/orders/carts/current/${customerId}/`);
    return res.data;
  },
  checkout: async (cartId: number) => {
    const res = await api.post(`/orders/carts/${cartId}/checkout/`);
    return res.data;
  },

  addItem: async (cartId: number, productId: number, quantity: number) => {
    const res = await api.post(`/orders/carts/${cartId}/add-item/`, {
      product_id: productId,
      quantity,
    });
    return res.data;
  }
  
};
