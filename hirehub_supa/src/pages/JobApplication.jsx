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
  const [formData, setFormData] = useState({
    bid_amount: '',
    proposal: '',
    estimated_days: '',
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
          .maybeSingle();

        if (clientError) throw clientError;

        // Combine the data
        setJob({
          ...projectData,
          client_profiles: clientData || { display_name: 'Unknown', company: 'Unknown', location: 'Unknown' }
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

      // Submit application
      const { error: submitError } = await supabase
        .from('bids')
        .insert({
          project_id: jobId,
          freelancer_id: user.id,
          bid_amount: formData.bid_amount,
          proposal_text: formData.proposal,
          status: 'pending'
        });

      if (submitError) throw submitError;

      // Navigate back to job listings
      navigate('/job-listing');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div className="error">Job not found</div>;

  return (
    <div className="job-application-container">
      <div className="job-application-content">
        <h1>Apply for Job</h1>
        
        <div className="job-details">
          <h2>{job.title}</h2>
          <p className="client-info">
            Posted by {job.client_profiles.display_name} from {job.client_profiles.company}
          </p>
          <p className="location">{job.client_profiles.location}</p>
          <p className="budget">Budget: ${job.budget_min} - ${job.budget_max}</p>
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_days">Estimated Days to Complete</label>
            <input
              type="number"
              id="estimated_days"
              name="estimated_days"
              value={formData.estimated_days}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="proposal">Your Proposal</label>
            <textarea
              id="proposal"
              name="proposal"
              value={formData.proposal}
              onChange={handleChange}
              rows="6"
              required
              placeholder="Describe your approach to this project, your relevant experience, and why you're the best fit for this job."
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication; 