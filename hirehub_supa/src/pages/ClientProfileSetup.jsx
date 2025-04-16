import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSetup.css';

const ClientProfileSetup = () => {
  const [formData, setFormData] = useState({
    display_name: '',
    company: '',
    location: '',
    bio: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: profileError } = await supabase
        .from('client_profiles')
        .insert([
          {
            user_id: user.id,
            display_name: formData.display_name,
            company: formData.company,
            location: formData.location,
            bio: formData.bio,
          }
        ]);

      if (profileError) throw profileError;

      navigate('/client-dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        <h2>Complete Your Client Profile</h2>
        <p className="step-description">Tell us about yourself and your company</p>
        <form onSubmit={handleSubmit} className="setup-form">
          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="display_name">Display Name</label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Enter your display name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Company Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your company and what you're looking for"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientProfileSetup;

