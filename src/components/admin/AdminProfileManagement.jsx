import React from 'react';
import '../Dashboard.css';

const AdminProfileManagement = () => {
  return (
    <div>
      <h3>PROFILE MANAGEMENT</h3>
      <p>Manage admin/company/profile settings and preferences here.</p>
      <div style={{ marginTop: 12 }}>
        <div style={{ padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ fontWeight: 600 }}>Platform Settings</div>
          <div style={{ color: '#6b7280' }}>Timezone, branding and default preferences (demo)</div>
        </div>
        <div style={{ padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ fontWeight: 600 }}>Admin Profile</div>
          <div style={{ color: '#6b7280' }}>Name, email and contact (demo)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileManagement;
