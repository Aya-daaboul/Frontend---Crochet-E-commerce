import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data from local storage
  // This will be used to check if the user is logged in and to display their name
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/home");
  };
  // Check if user is logged in
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
  // Check if user is an admin
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white text-[#FF577F] font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <span>Hi, {user.name.split(" ")[0]}!</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 border border-pink-100">
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-[#FF577F] hover:bg-pink-50 font-medium transition"
          >
            My Profile
          </button>

          <button
            onClick={() => {
              navigate("/history");
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-[#FF577F] hover:bg-pink-50 font-medium transition"
          >
            Cart History
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin");
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-[#FF577F] hover:bg-pink-50 font-medium transition"
            >
              Admin Page
            </button>
          )}

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
