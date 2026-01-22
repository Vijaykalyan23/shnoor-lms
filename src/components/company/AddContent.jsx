import React, { useState } from 'react';
import '../Dashboard.css';

const AddContent = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Getting Started - Video', type: 'video', duration: 12 },
    { id: 2, title: 'Chapter 1 - Notes', type: 'document', duration: 0 },
  ]);
  const [form, setForm] = useState({ title: '', type: 'video', duration: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const next = { id: Date.now(), title: form.title || 'Untitled', type: form.type, duration: Number(form.duration) || 0 };
    setItems([next, ...items]);
    setForm({ title: '', type: 'video', duration: '' });
  };

  return (
    <div>
      <h3>Add Content</h3>
      <p>Upload or create course content (demo form).</p>

      <form onSubmit={handleAdd} style={{ marginTop: 12, display: 'grid', gap: 8, maxWidth: 520 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="video">Video</option>
          <option value="document">Document</option>
          <option value="quiz">Quiz</option>
        </select>
        <input placeholder="Duration (minutes)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
        <button className="btn-primary" type="submit">Add Content</button>
      </form>

      <div style={{ marginTop: 16 }}>
        {items.map(i => (
          <div key={i.id} style={{ padding: 10, border: '1px solid #eef2f7', borderRadius: 8, marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>{i.title}</div>
            <div style={{ color: '#6b7280' }}>{i.type} {i.duration ? '• ' + i.duration + ' min' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddContent;
