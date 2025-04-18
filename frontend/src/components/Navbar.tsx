// src/components/Navbar.tsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { removeToken } from '../auth/authUtils';
import { useState } from 'react';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const hideOnPaths = ['/', '/login', '/register'];
  if (hideOnPaths.includes(pathname)) return null;

  const confirmLogout = () => {
    removeToken();
    setShowConfirm(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/dashboard">Task Manager</Link>
        </div>
        <div className="navbar-links">
          <Link to="/tasks/new">Create New Task</Link>
          <button  onClick={() => setShowConfirm(true)} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmLogout}>Yes, Logout</button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
