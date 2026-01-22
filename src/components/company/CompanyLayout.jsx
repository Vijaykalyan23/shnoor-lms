import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { FaUserCircle, FaChalkboardTeacher, FaUserGraduate, FaBook, FaSignOutAlt, FaThLarge } from 'react-icons/fa'; 
import '../Dashboard.css';

const CompanyLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('User');

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
          <h3 className="sidebar-title">SHNOOR ACADEMIC</h3>
        </div>

        <ul className="nav-links">
          <li 
            className={`nav-item ${location.pathname.includes('overview') ? 'active' : ''}`}
            onClick={() => navigate('/company/overview')}
          >
            <FaThLarge className="nav-icon"/> Overview
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('add-teacher') ? 'active' : ''}`}
            onClick={() => navigate('/company/add-teacher')}
          >
            <FaChalkboardTeacher className="nav-icon"/> Add Instructor
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('add-student') ? 'active' : ''}`}
            onClick={() => navigate('/company/add-student')}
          >
            <FaUserGraduate className="nav-icon"/> Add Learner
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('question-bank') ? 'active' : ''}`}
            onClick={() => navigate('/company/question-bank')}
          >
            <FaBook className="nav-icon"/> Question Bank
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('course-management') ? 'active' : ''}`}
            onClick={() => navigate('/company/course-management')}
          >
            <FaThLarge className="nav-icon"/> Course Management
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('add-content') ? 'active' : ''}`}
            onClick={() => navigate('/company/add-content')}
          >
            <FaThLarge className="nav-icon"/> Add Content
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('delete-content') ? 'active' : ''}`}
            onClick={() => navigate('/company/delete-content')}
          >
            <FaThLarge className="nav-icon"/> Delete Content
          </li>
          <li 
            className={`nav-item ${location.pathname.includes('test-series') ? 'active' : ''}`}
            onClick={() => navigate('/company/test-series')}
          >
            <FaThLarge className="nav-icon"/> Test Series
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
             <h2>Academic Portal</h2>
          </div>

          <div className="user-profile-section">
            <div className="user-info">
              <span className="user-name">{userName}</span>
              <span className="user-role">School Admin</span>
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

export default CompanyLayout;