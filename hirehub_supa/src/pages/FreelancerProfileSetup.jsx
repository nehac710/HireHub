import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileSetup.css';

const FreelancerProfileSetup = () => {
  const [formData, setFormData] = useState({
    display_name: '',
    domain: '',
    location: '',
    bio: '',
    hourly_rate: '',
    skills: [],
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

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills
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
        .from('freelancer_profiles')
        .insert([
          {
            user_id: user.id,
            display_name: formData.display_name,
            domain: formData.domain,
            location: formData.location,
            bio: formData.bio,
            hourly_rate: parseFloat(formData.hourly_rate),
            skills: formData.skills,
          }
        ]);

      if (profileError) throw profileError;

      navigate('/freelancer-dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        <h2>Complete Your Freelancer Profile</h2>
        <p className="step-description">Tell us about yourself to get started</p>
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
            <label htmlFor="domain">Domain/Expertise</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="e.g., Web Development, Graphic Design"
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
            <label htmlFor="bio">Professional Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your experience and expertise"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hourly_rate">Hourly Rate ($)</label>
            <input
              type="number"
              id="hourly_rate"
              name="hourly_rate"
              value={formData.hourly_rate}
              onChange={handleChange}
              placeholder="Enter your hourly rate"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillChange}
              placeholder="e.g., React, Node.js, UI/UX Design"
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

export default FreelancerProfileSetup;