// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MainPage from "./pages/MainPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import CartHistoryPage from "./pages/CartHistoryPage";
import Footer from "./components/footer";
import AddressPage from "./pages/AddressPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/header";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLayout from "./pages/AdminLayout";
import AdminProductManagerPage from "./pages/AdminProductManagerPage";

const App = () => (
  <BrowserRouter>
    <Header />
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
        <Route path="/history" element={<CartHistoryPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductManagerPage />} />
          <Route index element={<Navigate to="add" replace />} />
        </Route>
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
