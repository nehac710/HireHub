import React, { useState } from 'react';
import '../styles/ProfileSetup.css';

const FreelancerProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    skills: [],
    experience: '',
    portfolio: '',
    hourlyRate: '',
    availability: 'full-time',
    education: '',
    certifications: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    console.log('Freelancer profile setup completed:', formData);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="setup-step">
            <h2>Basic Information</h2>
            <p className="step-description">Tell us about yourself</p>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
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
                placeholder="Write a professional bio highlighting your expertise"
                rows="4"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="setup-step">
            <h2>Professional Details</h2>
            <p className="step-description">Help clients find you</p>
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
            <div className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter years of experience"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hourlyRate">Hourly Rate ($)</label>
              <input
                type="number"
                id="hourlyRate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="Enter your hourly rate"
                min="0"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="setup-step">
            <h2>Additional Information</h2>
            <p className="step-description">Tell us more about your background</p>
            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="education">Education</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="List your educational background"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="certifications">Certifications</label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="List any relevant certifications"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="portfolio">Portfolio URL</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://your-portfolio.com"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-content">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <form onSubmit={handleSubmit} className="setup-form">
          {renderStep()}
          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Complete Setup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerProfileSetup; 