"use client";
import { useParams, useRouter } from "next/navigation";
import { useStore, useProductStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft } from "lucide-react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { products } = useProductStore();
  const { cart, addToCart, updateQuantity, removeFromCart } = useStore();
  const [product, setProduct] = useState(null);

  // Find the product
  useEffect(() => {
    if (params?.id) {
      const foundProduct = products.find((p) => p.id === Number(params.id));
      setProduct(foundProduct);
    }
  }, [params?.id, products]);

  if (!product) return <p className="text-white">Loading...</p>;

  // Get product quantity in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!cartItem) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.thumbnail,
      });
      toast.success("Added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  // Handle Quantity Change
  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="bg-[#1f1f1f] relative min-h-screen text-white">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="text-white px-4 py-2 rounded-lg font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-2xl mx-auto p-6 pb-20"> {/* Added bottom padding */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full min-h-max object-cover rounded-lg"
        />
        <div className="flex ">
          <h2 className="text-3xl font-bold flex">{product.title}</h2>
          <p className="text-yellow-400 text-2xl justify-end">⭐{product.rating}</p>
        </div>

        <p className="mt-4 text-xl text-gray-300">{product.description}</p>
        <p className="text-2xl font-semibold mt-2">${product.price}</p>
      </div>

      {/* Fixed Bottom "Add to Cart" Section */}
      <div className="fixed bottom-0 left-0 w-full bg-lightBg p-4 shadow-lg flex justify-center">
        {quantity > 0 ? (
          // Show Quantity Buttons if already in cart
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecrease}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold"
            >
              -
            </button>
            <span className="text-white text-lg font-bold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold"
            >
              +
            </button>
          </div>
        ) : (
          // Show "Add to Cart" if not in cart
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold text-lg"
          >
            Add to Cart
          </button>
        )}
      </div>
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
