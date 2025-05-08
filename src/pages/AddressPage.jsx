import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [city, setCity] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* --------------------------------------------------
   * Fetch the current *unconfirmed* order ID once when
   * the component mounts – we need it for the address
   * record (O_id) and later to confirm the order.
   * --------------------------------------------------*/
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/cart",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.order?.ID) {
          setOrderId(data.order.ID);
        }
      } catch (err) {
        console.error("Failed to fetch order ID", err);
      }
    };

    fetchOrder();
  }, [token]);

  /* --------------------------------------------------
   * Submit handler
   * 1) Create /api/address entry
   * 2) Confirm order via /api/orders/confirm
   * 3) Navigate to order history on success
   * --------------------------------------------------*/
  const handleSubmit = async () => {
    // Guard – shouldn\'t happen, but better safe
    if (!orderId) return alert("No active order found");

    setLoading(true);

    try {
      // 1) Save address
      await axios.post(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/address",
        {
          O_id: orderId,
          City: city,
          Building: building,
          Floor: floor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2) Confirm the order (finalizes it – moves status away from \"unconfirmed\")
      await axios.post(
        "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/confirm",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3) Go to history so the user immediately sees their order
      navigate("/history");
    } catch (err) {
      console.error("Error completing checkout", err);
      alert("Something went wrong – please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white px-6 py-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#FF4D8B] mb-6 text-center">
          Confirm your Order
        </h1>
        <p className="text-[#FF4D8B] font-semibold mb-6">
          * Confirmed orders cannot be canceled
        </p>

        {/* Address form */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-3xl">
          <input
            type="text"
            placeholder="City *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 min-w-[180px] p-3 border border-gray-200 rounded focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF4D8B]"
          />
          <input
            type="text"
            placeholder="Building *"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="flex-1 min-w-[180px] p-3 border border-gray-200 rounded focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF4D8B]"
          />
          <input
            type="text"
            placeholder="Floor *"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="flex-1 min-w-[180px] p-3 border border-gray-200 rounded focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF4D8B]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !city.trim() ||
            !building.trim() ||
            !floor.trim() ||
            !orderId
          }
          className={`px-8 py-3 rounded bg-[#FF4D8B] text-white font-semibold text-lg transition ${
            loading || !city || !building || !floor || !orderId
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-pink-500"
          }`}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </>
  );
};

export default AddressPage;
