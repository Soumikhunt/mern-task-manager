// src/components/TaskList.js
import React from 'react';

function formatDate(d){
  if(!d) return 'No due date';
  try { return new Date(d).toLocaleDateString(); } catch(e){ return d; }
}

export default function TaskList({ tasks = [], onStatusChange = ()=>{}, onDelete = ()=>{} }){
  if(!tasks || tasks.length === 0) return <div className="card empty">No tasks to show yet — create one from API or backend.</div>;

  return (
    <div className="task-list">
      {tasks.map(t => (
        <div className="task card" key={t._id}>
          <div className="title">{t.title}</div>
          <div className="meta">{t.description || 'No description'}</div>
          <div className="meta">Due: {formatDate(t.dueDate)}</div>
          <div style={{ marginTop:8 }}>
            <span className={`badge ${t.priority === 'High' ? 'high' : t.priority === 'Medium' ? 'medium' : 'low'}`}>
              {t.priority}
            </span>
            <span style={{ marginLeft:8, color:'#475569', fontWeight:600 }}>{t.status}</span>
          </div>

          <div className="actions">
            <button className="small secondary" onClick={()=> onStatusChange(t._id, t.status === 'pending' ? 'completed' : 'pending')}>
              {t.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
            </button>
            <button className="small ghost" onClick={()=> onDelete(t._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
