export interface Brand {
  id: number;
  name: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Product {
    id: number;
    brand: Brand;
    category: Category;
    name: string;
    description: string;
    price: number;
    image?: string;
    stock: number;
    created_at: string;
    created_by: number;
}


export interface Customer {
  id?: number;
  customer_type: string,
  first_name: string;
  last_name: string;
  company_name?: string,
  identification_type: string;
  identification_number: string;
  phone: string,
  email: string;
  created_at?: string;
  seller?: number;
}