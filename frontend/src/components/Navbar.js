// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav>
      <div className="brand">TaskFlow</div>
      <div className="actions">
        {!token && (<>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>)}
        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="small ghost" style={{ marginLeft: 12 }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
