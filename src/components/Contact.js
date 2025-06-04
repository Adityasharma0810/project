import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section" data-aos="fade-up">
      <div className="container">
        <h2>Contact Us</h2>
        <form className="contact-form" data-aos="fade-up" data-aos-delay="100">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
          
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
        <div className="contact-social-buttons">
          <a href="mailto:info@company.com" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Email">
            📧 Email
          </a>
          <a href="https://instagram.com/company" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            📸 Instagram
          </a>
          <a href="https://linkedin.com/company/company" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            💼 LinkedIn
          </a>
          <a href="mailto:info@company.com" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Mail">
            ✉️ Mail
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
