import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinUs.css';

function JoinUs() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/membership');
  };

  return (
    <section className="join-us-section" data-aos="fade-up">
      <div className="container">
        <h2>Join Us</h2>
        <p>Become a member of Codeunia and be part of a vibrant tech community. Gain access to exclusive workshops, hackathons, mentorship, and networking opportunities.</p>
        <button className="join-button" onClick={handleJoinClick}>
          Become a Member
        </button>
      </div>
    </section>
  );
}

export default JoinUs;
