import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { useAuth } from '../context/AuthContext';

// Optionally restrict certain routes if the user is already logged in
function BlockIfAuthenticated({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // or a tiny loader
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          <BlockIfAuthenticated>
            <Login />
          </BlockIfAuthenticated>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <BlockIfAuthenticated>
            <Signup />
          </BlockIfAuthenticated>
        } 
      />
      {/* Future dashboard or protected routes here */}
    </Routes>
  );
}
