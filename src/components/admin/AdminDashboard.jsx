import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [companies, setCompanies] = useState([
    { id: 1, name: "Springfield High", email: "admin@springfield.edu", status: "Active" },
    { id: 2, name: "City College", email: "contact@citycollege.com", status: "Pending" },
    { id: 3, name: "Tech Institute", email: "info@techinst.com", status: "Active" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Remove this company?")) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Companies</span>
          <div className="stat-number">{companies.length}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Licenses</span>
          <div className="stat-number">10</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending Requests</span>
          <div className="stat-number">1</div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Registered Companies</h3>
          <button className="btn-primary" onClick={() => navigate('/admin/add-company')}>
            + Add Company
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: '500' }}>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500',
                    background: c.status === 'Active' ? '#dcfce7' : '#fef9c3',
                    color: c.status === 'Active' ? '#166534' : '#854d0e'
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleDelete(c.id)} className="btn-icon delete" title="Remove Company">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;