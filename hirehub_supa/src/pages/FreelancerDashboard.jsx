import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/FreelancerDashboard.css';

const FreelancerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
          .from('freelancer_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('freelancer_profiles')
        .update({
          display_name: profile.display_name,
          domain: profile.domain,
          location: profile.location,
          bio: profile.bio,
          hourly_rate: profile.hourly_rate,
          skills: profile.skills,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star">☆</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="error-message">Profile not found. Please complete your profile setup.</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Freelancer Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-summary">
        <div className="profile-left">
          <div className="profile-avatar">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.display_name} />
            ) : (
              <span>{profile.display_name.charAt(0)}</span>
            )}
          </div>
          <div className="profile-contact">
            <p className="location">{profile.location}</p>
            <p className="email">{profile.email}</p>
          </div>
        </div>
        
        <div className="profile-info">
          <h2>{profile.display_name}</h2>
          <p className="domain">{profile.domain}</p>
          <div className="rating">
            {renderStars(profile.rating || 0)}
            <span className="rating-value">({profile.rating || '0.0'})</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Hourly Rate</span>
            <span className="detail-value">${profile.hourly_rate}/hr</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Reviews</span>
            <span className="detail-value">{profile.reviews_count || '0'}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="profile-section">
          <h3>About Me</h3>
          {isEditing ? (
            <form className="edit-form">
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  name="display_name"
                  value={profile.display_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={profile.domain}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Hourly Rate ($)</label>
                <input
                  type="number"
                  name="hourly_rate"
                  value={profile.hourly_rate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills.join(', ')}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          ) : (
            <>
              <p className="bio">{profile.bio}</p>
              <div className="skills-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {profile.skills && profile.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-section">
        <h3>Portfolio</h3>
        <div className="portfolio-grid">
          {profile.portfolio && profile.portfolio.map((item, index) => (
            <div key={index} className="portfolio-item">
              <img src={item.image_url} alt={item.title} />
              <div className="portfolio-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          {(!profile.portfolio || profile.portfolio.length === 0) && (
            <div className="empty-portfolio">
              <p>No portfolio items yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard; 