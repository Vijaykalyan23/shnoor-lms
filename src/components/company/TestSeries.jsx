import React, { useState } from 'react';
import '../Dashboard.css';

const TestSeries = () => {
  const [tests] = useState([
    { id: 1, title: 'Midterm Practice', date: '2026-01-15' },
    { id: 2, title: 'Weekly Quiz - Algebra', date: '2026-01-07' },
  ]);

  return (
    <div>
      <h3>Test Series</h3>
      <p>Manage and schedule test series for learners (demo).</p>
      <div style={{ marginTop: 12 }}>
        {tests.map(t => (
          <div key={t.id} style={{ padding: 10, border: '1px solid #eef2f7', borderRadius: 8, marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>{t.title}</div>
            <div style={{ color: '#6b7280' }}>Scheduled: {t.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestSeries;
