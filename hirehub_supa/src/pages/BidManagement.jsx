import React, { useState } from 'react';
import '../styles/BidManagement.css';

const BidManagement = () => {
  const [selectedBid, setSelectedBid] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data - in a real app, this would come from your backend
  const project = {
    id: '123',
    title: 'Senior Web Developer Position',
    description: 'Looking for an experienced web developer to build a modern e-commerce platform...',
    budget: '$5000',
    duration: '3 months',
  };

  const bids = [
    {
      id: '1',
      freelancer: {
        id: '789',
        name: 'John Doe',
        rating: 4.8,
        completedProjects: 25,
      },
      bidAmount: '$4500',
      proposalText: 'I have extensive experience in building e-commerce platforms...',
      submittedAt: '2 days ago',
      status: 'pending',
    },
    {
      id: '2',
      freelancer: {
        id: '790',
        name: 'Jane Smith',
        rating: 4.9,
        completedProjects: 30,
      },
      bidAmount: '$4800',
      proposalText: 'I specialize in modern web development and have worked on similar projects...',
      submittedAt: '1 day ago',
      status: 'pending',
    },
  ];

  const handleViewProposal = (bid) => {
    setSelectedBid(bid);
    setShowModal(true);
  };

  const handleAcceptBid = (bidId) => {
    // In a real app, this would update the bid status in your backend
    console.log('Accepting bid:', bidId);
  };

  const handleRejectBid = (bidId) => {
    // In a real app, this would update the bid status in your backend
    console.log('Rejecting bid:', bidId);
  };

  return (
    <div className="bid-management-container">
      <div className="bid-management-header">
        <h1>Project Bids</h1>
        <div className="project-info">
          <h2>{project.title}</h2>
          <p className="project-budget">Budget: {project.budget}</p>
          <p className="project-duration">Duration: {project.duration}</p>
        </div>
      </div>

      <div className="bids-list">
        {bids.map((bid) => (
          <div key={bid.id} className="bid-card">
            <div className="bid-header">
              <div className="freelancer-info">
                <h3>{bid.freelancer.name}</h3>
                <div className="freelancer-stats">
                  <span className="rating">⭐ {bid.freelancer.rating}</span>
                  <span className="projects">Projects: {bid.freelancer.completedProjects}</span>
                </div>
              </div>
              <div className="bid-amount">
                <span className="amount-label">Bid Amount</span>
                <span className="amount">{bid.bidAmount}</span>
              </div>
            </div>

            <div className="bid-actions">
              <button
                className="btn btn-outline"
                onClick={() => handleViewProposal(bid)}
              >
                View Proposal
              </button>
              <div className="decision-buttons">
                <button
                  className="btn btn-reject"
                  onClick={() => handleRejectBid(bid.id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-accept"
                  onClick={() => handleAcceptBid(bid.id)}
                >
                  Accept
                </button>
              </div>
            </div>

            <div className="bid-meta">
              <span className="submitted-at">Submitted {bid.submittedAt}</span>
              <span className={`status ${bid.status}`}>{bid.status}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedBid && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Proposal from {selectedBid.freelancer.name}</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{selectedBid.proposalText}</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidManagement; 