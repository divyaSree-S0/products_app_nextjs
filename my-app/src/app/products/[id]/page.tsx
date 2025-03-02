"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/useStore";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id.toString() === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  if (!product) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} className="w-full max-h-96 object-cover mt-4 rounded-lg" />
      <p className="text-yellow-400 mt-2">⭐ {product.rating}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}


// "use client"; // Ensures client-side rendering

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useProductStore, useStore } from '@/store/useStore';
// import { toast } from 'react-hot-toast';
// import { ArrowLeft, Plus, Minus } from 'lucide-react';

// export default function ProductDetail({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const { products } = useProductStore();
//   const product = products.find((p) => p.id === Number(params.id));
//   const { addToCart } = useStore();
//   const [quantity, setQuantity] = useState(1);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-4 bg-black text-white min-h-screen">
//       <button onClick={() => router.back()} className="mb-4 text-white flex items-center">
//         <ArrowLeft /> Back
//       </button>
//       <img src={product.image} alt={product.name} className="w-full rounded-lg" />
//       <h1 className="text-xl font-bold mt-2">{product.name}</h1>
//       <p className="text-yellow-400">⭐ {product.rating}</p>
//       <p>{product.desc}</p>
//       <p className="text-lg font-bold">${product.price}</p>
//       <div className="flex items-center mt-4">
//         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 bg-gray-700 rounded-full">
//           <Minus />
//         </button>
//         <span className="mx-4">{quantity}</span>
//         <button onClick={() => setQuantity(quantity + 1)} className="p-2 bg-gray-700 rounded-full">
//           <Plus />
//         </button>
//       </div>
//       <button
//         onClick={() => {
//           addToCart({ ...product, quantity });
//           toast.success("Added to cart");
//         }}
//         className="mt-4 bg-yellow-500 p-2 rounded-lg w-full"
//       >
//         Add to cart
//       </button>
//     </div>
//   );
// }
