import React, { useState } from 'react';
import '../Dashboard.css';

const DeleteContent = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Intro Video' },
    { id: 2, title: 'Chapter 1 Notes' },
    { id: 3, title: 'Quiz 1' },
  ]);

  const del = (id) => {
    if (window.confirm('Delete this content?')) setItems(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <h3>Delete Content</h3>
      <p>Remove or archive course content (demo).</p>
      <div style={{ marginTop: 12 }}>
        {items.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: '1px solid #f3f4f6' }}>
            <div>{i.title}</div>
            <button className="btn-icon delete" onClick={() => del(i.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteContent;
