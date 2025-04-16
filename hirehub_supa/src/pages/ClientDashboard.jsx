import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/ClientDashboard.css';

const ClientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Fetch client profile
        const { data, error } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);

        // Fetch user's projects
        fetchProjects(user.id);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async (userId) => {
      const { data, error } = await supabase
        .from('projects')
        .select('public_id, title')
        .eq('client_id', userId);

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
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
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('client_profiles')
        .update({
          display_name: profile.display_name,
          company: profile.company,
          location: profile.location,
          bio: profile.bio,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
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
        <h1>Client Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="dashboard-content">
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{profile.display_name.charAt(0)}</span>
            </div>
            <div className="profile-info">
              <h2>{profile.display_name}</h2>
              <p className="company">{profile.company}</p>
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-value">4.5</span>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>Total Projects</h3>
              <p>{profile.total_projects || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p>{profile.active_projects || 0}</p>
            </div>
          </div>

          <div className="profile-details">
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
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={profile.company}
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
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            ) : (
              <div className="profile-info-display">
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              projects.map((project) => (
                <div className="activity-item" key={project.public_id}>
                  <h4>{project.title}</h4>
                  <p><strong>Project ID:</strong> {project.public_id}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
