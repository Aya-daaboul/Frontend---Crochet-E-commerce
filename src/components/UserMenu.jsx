import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/home");
  };

  // ✅ If not logged in, show "Sign In" button
  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="bg-white text-[#FF577F] font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        Sign In
      </button>
    );
  }

  // ✅ Logged in: show dropdown
  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="px-5 py-2 rounded-full font-semibold text-white bg-[#FF577F] hover:bg-[#e74b6a] active:bg-[#cc3f5d] shadow transition-all"
      >
        Sign In
      </button>
    );
  }

  // If logged in
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white text-[#FF577F] font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <span>Hi, {user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 border border-pink-100">
          <button
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-[#FF577F] hover:bg-pink-50 font-medium transition"
          >
            Cart History
          </button>
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 font-medium transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
