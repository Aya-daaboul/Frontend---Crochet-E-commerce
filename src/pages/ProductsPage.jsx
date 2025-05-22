import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../api";
import { useCartNumber } from "../components/CartNumber";
import { useNavigate } from "react-router-dom";

const categories = [
  "all",
  "bags",
  "keychains",
  "amigurumi",
  "crochet bouquet",
  "mug coasters",
];

const formatLabel = (text) =>
  text
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Fetch products based on selected category
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    setProducts([]); // clears old products
    try {
      const endpoint =
        category === "all"
          ? "https://backend-crochet-e-commerce-production.up.railway.app/products"
          : `https://backend-crochet-e-commerce-production.up.railway.app/products/category/${category}`;
      const res = await axios.get(endpoint);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };
  const { incrementCart } = useCartNumber();

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await addToCart(productId, 1, token);
      incrementCart(1); // adds to cart
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white px-6 py-12">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-[#FF4D8B] mb-10">
          {formatLabel(selectedCategory)}
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
              {formatLabel(cat)}
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
                className="rounded-xl border border-pink-200 p-4 text-center shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 duration-200"
              >
                <div
                  onClick={() => navigate(`/product/${product.ID}`)}
                  className="cursor-pointer"
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
                </div>

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

                <button
                  onClick={() => handleAddToCart(product.ID)}
                  className="mt-3 text-sm text-[#FF4D8B] font-medium hover:underline"
                >
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
