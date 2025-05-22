import React, { useEffect, useState } from "react";

// This page is for the admin to manage products, including deleting them.
const AdminProductManagerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // This function fetches all products from the backend API.
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/products"
      );
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load products", err);
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false); // end
    }
  };

  //
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };
  // This function handles the deletion of a product based on its ID.
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://backend-crochet-e-commerce-production.up.railway.app/api/products/${confirmDeleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Delete failed");

      showToast("Product deleted", "success");
      setProducts(products.filter((p) => p.ID !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
      setConfirmDeleteId(null);
    }
  };

  // This function fetches all products from the backend API when the component mounts.
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#FF4D8B] mb-4">
        🛒 Manage Products
      </h2>

      {toast.message && (
        <div
          className={`text-white px-4 py-2 rounded mb-4 text-center font-semibold ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-[#FF4D8B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        ) : null}

        {products.map((product) => (
          <div
            key={product.ID}
            className="border-2 border-[#fdda4d] rounded-lg p-4 flex flex-col justify-between shadow-md bg-white"
          >
            {product.Images && product.Images.length > 0 && (
              <img
                src={
                  product.Images[0].Image_URL.startsWith("http")
                    ? product.Images[0].Image_URL
                    : `https://backend-crochet-e-commerce-production.up.railway.app${product.Images[0].Image_URL}`
                }
                alt={product.Name}
                className="h-48 w-full object-cover rounded mb-2"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-[#FF4D8B]">
                {product.Name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Category: {product.Category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Price: ${product.Price}
              </p>
              {product.Discount > 0 && (
                <p className="text-sm text-green-600 font-semibold">
                  Discount: {product.Discount}%
                </p>
              )}
            </div>

            <button
              onClick={() => confirmDelete(product.ID)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm border-2 border-[#FF4D8B]">
            <h3 className="text-lg font-bold text-[#FF4D8B] mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagerPage;
