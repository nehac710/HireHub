import React, { useState } from 'react';
import '../styles/ClientDashboard.css';

const ClientDashboard = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    company: 'Tech Solutions Inc.',
    email: 'john@techsolutions.com',
    location: 'New York, USA',
    bio: 'Looking for talented developers to join our team.',
    rating: 4.5,
    totalProjects: 12,
    activeProjects: 3
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Client Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="dashboard-content">
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{profile.name.charAt(0)}</span>
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p className="company">{profile.company}</p>
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-value">{profile.rating}</span>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>Total Projects</h3>
              <p>{profile.totalProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p>{profile.activeProjects}</p>
            </div>
          </div>

          <div className="profile-details">
            {isEditing ? (
              <form className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
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
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
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
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p>Posted a new project</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">💬</div>
              <div className="activity-content">
                <p>Received a proposal</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p>Project completed</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 