import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // For simplicity, admin authentication state can be managed here or with context
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route
        path="/"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
