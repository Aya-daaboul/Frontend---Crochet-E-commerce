import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaEllipsisH,
  FaTools,
  FaTruck,
  FaHourglassStart,
} from "react-icons/fa";

const CartHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch order history:", err);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "unconfirmed":
        return (
          <div className="flex items-center gap-2">
            <p className="text-yellow-600 font-semibold">
              Pending Confirmation
            </p>
            <FaHourglassStart className="text-yellow-500 text-2xl" />
          </div>
        );
      case "confirmed":
        return (
          <div className="flex items-center gap-2">
            <p className="text-green-600 font-semibold">Confirmed</p>
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>
        );
      case "working on":
        return (
          <div className="flex items-center gap-2">
            <p className="text-blue-600 font-semibold">In Progress</p>
            <FaTools className="text-blue-500 text-2xl" />
          </div>
        );
      case "to be delivered":
        return (
          <div className="flex items-center gap-2">
            <p className="text-purple-600 font-semibold">Out for Delivery</p>
            <FaTruck className="text-purple-500 text-2xl" />
          </div>
        );
      case "delivered":
        return (
          <div className="flex items-center gap-2">
            <p className="text-pink-600 font-semibold">Delivered</p>
            <FaCheckCircle className="text-pink-500 text-2xl" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <p className="text-gray-600 font-semibold capitalize">{status}</p>
            <FaEllipsisH className="text-gray-500 text-2xl" />
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-4xl font-bold text-center text-[#FF4D8B] mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No past orders yet.</p>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {orders.map((order, index) => {
              const itemCount = order.items.reduce(
                (sum, item) => sum + item.Quantity,
                0
              );

              return (
                <div
                  key={index}
                  className="flex justify-between border border-pink-300 p-6 rounded-lg shadow-sm items-center"
                >
                  <div>
                    <h2 className="text-xl font-bold text-[#FF4D8B] mb-2">
                      Order #{order.ID}
                    </h2>
                    <p className="font-semibold text-[#FF4D8B]">
                      Total amount: ${parseFloat(order.TotalAmount).toFixed(2)}
                    </p>
                    <p className="font-semibold text-[#FF4D8B]">
                      Number of Items: {itemCount}
                    </p>
                    {order.address ? (
                      <div className="text-[#FF4D8B] text-sm mt-2">
                        <p className="font-semibold">
                          City: {order.address.City}
                        </p>
                        <p>Building: {order.address.Building}</p>
                        <p>Floor: {order.address.Floor}</p>
                      </div>
                    ) : (
                      <p className="text-[#FF4D8B] text-sm mt-2">
                        No address set
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#FF4D8B] text-lg mb-2">
                      Status
                    </p>
                    {renderStatus(order.Status)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CartHistoryPage;
