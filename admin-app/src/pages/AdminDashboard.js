import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAddingEvent, setIsAddingEvent] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchBlogs();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!title || !date || !description) {
      setError('Please fill all event fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/admin/events', { title, date, description });
      setSuccess('Event added successfully');
      setTitle('');
      setDate('');
      setDescription('');
      fetchEvents();
    } catch (err) {
      setError('Failed to add event');
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!title || !content) {
      setError('Please fill all blog fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/admin/blogs', { title, content });
      setSuccess('Blog added successfully');
      setTitle('');
      setContent('');
      fetchBlogs();
    } catch (err) {
      setError('Failed to add blog');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="toggle-buttons">
        <button
          onClick={() => setIsAddingEvent(true)}
          className={isAddingEvent ? 'active' : ''}
        >
          Add Event
        </button>
        <button
          onClick={() => setIsAddingEvent(false)}
          className={!isAddingEvent ? 'active' : ''}
        >
          Add Blog
        </button>
      </div>
      {isAddingEvent ? (
        <form onSubmit={handleAddEvent} className="form-container">
          <h3>Add New Event</h3>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
          />
          <button type="submit" className="submit-button">
            Add Event
          </button>
        </form>
      ) : (
        <form onSubmit={handleAddBlog} className="form-container">
          <h3>Add New Blog</h3>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea-field"
          />
          <button type="submit" className="submit-button">
            Add Blog
          </button>
        </form>
      )}
      <h3>Existing Events</h3>
      <ul className="item-list">
        {events.map((event) => (
          <li key={event.id} className="item">
            <strong>{event.title}</strong> - {event.date}
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
      <h3>Existing Blogs</h3>
      <ul className="item-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="item">
            <strong>{blog.title}</strong>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
