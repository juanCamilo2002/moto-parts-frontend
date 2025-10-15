import { Customer } from "@/types";
import { create } from "zustand";
import { customerService } from "../services/customerService";


interface CustomerState {
    customers: Customer[];
    activeCustomer: Customer | null;
    loading: boolean;
    fetchCustomers: () => Promise<void>;
    setActiveCustomer: (customer: Customer) => void;
    addCustomer: (client: Customer) => void;
}

export const useCustomersStore = create<CustomerState>((set, get) => ({
    customers: [],
    activeCustomer: null, 
    loading: false,

    fetchCustomers: async () => {
        try {
            const data = await customerService.getAll();
            set({customers: data, loading: false});
        } catch (error) {
            console.error(error);
            set({loading: false})
        }
    },
    setActiveCustomer: (customer) => set({activeCustomer: customer}),
    addCustomer: async (customer) => {
         try {
            const data = await customerService.create(customer);
            set({ customers: [...get().customers, data]})
        } catch (error) {
            console.error(error);
            set({loading: false})
        }
        
    }
}));
