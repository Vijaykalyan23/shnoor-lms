import React, { useState } from 'react';
import '../Dashboard.css';

// Simple demo: points are calculated from total duration of completed videos (minutes -> points)
const LearnerDashboard = () => {
  // sample completed items with duration in minutes
  const [completed, setCompleted] = useState([
    { id: 1, title: 'Intro to Biology', duration: 12 },
    { id: 2, title: 'Algebra Basics', duration: 25 },
    { id: 3, title: 'World History', duration: 40 },
  ]);

  // points policy: 1 point per minute watched (placeholder — replace with your logic)
  const totalMinutes = completed.reduce((s, c) => s + c.duration, 0);
  const points = totalMinutes; // 1 minute = 1 point

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Courses Enrolled</span>
          <div className="stat-number">{completed.length}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Minutes Completed</span>
          <div className="stat-number">{totalMinutes}</div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Points</span>
          <div className="stat-number">{points}</div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Your Completed Content</h3>
        <ul>
          {completed.map(c => (
            <li key={c.id} style={{ margin: '8px 0' }}>
              <strong>{c.title}</strong> — {c.duration} minutes
            </li>
          ))}
        </ul>
        <p style={{ color: '#6b7280' }}>Points are currently calculated as 1 point per minute of completed video content. You can adjust this policy later.</p>
      </div>
    </div>
  );
};

export default LearnerDashboard;
