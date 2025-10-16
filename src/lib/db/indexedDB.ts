import Dexie, { Table } from 'dexie'

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  brand: string
  imageUrl?: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address?: string
}

export interface CartItem {
  id?: number
  productId: number
  quantity: number
  clientId: number
}

export interface Order {
  id?: number
  clientId: number
  items: CartItem[]
  status: 'pending' | 'processing' | 'completed'
  createdAt: string
}

class MotoPartsDB extends Dexie {
  products!: Table<Product, number>
  customers!: Table<Customer, number>
  cartItems!: Table<CartItem, number>
  orders!: Table<Order, number>

  constructor() {
    super('MotoPartsDB')
    this.version(1).stores({
      products: '++id, name, brand, category',
      customers: '++id, name, email',
      cartItems: '++id, productId, clientId',
      orders: '++id, clientId, status'
    })
  }
}

export const db = new MotoPartsDB()
