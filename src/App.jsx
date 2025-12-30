import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AddCompany from './components/admin/AddCompany';
import AdminCompanyManagement from './components/admin/AdminCompanyManagement';
import AdminUserManagement from './components/admin/AdminUserManagement';
import AdminProfileManagement from './components/admin/AdminProfileManagement';

import CompanyLayout from './components/company/CompanyLayout';
import CompanyDashboard from './components/company/CompanyDashboard';
import AddStudent from './components/company/AddStudent';
import AddTeacher from './components/company/AddTeacher';
import QuestionBank from './components/company/QuestionBank';
import CourseManagement from './components/company/CourseManagement';
import AddContent from './components/company/AddContent';
import DeleteContent from './components/company/DeleteContent';
import TestSeries from './components/company/TestSeries';
import LearnerLayout from './components/learner/LearnerLayout';
import LearnerDashboard from './components/learner/LearnerDashboard';
import LearnerCourses from './components/learner/LearnerCourses';
import LearnerPoints from './components/learner/LearnerPoints';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="company-management" element={<AdminCompanyManagement />} />
            <Route path="user-management" element={<AdminUserManagement />} />
            <Route path="profile-management" element={<AdminProfileManagement />} />
            <Route path="add-company" element={<AddCompany />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>

        <Route path="/company" element={<CompanyLayout />}>
          <Route path="overview" element={<CompanyDashboard />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="question-bank" element={<QuestionBank />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="add-content" element={<AddContent />} />
          <Route path="delete-content" element={<DeleteContent />} />
          <Route path="test-series" element={<TestSeries />} />
          <Route index element={<Navigate to="overview" />} />
        </Route> 

        <Route path="/learner" element={<LearnerLayout />}>
          <Route path="overview" element={<LearnerDashboard />} />
          <Route path="courses" element={<LearnerCourses />} />
          <Route path="points" element={<LearnerPoints />} />
          <Route index element={<Navigate to="overview" />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;