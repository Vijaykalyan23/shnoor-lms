import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { FaUserCircle, FaBuilding, FaThLarge, FaSignOutAlt } from 'react-icons/fa'; 
import '../Dashboard.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState('Admin'); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/');
      else {
        const name = user.displayName || user.email.split('@')[0];
        setAdminName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title">SHNOOR ADMIN</h3>
        </div>

        <div className="sidebar-section-title" style={{ padding: '0 1rem 0.5rem 1rem', color: '#6b7280', fontSize: '0.75rem' }}>COMPANY / USER / PROFILE MANAGEMENT</div>
        <ul className="nav-links">
          <li 
            className={`nav-item ${location.pathname.includes('dashboard') ? 'active' : ''}`}
            onClick={() => navigate('/admin/dashboard')}
          >
            <FaThLarge className="nav-icon"/> Dashboard
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('company-management') ? 'active' : ''}`}
            onClick={() => navigate('/admin/company-management')}
          >
            <FaBuilding className="nav-icon"/> Company Management
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('user-management') ? 'active' : ''}`}
            onClick={() => navigate('/admin/user-management')}
          >
            <FaUserCircle className="nav-icon"/> User Management
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('profile-management') ? 'active' : ''}`}
            onClick={() => navigate('/admin/profile-management')}
          >
            <FaThLarge className="nav-icon"/> Profile Management
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('add-company') ? 'active' : ''}`}
            onClick={() => navigate('/admin/add-company')}
          >
            <FaBuilding className="nav-icon"/> Add Company
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
             <h2>Dashboard</h2>
          </div>

          <div className="user-profile-section">
            <div className="user-info">
              <span className="user-name">{adminName}</span>
              <span className="user-role">Administrator</span>
            </div>
            <FaUserCircle style={{ fontSize: '2rem', color: '#9ca3af' }} />
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        <div className="content-area">
          <Outlet />  
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;