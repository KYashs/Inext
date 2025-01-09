import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    // If the user's role is allowed, render the child component
    if (allowedRoles.includes(role)) {
      return children;
    }

    // Redirect to login for unauthorized roles
    return <Navigate to="/" />;
  } catch (error) {
    // Handle invalid token
    sessionStorage.removeItem('token');
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
