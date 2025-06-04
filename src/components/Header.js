import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    let ticking = false;
    const threshold = 10;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const delta = scrollTop - lastScrollTop;

          if (Math.abs(delta) > threshold) {
            if (delta > 0 && scrollTop > 50) {
              // Scrolling down
              setScrolled(true);
            } else if (delta < 0) {
              // Scrolling up
              setScrolled(false);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="logo-container">
          <h1 className="logo">Codeunia</h1>
        </div>
        <nav className="nav-container">
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/membership" className={location.pathname === '/membership' ? 'active' : ''}>
                Membership
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="toggle-container">
        <div
            className={`toggle-switch dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
            onClick={toggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDarkMode();
              }
            }}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <div className="toggle-thumb">
              <div className="clouds">
                <div className="cloud cloud1"></div>
                <div className="cloud cloud2"></div>
              </div>
              <div className="moon"></div>
              <div className="stars">
                <div className="star star1"></div>
                <div className="star star2"></div>
                <div className="star star3"></div>
                <div className="star star4"></div>
                <div className="star star5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
