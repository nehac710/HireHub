import React, { useState } from 'react';
import '../styles/FreelancerDashboard.css';

const FreelancerDashboard = () => {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    email: 'sarah@example.com',
    location: 'San Francisco, USA',
    bio: 'Passionate about building scalable web applications with modern technologies.',
    rating: 4.8,
    hourlyRate: 75,
    totalProjects: 25,
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React and Node.js',
        image: 'https://via.placeholder.com/300x200'
      },
      {
        title: 'Task Management App',
        description: 'Developed a collaborative task management application',
        image: 'https://via.placeholder.com/300x200'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfile(prev => ({
      ...prev,
      skills
    }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Freelancer Dashboard</h1>
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
              <p className="title">{profile.title}</p>
              <div className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-value">{profile.rating}</span>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>Hourly Rate</h3>
              <p>${profile.hourlyRate}/hr</p>
            </div>
            <div className="stat-card">
              <h3>Total Projects</h3>
              <p>{profile.totalProjects}</p>
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
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={profile.title}
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
                  <label>Hourly Rate</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={profile.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input
                    type="text"
                    value={profile.skills.join(', ')}
                    onChange={handleSkillChange}
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
                <div className="skills-section">
                  <h3>Skills</h3>
                  <div className="skills-list">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="portfolio-section">
          <h3>Portfolio</h3>
          <div className="portfolio-grid">
            {profile.portfolio.map((item, index) => (
              <div key={index} className="portfolio-item">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard; 