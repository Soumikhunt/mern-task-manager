// src/pages/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load task');
      }
    };
    loadTask();
  }, [id]);

  if (error) return <div className="container"><div className="card">{error}</div></div>;
  if (!task) return <div className="container"><div className="card">Loading task...</div></div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <div style={{ marginTop: '16px' }}>
          <button onClick={() => navigate(`/tasks/${id}/edit`)} className="small secondary">Edit</button>
          <button onClick={() => navigate('/dashboard')} className="small ghost">Back</button>
        </div>
      </div>
    </div>
  );
}
