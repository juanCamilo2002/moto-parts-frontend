# 🏍️ MotoParts — PWA con Next.js 15

MotoParts es una aplicación web progresiva (PWA) desarrollada con **Next.js 15**, que permite gestionar productos, clientes, carritos y órdenes de venta.  
Está pensada para funcionar tanto **online como offline**, utilizando **IndexedDB** como almacenamiento local para productos.

---

## 🚀 Características principales

- 🔐 **Autenticación JWT** con refresh token (conectada a backend Django)
- 🧱 **Arquitectura modular** (módulos de auth, products, cart, orders, etc.)
- 💾 **Modo offline** con cache en IndexedDB mediante **Dexie.js**
- 🛒 **Gestión de carrito y órdenes** por cliente
- 🧠 **Zustand** para manejo de estado global
- 🌐 **Axios** con interceptores para control de tokens
- 🎨 **Material UI (MUI)** para la interfaz
- 📱 **PWA** instalable (manifest.json + service worker)
- ⚙️ **Next.js App Router** (estructura moderna y optimizada)

---

## 🧩 Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| [Next.js 15](https://nextjs.org/) | Framework base del frontend |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Zustand](https://zustand-demo.pmnd.rs/) | Estado global ligero |
| [Axios](https://axios-http.com/) | Cliente HTTP con interceptores JWT |
| [Dexie.js](https://dexie.org/) | Wrapper para IndexedDB (cache local) |
| [Material UI](https://mui.com/) | Componentes visuales |
| [PWA APIs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) | Soporte instalable y modo offline |

---

## ⚙️ Configuración del entorno

### 1️⃣ Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 2️⃣ Instalación de dependencias
```bash
npm run dev
# o
yarn dev
```
Luego abre http://localhost:3000 en tu navegador.

### 4️⃣ Compilar para producción
```bash
npm run build
npm run start
```

## 📦 Estructura del proyecto

```bash
src/
 ├── api/axios.ts                # Configuración de Axios + interceptores
 ├── app/                        # App Router (Next.js 15)
 ├── modules/
 │   ├── auth/                   # Módulo de autenticación
 │   ├── products/               # Módulo de productos
 │   ├── cart/                   # Módulo de carritos
 │   └── orders/                 # Módulo de órdenes
 ├── lib/
 │   ├── db/indexedDB.ts         # Configuración de Dexie
 │   └── services/productsOffline.ts # Cache offline de 
 ├── types/                      # Tipos globales (Product, Cart, Order, etc.)
 └── public/                     # Imágenes e íconos PWA

```

## 👨‍💻 Autor
Juan Camilo Ordoñez Morea

Desarrollador Backend — Python / Django / Node.js

📧 juan.ordonez.dev@gmail.com

🌐  [LinkedIn](www.linkedin.com/in/juancamiloordonezmorea-desarrolladorfullstack)