// src/pages/TaskForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // যদি edit মোড হয়, task data লোড করবে
      API.get(`/tasks/${id}`)
        .then(res => {
          const t = res.data;
          setForm({
            title: t.title || '',
            description: t.description || '',
            dueDate: t.dueDate ? t.dueDate.substring(0, 10) : '',
            priority: t.priority || 'Medium'
          });
        })
        .catch(err => setError('Failed to load task'));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/tasks/${id}`, form);
        alert('Task updated!');
      } else {
        await API.post('/tasks', form);
        alert('Task created!');
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong!');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Description</label>
            <input name="description" value={form.description} onChange={handleChange} />
          </div>
          <div>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          </div>
          <div>
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button type="submit" style={{ marginTop: '12px' }}>
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
