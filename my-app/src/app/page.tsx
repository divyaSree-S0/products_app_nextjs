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
