import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

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

  return (
    <>
      <header className="hidden md:flex bg-[#FF577F] rounded-full py-5 px-8 w-[90%] max-w-[1200px] h-[70px] mx-auto my-8 items-center justify-between relative overflow-visible">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white font-bold text-base">
            Home
          </Link>
          <Link
            to="/products"
            className="text-white font-bold text-base ml-8 mr-[18%]"
          >
            Products
          </Link>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">
          <Link to="/">
            <YarnIcon />
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/about" className="text-white font-bold text-base ml-8">
            About
          </Link>
          <Link to="/contact" className="text-white font-bold text-base">
            Contact
          </Link>
          <Link to="/cart" className="ml-4">
            <CartIcon />
          </Link>
          <UserMenu />
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
        <aside className="fixed top-0 right-0 w-60 h-full bg-[#FF577F] text-white p-5 flex flex-col z-[1001]">
          <button
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="self-end bg-[#FF577F] p-2 rounded-lg mb-5"
          >
            <CloseIcon />
          </button>

          <nav className="flex flex-col gap-5 text-lg font-bold">
            <Link to="/" onClick={() => setSidebarOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setSidebarOpen(false)}>
              About Us
            </Link>
            <Link to="/products" onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
            <Link to="/contact" onClick={() => setSidebarOpen(false)}>
              Contact Us
            </Link>
            <Link to="/cart" onClick={() => setSidebarOpen(false)}>
              Start Shopping
            </Link>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Header;
