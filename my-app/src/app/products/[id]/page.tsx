"use client"; // Ensures client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore, useStore } from '@/store/useStore';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === Number(params.id));
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <button onClick={() => router.back()} className="mb-4 text-white flex items-center">
        <ArrowLeft /> Back
      </button>
      <img src={product.image} alt={product.name} className="w-full rounded-lg" />
      <h1 className="text-xl font-bold mt-2">{product.name}</h1>
      <p className="text-yellow-400">⭐ {product.rating}</p>
      <p>{product.desc}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <div className="flex items-center mt-4">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 bg-gray-700 rounded-full">
          <Minus />
        </button>
        <span className="mx-4">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="p-2 bg-gray-700 rounded-full">
          <Plus />
        </button>
      </div>
      <button
        onClick={() => {
          addToCart({ ...product, quantity });
          toast.success("Added to cart");
        }}
        className="mt-4 bg-yellow-500 p-2 rounded-lg w-full"
      >
        Add to cart
      </button>
    </div>
  );
}
