import { create } from "zustand";
import { Product } from "@/types";
import { productsService } from "../services/productsService";

interface ProductsState {
    products: Product[],
    loading: boolean;
    fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
    products: [],
    loading: false, 
    fetchProducts: async () => {
        set({loading: true});
        try {
            const data = await productsService.getAll();
            set({products: data, loading: false})
        } catch (error) {
            console.error(error);
            set({loading: false})
        }
    }
}));