import React from 'react';
import './LatestUpdates.css';

function LatestUpdates() {
  // Sample static updates data
  const updates = [
    { id: 1, title: 'New Workshop on React', date: '2024-06-01', description: 'Join our upcoming React workshop to enhance your skills.' },
    { id: 2, title: 'Hackathon Winners Announced', date: '2024-05-20', description: 'Congratulations to the winners of our latest hackathon event!' },
    { id: 3, title: 'Community Meetup', date: '2024-05-15', description: 'Join us for a community meetup to network and share ideas.' },
  ];

  return (
    <section className="latest-updates-section" data-aos="fade-up">
      <div className="container">
        <h2>Latest Updates</h2>
        <ul className="updates-list">
          {updates.map(update => (
            <li key={update.id} className="update-item">
              <h3>{update.title}</h3>
              <p className="update-date">{update.date}</p>
              <p>{update.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LatestUpdates;
