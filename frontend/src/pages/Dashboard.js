// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(8); // cards per page
  const [priority, setPriority] = useState(''); // '' means all
  const navigate = useNavigate();

  const loadTasks = async (p = 1, pr = '') => {
    try {
      setLoading(true);
      const q = new URLSearchParams();
      q.append('page', p);
      q.append('limit', limit);
      if (pr) q.append('priority', pr);
      const res = await API.get(`/tasks?${q.toString()}`);
      setTasks(res.data.tasks || []);
      setPage(res.data.page || p);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error('Load tasks error', err);
      // if unauthorized, remove token and redirect
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> { loadTasks(page, priority); }, []); // initial load

  const handlePriorityChange = (e) => {
    const val = e.target.value;
    setPriority(val);
    // load page 1 with that filter
    loadTasks(1, val);
    setPage(1);
  };

  const changeStatus = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}/status`, { status });
      loadTasks(page, priority);
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (id) => {
    if(!window.confirm('Are you sure to delete?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      // If last item on page removed and now empty, go to previous page if possible
      const willReloadPage = tasks.length === 1 && page > 1 ? page - 1 : page;
      loadTasks(willReloadPage, priority);
    } catch (err) { console.error(err); }
  };

  const goPrev = () => {
    if (page <= 1) return;
    const np = page - 1;
    setPage(np);
    loadTasks(np, priority);
  };
  const goNext = () => {
    if (page >= pages) return;
    const np = page + 1;
    setPage(np);
    loadTasks(np, priority);
  };

  return (
    <div className="container">
      <div className="h-row card" style={{ alignItems: 'center' }}>
        <div>
          <h2>My Tasks</h2>
          <p style={{ margin:0, color:'#6b7280' }}>Overview of your assigned and created tasks</p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <select value={priority} onChange={handlePriorityChange} style={{ padding:'8px', borderRadius:8, border:'1px solid #e6e9ef' }}>
            <option value=''>All priorities</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>

          <button onClick={()=> navigate('/create')} className="small" style={{ background:'#06b6d4', color:'#052a2a' }}>Create Task</button>
          <button onClick={()=> loadTasks(page, priority)} className="small secondary">Refresh</button>
        </div>
      </div>

      <div className="card">
        {loading ? <div className="empty">Loading tasks...</div> : <TaskList tasks={tasks} onStatusChange={changeStatus} onDelete={deleteTask} />}
      </div>

      {/* Pagination footer */}
      <div style={{ maxWidth:980, margin:'6px auto', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10 }}>
        <div style={{ color:'#6b7280' }}>
          Page {page} of {pages} • { /* show counts if needed */ }
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={goPrev} className="small ghost" disabled={page<=1}>Prev</button>
          <button onClick={goNext} className="small ghost" disabled={page>=pages}>Next</button>
        </div>
      </div>
    </div>
  );
}
