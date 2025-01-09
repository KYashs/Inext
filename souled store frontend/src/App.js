import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminNav from './admin/AdminNav';
import Drop from './pages/Drop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './login/LoginPage';
import Signup from './login/Signup';
import ProtectedRoute from './Protectedroutes/Protectedroutes';

import Checkout from './pages/Checkout';
import MainLayout from './admin/Adminhome';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    
    <Router>
      <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected Routes for Customers */}
        <Route
          path="home"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Drop"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Drop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Drop"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Drop />
            </ProtectedRoute>
          }
        />

<Route
          path="/Checkout"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Checkout/>
            </ProtectedRoute>
          }
        />
       <Route
  path="/product/:id"
  element={
    <ProtectedRoute allowedRoles={['customer']}>
      <Product />
    </ProtectedRoute>
  }
/>

        <Route
          path="/Cart"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Protected Route for Admin */}
        <Route
          path="/adminhome"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
