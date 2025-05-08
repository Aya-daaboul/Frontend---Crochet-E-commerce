import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const initialForm = {
    Name: "",
    Description: "",
    Price: "",
    isNew: false,
    isLimited: false,
    Discount: "",
    Category: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    const data = new FormData();
    data.append("image", imageFile);
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/uploads",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Upload failed");
      setImageUrl(
        "https://backend-crochet-e-commerce-production.up.railway.app" +
          result.url
      );
      showToast("Image uploaded!", "success");
    } catch (err) {
      console.error(err);
      showToast("Upload failed", "error");
    }
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            Price: parseFloat(formData.Price),
            Discount: formData.Discount ? parseFloat(formData.Discount) : 0,
            Images: imageUrl ? [imageUrl] : [],
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Product creation failed");

      showToast("Product created successfully!", "success");

      // Reset form
      setFormData(initialForm);
      setImageFile(null);
      setImageUrl("");
    } catch (err) {
      console.error(err);
      showToast("Failed to create product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#FF4D8B] mb-6 text-center">
        Admin Dashboard
      </h1>

      {toast.message && (
        <div
          className={`text-white px-4 py-2 rounded mb-4 text-center font-semibold ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="space-y-4">
        {[
          { name: "Name", type: "text", placeholder: "Product Name" },
          { name: "Description", type: "textarea", placeholder: "Description" },
          { name: "Price", type: "number", placeholder: "Price" },
          {
            name: "Discount",
            type: "number",
            placeholder: "Discount (optional)",
          },
        ].map((field) =>
          field.type === "textarea" ? (
            <textarea
              key={field.name}
              placeholder={field.placeholder}
              className="w-full p-2 border-2 border-[#FF4D8B] rounded focus:outline-none focus:ring-2 focus:ring-[#fdda4d]"
              value={formData[field.name]}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
            />
          ) : (
            <input
              key={field.name}
              type={field.type}
              placeholder={field.placeholder}
              min={field.name === "Discount" ? "0" : undefined}
              max={field.name === "Discount" ? "75" : undefined}
              className="w-full p-2 border-2 border-[#FF4D8B] rounded focus:outline-none focus:ring-2 focus:ring-[#fdda4d]"
              value={formData[field.name]}
              onChange={(e) => {
                let value = e.target.value;
                if (field.name === "Discount") {
                  const parsed = parseFloat(value);
                  value = Math.min(75, Math.max(0, isNaN(parsed) ? 0 : parsed));
                }
                setFormData({ ...formData, [field.name]: value });
              }}
            />
          )
        )}
        {/* Category Dropdown */}
        <select
          value={formData.Category}
          onChange={(e) =>
            setFormData({ ...formData, Category: e.target.value })
          }
          className="w-full p-2 border-2 border-[#FF4D8B] rounded focus:outline-none focus:ring-2 focus:ring-[#fdda4d]"
        >
          <option value="">Select a category</option>
          {[
            "bags",
            "keychains",
            "amigurumi",
            "crochet bouquet",
            "mug coasters",
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="flex-1"
          />
          <button
            onClick={handleUpload}
            className="bg-[#FF4D8B] text-white px-4 py-2 rounded hover:bg-[#f9577f] transition whitespace-nowrap"
          >
            Upload Image
          </button>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}

        <button
          onClick={handleCreateProduct}
          disabled={loading}
          className="bg-[#FF4D8B] text-[#fed530] font-semibold px-4 py-2 rounded hover:bg-[#d93e74] w-full disabled:opacity-60 transition mb-4"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
