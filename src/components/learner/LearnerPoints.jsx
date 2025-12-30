import React from 'react';
import '../Dashboard.css';

const LearnerPoints = () => {
  const leaderboard = [
    { id: 1, name: 'Alice', points: 240 },
    { id: 2, name: 'You', points: 137 },
    { id: 3, name: 'Bob', points: 120 },
  ];

  return (
    <div>
      <h3>Points / Ranking</h3>
      <p>Points are calculated from completed content duration (demo).</p>

      <div style={{ marginTop: '12px' }}>
        {leaderboard.map((p, idx) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid #f3f4f6' }}>
            <div>{idx + 1}. {p.name}</div>
            <div style={{ fontWeight: 700 }}>{p.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerPoints;
