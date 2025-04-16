import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/JobPosting.css';

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget_min: '',
    budget_max: '',
    category: '',
    skills_required: [],
    deadline: '',
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

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills_required: skills
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

      // Validate budget range
      if (parseFloat(formData.budget_min) > parseFloat(formData.budget_max)) {
        throw new Error('Minimum budget cannot be greater than maximum budget');
      }

      // Validate deadline
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate <= today) {
        throw new Error('Deadline must be in the future');
      }

      const { error: jobError } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            budget_min: parseFloat(formData.budget_min),
            budget_max: parseFloat(formData.budget_max),
            category: formData.category,
            skills_required: formData.skills_required,
            deadline: formData.deadline,
            client_id: user.id,
            status: 'open',
            created_at: new Date().toISOString()
          }
        ]);

      if (jobError) throw jobError;

      navigate('/client-dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-posting-container">
      <div className="job-posting-header">
        <h1>Post a New Job</h1>
      </div>
      <div className="job-posting-content">
        <form onSubmit={handleSubmit} className="job-posting-form">
          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job requirements and responsibilities"
              rows="5"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget_min">Minimum Budget ($)</label>
              <input
                type="number"
                id="budget_min"
                name="budget_min"
                value={formData.budget_min}
                onChange={handleChange}
                placeholder="Minimum budget"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget_max">Maximum Budget ($)</label>
              <input
                type="number"
                id="budget_max"
                name="budget_max"
                value={formData.budget_max}
                onChange={handleChange}
                placeholder="Maximum budget"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="design">Design</option>
              <option value="writing">Writing</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="skills_required">Required Skills (comma-separated)</label>
            <input
              type="text"
              id="skills_required"
              name="skills_required"
              value={formData.skills_required.join(', ')}
              onChange={handleSkillsChange}
              placeholder="e.g., React, Node.js, UI/UX"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Application Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPosting; 