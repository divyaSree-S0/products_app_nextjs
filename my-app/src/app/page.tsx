"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/store/useStore";

export default function Products() {
  const { products, categories, fetchProducts, fetchCategories } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === selectedCategory);

  return (
    <div className="p-4 bg-darkBg text-white min-h-screen scrollbar-hide">
      <h1 className="text-4xl mt-20 ml-4">Product List</h1>

      {/* Categories Filter */}
      <div className="flex gap-5 overflow-x-auto mt-4 ml-4 h-10 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-xl bg-transparent ${
            selectedCategory === "all" ? "bg-yellow-500" : "bg-gray-900"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug} // Use slug for key
            onClick={() => setSelectedCategory(category.slug)}
            className={`px-4 py-2 rounded-xl min-w-max whitespace-nowrap bg-transparent ${
              selectedCategory === category.slug ? "bg-yellow-500" : "bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="grid grid-cols-2 gap-8 m-3 mt-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="bg-[#1f1f1f] p-4 rounded-2xl flex flex-col justify-between min-h-[150px]">
              {/* Image Section */}
              <div className="bg-transparent w-full h-[150px] flex justify-center items-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="mt-2 flex flex-col flex-grow">
                <p className="text-yellow-400">⭐ {product.rating}</p>
                <h2 className="text-lg truncate">{product.title}</h2>
                <h2 className="text-lg text-sm truncate">{product.description}</h2>
                <p className="text-white  mt-auto">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   // Fetch Products
//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.products))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   // Fetch Categories
//   useEffect(() => {
//     fetch("https://dummyjson.com/products/categories")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Categories:", data); // Debugging
//         setCategories(data);
//       })
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   // Filter products by category
//   const filteredProducts =
//     selectedCategory === "all"
//       ? products
//       : products.filter((product) => product.category === selectedCategory);

//   return (
//     <div className="p-4 bg-black text-white min-h-screen">
//       <h1 className="text-xl font-bold">Product List</h1>


//       {/* Categories Filter */}
//       <div className="flex gap-5 overflow-x-auto mt-4 h-10">
//         <button
//           onClick={() => setSelectedCategory("all")}
//           className={`px-4 py-2 rounded-lg ${
//             selectedCategory === "all" ? "bg-yellow-500" : "bg-gray-900"
//           }`}
//         >
//           All
//         </button>
//         {categories.map((category, index) => (
//           <button
//             key={category.slug} // Ensure unique key using slug
//             onClick={() => setSelectedCategory(category.slug)}
//             className={`px-4 py-2 rounded-lg ${selectedCategory === category.slug ? "bg-yellow-500" : "bg-gray-700"
//               }`}
//           >
//             {category.name} 
//           </button>
//         ))}
//       </div>


//       {/* Products List */}
//       <div className="grid grid-cols-2 gap-6 m-3 mt-6">
//         {filteredProducts.map((product) => (
//           <Link key={product.id} href={`/products/${product.id}`}>
//             <div className="bg-gray-800 p-4 rounded-xl flex flex-col justify-between min-h-[200px]">
//               {/* Image Section */}
//               <div className="w-full h-[150px] flex justify-center items-center">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </div>

//               {/* Product Details */}
//               <div className="mt-2 flex flex-col flex-grow">
//                 <h2 className="text-lg font-bold truncate">{product.title}</h2>
//                 <p className="text-yellow-400">⭐ {product.rating}</p>
//                 <p className="text-white font-bold mt-auto">${product.price}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//     </div>
//   );
// }


// "use client";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">  
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


// import Link from 'next/link';
// import { useProductStore } from '@/store/useStore';

// export default function Products() {
  //   const { products } = useProductStore();
  
  //   return (
//     <div className="p-4 bg-black text-white min-h-screen max-w-screen-sm mx-auto">    
//       <h1 className="text-xl font-bold">Product List</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4 font-[family-name:var(--font-geist-sans)]">
//         {products.map((product) => (
//           <Link key={product.id} href={`/products/${product.id}`}>  
//             <div className="bg-gray-800 p-4 rounded-xl">
//               <img src={product.image} alt={product.name} className="w-full h-auto max-h-40 object-cover rounded-lg" />
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
