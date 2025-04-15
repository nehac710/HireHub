import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSetup.css';

const ProfileSetup = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    if (type === 'freelancer') {
      navigate('/test/freelancer-profile-setup');
    } else if (type === 'client') {
      navigate('/test/client-profile-setup');
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        <h2>Welcome! Let's set up your profile</h2>
        <p className="step-description">First, tell us who you are</p>
        <div className="user-type-selection">
          <button
            className={`user-type-btn ${userType === 'freelancer' ? 'selected' : ''}`}
            onClick={() => handleUserTypeSelect('freelancer')}
          >
            <span className="icon">👨‍💻</span>
            <span className="label">I'm a Freelancer</span>
            <span className="description">Looking for work opportunities</span>
          </button>
          <button
            className={`user-type-btn ${userType === 'client' ? 'selected' : ''}`}
            onClick={() => handleUserTypeSelect('client')}
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