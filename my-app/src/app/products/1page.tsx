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

type ProductState = {
  products: Product[];
  categories: string[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
};

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
      set({ categories: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  fetchProductsByCategory: async (category) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      set({ products: data.products });
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  }
}));


    

    // import Link from 'next/link';
    // import { useProductStore } from '@/store/useStore';
    
    // export default function Products() {
    //   const { products } = useProductStore();
    
    //   return (
    //     <div className="p-4 bg-black text-white min-h-screen">
    //       <h1 className="text-xl font-bold">Product List</h1>
    //       <div className="grid grid-cols-2 gap-4 mt-4">
    //         {products.map((product) => (
    //           <Link key={product.id} href={`/products/${product.id}`}>
    //             <div className="bg-gray-800 p-4 rounded-xl">
    //               <img src={product.image} alt={product.name} className="w-full rounded-lg" />
    //               <h2 className="text-lg mt-2">{product.name}</h2>
    //               <p className="text-yellow-400">⭐ {product.rating}</p>
    //               <p>${product.price}</p>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // }
