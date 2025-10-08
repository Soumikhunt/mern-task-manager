// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // watch token changes
  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={() => setIsLoggedIn(false)} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register onAuth={() => setIsLoggedIn(true)} />} />
          <Route path="/login" element={<Login onAuth={() => setIsLoggedIn(true)} />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create" element={isLoggedIn ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/tasks/:id" element={isLoggedIn ? <TaskDetails /> : <Navigate to="/login" />} />

          {/* fallback */}
          <Route path="*" element={<div style={{ padding: 40 }}>Page not found — <a href="/">Go home</a></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
