import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <span className="logo-text">HireHub</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link">Find Talent</a>
          <a href="#" className="nav-link">Find Work</a>
          <a href="#" className="nav-link">Why HireHub</a>
          <button className="nav-button secondary">Sign Up</button>
          <button className="nav-button primary">Sign In</button>
        </div>

        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 