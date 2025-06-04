import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section fade-in">
      <div className="background-images">
        <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" alt="Background 1" className="bg-image bg-image-1" />
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" alt="Background 2" className="bg-image bg-image-2" />
      </div>
      <div className="about-content-wrapper">
        <h2>About Us</h2>
        <h3>Empowering Coders Through Community</h3>
        <p>
          Codeunia is a next-gen platform designed to empower learners, creators, and tech enthusiasts through real-world projects, curated learning experiences, and a strong community ecosystem. We blend education with innovation — providing tools, resources, and mentorship to help individuals not just learn code, but build with it. From beginner-friendly challenges to advanced development projects, Codeunia is the launchpad for tomorrow’s problem-solvers.
        </p>
        <p>
          Whether you’re a student, developer, or startup enthusiast — Codeunia is your space to learn, build, and belong.
        </p>

        <div className="flash-cards">
          <div className="flash-card">
            <h3 className="flash-number">150+</h3>
            <p>Members</p>
          </div>
          <div className="flash-card">
            <h3 className="flash-number">5+</h3>
            <p>Colleges</p>
          </div>
        </div>

        <h3>Mission</h3>
        <p>
          To bridge the gap for IoT enthusiasts by creating a space where ideas meet execution — helping learners go beyond tutorials and build real-world, impactful tech projects through collaboration, resources, and guidance.
        </p>

        <h3>Vision</h3>
        <p>
          To shape India’s most powerful student-led tech ecosystem, where passion meets practice — empowering learners and creators across domains like coding, IoT, AI, and innovation to experiment, build, and lead with confidence.
        </p>

        <h3>Core Team</h3>
        <div className="core-team">
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
            <h4>John Doe</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" />
            <h4>Jane Smith</h4>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="Mike Johnson" />
            <h4>Mike Johnson</h4>
            <p>Head of Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
