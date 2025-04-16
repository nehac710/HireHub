import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/JobListing.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Extract unique skills from all jobs
    const skills = new Set();
    jobs.forEach(job => {
      if (job.skills_required) {
        job.skills_required.forEach(skill => skills.add(skill));
      }
    });
    setAllSkills(Array.from(skills).sort());
  }, [jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleApply = async (jobId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Check if user is a freelancer
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (profile.role !== 'freelancer') {
        setError('Only freelancers can apply for jobs');
        return;
      }

      // TODO: Implement application logic
      console.log('Applying for job:', jobId);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.public_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesSkills = selectedSkills.length === 0 || 
                         (job.skills_required && 
                          selectedSkills.every(skill => job.skills_required.includes(skill)));
    return matchesSearch && matchesCategory && matchesSkills;
  });

  if (loading) {
    return (
      <div className="job-listing-container">
        <div className="loading">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-listing-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="job-listing-container">
      <div className="job-listing-header">
        <h1>Find Work</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title, description or project ID..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="skills-filter-container">
          {allSkills.map(skill => (
            <span
              key={skill}
              className={`skill-filter-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <div className="no-jobs">No jobs found matching your criteria</div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h2>{job.title}</h2>
                  <div className="project-id">Project ID: {job.public_id}</div>
                </div>
                <div className="job-meta">
                  <span className="job-type">{job.category}</span>
                </div>
              </div>

              <div className="job-description">
                <p>{job.description}</p>
              </div>

              <div className="job-details">
                <div className="budget">
                  <span>Budget: ${job.budget_min} - ${job.budget_max}</span>
                </div>
                <div className="skills">
                  {job.skills_required.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="deadline">
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="job-footer">
                <button
                  className="btn-primary"
                  onClick={() => handleApply(job.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListing; 