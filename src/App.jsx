// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MainPage from "./pages/MainPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
// Import other pages as needed
import Footer from "./components/footer";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Public routes */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
