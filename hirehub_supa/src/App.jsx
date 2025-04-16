import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './components/HomePage';
import Navbar from './components/Navbar';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import JobPosting from './pages/JobPosting';
import JobListing from './pages/JobListing';
import Bidding from './pages/BidManagement';
import ProfileSetup from './pages/ProfileSetup';
import FreelancerProfileSetup from './pages/FreelancerProfileSetup';
import ClientProfileSetup from './pages/ClientProfileSetup';

import './App.css';
import BidManagement from './pages/BidManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Temporary test routes */}
        <Route path="/test/client-dashboard" element={<ClientDashboard />} />
        <Route path="/test/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/test/job-posting" element={<JobPosting />} />
        <Route path="/test/job-listing" element={<JobListing />} />
        <Route path="/test/bid-management" element={<BidManagement />} />
        <Route path="/test/profile-setup" element={<ProfileSetup />} />
        <Route path="/test/freelancer-profile-setup" element={<FreelancerProfileSetup />} />
        <Route path="/test/client-profile-setup" element={<ClientProfileSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
