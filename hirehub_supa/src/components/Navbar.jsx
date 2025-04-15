import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-text">HireHub</Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/find-talent" className="nav-link">Find Talent</Link>
          <Link to="/find-work" className="nav-link">Find Work</Link>
          <Link to="/why-hirehub" className="nav-link">Why HireHub</Link>
          <Link to="/signup" className="nav-button secondary">Sign Up</Link>
          <Link to="/login" className="nav-button primary">Sign In</Link>
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