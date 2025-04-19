// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import MainPage from './pages/MainPage';
// Import other pages as needed

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;