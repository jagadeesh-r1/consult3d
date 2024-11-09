// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Consult 3D
        </Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn-outline">Dashboard</Link>
              <button onClick={logout} className="btn-outline">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};