import React, { useEffect, useState } from "react";

// This page is for the admin to manage orders, including updating their status.
const AdminOrderManagerPage = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  // This function fetches all orders from the backend API.
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/all",
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
    } finally {
      setLoading(false);
    }
  };

  // This function updates the status of an order based on the order ID and new status.
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/status/update",
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
        {loading ? (
          <div className="col-span-full flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-[#FF4D8B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.ID}
              className="border border-[#FDDA4D] rounded-xl p-5 bg-white shadow-md"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* LEFT side — Order meta info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#FF4D8B] mb-2">
                    Order #{order.ID}
                  </h3>

                  <div className="mb-2 text-[#333]">
                    <p>
                      <span className="font-semibold text-[#FF4D8B]">
                        Status:
                      </span>{" "}
                      {order.Status}
                    </p>
                    <p>
                      <span className="font-semibold text-[#FF4D8B]">
                        Total:
                      </span>{" "}
                      ${order.TotalAmount}
                    </p>
                  </div>

                  {order.address && (
                    <div className="mb-2">
                      <p className="font-semibold text-[#FF4D8B]">Address:</p>
                      <p className="ml-2 text-sm text-gray-700">
                        {order.address.Building}, {order.address.Floor},{" "}
                        {order.address.City}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => updateStatus(order.ID, "to be delivered")}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full text-sm"
                    >
                      Mark as Out for Delivery
                    </button>
                    <button
                      onClick={() => updateStatus(order.ID, "delivered")}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full text-sm"
                    >
                      Mark as Delivered
                    </button>
                    <button
                      onClick={() => updateStatus(order.ID, "cancelled")}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full text-sm"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>

                {/* RIGHT side — Dates + Items */}
                <div className="flex-1 md:max-w-[300px]">
                  <div className="text-sm text-gray-500 mb-2 text-left md:text-right">
                    <p>
                      <span className="font-semibold text-[#FF4D8B]">
                        Created:
                      </span>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    {order.updatedAt && (
                      <p>
                        <span className="font-semibold text-[#FF4D8B]">
                          Updated:
                        </span>{" "}
                        {new Date(order.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {order.items?.length > 0 && (
                    <div>
                      <p className="font-semibold text-[#FF4D8B] text-left md:text-right">
                        Items
                      </p>
                      <ul className="list-inside text-sm text-gray-700 text-left md:text-right ml-2 md:ml-0">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.Product?.Name || "Unknown Item"} x{" "}
                            {item.Quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrderManagerPage;
