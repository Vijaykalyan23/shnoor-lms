import React from 'react';
import '../Dashboard.css';

const LearnerCourses = () => {
  const courses = [
    { id: 1, title: 'Intro to Biology', duration: 12, progress: 100 },
    { id: 2, title: 'Algebra Basics', duration: 25, progress: 70 },
    { id: 3, title: 'World History', duration: 40, progress: 40 },
  ];

  return (
    <div>
      <h3>Courses</h3>
      <p>Available and enrolled courses with progress.</p>
      <div style={{ marginTop: '12px' }}>
        {courses.map(c => (
          <div key={c.id} style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '10px' }}>
            <div style={{ fontWeight: 600 }}>{c.title}</div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>{c.duration} minutes • Progress: {c.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerCourses;
