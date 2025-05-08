import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewSection from "../components/reviewSection";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://backend-crochet-e-commerce-production.up.railway.app/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-[#FF4D8B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 px-4 py-2 bg-[#ffe6ef] text-[#FF4D8B] font-semibold rounded-full shadow-sm hover:bg-[#fdd3e6] transition"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <img
          src={
            product.Images?.[0]?.Image_URL?.startsWith("http")
              ? product.Images[0].Image_URL
              : `https://backend-crochet-e-commerce-production.up.railway.app${product.Images[0].Image_URL}`
          }
          alt={product.Name}
          className="w-full h-[400px] object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#FF4D8B] mb-2">
            {product.Name}
          </h1>
          <p className="text-xl text-[#FF4D8B] font-bold mb-2">
            ${product.Price}
          </p>
          {product.Discount > 0 && (
            <p className="text-sm text-green-600 font-semibold mb-2">
              Discount: {product.Discount}%
            </p>
          )}
          <p className="text-gray-700">{product.Description}</p>
        </div>
      </div>

      <ReviewSection productId={product.ID} />
    </div>
  );
};

export default ProductPage;
