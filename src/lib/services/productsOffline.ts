import { openDB } from 'idb';
import { Product } from '@/types';

const DB_NAME = 'moto_parts_db';
const STORE_NAME = 'products';

export const ProductsOfflineService = {
  async getDB() {
    return await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  },

  async saveAll(products: Product[]) {
    const db = await this.getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    for (const product of products) {
      await store.put(product);
    }

    await tx.done;
  },

  async getAll(): Promise<Product[]> {
    const db = await this.getDB();
    return await db.getAll(STORE_NAME);
  },
};
