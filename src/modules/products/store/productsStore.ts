import { create } from "zustand";
import { Product } from "@/types";
import { productsService } from "../services/productsService";
import { loadFromCache, saveToCache } from "@/utils/cache";

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
            set({products: data, loading: false});
            saveToCache("products_cache", data);
        } catch (error) {
            console.warn("Fallo la red, usando cache...");
            const cached = loadFromCache("products_cache");
            if (cached) set({ products: cached });
            set({ loading: false });
        }
    }
}));