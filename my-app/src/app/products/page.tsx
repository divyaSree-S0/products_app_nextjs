// "use client"; // Ensures client-side rendering

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

