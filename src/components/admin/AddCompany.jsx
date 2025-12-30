import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const AddCompany = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ 
    companyName: '', 
    adminEmail: '', 
    phone: '', 
    address: '',
    subscriptionPlan: 'basic' 
  });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating Company:", data);
    alert("Company Registered Successfully!");
    navigate('/admin/dashboard');
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h3 className="form-header">Register New Company</h3>

        <form onSubmit={handleSubmit} className="grid-2">
          
          <div className="full-width form-group">
            <label>Company / Institute Name</label>
            <input 
              type="text" name="companyName" placeholder="e.g. Springfield High School" 
              value={data.companyName} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Admin Email</label>
            <input 
              type="email" name="adminEmail" placeholder="admin@school.com" 
              value={data.adminEmail} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Phone Contact</label>
            <input 
              type="tel" name="phone" placeholder="+91 98765 43210" 
              value={data.phone} onChange={handleChange} required 
            />
          </div>

          <div className="full-width form-group">
            <label>Full Address</label>
            <input 
              type="text" name="address" placeholder="Street, City, Zip Code" 
              value={data.address} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Subscription Plan</label>
            <select name="subscriptionPlan" value={data.subscriptionPlan} onChange={handleChange}>
              <option value="basic">Basic Plan</option>
              <option value="premium">Premium Plan</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <div className="full-width form-actions">
            <button type="submit" className="btn-primary">Create Account</button>
            <button type="button" onClick={() => navigate('/admin/dashboard')} className="btn-secondary">Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCompany;