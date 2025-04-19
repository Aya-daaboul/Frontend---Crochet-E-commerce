// frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Use Navigate instead of Redirect in v6
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;