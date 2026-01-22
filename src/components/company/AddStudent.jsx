import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', rollNumber: '', grade: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving:", formData);
    alert("Student Added Successfully!");
    navigate('/company/overview');
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h3 className="form-header">Add New Learner</h3>
        
        <form onSubmit={handleSubmit} className="grid-2">
          
          <div className="full-width form-group">
            <label>Full Name</label>
            <input 
              type="text" name="fullName" placeholder="Enter full name" 
              value={formData.fullName} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" name="email" placeholder="Enter email" 
              value={formData.email} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input 
              type="text" name="rollNumber" placeholder="Enter roll no" 
              value={formData.rollNumber} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Grade/Class</label>
            <input 
              type="text" name="grade" placeholder="Enter class" 
              value={formData.grade} onChange={handleChange} required 
            />
          </div>

          <div className="full-width form-actions">
            <button type="submit" className="btn-primary">Save Student</button>
            <button type="button" onClick={() => navigate('/company/overview')} className="btn-secondary">Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;