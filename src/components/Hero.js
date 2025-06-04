import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/membership');
  };

  return (
    <section className="hero-section" data-aos="fade-up">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="https://cdn.videvo.net/videvo_files/video/free/2019-07/small_watermarked/190705_01_Binary_Code_4k_001_preview.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
          <h1>Innovate. Integrate. Impact.</h1>
          <p>Join our tech community and elevate your coding skills with workshops and resources.</p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400">
            <button className="btn-outline">Explore</button>
            <button className="btn-solid" onClick={handleJoinClick}>Join</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
