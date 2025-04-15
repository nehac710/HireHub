import React, { useState } from 'react';
import '../styles/JobPosting.css';

const JobPosting = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    skills: '',
    category: 'Web Development',
    experience: 'Entry Level'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Job Posted:', jobData);
  };

  return (
    <div className="job-posting-container">
      <div className="job-posting-header">
        <h1>Post a New Job</h1>
      </div>

      <div className="job-posting-content">
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              placeholder="e.g., Senior React Developer"
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              placeholder="Describe the job requirements and responsibilities..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget (USD)</label>
              <input
                type="number"
                name="budget"
                value={jobData.budget}
                onChange={handleInputChange}
                placeholder="e.g., 1000"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={jobData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 3 months"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={jobData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience Level</label>
              <select
                name="experience"
                value={jobData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Required Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleInputChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPosting; 