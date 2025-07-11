import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/JobApplication.css';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    bid_amount: '',
    proposal_text: '',
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // First fetch the project details
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', jobId)
          .single();

        if (projectError) throw projectError;

        // Then fetch the client profile details
        const { data: clientData, error: clientError } = await supabase
          .from('client_profiles')
          .select('display_name, company, location')
          .eq('user_id', projectData.client_id)
          .single();

        if (clientError) throw clientError;

        setJob({
          ...projectData,
          client_profiles: clientData
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to apply for this job');
        navigate('/login');
        return;
      }

      // Check if user is a freelancer by checking user_profiles table
      const { data: userProfile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      if (!userProfile || userProfile.role !== 'freelancer') {
        setError('Only freelancers can apply for jobs');
        return;
      }

      // Get freelancer profile ID
      const { data: freelancerProfile, error: freelancerError } = await supabase
        .from('freelancer_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (freelancerError) throw freelancerError;

      if (!freelancerProfile) {
        setError('Please complete your freelancer profile before applying for jobs');
        return;
      }

      // Check if freelancer has already bid on this project
      const { data: existingBid } = await supabase
        .from('bids')
        .select('id')
        .eq('project_id', jobId)
        .eq('freelancer_id', freelancerProfile.id)
        .single();

      if (existingBid) {
        setError('You have already submitted a bid for this project');
        return;
      }

      // Submit the bid
      const { error: bidError } = await supabase
        .from('bids')
        .insert([
          {
            project_id: jobId,
            freelancer_id: freelancerProfile.id,
            bid_amount: formData.bid_amount,
            proposal_text: formData.proposal_text,
            status: 'pending'
          }
        ]);

      if (bidError) throw bidError;

      setNotification('Bid submitted successfully!');
      setTimeout(() => {
        navigate('/freelancer-dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div className="error">Job not found</div>;

  return (
    <div className="job-application-container">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <div className="job-application-content">
        <h1>Submit Your Bid</h1>
        
        <div className="job-details">
          <h2>{job.title}</h2>
          <p className="client-info">
            Posted by {job.client_profiles.display_name} from {job.client_profiles.company}
          </p>
          <p className="location">{job.client_profiles.location}</p>
          <p className="budget">Budget Range: ${job.budget_min} - ${job.budget_max}</p>
          <p className="deadline">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
          <div className="skills">
            <h3>Required Skills:</h3>
            <ul>
              {job.skills_required.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="description">
            <h3>Job Description:</h3>
            <p>{job.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="bid_amount">Your Bid Amount ($)</label>
            <input
              type="number"
              id="bid_amount"
              name="bid_amount"
              value={formData.bid_amount}
              onChange={handleChange}
              min={job.budget_min}
              max={job.budget_max}
              step="0.01"
              placeholder="Enter your bid amount"
              required
            />
            <small className="hint">Must be within the budget range</small>
          </div>

          <div className="form-group">
            <label htmlFor="proposal_text">Your Proposal</label>
            <textarea
              id="proposal_text"
              name="proposal_text"
              value={formData.proposal_text}
              onChange={handleChange}
              rows="8"
              placeholder="Describe your approach to this project, your relevant experience, and why you're the best fit for this job."
              required
            />
            <small className="hint">Minimum 100 characters</small>
          </div>

          <button type="submit" className="submit-button">
            Submit Bid
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication; 