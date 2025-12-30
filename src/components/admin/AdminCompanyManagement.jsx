import React, { useState } from 'react';
import '../Dashboard.css';

const AdminCompanyManagement = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Green Valley School', email: 'contact@greenvalley.edu', status: 'Active' },
    { id: 2, name: 'Metro College', email: 'info@metrocollege.com', status: 'Pending' },
    { id: 3, name: 'Tech Academy', email: 'hello@techacademy.com', status: 'Active' },
  ]);

  const remove = (id) => setCompanies(companies.filter(c => c.id !== id));

  return (
    <div>
      <h3>COMPANY MANAGEMENT</h3>
      <p>Listing of registered companies (demo data).</p>

      <div className="table-container" style={{ marginTop: 12 }}>
        <table>
          <thead>
            <tr><th>Company</th><th>Email</th><th>Status</th><th style={{ textAlign: 'right' }}>Action</th></tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.status}</td>
                <td style={{ textAlign: 'right' }}><button className="btn-icon delete" onClick={() => remove(c.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompanyManagement;
