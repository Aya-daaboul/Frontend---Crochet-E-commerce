import React, { useState } from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

const CloseIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2"/>
    <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <rect y="4" width="24" height="2"/>
    <rect y="11" width="24" height="2"/>
    <rect y="18" width="24" height="2"/>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4h-2l-3 9v11h18v-11l-3-9h-2m0 2h4l2.25 6h-16.5l2.25-6h4v-2h-3l-2.25 6h16.5l-2.25-6h-3v2z"/>
  </svg>
);

const YarnIcon = () => (
  <svg width="70" height="70" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#FFB6C1" />
    <path d="M2 12C8 10 16 16 22 12" stroke="#fff" strokeWidth="2" />
    <path d="M4 16C10 14 14 18 20 16" stroke="#fff" strokeWidth="2" />
  </svg>
);


const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Oval Header for large screens */}
      <div className="oval-header">
        
        <Link to="/" className="nav-link">Home</Link>
        
        <Link to="/products" className="nav-link nav-link--1">      Products</Link>

        <div className="logo-center">
          <Link to="/">
            <YarnIcon />
          </Link>
        </div>

        <Link to="/about" className="nav-link nav-link--2">About</Link>

        <Link to="/contact" className="nav-link">Contact</Link>
        
      
        <Link to="/cart" className="cart-icon">
          <CartIcon />
        </Link>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <Link to="/">
          <YarnIcon />
        </Link>
        <div className="menu-icon-bg" onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <div className="close-icon-bg" onClick={() => setSidebarOpen(false)}>
            <CloseIcon />
          </div>
          <nav className="sidebar-links">
            <Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setSidebarOpen(false)}>About Us</Link>
            <Link to="/products" onClick={() => setSidebarOpen(false)}>Products</Link>
            <Link to="/contact" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
            <Link to="/contact" onClick={() => setSidebarOpen(false)}>Start Shopping</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
