// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Task } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 400)); // Simulated delay
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (task: Task) => {
    await axios.patch(`/tasks/${task._id}`, { completed: !task.completed });
    load();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this task?')) {
      await axios.delete(`/tasks/${id}`);
      load();
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tasks</h1>

      {loading ? (
        <div className="spinner-center">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h2 className="task-title">
                <Link to={`/tasks/${task._id}`}>{task.title}</Link>
              </h2>
              <p className="task-desc">{task.description || 'No description'}</p>
              <p className="task-due">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
              <div className="task-status">
                <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)} />
                <span>{task.completed ? 'Completed' : 'Pending'}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => navigate(`/tasks/${task._id}`)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
