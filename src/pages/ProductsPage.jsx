import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";

const categories = ["all", "bags", "keychains", "toys", "plushies"];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    setProducts([]); // clear old products
    try {
      const endpoint =
        category === "all"
          ? "https://backend-crochet-e-commerce-production.up.railway.app/api/products"
          : `https://backend-crochet-e-commerce-production.up.railway.app/api/products/category/${category}`;
      const res = await axios.get(endpoint);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white px-6 py-12">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-[#FF4D8B] mb-10">
          {selectedCategory === "all"
            ? "All Products"
            : selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          {selectedCategory === "bags" && " Pouches"}
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat
                  ? "bg-[#FF4D8B] text-white"
                  : "text-[#FF4D8B] border-[#FF4D8B] hover:bg-[#ffe6ef]"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF4D8B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.ID}
                className="rounded-xl border border-pink-200 p-4 text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={
                    product.Images?.[0]?.Image_URL ||
                    "https://via.placeholder.com/200"
                  }
                  alt={product.Name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />

                <h3 className="text-md font-bold text-[#FF4D8B] mb-1">
                  {product.Name}
                </h3>

                <div className="text-lg font-bold text-[#FF4D8B]">
                  ${product.Price}
                  {product.Discount && (
                    <span className="text-gray-400 line-through text-sm ml-2">
                      $
                      {(
                        parseFloat(product.Price) + parseFloat(product.Discount)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                <button className="mt-3 text-sm text-[#FF4D8B] font-medium hover:underline">
                  Add to cart →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
