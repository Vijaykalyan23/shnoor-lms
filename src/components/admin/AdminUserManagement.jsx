import React, { useState } from 'react';
import '../Dashboard.css';

const AdminUserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'Admin', email: 'admin@shnoor.com', role: 'admin' },
    { id: 2, name: 'School Admin', email: 'admin@greenvalley.edu', role: 'company' },
    { id: 3, name: 'Learner A', email: 'learnerA@test.com', role: 'learner' },
  ]);

  return (
    <div>
      <h3>USER MANAGEMENT</h3>
      <p>Platform users and roles (demo).</p>
      <div style={{ marginTop: 12 }}>
        {users.map(u => (
          <div key={u.id} style={{ padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ fontWeight: 600 }}>{u.name} <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>({u.email})</span></div>
            <div style={{ fontSize: '0.9rem', color: '#374151' }}>Role: {u.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserManagement;
