import React from 'react';
import './Services.css';

function Services() {
  return (
    <section id="services" className="services-section" data-aos="fade-up">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-item fade-in" data-aos="fade-up" data-aos-delay="100">
            <h3>Custom Software Development</h3>
            <p>Tailored software solutions to meet your unique business needs.</p>
          </div>
          <div className="service-item fade-in" data-aos="fade-up" data-aos-delay="200">
            <h3>Cloud Solutions</h3>
            <p>Scalable and secure cloud infrastructure and services.</p>
          </div>
          <div className="service-item fade-in" data-aos="fade-up" data-aos-delay="300">
            <h3>AI & Machine Learning</h3>
            <p>Advanced AI models to drive innovation and efficiency.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
