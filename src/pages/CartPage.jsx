import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import ratmain from "../assets/ratmain.png";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const items = res.data.items;
      setCartItems(items);
      calculateTotal(items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
    setLoading(false);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      return acc + parseFloat(item.Product.Price) * item.Quantity;
    }, 0);
    setTotal(sum.toFixed(2));
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            P_id: productId,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // This function handles the confirmation of the order.
  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await axios.post(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/confirm",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems([]);
      setTotal(0);
      navigate("/home");
    } catch (err) {
      console.error("Confirm failed:", err);
    }
    setConfirming(false);
  };

  return (
    <>
      {/* Magenta Loading Bar */}
      {(loading || confirming) && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#FF4D8B] animate-pulse z-50" />
      )}

      <div className="min-h-screen bg-white p-8 pt-16 relative">
        <h1 className="text-4xl font-bold text-center text-[#FF4D8B] mb-10">
          My Cart
        </h1>

        {/* Loading Spinner or Product List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#FF4D8B] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {cartItems.map((item) => (
              <div
                key={item.P_id}
                className="flex items-center justify-between border border-pink-200 rounded p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.Product?.Images?.[0]?.Image_URL ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.Product?.Name}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="text-left">
                    <h2 className="text-[#FF4D8B] font-bold text-lg">
                      {item.Product?.Name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Price: ${item.Product?.Price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.Quantity}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => handleRemove(item.P_id)}
                    className="text-[#FF4D8B] hover:text-red-500 flex items-center gap-1"
                  >
                    <FaTrash /> <span>Remove Item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total + Confirm */}
        {!loading && cartItems.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 text-right">
            <p className="text-lg font-semibold text-[#FF4D8B]">
              Total Price: ${total}
            </p>
            <button
              onClick={() => navigate("/address")}
              className="mt-4 px-6 py-2 rounded-full bg-[#FF4D8B] text-white font-semibold transition hover:bg-pink-500"
            >
              Proceed to Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
