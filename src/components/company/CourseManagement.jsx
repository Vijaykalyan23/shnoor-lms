import React, { useState } from 'react';
import '../Dashboard.css';

const CourseManagement = () => {
  const [courses] = useState([
    { id: 1, title: 'Intro to Biology', lessons: 8, duration: 120 },
    { id: 2, title: 'Algebra Basics', lessons: 12, duration: 180 },
    { id: 3, title: 'World History', lessons: 6, duration: 100 },
  ]);

  return (
    <div>
      <h3>Course Management</h3>
      <p>Manage courses, modules and metadata (demo list below).</p>
      <div style={{ marginTop: 12 }}>
        {courses.map(c => (
          <div key={c.id} style={{ padding: '10px', border: '1px solid #eef2f7', borderRadius: 8, marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>{c.title}</div>
            <div style={{ color: '#6b7280' }}>{c.lessons} lessons • {c.duration} minutes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
