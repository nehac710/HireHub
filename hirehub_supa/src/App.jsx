import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './components/HomePage';
import Navbar from './components/Navbar';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import JobPosting from './pages/JobPosting';
import JobListing from './pages/JobListing';
import ProfileSetup from './pages/ProfileSetup';
import ClientProfileSetup from './pages/ClientProfileSetup';
import FreelancerProfileSetup from './pages/FreelancerProfileSetup';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/job-posting" element={<JobPosting />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/client-profile-setup" element={<ClientProfileSetup />} />
        <Route path="/freelancer-profile-setup" element={<FreelancerProfileSetup />} />
      </Routes>
    </Router>
  );
}

export default App;
