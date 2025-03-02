import { create } from "zustand";

type Product = {
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
 type StoreState = {
   cart: CartItem[];
   addToCart: (product: CartItem) => void;
 };

 export const useStore = create<StoreState>((set) => ({
   cart: [],
   addToCart: (product) =>
     set((state) => ({ cart: [...state.cart, product] })),
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


// import { create } from 'zustand';

// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// type StoreState = {
//   cart: CartItem[];
//   addToCart: (product: CartItem) => void;
// };

// export const useStore = create<StoreState>((set) => ({
//   cart: [],
//   addToCart: (product) =>
//     set((state) => ({ cart: [...state.cart, product] })),
// }));

// type ProductState = {
//   products: {
//     id: number;
//     name: string;
//     rating: number;
//     price: number;
//     image: string;
//     desc: string;
//   }[];
// };

// export const useProductStore = create<ProductState>(() => ({
//   products: [
//     {
//       id: 1,
//       name: "Unicorn Sprinkles",
//       rating: 4.0,
//       price: 7.8,
//       image: "/donut1.png",
//       desc: "A fluffy fresh cooked donut covered by a creamy strawberry flavour with rainbow sprinkles.",
//     },
//     {
//       id: 2,
//       name: "Dark Sprinkles",
//       rating: 4.0,
//       price: 6.8,
//       image: "/donut2.png",
//       desc: "Chocolate with sprinkles.",
//     },
//     {
//       id: 1,
//       name: "Unicorn Sprinkles",
//       rating: 4.0,
//       price: 7.8,
//       image: "/donut1.png",
//       desc: "A fluffy fresh cooked donut covered by a creamy strawberry flavour with rainbow sprinkles.",
//     },
//     {
//       id: 2,
//       name: "Dark Sprinkles",
//       rating: 4.0,
//       price: 6.8,
//       image: "/donut2.png",
//       desc: "Chocolate with sprinkles.",
//     },{
//       id: 2,
//       name: "Dark Sprinkles",
//       rating: 4.0,
//       price: 6.8,
//       image: "/donut2.png",
//       desc: "Chocolate with sprinkles.",
//     },
//   ],
// }));
