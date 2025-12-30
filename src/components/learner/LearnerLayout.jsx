import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUserCircle, FaList, FaTrophy, FaSignOutAlt } from 'react-icons/fa';
import '../Dashboard.css';

const LearnerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('Learner');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate('/');
      else {
        const name = user.displayName || user.email.split('@')[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
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
          <h3 className="sidebar-title">SHNOOR LEARNER</h3>
        </div>

        <ul className="nav-links">
          <li
            className={`nav-item ${location.pathname.includes('courses') || location.pathname.includes('overview') ? 'active' : ''}`}
            onClick={() => navigate('/learner/courses')}
          >
            <FaList className="nav-icon"/> Courses
          </li>
          <li
            className={`nav-item ${location.pathname.includes('points') ? 'active' : ''}`}
            onClick={() => navigate('/learner/points')}
          >
            <FaTrophy className="nav-icon"/> Points / Ranking
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
             <h2>Learner Portal</h2>
          </div>

          <div className="user-profile-section">
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-role">Learner</span>
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

export default LearnerLayout;
