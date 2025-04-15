import React, { useState } from 'react';
import '../styles/JobApplication.css';

const JobApplication = () => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    proposalText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit to your backend
    console.log('Application submitted:', {
      ...formData,
      projectId: '123', // This would come from the job listing
      clientId: '456', // This would come from the job listing
      freelancerId: '789', // This would come from the logged-in user
    });
  };

  return (
    <div className="job-application-container">
      <div className="job-application-header">
        <h1>Submit Your Proposal</h1>
        <p className="job-title">Senior Web Developer Position</p>
        <p className="company-name">Tech Solutions Inc.</p>
      </div>

      <div className="job-application-content">
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="bidAmount">Your Bid Amount ($)</label>
            <div className="bid-input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                value={formData.bidAmount}
                onChange={handleChange}
                placeholder="Enter your bid amount"
                min="0"
                step="0.01"
                required
              />
            </div>
            <p className="bid-hint">Enter the amount you want to charge for this project</p>
          </div>

          <div className="form-group">
            <label htmlFor="proposalText">Your Proposal</label>
            <textarea
              id="proposalText"
              name="proposalText"
              value={formData.proposalText}
              onChange={handleChange}
              placeholder="Describe why you're the best fit for this project. Include your relevant experience, approach to the project, and any other important details."
              rows="8"
              required
            />
            <p className="proposal-hint">Minimum 100 characters</p>
          </div>

          <div className="form-group">
            <label>Project Details</label>
            <div className="project-details">
              <div className="detail-item">
                <span className="detail-label">Project ID:</span>
                <span className="detail-value">123</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Client ID:</span>
                <span className="detail-value">456</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Your ID:</span>
                <span className="detail-value">789</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication; 