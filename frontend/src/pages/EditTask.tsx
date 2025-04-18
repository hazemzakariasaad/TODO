import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/tasks/${id}`).then((res) => {
      const task = res.data;
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.patch(`/tasks/${id}`, { title, description, dueDate });
    navigate('/dashboard');
  };

  return (
    <div className="task-form-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          className="form-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" className="form-button">Update</button>
      </form>
    </div>
  );
}
