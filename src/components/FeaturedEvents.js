import React, { useEffect, useState } from 'react';
import './FeaturedEvents.css';

function FeaturedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => {
        console.error('Error fetching events:', error);
        setEvents([]);
      });
  }, []);

  return (
    <section className="featured-events-section" data-aos="fade-up">
      <div className="container">
        <h2>Featured Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <ul className="events-list">
            {events.map(event => (
              <li key={event.id} className="event-item">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default FeaturedEvents;
