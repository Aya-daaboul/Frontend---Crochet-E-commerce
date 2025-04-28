// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
// Import other pages as needed

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;