import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/BidManagement.css';

const BidManagement = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectAndBids = async () => {
      try {
        // Fetch project details
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (projectError) throw projectError;

        // Fetch bids for this project
        const { data: bidsData, error: bidsError } = await supabase
          .from('bids')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false });

        if (bidsError) throw bidsError;

        // Fetch freelancer profiles for each bid
        const bidsWithProfiles = await Promise.all(
          bidsData.map(async (bid) => {
            const { data: freelancerProfile } = await supabase
              .from('freelancer_profiles')
              .select('display_name, skills, rating')
              .eq('user_id', bid.freelancer_id)
              .single();

            return {
              ...bid,
              freelancer_profile: freelancerProfile || {}
            };
          })
        );

        setProject(projectData);
        setBids(bidsWithProfiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndBids();
  }, [projectId]);

  const handleAcceptBid = async (bidId) => {
    try {
      // Update the bid status to accepted
      const { error: updateError } = await supabase
        .from('bids')
        .update({ status: 'accepted' })
        .eq('id', bidId);

      if (updateError) throw updateError;

      // Update all other bids for this project to rejected
      const { error: rejectError } = await supabase
        .from('bids')
        .update({ status: 'rejected' })
        .eq('project_id', projectId)
        .neq('id', bidId);

      if (rejectError) throw rejectError;

      // Update project status
      const { error: projectError } = await supabase
        .from('projects')
        .update({ status: 'in_progress' })
        .eq('id', projectId);

      if (projectError) throw projectError;

      // Refresh the data
      const { data: updatedBids } = await supabase
        .from('bids')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      setBids(updatedBids);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!project) return <div className="error">Project not found</div>;

  return (
    <div className="bid-management-container">
      <div className="project-details">
        <h1>{project.title}</h1>
        <div className="project-info">
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Budget Range:</strong> ${project.budget_min} - ${project.budget_max}</p>
          <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
          <p><strong>Required Skills:</strong> {project.skills_required.join(', ')}</p>
          <p><strong>Status:</strong> {project.status}</p>
        </div>
      </div>

      <div className="bids-section">
        <h2>Bids Received</h2>
        {bids.length === 0 ? (
          <p>No bids received yet.</p>
        ) : (
          <div className="bids-list">
            {bids.map((bid) => (
              <div className="bid-card" key={bid.id}>
                <div className="bid-header">
                  <h3>{bid.freelancer_profile?.display_name || 'Unknown Freelancer'}</h3>
                  <span className={`bid-status ${bid.status}`}>{bid.status}</span>
                </div>
                <div className="bid-details">
                  <p><strong>Bid Amount:</strong> ${bid.bid_amount}</p>
                  <p><strong>Estimated Days:</strong> {bid.estimated_days}</p>
                  <p><strong>Proposal:</strong> {bid.proposal}</p>
                  <p><strong>Freelancer Rating:</strong> {bid.freelancer_profile?.rating || 'Not rated yet'}</p>
                  <p><strong>Skills:</strong> {bid.freelancer_profile?.skills?.join(', ') || 'No skills listed'}</p>
                </div>
                {project.status === 'open' && (
                  <button
                    className="accept-bid-button"
                    onClick={() => handleAcceptBid(bid.id)}
                    disabled={bid.status !== 'pending'}
                  >
                    Accept Bid
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BidManagement; 