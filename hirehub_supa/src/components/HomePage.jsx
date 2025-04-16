import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleButtonClick = (path) => {
    if (!isLoggedIn) {
      alert('Please log in to continue');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find the Perfect Freelancer for Your Project</h1>
          <p>Connect with top talent from around the world and get your work done efficiently</p>
          <div className="hero-buttons">
            <button 
              onClick={() => handleButtonClick('/test/job-posting')} 
              className="hero-button primary"
            >
              Post a Job
            </button>
            <button 
              onClick={() => handleButtonClick('/test/job-listing')} 
              className="hero-button secondary"
            >
              Find Work
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Freelancers</span>
            </div>
            <div className="stat">
              <span className="stat-number">8K+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="src\assets\freelancer.jpg" alt="Freelancing" />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose HireHub?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Matching</h3>
            <p>Find the right talent in minutes, not hours</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Secure Payments</h3>
            <p>Your payments are always protected</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Top Quality</h3>
            <p>Access to verified expert freelancers</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <span className="category-icon">💻</span>
            <h3>Web Development</h3>
            <p>1,200+ experts</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🎨</span>
            <h3>Design</h3>
            <p>800+ experts</p>
          </div>
          <div className="category-card">
            <span className="category-icon">📱</span>
            <h3>Mobile Apps</h3>
            <p>600+ experts</p>
          </div>
          <div className="category-card">
            <span className="category-icon">📝</span>
            <h3>Content Writing</h3>
            <p>900+ experts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 