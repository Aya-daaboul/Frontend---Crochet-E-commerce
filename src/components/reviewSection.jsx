import React, { useEffect, useState, useCallback } from "react";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [hasReviewed, setHasReviewed] = useState(false);

  const token = localStorage.getItem("token");

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(
        `https://backend-crochet-e-commerce-production.up.railway.app/reviews/product/${productId}`
      );
      const data = await res.json();
      setReviews(data || []);

      if (user?.id) {
        const match = data.find((r) => r.U_id === user.id);
        setHasReviewed(Boolean(match));
      }
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  }, [productId, user?.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async () => {
    if (!description.trim() || rating === 0) {
      return showToast("Please enter a description and rating", "error");
    }

    try {
      const res = await fetch(
        "https://backend-crochet-e-commerce-production.up.railway.app/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            P_id: productId,
            Description: description,
            Rating: rating,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to post review");

      setDescription("");
      setRating(0);
      showToast("Review posted!");
      fetchReviews(); // reload
    } catch (err) {
      console.error(err);
      showToast("Failed to post review", "error");
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-[#FF4D8B] mb-4">📝 Reviews</h3>

      {toast.message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-white font-semibold text-sm text-center ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Leave a Review (visible to any logged-in user) */}
      {token && !hasReviewed && (
        <div className="mb-6 border p-4 rounded-md bg-pink-50">
          <p className="font-semibold mb-2 text-[#FF4D8B]">Leave a review:</p>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`text-2xl cursor-pointer ${
                  i <= (hovered || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(i)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows={3}
            placeholder="Write your feedback..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-[#FF4D8B] rounded px-3 py-2 focus:ring-[#fdda4d]"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-[#FF4D8B] text-white px-4 py-1 rounded hover:bg-[#f9577f]"
          >
            Submit Review
          </button>
        </div>
      )}

      {token && hasReviewed && (
        <p className="mb-6 text-sm text-gray-500 italic">
          You’ve already submitted a review for this product.
        </p>
      )}

      {/* Review List */}
      {reviews.length === 0 && (
        <p className="text-sm text-gray-500 italic">No reviews yet.</p>
      )}

      {reviews.map((review, index) => (
        <div
          key={index}
          className="border rounded-md p-3 mb-4 bg-white shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <strong className="text-[#FF4D8B]">
              {review.user?.Name || "Anonymous"}
            </strong>
            <span className="text-yellow-400 text-sm">
              {"★".repeat(Math.round(review.Rating || 0))}
              {"☆".repeat(5 - Math.round(review.Rating || 0))}
            </span>
          </div>
          <p className="text-sm text-gray-700">{review.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
