import React, { useEffect, useState } from "react";

// This page is for the admin to manage orders, including updating their status.
const AdminOrderManagerPage = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
      showToast("Failed to load orders", "error");
    }
  };

  // This function updates the status of an order based on the order ID and new status.
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/orders/status/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId, status }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      showToast("Status updated", "success");
      fetchOrders();
    } catch (err) {
      console.error("Update failed", err);
      showToast("Status update failed", "error");
    }
  };
  // This function shows a toast message for 3 seconds.
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#FF4D8B] mb-4">
        📦 Manage Orders
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

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.ID}
            className="border-2 border-[#fdda4d] rounded p-4 shadow bg-white"
          >
            <h3 className="text-lg font-bold text-[#FF4D8B] mb-1">
              Order #{order.ID}
            </h3>
            <p>
              Status: <strong>{order.Status}</strong>
            </p>
            <p>Total: ${order.TotalAmount}</p>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => updateStatus(order.ID, "to be delivered")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded"
              >
                Mark as Out for Delivery
              </button>
              <button
                onClick={() => updateStatus(order.ID, "delivered")}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded"
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => updateStatus(order.ID, "cancelled")}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded"
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderManagerPage;
