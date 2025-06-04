import React, { useState } from 'react';
import './HackathonsEvents.css';

function HackathonsEvents() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Sample Hackathon', date: '2024-06-30', description: 'A sample hackathon event.' },
  ]);
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.description) {
      const newEvent = {
        id: events.length + 1,
        title: formData.title,
        date: formData.date,
        description: formData.description,
      };
      setEvents([...events, newEvent]);
      setFormData({ title: '', date: '', description: '' });
    }
  };

  return (
    <section className="hackathons-events-section" data-aos="fade-up">
      <div className="container">
        <h2>Manage Hackathons & Events</h2>
        <form className="event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Event</button>
        </form>
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <h3>{event.title}</h3>
              <p className="event-date">{event.date}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HackathonsEvents;
