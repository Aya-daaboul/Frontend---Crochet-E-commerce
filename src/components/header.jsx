import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useCartNumber } from "../components/CartNumber";

const CloseIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff">
    <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" />
    <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" />
  </svg>
);

const MenuIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff">
    <rect y="4" width="24" height="2" />
    <rect y="11" width="24" height="2" />
    <rect y="18" width="24" height="2" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
    <path d="M7 4h-2l-3 9v11h18v-11l-3-9h-2m0 2h4l2.25 6h-16.5l2.25-6h4v-2h-3l-2.25 6h16.5l-2.25-6h-3v2z" />
  </svg>
);

const YarnIcon = () => (
  <svg width="70" height="70" viewBox="0 0 24 24" fill="#fff">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#fff"
      strokeWidth="2"
      fill="#FFB6C1"
    />
    <path d="M2 12C8 10 16 16 22 12" stroke="#fff" strokeWidth="2" />
    <path d="M4 16C10 14 14 18 20 16" stroke="#fff" strokeWidth="2" />
  </svg>
);

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartCount } = useCartNumber();

  return (
    <>
      <header className="hidden md:flex bg-[#FF577F] rounded-full py-5 px-8 w-[90%] max-w-[1200px] h-[70px] mx-auto my-8 items-center justify-between relative overflow-visible">
        <div className="flex items-center gap-8">
          <div className="pl-9">
            <UserMenu key={localStorage.getItem("user") || "guest"} />
          </div>
          <Link
            to="/"
            className="text-white hover:text-[#fdda4d] font-bold text-base transition-transform duration-200 hover:scale-110 hover:-rotate-3"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-[#fdda4d] font-bold text-base transition-transform duration-200 hover:scale-110 hover:-rotate-3"
          >
            Products
          </Link>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 hover:bg-[#fdda4d]">
          <Link to="/">
            <YarnIcon />
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link
            to="/about"
            className="text-white hover:text-[#fdda4d] font-bold text-base transition-transform duration-200 hover:scale-110 hover:rotate-3"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-[#fdda4d] font-bold text-base transition-transform duration-200 hover:scale-110 hover:rotate-3"
          >
            Contact
          </Link>
          <div className="relative ml-4">
            <Link to="/cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fed530] text-[#FF577F] text-xs w-5 h-5 flex items-center justify-center rounded-full ">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <header className="md:hidden flex items-center justify-between bg-[#FF577F] py-2 px-5">
        <Link to="/">
          <YarnIcon />
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
          className="bg-[#FF577F] p-2 rounded-lg flex items-center justify-center"
        >
          <MenuIcon />
        </button>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-[1001]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside className="absolute top-4 right-4 w-64 bg-[#FF577F] text-[#fdda4d] px-6 py-6 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform animate-slide-in-right">
            <button
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              className="self-end mb-6"
            >
              <CloseIcon />
            </button>

            <nav className="flex flex-col gap-4 pl-2">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/products", label: "Products" },
                { path: "/contact", label: "Contact Us" },
                { path: "/cart", label: "Start Shopping" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#fdda4d] text-lg font-bold tracking-wide pl-1 hover:text-white transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
