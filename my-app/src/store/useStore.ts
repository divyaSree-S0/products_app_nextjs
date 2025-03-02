import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  rating: number;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
};

type Category = {
  slug: string;
  name: string;
};

type ProductState = {
  products: Product[];
  categories: Category[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type StoreState = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void; // ✅ Add this function
  removeFromCart: (id: number) => void;
};

export const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));


export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      set({ products: data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  fetchCategories: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
  
      console.log("Fetched Categories:", data); // Debugging
  
      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        return;
      }
  
      let formattedCategories;
  
      if (typeof data[0] === "object") {
        // If API already returns objects, use them directly
        formattedCategories = data;
      } else {
        // Convert string categories to objects
        formattedCategories = data.map((category: string) => ({
          slug: category.toLowerCase().replace(/\s+/g, "-"),
          name: category
        }));
      }
  
      set({ categories: formattedCategories });
  
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  }));

