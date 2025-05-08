import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const { pathname } = useLocation();

  const tabs = [
    { path: "/admin/add", label: "➕ Add Product" },
    { path: "/admin/products", label: "🛒 Manage Products" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#FF4D8B] mb-4 text-center">
        Admin Panel
      </h1>

      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded font-semibold border-b-2 transition ${
                isActive || pathname === tab.path
                  ? "text-[#FF4D8B] border-[#FF4D8B] bg-pink-50"
                  : "text-gray-500 border-transparent hover:text-[#FF4D8B] hover:border-[#FF4D8B]"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <div className="bg-white p-4 border-2 border-[#fdda4d] rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
