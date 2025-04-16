import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isClientDashboard = location.pathname === '/client-dashboard';
  const isFreelancerDashboard = location.pathname === '/freelancer-dashboard';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboardPage = isClientDashboard || isFreelancerDashboard;

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      // Only redirect to home if not on auth pages and session is lost
      if (!session && !isAuthPage) {
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isAuthPage]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-text">HireHub</Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {!isFreelancerDashboard && <Link to="/job-posting" className="nav-link">Post Job</Link>}
          {!isClientDashboard && <Link to="/job-listing" className="nav-link">Find Work</Link>}
          <Link to="/why-hirehub" className="nav-link">Why HireHub</Link>
          {isLoggedIn ? (
            <>
              {!isDashboardPage && (
                <button 
                  className="back-to-dashboard-button"
                  onClick={() => navigate(isClientDashboard ? '/client-dashboard' : '/freelancer-dashboard')}
                >
                  Back to Dashboard
                </button>
              )}
              <button onClick={handleLogout} className="nav-button primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-button secondary">Sign Up</Link>
              <Link to="/login" className="nav-button primary">Sign In</Link>
            </>
          )}
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