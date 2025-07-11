import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/ProfileSetup.css';

const ProfileSetup = () => {
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkUser();
  }, [navigate]);

  const handleUserTypeSelect = async (type) => {
    setLoading(true);
    setError(null);
    setUserType(type);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      // Store the user type in user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: user.id,
            role: type,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) throw profileError;

      // Redirect based on user type
      if (type === 'freelancer') {
        navigate('/freelancer-profile-setup');
      } else if (type === 'client') {
        navigate('/client-profile-setup');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        <h2>Welcome! Let's set up your profile</h2>
        <p className="step-description">First, tell us who you are</p>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="user-type-selection">
          <button
            className={`user-type-btn ${userType === 'freelancer' ? 'selected' : ''}`}
            onClick={() => handleUserTypeSelect('freelancer')}
            disabled={loading}
          >
            <span className="icon">👨‍💻</span>
            <span className="label">I'm a Freelancer</span>
            <span className="description">Looking for work opportunities</span>
          </button>
          <button
            className={`user-type-btn ${userType === 'client' ? 'selected' : ''}`}
            onClick={() => handleUserTypeSelect('client')}
            disabled={loading}
          >
            <span className="icon">🏢</span>
            <span className="label">I'm a Client</span>
            <span className="description">Looking to hire talent</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;